export interface PageRow {
  page: string;
  sessions: number;
  revenue: number;
}

export interface ParseResult {
  rows: PageRow[];
  pageColumn: string;
  sessionsColumn: string;
  revenueColumn: string;
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

/**
 * Parse GA4 page data in whatever shape it arrives:
 * - CSV download from a GA4 report (comment lines starting "#" are skipped)
 * - Rows copied straight out of the GA4 table and pasted (tab-separated,
 *   usually without a header row; columns are then inferred positionally:
 *   first column page, second sessions, last revenue, which matches the
 *   Landing page report's column order)
 */
export function parseGa4Csv(text: string): ParseResult | { error: string } {
  const rawLines = text
    .split(/\r?\n/)
    .filter((l) => l.trim() !== '' && !l.trim().startsWith('#'));

  if (rawLines.length === 0) {
    return { error: 'That looks empty. Export the Landing page report from GA4 as CSV, or copy rows straight out of the GA4 table and paste them here.' };
  }

  // GA4 CSV downloads are comma-separated; rows copied from the GA4 table are tab-separated.
  const delimiter = rawLines.some((l) => l.includes('\t')) ? '\t' : ',';

  // Find the header row: the first line naming both a sessions and a revenue column.
  let headerIdx = -1;
  let headers: string[] = [];
  let sawSessionsHeader = false;
  for (let i = 0; i < Math.min(rawLines.length, 10); i++) {
    const cells = splitLine(rawLines[i], delimiter);
    const hasSessions = cells.some((c) => /session/i.test(c));
    // GA4 calls it revenue; Shopify exports call it total sales.
    const hasRevenue = cells.some((c) => /revenue|total sales/i.test(c));
    if (hasSessions) sawSessionsHeader = true;
    if (hasSessions && hasRevenue) {
      headerIdx = i;
      headers = cells;
      break;
    }
  }

  let pageIdx: number;
  let sessionsIdx: number;
  let revenueIdx: number;
  let assumed = false;
  let dataLines: string[];
  let columnNames: { page: string; sessions: string; revenue: string };

  if (headerIdx !== -1) {
    const findColumn = (patterns: RegExp[]): number => {
      for (const p of patterns) {
        const idx = headers.findIndex((h) => p.test(h));
        if (idx !== -1) return idx;
      }
      return -1;
    };
    pageIdx = findColumn([/^landing page/i, /^page path/i, /^page title/i, /page/i]);
    sessionsIdx = findColumn([/^sessions$/i, /session/i]);
    revenueIdx = findColumn([/^total revenue$/i, /^purchase revenue$/i, /^total sales$/i, /revenue|total sales/i]);
    if (pageIdx === -1) {
      return {
        error: 'Couldn’t find a page column. Use the Landing page report (Reports → Engagement → Landing page) so each row is a page.',
      };
    }
    dataLines = rawLines.slice(headerIdx + 1);
    columnNames = { page: headers[pageIdx], sessions: headers[sessionsIdx], revenue: headers[revenueIdx] };
  } else if (sawSessionsHeader) {
    // A header row with Sessions but no revenue column anywhere.
    return {
      error:
        'Found a Sessions column but no revenue column. In GA4, click the pencil (Customize report) on the Landing page report and add "Total revenue" as a metric, or copy the rows including the revenue column.',
    };
  } else {
    // No header at all: rows pasted straight from the GA4 table. Infer
    // positions from the Landing page report's column order.
    const candidate = rawLines.filter((l) => {
      const cells = splitLine(l, delimiter);
      return cells.length >= 3 && (cells[0].startsWith('/') || cells[0] === '(not set)');
    });
    if (candidate.length === 0) {
      return {
        error:
          'Couldn’t recognise that as GA4 page data. Either download the Landing page report as CSV, or copy whole rows (page, sessions … revenue) from the GA4 table and paste them.',
      };
    }
    const width = splitLine(candidate[0], delimiter).length;
    pageIdx = 0;
    sessionsIdx = 1;
    revenueIdx = width - 1;
    assumed = true;
    dataLines = candidate;
    columnNames = {
      page: 'first column as page',
      sessions: 'second column as Sessions',
      revenue: 'last column as Total revenue',
    };
  }

  const rows: PageRow[] = [];
  let skipped = 0;
  for (const line of dataLines) {
    const cells = splitLine(line, delimiter);
    // GA4 appends grand-total and date-breakdown blocks after a blank line;
    // rows that don't parse cleanly are counted, not fatal.
    const page = cells[pageIdx];
    const sessions = parseNumber(cells[sessionsIdx] ?? '');
    const revenue = parseNumber(cells[revenueIdx] ?? '');
    if (headerIdx === -1 && page && !page.startsWith('/') && page !== '(not set)') {
      skipped++;
      continue;
    }
    if (!page || !Number.isFinite(sessions) || sessions <= 0 || !Number.isFinite(revenue)) {
      skipped++;
      continue;
    }
    rows.push({ page, sessions: Math.round(sessions), revenue });
  }

  if (rows.length === 0) {
    return { error: 'No usable rows found. Check each row has a page, Sessions, and Total revenue.' };
  }

  rows.sort((a, b) => b.sessions - a.sessions);

  return {
    rows: rows.slice(0, 100),
    pageColumn: columnNames.page,
    sessionsColumn: columnNames.sessions,
    revenueColumn: columnNames.revenue,
    skipped,
    assumed,
  };
}
