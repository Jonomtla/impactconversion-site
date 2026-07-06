'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { parseGa4Csv } from './parseGa4Csv';
import { PAGE_TYPES, type PageType, detectPageType } from './pageType';
import { formatRPV, formatCompact } from './format';

interface PageRpvProps {
  /** Site-wide RPV from the Whole site tab; fallback baseline for singleton page types. */
  siteRpv: number | null;
  /**
   * Called with summed sessions/revenue after a complete import. Returns true
   * when the totals were used to fill the Whole site tab (so the note can say so).
   */
  onImportTotals?: (sessions: number, revenue: number) => boolean;
  /** Text pasted while another tab was showing; imported on mount. */
  pendingImport?: string | null;
  onPendingConsumed?: () => void;
}

interface Row {
  page: string;
  sessions: number;
  /** null = not provided yet (e.g. Shopify sessions report pasted, revenue report pending). */
  revenue: number | null;
  /** Set when the user overrides the auto-detected type. */
  typeOverride?: PageType;
}

const EMPTY_ROW: Row = { page: '', sessions: 0, revenue: null };
const COLLAPSED_COUNT = 12;

// Store-agnostic deep links: admin.shopify.com redirects to the logged-in
// user's own store and runs the prefilled query. Verified July 2026.
const SHOPIFY_SESSIONS_URL =
  'https://admin.shopify.com/analytics/reports/explore?ql=' +
  encodeURIComponent('FROM sessions SHOW sessions GROUP BY landing_page_path SINCE -30d UNTIL today ORDER BY sessions DESC');
const SHOPIFY_REVENUE_URL =
  'https://admin.shopify.com/analytics/reports/explore?ql=' +
  encodeURIComponent('FROM sales SHOW total_sales, orders GROUP BY order_landing_page_path SINCE -30d UNTIL today ORDER BY total_sales DESC');

const cellInput =
  'w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm font-medium text-text placeholder:text-text-muted/50 focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/10 transition-colors';

const rowType = (r: Row): PageType => r.typeOverride ?? detectPageType(r.page);

const normalizePath = (p: string): string => {
  let s = p.split('?')[0].trim().toLowerCase();
  if (s.length > 1 && s.endsWith('/')) s = s.slice(0, -1);
  return s;
};

export default function PageRpv({ siteRpv, onImportTotals, pendingImport, onPendingConsumed }: PageRpvProps) {
  const [rows, setRows] = useState<Row[]>([{ ...EMPTY_ROW }, { ...EMPTY_ROW }, { ...EMPTY_ROW }]);
  const [importNote, setImportNote] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const validRows = useMemo(
    () => rows.filter((r) => r.page.trim() !== '' && r.sessions > 0 && r.revenue !== null),
    [rows]
  );

  const overallAvg = useMemo(() => {
    const totalSessions = validRows.reduce((s, r) => s + r.sessions, 0);
    const totalRevenue = validRows.reduce((s, r) => s + (r.revenue ?? 0), 0);
    return totalSessions > 0 ? totalRevenue / totalSessions : 0;
  }, [validRows]);

  // Sessions-weighted average RPV per page type across the user's own rows.
  // Pages are judged against their peers, not against PDPs.
  const typeAverages = useMemo(() => {
    const groups = new Map<PageType, { sessions: number; revenue: number; count: number }>();
    for (const r of validRows) {
      const t = rowType(r);
      const g = groups.get(t) ?? { sessions: 0, revenue: 0, count: 0 };
      g.sessions += r.sessions;
      g.revenue += r.revenue ?? 0;
      g.count++;
      groups.set(t, g);
    }
    const out = new Map<PageType, { rpv: number; count: number }>();
    groups.forEach((g, t) => {
      if (g.sessions > 0) out.set(t, { rpv: g.revenue / g.sessions, count: g.count });
    });
    return out;
  }, [validRows]);

  // Baseline for one row: its type's average when there are peers to compare
  // against, otherwise the site average (or the average of all rows).
  const baselineFor = (r: Row): { value: number; label: string } | null => {
    const t = rowType(r);
    const g = typeAverages.get(t);
    if (g && g.count >= 2) return { value: g.rpv, label: `your ${t.toLowerCase()} average` };
    if (siteRpv && siteRpv > 0) return { value: siteRpv, label: 'your site average' };
    if (overallAvg > 0) return { value: overallAvg, label: 'the average of these pages' };
    return null;
  };

  const maxRpv = useMemo(
    () => Math.max(0, ...validRows.map((r) => (r.sessions > 0 ? (r.revenue ?? 0) / r.sessions : 0))),
    [validRows]
  );

  const opportunities = useMemo(() => {
    return validRows
      .map((r) => {
        const rpv = (r.revenue ?? 0) / r.sessions;
        const baseline = baselineFor(r);
        const gain = baseline && rpv < baseline.value ? (baseline.value - rpv) * r.sessions : 0;
        return { ...r, rpv, gain, baseline };
      })
      .filter((r) => r.gain > 0)
      .sort((a, b) => b.gain - a.gain)
      .slice(0, 3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validRows, typeAverages, siteRpv, overallAvg]);

  const importText = (text: string, source: 'file' | 'paste') => {
    setImportError(null);
    setImportNote(null);
    const result = parseGa4Csv(text);
    if ('error' in result) {
      setImportError(result.error);
      return;
    }

    let merged: Row[];
    let matchNote = '';
    if (result.kind === 'full') {
      merged = result.rows.map((r) => ({ page: r.page, sessions: r.sessions ?? 0, revenue: r.revenue }));
    } else {
      // Partial import (Shopify splits sessions and revenue across two
      // reports): merge into existing rows by normalised path.
      const map = new Map<string, Row>();
      for (const r of rows) {
        if (r.page.trim() !== '') map.set(normalizePath(r.page), { ...r });
      }
      let matchedCount = 0;
      for (const inc of result.rows) {
        const key = normalizePath(inc.page);
        const existing = map.get(key);
        if (existing) {
          if (inc.sessions !== null) existing.sessions = inc.sessions;
          if (inc.revenue !== null) existing.revenue = inc.revenue;
          matchedCount++;
        } else {
          map.set(key, { page: inc.page, sessions: inc.sessions ?? 0, revenue: inc.revenue });
        }
      }
      merged = [...map.values()];
      if (matchedCount > 0) matchNote = ` (${matchedCount} matched pages you already had)`;
    }

    setRows(merged.length > 0 ? merged : [{ ...EMPTY_ROW }]);
    setShowAll(false);

    const complete = merged.filter((r) => r.sessions > 0 && r.revenue !== null);
    const missingRevenue = merged.filter((r) => r.sessions > 0 && r.revenue === null).length;
    const missingSessions = merged.filter((r) => r.sessions === 0 && r.revenue !== null).length;

    let filledSite = false;
    if (complete.length > 0 && onImportTotals) {
      filledSite = onImportTotals(
        complete.reduce((s, r) => s + r.sessions, 0),
        complete.reduce((s, r) => s + (r.revenue ?? 0), 0)
      );
    }

    const what =
      result.kind === 'full'
        ? `${result.rows.length} pages (${result.sessionsColumn} + ${result.revenueColumn})`
        : result.kind === 'sessions-only'
          ? `sessions for ${result.rows.length} pages${matchNote}`
          : `revenue for ${result.rows.length} pages${matchNote}`;
    const nextStep =
      missingRevenue > 0
        ? ` Now add the revenue report (${missingRevenue} pages still need it).`
        : missingSessions > 0
          ? ` Now add the sessions report (${missingSessions} pages still need it).`
          : '';

    setImportNote(
      `${source === 'paste' ? 'Pasted' : 'Imported'} ${what}` +
        (result.assumed
          ? ' (no header row, so read the first column as page, second as Sessions, last as Total revenue; spot-check an RPV or two)'
          : '') +
        (result.skipped > 0 ? `, skipped ${result.skipped} rows without usable numbers` : '') +
        '. Page types detected from the URLs.' +
        nextStep +
        (filledSite ? ' The Whole site tab now has your totals too.' : '') +
        ' Everything stays in your browser.'
    );
  };

  const handleFile = (file: File) => {
    setImportError(null);
    setImportNote(null);
    const reader = new FileReader();
    reader.onload = () => importText(String(reader.result ?? ''), 'file');
    reader.onerror = () => setImportError('Could not read that file. Try re-downloading the CSV.');
    reader.readAsText(file);
  };

  // Text pasted while the Whole site tab was showing lands here on mount.
  useEffect(() => {
    if (pendingImport) {
      importText(pendingImport, 'paste');
      onPendingConsumed?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingImport]);

  // Copy rows in GA4 or Shopify, click this tab, hit paste. No download step at all.
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;
      const text = e.clipboardData?.getData('text');
      if (!text || !text.trim()) return;
      e.preventDefault();
      importText(text, 'paste');
    };
    document.addEventListener('paste', onPaste);
    return () => document.removeEventListener('paste', onPaste);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, onImportTotals]);

  const updateRow = (i: number, patch: Partial<Row>) => {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  };

  const visibleRows = showAll ? rows : rows.slice(0, COLLAPSED_COUNT);
  const typesPresent = [...typeAverages.entries()].filter(([, g]) => g.count >= 1);

  return (
    <div>
      {/* Import zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        className={`rounded-2xl border-2 border-dashed p-5 sm:p-6 text-center transition-colors ${
          dragOver ? 'border-purple bg-purple-soft/50' : 'border-ink/15 bg-cream-2/50'
        }`}
      >
        <p className="text-sm font-semibold text-text">
          Compare revenue per visitor across your landing pages
        </p>
        <p className="mt-1 text-sm text-text-muted">
          Copy rows straight out of GA4 or Shopify and paste here (Cmd+V), drop a CSV, or fill in
          the rows by hand. Each page is judged against your own average for its page type.
          Nothing is uploaded; everything is read in your browser.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => fileRef.current?.click()}
            className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-cream hover:bg-ink-2 transition-colors"
          >
            Import CSV
          </button>
          <button
            onClick={() => setRows((prev) => [...prev, { ...EMPTY_ROW }])}
            className="rounded-xl border border-ink/15 bg-white px-5 py-2.5 text-sm font-semibold text-text hover:border-ink/30 transition-colors"
          >
            Add a row
          </button>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          className="sr-only"
          aria-label="Import CSV file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = '';
          }}
        />
        <div className="mt-4 grid gap-2 text-left text-sm text-text-muted max-w-xl mx-auto">
          <details>
            <summary className="cursor-pointer font-medium text-text hover:text-purple transition-colors text-center">
              Get it from GA4
            </summary>
            <ol className="mt-3 list-decimal space-y-1 pl-5">
              <li>Go to Reports → Engagement → Landing page (or Pages and screens).</li>
              <li>Set your date range (a full month is ideal) and make sure Sessions and Total revenue are shown as columns. If Total revenue is missing, click the pencil (Customize report) and add it as a metric.</li>
              <li>Fastest: select the rows in the table, copy, then paste here with Cmd+V. Or click Share (top right) → Download file → CSV and drop the file here.</li>
            </ol>
          </details>
          <details>
            <summary className="cursor-pointer font-medium text-text hover:text-purple transition-colors text-center">
              Get it from Shopify
            </summary>
            <p className="mt-3">
              Shopify splits this across two reports. These links open them prefilled in your own
              admin (log in to Shopify first):
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-5">
              <li>
                <a
                  href={SHOPIFY_SESSIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-purple underline-offset-2 hover:underline"
                >
                  Sessions by landing page
                </a>
                : copy the table rows including the header, paste here.
              </li>
              <li>
                <a
                  href={SHOPIFY_REVENUE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-purple underline-offset-2 hover:underline"
                >
                  Revenue by landing page
                </a>
                : copy and paste the same way. The two get merged by page automatically.
              </li>
            </ol>
            <p className="mt-2">
              Shopify attributes revenue to the landing page of the ordering session, so treat
              per-page RPV from Shopify as directional.
            </p>
          </details>
        </div>
      </div>

      {importNote && (
        <p className="mt-3 text-sm font-medium text-purple" role="status">
          {importNote}
        </p>
      )}
      {importError && (
        <p className="mt-3 text-sm font-medium text-accent-warm" role="alert">
          {importError}
        </p>
      )}

      {/* Type averages */}
      {typesPresent.length >= 2 && (
        <div className="mt-6 flex flex-wrap gap-2" aria-label="Average RPV by page type">
          {typesPresent
            .sort((a, b) => b[1].rpv - a[1].rpv)
            .map(([t, g]) => (
              <span key={t} className="rounded-full bg-cream-2 px-3 py-1.5 text-sm text-text-muted">
                <span className="font-semibold text-text">{t}</span> avg{' '}
                <span className="font-semibold text-text">{formatRPV(g.rpv)}</span>
                <span className="text-xs"> · {g.count} {g.count === 1 ? 'page' : 'pages'}</span>
              </span>
            ))}
        </div>
      )}

      {/* Opportunity summary */}
      {opportunities.length > 0 && (
        <div className="mt-6 rounded-2xl bg-purple-soft/60 border border-purple/20 p-5">
          <h3 className="text-sm font-semibold text-text">
            Biggest opportunities
            <span className="ml-2 font-normal text-text-muted">
              if each page caught up to its own page-type average
            </span>
          </h3>
          <ul className="mt-3 space-y-2">
            {opportunities.map((o) => (
              <li key={o.page} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm">
                <span className="min-w-0 truncate font-medium text-text" title={o.page}>
                  {o.page}
                  {o.baseline && (
                    <span className="ml-2 font-normal text-text-muted">
                      {formatRPV(o.rpv)} vs {o.baseline.label} {formatRPV(o.baseline.value)}
                    </span>
                  )}
                </span>
                <span className="whitespace-nowrap font-bold text-purple">
                  +{formatCompact(o.gain)}/period
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Rows */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-text-muted">
              <th className="pb-2 pr-3 font-semibold w-[30%]">Page</th>
              <th className="pb-2 pr-3 font-semibold w-[15%]">Type</th>
              <th className="pb-2 pr-3 font-semibold w-[13%]">Sessions</th>
              <th className="pb-2 pr-3 font-semibold w-[15%]">Revenue</th>
              <th className="pb-2 pr-3 font-semibold w-[9%]">RPV</th>
              <th className="pb-2 font-semibold w-[18%]">
                <span className="sr-only">Relative RPV</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, i) => {
              const rpv = row.sessions > 0 && row.revenue !== null ? row.revenue / row.sessions : null;
              const barPct = rpv !== null && maxRpv > 0 ? Math.min(100, (rpv / maxRpv) * 100) : 0;
              const baseline = baselineFor(row);
              const belowBaseline = baseline !== null && rpv !== null && rpv < baseline.value;
              const detected = detectPageType(row.page);
              return (
                <tr key={i} className="border-t border-ink/5">
                  <td className="py-1.5 pr-3">
                    <input
                      value={row.page}
                      onChange={(e) => updateRow(i, { page: e.target.value })}
                      placeholder="/collections/best-sellers"
                      aria-label={`Page ${i + 1} path`}
                      className={cellInput}
                    />
                  </td>
                  <td className="py-1.5 pr-3">
                    <select
                      value={row.typeOverride ?? detected}
                      onChange={(e) =>
                        updateRow(i, {
                          typeOverride:
                            (e.target.value as PageType) === detected ? undefined : (e.target.value as PageType),
                        })
                      }
                      aria-label={`Page ${i + 1} type`}
                      className={`${cellInput} cursor-pointer pr-7 ${row.typeOverride ? '' : 'text-text-muted'}`}
                    >
                      {PAGE_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-1.5 pr-3">
                    <input
                      type="number"
                      inputMode="numeric"
                      min={0}
                      value={row.sessions || ''}
                      onChange={(e) => updateRow(i, { sessions: parseFloat(e.target.value) || 0 })}
                      placeholder="12,000"
                      aria-label={`Page ${i + 1} sessions`}
                      className={cellInput}
                    />
                  </td>
                  <td className="py-1.5 pr-3">
                    <input
                      type="number"
                      inputMode="decimal"
                      min={0}
                      value={row.revenue ?? ''}
                      onChange={(e) =>
                        updateRow(i, { revenue: e.target.value === '' ? null : parseFloat(e.target.value) || 0 })
                      }
                      placeholder="9,500"
                      aria-label={`Page ${i + 1} revenue`}
                      className={cellInput}
                    />
                  </td>
                  <td className={`py-1.5 pr-3 font-semibold tabular-nums ${belowBaseline ? 'text-accent-warm' : 'text-text'}`}>
                    {rpv !== null ? formatRPV(rpv) : '—'}
                  </td>
                  <td className="py-1.5">
                    {rpv !== null && (
                      <div className="h-2 w-full rounded-full bg-cream-2">
                        <div
                          className={`h-2 rounded-full ${belowBaseline ? 'bg-accent-warm/70' : 'bg-purple/70'}`}
                          style={{ width: `${barPct}%` }}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {rows.length > COLLAPSED_COUNT && (
        <button
          onClick={() => setShowAll((s) => !s)}
          className="mt-3 text-sm font-semibold text-purple underline-offset-2 hover:underline"
        >
          {showAll ? 'Show fewer pages' : `Show all ${rows.length} pages`}
        </button>
      )}

      {validRows.length > 0 && (
        <p className="mt-4 text-xs text-text-muted">
          Types are detected from the URL; use the dropdown when a page is really something else
          (a /pages/ URL acting as a PDP, say). Orange rows sit below the average for their page
          type{siteRpv ? ' (or your site average when a type has only one page)' : ''}. High-traffic
          pages below their line are usually where testing pays back fastest.
        </p>
      )}
    </div>
  );
}
