'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { parseGa4Csv } from './parseGa4Csv';
import { PAGE_TYPES, type PageType, detectPageType } from './pageType';
import { formatRPV, formatCurrency } from './format';

interface PageRpvProps {
  active: boolean;
  onTotalsChange: (data: { sessions: number; revenue: number; example: boolean }) => void;
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
const EXAMPLE_ROWS: Row[] = [
  { page: '/collections/best-sellers', sessions: 12000, revenue: 30000 },
  { page: '/collections/new-arrivals', sessions: 9000, revenue: 9000 },
  { page: '/collections/accessories', sessions: 4000, revenue: 6000 },
  { page: '/products/weekender-bag', sessions: 6000, revenue: 18000 },
  { page: '/products/everyday-tote', sessions: 8000, revenue: 12000 },
  { page: '/products/travel-pouch', sessions: 180, revenue: 90 },
  { page: '/', sessions: 15000, revenue: 33000 },
];

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

export default function PageRpv({ active, onTotalsChange, pendingImport, onPendingConsumed }: PageRpvProps) {
  const [rows, setRows] = useState<Row[]>([{ ...EMPTY_ROW }, { ...EMPTY_ROW }, { ...EMPTY_ROW }]);
  const [isExample, setIsExample] = useState(false);
  const savedRows = useRef<Row[] | null>(null);
  const [importNote, setImportNote] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const validRows = useMemo(
    () => rows.filter((r) => r.page.trim() !== '' && r.sessions > 0 && r.revenue !== null),
    [rows]
  );

  const totalSessions = validRows.reduce((sum, row) => sum + row.sessions, 0);
  const totalRevenue = validRows.reduce((sum, row) => sum + (row.revenue ?? 0), 0);
  useEffect(() => {
    onTotalsChange({ sessions: totalSessions, revenue: totalRevenue, example: isExample });
  }, [totalSessions, totalRevenue, isExample, onTotalsChange]);

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

  // Only compare pages within their type; singleton types have no baseline.
  const baselineFor = (r: Row): { value: number; label: string } | null => {
    const t = rowType(r);
    const g = typeAverages.get(t);
    if (g && g.count >= 2) return { value: g.rpv, label: `your ${t.toLowerCase()} average` };
    return null;
  };

  const opportunities = useMemo(() => {
    return validRows
      .map((r) => {
        const rpv = (r.revenue ?? 0) / r.sessions;
        const baseline = baselineFor(r);
        const gain = baseline && rpv < baseline.value ? (baseline.value - rpv) * r.sessions : 0;
        return { ...r, rpv, gain, baseline };
      })
      .filter((r) => r.gain > 0)
      .sort((a, b) => b.gain - a.gain);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validRows, typeAverages]);

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
      for (const r of (isExample ? [] : rows)) {
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

    setIsExample(false);
    savedRows.current = null;
    setRows(merged.length > 0 ? merged : [{ ...EMPTY_ROW }]);
    setShowAll(false);

    const missingRevenue = merged.filter((r) => r.sessions > 0 && r.revenue === null).length;
    const missingSessions = merged.filter((r) => r.sessions === 0 && r.revenue !== null).length;

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
      // Consume clipboard data passed across the tab boundary once.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      importText(pendingImport, 'paste');
      onPendingConsumed?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingImport]);

  // Copy rows in GA4 or Shopify, click this tab, hit paste. No download step at all.
  useEffect(() => {
    if (!active) return;
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
  }, [rows, active, isExample]);

  const updateRow = (i: number, patch: Partial<Row>) => {
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  };

  const visibleRows = showAll ? rows : rows.slice(0, COLLAPSED_COUNT);


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
        className={`border-b pb-5 text-left transition-colors ${
          dragOver ? 'border-purple bg-purple-soft/50' : 'border-ink/10'
        }`}
      >
        <p className="text-sm font-semibold text-text">
          Find the pages worth investigating first
        </p>
        <p className="mt-1 text-sm text-text-muted">
          Paste landing-page rows from GA4 or Shopify, drop a CSV, or enter them below.
          Use the same full month and currency for every row. Your data stays in your browser.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-cream hover:bg-ink-2 transition-colors"
          >
            Import CSV
          </button>
          <button
            onClick={() => setRows((prev) => [...prev, { ...EMPTY_ROW }])}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-text-muted hover:bg-ink/5 transition-colors"
          >
            Add a row
          </button>
          <button className="rounded-lg px-4 py-2.5 text-sm font-medium text-text-muted underline underline-offset-4 hover:text-text" onClick={() => {
            if (isExample) { setRows(savedRows.current ?? [{ ...EMPTY_ROW }, { ...EMPTY_ROW }, { ...EMPTY_ROW }]); savedRows.current = null; setIsExample(false); }
            else { savedRows.current = rows; setRows(EXAMPLE_ROWS.map(row => ({ ...row }))); setIsExample(true); }
            setImportNote(null); setImportError(null); setShowAll(false);
          }}>{isExample ? 'Return to your data' : 'Try example data'}</button>
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
        <div className="mt-3 grid gap-2 text-left text-sm text-text-muted">
          <details>
            <summary className="cursor-pointer font-medium text-text hover:text-purple transition-colors">
              Get it from GA4
            </summary>
            <ol className="mt-3 list-decimal space-y-1 pl-5">
              <li>Go to Reports → Engagement → Landing page. Use landing-page data, not Pages and screens.</li>
              <li>Set your date range (a full month is ideal) and make sure Sessions and Total revenue are shown as columns. If Total revenue is missing, click the pencil (Customize report) and add it as a metric.</li>
              <li>Fastest: select the rows in the table, copy, then paste here with Cmd+V. Or click Share (top right) → Download file → CSV and drop the file here.</li>
            </ol>
          </details>
          <details>
            <summary className="cursor-pointer font-medium text-text hover:text-purple transition-colors">
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

      {isExample && <p className="mt-4 border-l-2 border-purple pl-3 text-sm text-text-muted" role="status">Example data for a fictional accessories store. Your own rows are saved while you explore.</p>}

      {opportunities.length > 0 && (
        <section className="relative mt-6 border-b border-ink/10 pb-6" aria-label="Ranked revenue opportunities">
          <div aria-hidden="true" className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-purple to-[#c4b5fd]" />
          <p className="text-sm font-medium text-text-muted">Largest estimated monthly opportunity</p>
          <p className="mt-1 text-4xl font-black tracking-tight text-purple sm:text-5xl">+{formatCurrency(opportunities[0].gain)}</p>
          <p className="mt-2 break-all font-semibold text-text">{opportunities[0].page}</p>
          <p className="mt-2 text-xs text-text-muted">Your averages use only the pages entered here: combined revenue ÷ combined sessions for each page type. They are not external benchmarks.</p>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">If this page reached your {rowType(opportunities[0]).toLowerCase()}-page average at the same traffic. This is an investigation priority, not a forecast: intent, product prices and traffic sources can explain the gap.</p>
          <ol className="mt-5 divide-y divide-ink/10 sm:hidden">
            {opportunities.map((row, index) => (
              <li key={`${row.page}-${index}`} className={`py-4 ${index === 0 ? 'border-l-2 border-purple bg-purple/5 pl-3' : ''}`}>
                <p className="break-all text-sm font-medium">{index + 1}. {row.page}</p>
                <p className="mt-1 text-xs text-text-muted">{rowType(row)} · {row.sessions.toLocaleString()} sessions{row.sessions < 500 ? ' · Low data' : ''}</p>
                <p className="mt-2 text-sm text-text-muted">{formatRPV(row.rpv)} RPV · {formatRPV(row.baseline!.value)} your {rowType(row).toLowerCase()}-page average</p>
                <p className="mt-2 text-sm font-semibold">+{formatCurrency(row.gain)} / month</p>
              </li>
            ))}
          </ol>
          <div className="mt-5 hidden overflow-x-auto sm:block" tabIndex={0} role="region" aria-label="Revenue opportunities table">
            <table className="w-full min-w-[650px] text-left text-sm">
              <caption className="sr-only">Pages ranked by estimated additional monthly revenue</caption>
              <thead className="border-b border-ink/10 text-xs text-text-muted"><tr><th className="py-3 pr-4">Page</th><th className="pr-4">Current RPV</th><th className="pr-4">Your page-type average</th><th className="text-right">Opportunity / month</th></tr></thead>
              <tbody>{opportunities.map((row, index) => <tr key={`${row.page}-${index}`} className={`border-b border-ink/5 ${index === 0 ? 'bg-purple/5' : ''}`}>
                <td className="py-3 pr-4"><span className="mr-3 text-text-muted">{index + 1}.</span>{row.page}<span className="mt-1 block text-xs text-text-muted">{rowType(row)} · {row.sessions.toLocaleString()} sessions{row.sessions < 500 ? ' · Low data: under 500 sessions' : ''}</span></td>
                <td className="pr-4 tabular-nums">{formatRPV(row.rpv)}</td><td className="pr-4 tabular-nums">{formatRPV(row.baseline!.value)}<span className="mt-1 block text-xs text-text-muted">Your {rowType(row).toLowerCase()}-page average</span></td><td className="text-right font-semibold tabular-nums">+{formatCurrency(row.gain)}</td>
              </tr>)}</tbody>
            </table>
          </div>
          <details className="mt-3 text-xs text-text-muted"><summary className="cursor-pointer">How these estimates work</summary><p className="mt-2">Opportunity = sessions × (page-type average RPV − page RPV), with negative gaps treated as zero. The average is total revenue divided by total sessions for all entered pages of that type, including this page. At least two pages of a type are required. Under 500 sessions is a review cue, not a statistical confidence threshold.</p></details>
        </section>
      )}
      {validRows.length > 0 && opportunities.length === 0 && <p className="mt-5 text-sm text-text-muted">No gaps to rank yet. Add at least two pages of the same type with different RPVs to compare them.</p>}
      {validRows.some(row => !baselineFor(row)) && <p className="mt-3 text-xs text-text-muted">Pages without another page of the same type are excluded from the ranking. Add comparable pages to assess them.</p>}

      <h3 className="mt-6 font-semibold text-text">Your page data</h3>
      <p className="mt-1 text-xs text-text-muted">Edit your inputs here. The opportunity ranking above updates automatically.</p>
      <p className="mt-2 text-xs text-text-muted sm:hidden">Swipe the input table sideways to edit all columns.</p>
      {/* Rows */}
      <div className="mt-6 overflow-x-auto" tabIndex={0} role="region" aria-label="Editable page data">
        <table className="w-full min-w-[700px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-text-muted">
              <th className="pb-2 pr-3 font-semibold w-[30%]">Page</th>
              <th className="pb-2 pr-3 font-semibold w-[15%]">Type</th>
              <th className="pb-2 pr-3 font-semibold w-[13%]">Sessions</th>
              <th className="pb-2 pr-3 font-semibold w-[15%]">Revenue</th>
              <th className="pb-2 pr-3 font-semibold w-[9%]">RPV</th>
              <th className="pb-2 font-semibold w-[18%]">
                Your page-type average
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, i) => {
              const rpv = row.sessions > 0 && row.revenue !== null ? row.revenue / row.sessions : null;
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
                      onChange={(e) => updateRow(i, { sessions: Math.max(0, parseFloat(e.target.value) || 0) })}
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
                        updateRow(i, { revenue: e.target.value === '' ? null : Math.max(0, parseFloat(e.target.value) || 0) })
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
                    {row.page.trim() && baseline ? formatRPV(baseline.value) : '—'}
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
          Types are detected from the URL; correct them with the dropdown if needed.
          Use landing-page reports so each session is attributed to its entry page.
          The forecast below uses the totals of your complete rows, which may cover only part of your site.
        </p>
      )}
    </div>
  );
}
