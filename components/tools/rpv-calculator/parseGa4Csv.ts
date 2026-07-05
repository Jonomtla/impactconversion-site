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
}

/** Split one CSV line respecting double-quoted fields. */
function splitCsvLine(line: string): string[] {
  const cells: string[] = [];
  let cur = "";
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
    } else if (ch === ",") {
      cells.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  cells.push(cur);
  return cells.map((c) => c.trim());
}

function parseNumber(raw: string): number {
  const cleaned = raw.replace(/[^0-9.-]/g, "");
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : NaN;
}

/**
 * Parse a GA4 report export (Reports → Landing page / Pages → Share → Download CSV).
 * GA4 UI exports prepend "# ..." comment lines and may append summary blocks;
 * both are skipped. Column matching is tolerant of naming across GA4 reports
 * and Explorations exports.
 */
export function parseGa4Csv(text: string): ParseResult | { error: string } {
  const lines = text
    .split(/\r?\n/)
    .filter((l) => l.trim() !== "" && !l.trim().startsWith("#"));

  if (lines.length < 2) {
    return { error: "That file has no data rows. Export the Landing page report from GA4 as CSV and try again." };
  }

  // Find the header row: the first line naming both a sessions and a revenue column.
  let headerIdx = -1;
  let headers: string[] = [];
  for (let i = 0; i < Math.min(lines.length, 10); i++) {
    const cells = splitCsvLine(lines[i]);
    const hasSessions = cells.some((c) => /session/i.test(c));
    const hasRevenue = cells.some((c) => /revenue/i.test(c));
    if (hasSessions && hasRevenue) {
      headerIdx = i;
      headers = cells;
      break;
    }
  }
  if (headerIdx === -1) {
    return {
      error:
        "Couldn't find Sessions and Revenue columns. In GA4, open Reports → Engagement → Landing page, add Total revenue if it's missing, then Share → Download CSV.",
    };
  }

  const findColumn = (patterns: RegExp[]): number => {
    for (const p of patterns) {
      const idx = headers.findIndex((h) => p.test(h));
      if (idx !== -1) return idx;
    }
    return -1;
  };

  const pageIdx = findColumn([
    /^landing page/i,
    /^page path/i,
    /^page title/i,
    /page/i,
  ]);
  const sessionsIdx = findColumn([/^sessions$/i, /session/i]);
  const revenueIdx = findColumn([
    /^total revenue$/i,
    /^purchase revenue$/i,
    /revenue/i,
  ]);

  if (pageIdx === -1) {
    return {
      error:
        "Couldn't find a page column. Use the Landing page or Pages report in GA4 so each row is a page.",
    };
  }

  const rows: PageRow[] = [];
  let skipped = 0;
  for (const line of lines.slice(headerIdx + 1)) {
    const cells = splitCsvLine(line);
    // GA4 appends grand-total and date-breakdown blocks after a blank line;
    // rows that don't parse cleanly are counted, not fatal.
    const page = cells[pageIdx];
    const sessions = parseNumber(cells[sessionsIdx] ?? "");
    const revenue = parseNumber(cells[revenueIdx] ?? "");
    if (!page || !Number.isFinite(sessions) || sessions <= 0 || !Number.isFinite(revenue)) {
      skipped++;
      continue;
    }
    rows.push({ page, sessions: Math.round(sessions), revenue });
  }

  if (rows.length === 0) {
    return { error: "No usable rows found. Check the CSV has one row per page with Sessions and Total revenue." };
  }

  rows.sort((a, b) => b.sessions - a.sessions);

  return {
    rows: rows.slice(0, 100),
    pageColumn: headers[pageIdx],
    sessionsColumn: headers[sessionsIdx],
    revenueColumn: headers[revenueIdx],
    skipped,
  };
}
