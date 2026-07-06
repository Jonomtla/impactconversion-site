export interface ImportedRow {
  page: string;
  sessions: number | null;
  revenue: number | null;
}

export type ImportKind = 'full' | 'sessions-only' | 'revenue-only';

export interface ParseResult {
  kind: ImportKind;
  rows: ImportedRow[];
  sessionsColumn: string | null;
  revenueColumn: string | null;
  skipped: number;
  /** True when columns were inferred positionally (headerless paste). */
  assumed: boolean;
}

/** Split one delimited line respecting double-quoted fields. */
function splitLine(line: string, delimiter: string): string[] {
  const cells: string[] = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cur += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === delimiter) {
      cells.push(cur);
      cur = '';
    } else {
      cur += ch;
    }
  }
  cells.push(cur);
  return cells.map((c) => c.trim());
}

function parseNumber(raw: string): number {
  const cleaned = raw.replace(/[^0-9.-]/g, '');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : NaN;
}

const isRowLabel = (l: string) => l.startsWith('/') || /^(none|summary|\(not set\))$/i.test(l);

/**
 * Shopify's report grid copies with one cell per line (no tabs): header labels
 * first, then repeating groups of [path, metric, metric...]. Verified against
 * real explorations, July 2026.
 */
function parseLineMode(lines: string[]): ParseResult | { error: string } {
  let i = 0;
  const headerLines: string[] = [];
  while (i < lines.length && !isRowLabel(lines[i])) {
    headerLines.push(lines[i]);
    i++;
  }
  const metricHeaders = headerLines.filter((h) => h !== '' && !/landing page|page path/i.test(h));
  const sessionsPos = metricHeaders.findIndex((h) => /session/i.test(h));
  const revenuePos = metricHeaders.findIndex((h) => /revenue|total sales/i.test(h));
  if (metricHeaders.length === 0 || (sessionsPos === -1 && revenuePos === -1)) {
    return { error: 'Couldn’t find Sessions or revenue in what you copied. Select the whole table including its header row and copy again.' };
  }
  const kind: ImportKind =
    sessionsPos !== -1 && revenuePos !== -1 ? 'full' : sessionsPos !== -1 ? 'sessions-only' : 'revenue-only';

  const rows: ImportedRow[] = [];
  let skipped = 0;
  while (i < lines.length) {
    const label = lines[i];
    i++;
    const values: number[] = [];
    while (i < lines.length && !isRowLabel(lines[i]) && values.length < metricHeaders.length) {
      values.push(parseNumber(lines[i]));
      i++;
    }
    if (!label.startsWith('/')) {
      skipped++;
      continue;
    }
    const sessions = sessionsPos !== -1 ? values[sessionsPos] : NaN;
    const revenue = revenuePos !== -1 ? values[revenuePos] : NaN;
    const hasSessions = Number.isFinite(sessions) && sessions > 0;
    const hasRevenue = Number.isFinite(revenue) && revenue >= 0;
    if (
      (kind === 'full' && (!hasSessions || !hasRevenue)) ||
      (kind === 'sessions-only' && !hasSessions) ||
      (kind === 'revenue-only' && !hasRevenue)
    ) {
      skipped++;
      continue;
    }
    rows.push({
      page: label,
      sessions: hasSessions ? Math.round(sessions) : null,
      revenue: hasRevenue ? revenue : null,
    });
  }
  if (rows.length === 0) {
    return { error: 'No usable rows found. Check each row has a page path plus Sessions and/or revenue.' };
  }
  rows.sort((a, b) => (b.sessions ?? b.revenue ?? 0) - (a.sessions ?? a.revenue ?? 0));
  return {
    kind,
    rows: rows.slice(0, 150),
    sessionsColumn: sessionsPos !== -1 ? metricHeaders[sessionsPos] : null,
    revenueColumn: revenuePos !== -1 ? metricHeaders[revenuePos] : null,
    skipped,
    assumed: false,
  };
}

/**
 * Parse page-level analytics data in whatever shape it arrives:
 * - GA4 CSV download or copied table rows (sessions + revenue together)
 * - Shopify exploration exports/copies, which split across two reports:
 *   sessions by landing_page_path, and total_sales by order_landing_page_path.
 *   Those arrive as sessions-only / revenue-only imports and get merged
 *   by the caller. Shopify grid copies arrive one cell per line.
 */
export function parseGa4Csv(text: string): ParseResult | { error: string } {
  const rawLines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l !== '' && !l.startsWith('#'));

  if (rawLines.length === 0) {
    return { error: 'That looks empty. Export or copy a report with pages, sessions, and revenue, then try again.' };
  }

  // Shopify's grid copies without any delimiter: one cell per line.
  const hasTabs = rawLines.some((l) => l.includes('\t'));
  const lineModeHeader = /^(landing page path|order landing page path|sessions|total sales|orders)$/i;
  if (!hasTabs && rawLines.some((l) => lineModeHeader.test(l))) {
    return parseLineMode(rawLines);
  }

  // CSV downloads are comma-separated; rows copied from GA4 tables are tab-separated.
  const delimiter = hasTabs ? '\t' : ',';

  // Find the header row: the first line naming a sessions and/or revenue column.
  // GA4 calls revenue "Total revenue"; Shopify calls it "Total sales".
  let headerIdx = -1;
  let headers: string[] = [];
  let kind: ImportKind = 'full';
  for (let i = 0; i < Math.min(rawLines.length, 10); i++) {
    const cells = splitLine(rawLines[i], delimiter);
    const hasSessions = cells.some((c) => /session/i.test(c));
    const hasRevenue = cells.some((c) => /revenue|total sales/i.test(c));
    if (hasSessions || hasRevenue) {
      headerIdx = i;
      headers = cells;
      kind = hasSessions && hasRevenue ? 'full' : hasSessions ? 'sessions-only' : 'revenue-only';
      break;
    }
  }

  let pageIdx: number;
  let sessionsIdx = -1;
  let revenueIdx = -1;
  let assumed = false;
  let dataLines: string[];
  let sessionsColumn: string | null = null;
  let revenueColumn: string | null = null;

  if (headerIdx !== -1) {
    const findColumn = (patterns: RegExp[]): number => {
      for (const p of patterns) {
        const idx = headers.findIndex((h) => p.test(h));
        if (idx !== -1) return idx;
      }
      return -1;
    };
    pageIdx = findColumn([/^landing page/i, /^order landing page/i, /^page path/i, /^page title/i, /page/i]);
    if (kind !== 'revenue-only') sessionsIdx = findColumn([/^sessions$/i, /session/i]);
    if (kind !== 'sessions-only')
      revenueIdx = findColumn([/^total revenue$/i, /^purchase revenue$/i, /^total sales$/i, /revenue|total sales/i]);
    if (pageIdx === -1) {
      return {
        error:
          'Couldn’t find a page column. Use a report broken down by page (GA4 Landing page report, or Shopify grouped by landing page path).',
      };
    }
    dataLines = rawLines.slice(headerIdx + 1);
    sessionsColumn = sessionsIdx !== -1 ? headers[sessionsIdx] : null;
    revenueColumn = revenueIdx !== -1 ? headers[revenueIdx] : null;
  } else {
    // No header at all: rows pasted straight from a GA4 table. Infer positions
    // from the Landing page report's column order. Two-column data is ambiguous
    // (sessions or revenue?), so require the header for partial imports.
    const candidate = rawLines.filter((l) => {
      const cells = splitLine(l, delimiter);
      return cells.length >= 3 && (cells[0].startsWith('/') || cells[0] === '(not set)');
    });
    if (candidate.length === 0) {
      return {
        error:
          'Couldn’t recognise that as page data. Copy whole rows including the header row, or download the report as CSV and drop it here.',
      };
    }
    const width = splitLine(candidate[0], delimiter).length;
    pageIdx = 0;
    sessionsIdx = 1;
    revenueIdx = width - 1;
    assumed = true;
    kind = 'full';
    dataLines = candidate;
    sessionsColumn = 'second column as Sessions';
    revenueColumn = 'last column as Total revenue';
  }

  const rows: ImportedRow[] = [];
  let skipped = 0;
  for (const line of dataLines) {
    const cells = splitLine(line, delimiter);
    const page = cells[pageIdx];
    // Skip summary/total rows and unattributed buckets ("None", "Summary", "(not set)").
    if (!page || !page.startsWith('/')) {
      skipped++;
      continue;
    }
    const sessions = sessionsIdx !== -1 ? parseNumber(cells[sessionsIdx] ?? '') : NaN;
    const revenue = revenueIdx !== -1 ? parseNumber(cells[revenueIdx] ?? '') : NaN;
    const hasSessions = Number.isFinite(sessions) && sessions > 0;
    const hasRevenue = Number.isFinite(revenue) && revenue >= 0;
    if (
      (kind === 'full' && (!hasSessions || !hasRevenue)) ||
      (kind === 'sessions-only' && !hasSessions) ||
      (kind === 'revenue-only' && !hasRevenue)
    ) {
      skipped++;
      continue;
    }
    rows.push({
      page,
      sessions: hasSessions ? Math.round(sessions) : null,
      revenue: hasRevenue ? revenue : null,
    });
  }

  if (rows.length === 0) {
    return { error: 'No usable rows found. Check each row has a page path plus Sessions and/or revenue.' };
  }

  rows.sort((a, b) => (b.sessions ?? b.revenue ?? 0) - (a.sessions ?? a.revenue ?? 0));

  return {
    kind,
    rows: rows.slice(0, 150),
    sessionsColumn,
    revenueColumn,
    skipped,
    assumed,
  };
}
