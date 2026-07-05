'use client';

import { useMemo, useRef, useState } from 'react';
import { parseGa4Csv, type PageRow } from './parseGa4Csv';
import { formatRPV, formatCompact } from './format';

interface PageRpvProps {
  /** Site-wide RPV from the Whole site tab; used as the comparison baseline when present. */
  siteRpv: number | null;
}

const EMPTY_ROW: PageRow = { page: '', sessions: 0, revenue: 0 };
const COLLAPSED_COUNT = 12;

const cellInput =
  'w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm font-medium text-text placeholder:text-text-muted/50 focus:outline-none focus:border-purple focus:ring-2 focus:ring-purple/10 transition-colors';

export default function PageRpv({ siteRpv }: PageRpvProps) {
  const [rows, setRows] = useState<PageRow[]>([{ ...EMPTY_ROW }, { ...EMPTY_ROW }, { ...EMPTY_ROW }]);
  const [importNote, setImportNote] = useState<string | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const validRows = useMemo(
    () => rows.filter((r) => r.sessions > 0 && r.revenue >= 0 && r.page.trim() !== ''),
    [rows]
  );

  // Baseline for the opportunity math: site RPV when the Whole site tab is
  // filled in, otherwise the sessions-weighted average of the rows themselves.
  const baseline = useMemo(() => {
    if (siteRpv && siteRpv > 0) return siteRpv;
    const totalSessions = validRows.reduce((s, r) => s + r.sessions, 0);
    const totalRevenue = validRows.reduce((s, r) => s + r.revenue, 0);
    return totalSessions > 0 ? totalRevenue / totalSessions : 0;
  }, [siteRpv, validRows]);

  const maxRpv = useMemo(
    () => Math.max(baseline, ...validRows.map((r) => (r.sessions > 0 ? r.revenue / r.sessions : 0))),
    [validRows, baseline]
  );

  const opportunities = useMemo(() => {
    return validRows
      .map((r) => {
        const rpv = r.revenue / r.sessions;
        const gain = rpv < baseline ? (baseline - rpv) * r.sessions : 0;
        return { ...r, rpv, gain };
      })
      .filter((r) => r.gain > 0)
      .sort((a, b) => b.gain - a.gain)
      .slice(0, 3);
  }, [validRows, baseline]);

  const handleFile = (file: File) => {
    setImportError(null);
    setImportNote(null);
    const reader = new FileReader();
    reader.onload = () => {
      const result = parseGa4Csv(String(reader.result ?? ''));
      if ('error' in result) {
        setImportError(result.error);
        return;
      }
      setRows(result.rows);
      setShowAll(false);
      setImportNote(
        `Imported ${result.rows.length} pages (${result.sessionsColumn} + ${result.revenueColumn})` +
          (result.skipped > 0 ? `, skipped ${result.skipped} rows without usable numbers` : '') +
          '. Everything stays in your browser.'
      );
    };
    reader.onerror = () => setImportError('Could not read that file. Try re-downloading the CSV from GA4.');
    reader.readAsText(file);
  };

  const updateRow = (i: number, patch: Partial<PageRow>) => {
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
        className={`rounded-2xl border-2 border-dashed p-5 sm:p-6 text-center transition-colors ${
          dragOver ? 'border-purple bg-purple-soft/50' : 'border-ink/15 bg-cream-2/50'
        }`}
      >
        <p className="text-sm font-semibold text-text">
          Compare revenue per visitor across your landing pages
        </p>
        <p className="mt-1 text-sm text-text-muted">
          Drop a GA4 landing-page CSV here, or fill in the rows by hand. Nothing is uploaded; the file is read in your browser.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => fileRef.current?.click()}
            className="rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-cream hover:bg-ink-2 transition-colors"
          >
            Import GA4 CSV
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
          aria-label="Import GA4 CSV file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = '';
          }}
        />
        <details className="mt-4 text-left text-sm text-text-muted max-w-xl mx-auto">
          <summary className="cursor-pointer font-medium text-text hover:text-purple transition-colors text-center">
            How to export this from GA4
          </summary>
          <ol className="mt-3 list-decimal space-y-1 pl-5">
            <li>In GA4 go to Reports → Engagement → Landing page (or Pages and screens).</li>
            <li>Set your date range (a full month is ideal) and make sure Sessions and Total revenue are shown as columns.</li>
            <li>Click Share (top right) → Download file → CSV, then drop it here.</li>
          </ol>
        </details>
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

      {/* Opportunity summary */}
      {opportunities.length > 0 && baseline > 0 && (
        <div className="mt-6 rounded-2xl bg-purple-soft/60 border border-purple/20 p-5">
          <h3 className="text-sm font-semibold text-text">
            Biggest opportunities
            <span className="ml-2 font-normal text-text-muted">
              if each page reached {siteRpv ? 'your site average' : 'the average of these pages'} ({formatRPV(baseline)})
            </span>
          </h3>
          <ul className="mt-3 space-y-2">
            {opportunities.map((o) => (
              <li key={o.page} className="flex items-baseline justify-between gap-4 text-sm">
                <span className="truncate font-medium text-text" title={o.page}>
                  {o.page}
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
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-text-muted">
              <th className="pb-2 pr-3 font-semibold w-[38%]">Page</th>
              <th className="pb-2 pr-3 font-semibold w-[16%]">Sessions</th>
              <th className="pb-2 pr-3 font-semibold w-[18%]">Revenue</th>
              <th className="pb-2 pr-3 font-semibold w-[10%]">RPV</th>
              <th className="pb-2 font-semibold w-[18%]">
                <span className="sr-only">Relative RPV</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, i) => {
              const rpv = row.sessions > 0 ? row.revenue / row.sessions : 0;
              const barPct = maxRpv > 0 ? Math.min(100, (rpv / maxRpv) * 100) : 0;
              const belowBaseline = baseline > 0 && rpv > 0 && rpv < baseline;
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
                      value={row.revenue || ''}
                      onChange={(e) => updateRow(i, { revenue: parseFloat(e.target.value) || 0 })}
                      placeholder="9,500"
                      aria-label={`Page ${i + 1} revenue`}
                      className={cellInput}
                    />
                  </td>
                  <td className={`py-1.5 pr-3 font-semibold tabular-nums ${belowBaseline ? 'text-accent-warm' : 'text-text'}`}>
                    {rpv > 0 ? formatRPV(rpv) : '—'}
                  </td>
                  <td className="py-1.5">
                    {rpv > 0 && (
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

      {baseline > 0 && validRows.length > 0 && (
        <p className="mt-4 text-xs text-text-muted">
          Orange rows sit below {siteRpv ? 'your site-average RPV' : 'the weighted average of these pages'} of {formatRPV(baseline)}.
          High-traffic pages below the line are usually where testing pays back fastest.
        </p>
      )}
    </div>
  );
}
