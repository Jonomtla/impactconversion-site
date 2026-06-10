"use client";

import { useMemo, useState } from "react";

// ---- normal inverse CDF (Acklam) ----
function normInv(p: number): number {
  const a = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924];
  const b = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857];
  const c = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878];
  const d = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742];
  const pl = 0.02425, ph = 1 - pl;
  let q: number, r: number;
  if (p < pl) {
    q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p <= ph) {
    q = p - 0.5;
    r = q * q;
    return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
  }
  q = Math.sqrt(-2 * Math.log(1 - p));
  return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
}

// ---- normal CDF (Abramowitz & Stegun) ----
function normCdf(z: number): number {
  const t = 1 / (1 + (0.3275911 * Math.abs(z)) / Math.SQRT2);
  const e = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-(z * z) / 2);
  return z >= 0 ? 0.5 * (1 + e) : 0.5 * (1 - e);
}

type Mode = "pre" | "cvr" | "rpv";

type State = {
  weekly: number;
  nvar: number;
  sig: string;
  pow: string;
  tails: string;
  sidak: boolean;
  // pre
  ordersWeek: number;
  weeks: number;
  expectedLift: number;
  // live: how long the test has been running
  testDays: number;
  // live cvr
  cN: number;
  cO: number;
  vN: number;
  vO: number;
  // live rpv
  cN_r: number;
  cRpv: number;
  cCv: number;
  vN_r: number;
  vRpv: number;
  vCv: number;
};

const DEFAULTS: State = {
  weekly: 8000, nvar: 2, sig: "0.95", pow: "0.80", tails: "2", sidak: false,
  ordersWeek: 256, weeks: 4, expectedLift: 10,
  testDays: 14,
  cN: 4000, cO: 128, vN: 4000, vO: 141,
  cN_r: 4000, cRpv: 8.82, cCv: 7.8, vN_r: 4000, vRpv: 9.70, vCv: 7.8,
};

const MDES = [2, 3, 5, 7, 10, 15, 20, 25, 30, 40, 50];
const WEEKS = 6;
const MAX_MDE = 5;

const fmt = (n: number) => (isFinite(n) ? Math.round(n).toLocaleString() : "∞");
const money = (n: number) => "$" + (n >= 1000 ? Math.round(n).toLocaleString() : n.toFixed(2));
const pct = (n: number, d = 2) => (n * 100).toFixed(d) + "%";

function Info({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <span className="group/info relative ml-1.5 inline-flex h-[15px] w-[15px] cursor-help items-center justify-center rounded-full border border-purple-2 bg-purple-soft align-middle text-[10px] font-bold not-italic text-purple outline-none focus:outline-2 focus:outline-purple" tabIndex={0} aria-label={label}>
      i
      <span className="pointer-events-none invisible absolute bottom-[150%] left-1/2 z-30 w-[225px] -translate-x-1/2 translate-y-[5px] rounded-[10px] bg-ink p-[10px_12px] text-[11.5px] font-normal not-italic leading-[1.5] text-cream opacity-0 shadow-[0_8px_24px_rgba(20,23,42,0.28)] transition-all duration-150 group-hover/info:visible group-hover/info:translate-y-0 group-hover/info:opacity-100 group-focus/info:visible group-focus/info:translate-y-0 group-focus/info:opacity-100">
        {children}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-[6px] border-transparent border-t-ink" />
      </span>
    </span>
  );
}

const inputCls = "w-full rounded-lg border border-ink/15 bg-cream px-3 py-2 text-sm focus:border-transparent focus:bg-white focus:outline-2 focus:outline-purple";
const labelCls = "block text-[12.5px] font-semibold text-ink-2 mb-1.5";
const hintCls = "font-normal text-text-muted";

export default function ABCalculator() {
  const [mode, setMode] = useState<Mode>("pre");
  const [s, setS] = useState<State>(DEFAULTS);
  const set = <K extends keyof State>(k: K, v: State[K]) => setS((p) => ({ ...p, [k]: v }));

  const zValues = useMemo(() => {
    let alpha = 1 - parseFloat(s.sig);
    const tails = parseInt(s.tails);
    if (s.sidak) {
      const k = Math.max(1, s.nvar - 1);
      alpha = 1 - Math.pow(1 - alpha, 1 / k);
    }
    return { za: normInv(1 - alpha / tails), zb: normInv(parseFloat(s.pow)) };
  }, [s.sig, s.pow, s.tails, s.sidak, s.nvar]);

  const baselineCvr = useMemo(
    () => Math.min(0.99, Math.max(0.0001, s.ordersWeek / Math.max(1, s.weekly))),
    [s.ordersWeek, s.weekly]
  );

  function reqN(mde: number): number {
    const { za, zb } = zValues;
    if (mode === "rpv") {
      const cv = (s.cCv + s.vCv) / 2;
      return (Math.pow(za + zb, 2) * 2 * cv * cv) / (mde * mde);
    }
    const p1 = mode === "cvr" ? s.cO / Math.max(1, s.cN) : baselineCvr;
    const p2 = p1 * (1 + mde);
    if (p2 >= 1) return Infinity;
    const pbar = (p1 + p2) / 2;
    const numr = za * Math.sqrt(2 * pbar * (1 - pbar)) + zb * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2));
    return (numr * numr) / Math.pow(p2 - p1, 2);
  }

  // Per-arm sample collected so far (live modes), and the run rate derived from it.
  const livePerArm = mode === "cvr" ? (s.cN + s.vN) / 2 : mode === "rpv" ? (s.cN_r + s.vN_r) / 2 : 0;
  const nowWeek = Math.max(0.05, s.testDays / 7);
  const liveRatePerWeek = livePerArm / nowWeek; // per-arm visitors/sessions per week, at the observed pace

  // Projected per-arm sample by week w (weeks from test start).
  const availAtWeek = (w: number) =>
    mode === "pre" ? (s.weekly * w) / Math.max(1, s.nvar) : liveRatePerWeek * w;

  function minMde(nPerVar: number): number {
    if (mode === "rpv") {
      const { za, zb } = zValues;
      const cv = (s.cCv + s.vCv) / 2;
      return Math.sqrt((Math.pow(za + zb, 2) * 2 * cv * cv) / nPerVar);
    }
    if (reqN(MAX_MDE) > nPerVar) return Infinity;
    let lo = 0.0005, hi = MAX_MDE;
    for (let i = 0; i < 60; i++) {
      const m = (lo + hi) / 2;
      if (reqN(m) > nPerVar) lo = m;
      else hi = m;
    }
    return (lo + hi) / 2;
  }

  function p2bbAt(nPerVar: number, liftFrac: number): number {
    if (nPerVar < 2) return 0.5;
    let z: number;
    if (mode === "rpv") {
      const cv = (s.cCv + s.vCv) / 2;
      z = (liftFrac * Math.sqrt(nPerVar)) / (cv * Math.SQRT2);
    } else {
      const p1 = mode === "cvr" ? s.cO / Math.max(1, s.cN) : baselineCvr;
      const p2 = Math.min(0.999, p1 * (1 + liftFrac));
      z = (p2 - p1) / Math.sqrt((p1 * (1 - p1)) / nPerVar + (p2 * (1 - p2)) / nPerVar);
    }
    return normCdf(z);
  }

  const live = useMemo(() => {
    if (mode === "cvr") {
      const p1 = s.cO / Math.max(1, s.cN);
      const p2 = s.vO / Math.max(1, s.vN);
      const se = Math.sqrt((p1 * (1 - p1)) / Math.max(1, s.cN) + (p2 * (1 - p2)) / Math.max(1, s.vN));
      const z = se > 0 ? (p2 - p1) / se : 0;
      return { c: p1, v: p2, lift: p1 > 0 ? (p2 - p1) / p1 : 0, p2bb: normCdf(z), perArmN: (s.cN + s.vN) / 2 };
    }
    if (mode === "rpv") {
      const se = Math.sqrt(
        (s.cCv * s.cCv * s.cRpv * s.cRpv) / Math.max(1, s.cN_r) +
          (s.vCv * s.vCv * s.vRpv * s.vRpv) / Math.max(1, s.vN_r)
      );
      const z = se > 0 ? (s.vRpv - s.cRpv) / se : 0;
      return { c: s.cRpv, v: s.vRpv, lift: s.cRpv > 0 ? (s.vRpv - s.cRpv) / s.cRpv : 0, p2bb: normCdf(z), perArmN: (s.cN_r + s.vN_r) / 2 };
    }
    return null;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, s.cN, s.cO, s.vN, s.vO, s.cN_r, s.cRpv, s.cCv, s.vN_r, s.vRpv, s.vCv]);

  // Week-from-start at which projected p2bb first crosses a threshold, at the observed pace.
  function crossWeekAt(thr: number, liftFrac: number): number | null {
    if (liftFrac <= 0) return null;
    for (let w = 0.05; w <= 52; w += 0.05) {
      if (p2bbAt(availAtWeek(w), liftFrac) >= thr) return w;
    }
    return null;
  }
  // Additional days from now until a crossing week.
  const daysFromNow = (crossW: number | null) => (crossW == null ? null : Math.max(0, (crossW - nowWeek) * 7));

  // ---- inputs UI per mode ----
  function PreInputs() {
    return (
      <>
        <div className="border-b border-dashed border-ink/15 pb-3.5 mb-3.5">
          <h4 className="m-0 mb-2.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Surface</h4>
          <div className="mb-3">
            <label className={labelCls} htmlFor="weekly">Weekly visitors <span className={hintCls}>(total across all variations)</span></label>
            <input id="weekly" type="number" min={1} step={100} value={s.weekly} onChange={(e) => set("weekly", Number(e.target.value) || 0)} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-2.5 mb-2">
            <div>
              <label className={labelCls} htmlFor="ordersWeek">Orders / week <span className={hintCls}>(all variations)</span></label>
              <input id="ordersWeek" type="number" min={0} step={10} value={s.ordersWeek} onChange={(e) => set("ordersWeek", Number(e.target.value) || 0)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls} htmlFor="nvar">Variations <span className={hintCls}>(incl. control)</span></label>
              <input id="nvar" type="number" min={2} max={10} step={1} value={s.nvar} onChange={(e) => set("nvar", Math.max(2, Math.min(10, Number(e.target.value) || 2)))} className={inputCls} />
            </div>
          </div>
          <p className="text-[11.5px] text-text-muted">Implied baseline conversion: <b>{pct(baselineCvr, 2)}</b> at {fmt(s.weekly)} visitors/week.</p>
        </div>
        <div className="border-b border-dashed border-ink/15 pb-3.5 mb-3.5">
          <h4 className="m-0 mb-2.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Plan</h4>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className={labelCls} htmlFor="weeks">Planned length <span className={hintCls}>(weeks)</span></label>
              <input id="weeks" type="number" min={1} max={12} step={1} value={s.weeks} onChange={(e) => set("weeks", Math.max(1, Math.min(12, Number(e.target.value) || 1)))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls} htmlFor="target">Expected lift <span className={hintCls}>(%)</span>
                <Info label="What is expected lift?"><b>The relative improvement</b> you think this test will produce. Smaller lifts need far more traffic.</Info>
              </label>
              <input id="target" type="number" min={0.1} step={0.5} value={s.expectedLift} onChange={(e) => set("expectedLift", Number(e.target.value) || 0)} className={inputCls} />
            </div>
          </div>
        </div>
        <CommonStats />
      </>
    );
  }

  function CvrInputs() {
    return (
      <>
        <div className="border-b border-dashed border-ink/15 pb-3.5 mb-3.5">
          <h4 className="m-0 mb-2.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Control</h4>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className={labelCls} htmlFor="cN">Visitors</label>
              <input id="cN" type="number" min={1} step={10} value={s.cN} onChange={(e) => set("cN", Number(e.target.value) || 0)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls} htmlFor="cO">Orders</label>
              <input id="cO" type="number" min={0} step={1} value={s.cO} onChange={(e) => set("cO", Number(e.target.value) || 0)} className={inputCls} />
            </div>
          </div>
        </div>
        <div className="border-b border-dashed border-ink/15 pb-3.5 mb-3.5">
          <h4 className="m-0 mb-2.5 text-xs font-semibold uppercase tracking-wider text-purple">Variant</h4>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className={labelCls} htmlFor="vN">Visitors</label>
              <input id="vN" type="number" min={1} step={10} value={s.vN} onChange={(e) => set("vN", Number(e.target.value) || 0)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls} htmlFor="vO">Orders</label>
              <input id="vO" type="number" min={0} step={1} value={s.vO} onChange={(e) => set("vO", Number(e.target.value) || 0)} className={inputCls} />
            </div>
          </div>
        </div>
        <TestSetup />
        <CommonStats />
      </>
    );
  }

  function RpvInputs() {
    return (
      <>
        <div className="border-b border-dashed border-ink/15 pb-3.5 mb-3.5">
          <h4 className="m-0 mb-2.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Control</h4>
          <div className="grid grid-cols-2 gap-2.5 mb-3">
            <div>
              <label className={labelCls} htmlFor="cN_r">Visitors</label>
              <input id="cN_r" type="number" min={1} step={10} value={s.cN_r} onChange={(e) => set("cN_r", Number(e.target.value) || 0)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls} htmlFor="cRpv">RPV ($)</label>
              <input id="cRpv" type="number" min={0} step={0.01} value={s.cRpv} onChange={(e) => set("cRpv", Number(e.target.value) || 0)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls} htmlFor="cCv">CV <span className={hintCls}>of revenue/session</span>
              <Info label="What is CV?"><b>CV = std-dev ÷ mean</b> of revenue per session. Back it out of any running test: <code className="rounded bg-cream-2 px-1 text-[10px]">SE × √n ÷ mean</code> using the confidence interval your tool reports.</Info>
            </label>
            <input id="cCv" type="number" min={0.1} step={0.1} value={s.cCv} onChange={(e) => set("cCv", Number(e.target.value) || 0)} className={inputCls} />
          </div>
        </div>
        <div className="border-b border-dashed border-ink/15 pb-3.5 mb-3.5">
          <h4 className="m-0 mb-2.5 text-xs font-semibold uppercase tracking-wider text-purple">Variant</h4>
          <div className="grid grid-cols-2 gap-2.5 mb-3">
            <div>
              <label className={labelCls} htmlFor="vN_r">Visitors</label>
              <input id="vN_r" type="number" min={1} step={10} value={s.vN_r} onChange={(e) => set("vN_r", Number(e.target.value) || 0)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls} htmlFor="vRpv">RPV ($)</label>
              <input id="vRpv" type="number" min={0} step={0.01} value={s.vRpv} onChange={(e) => set("vRpv", Number(e.target.value) || 0)} className={inputCls} />
            </div>
          </div>
          <div className="mb-3">
            <label className={labelCls} htmlFor="vCv">CV</label>
            <input id="vCv" type="number" min={0.1} step={0.1} value={s.vCv} onChange={(e) => set("vCv", Number(e.target.value) || 0)} className={inputCls} />
          </div>
          <button
            type="button"
            onClick={() => setS((p) => ({ ...p, cN_r: 8293, cRpv: 8.82, cCv: 7.8, vN_r: 8338, vRpv: 10.02, vCv: 7.8, weekly: 8000 }))}
            className="mt-1 w-full rounded-lg border border-purple-2 bg-purple-soft px-3 py-2 text-[12.5px] font-semibold text-ink-2 hover:bg-[#e3daff]"
          >
            Load example: high-AOV PDP test snapshot
          </button>
        </div>
        <TestSetup />
        <CommonStats />
      </>
    );
  }

  function TestSetup() {
    return (
      <div className="border-b border-dashed border-ink/15 pb-3.5 mb-3.5">
        <h4 className="m-0 mb-2.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Test setup</h4>
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className={labelCls} htmlFor="testDays">Days running
              <Info label="Why days running?">How long the test has been live. Combined with the visitor counts above, this gives your real run rate, then projects the days still needed to reach each threshold.</Info>
            </label>
            <input id="testDays" type="number" min={1} step={1} value={s.testDays} onChange={(e) => set("testDays", Math.max(1, Number(e.target.value) || 1))} className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="nvarP">Variations <span className={hintCls}>(incl. control)</span></label>
            <input id="nvarP" type="number" min={2} max={10} step={1} value={s.nvar} onChange={(e) => set("nvar", Math.max(2, Math.min(10, Number(e.target.value) || 2)))} className={inputCls} />
          </div>
        </div>
      </div>
    );
  }

  function CommonStats() {
    return (
      <div>
        <h4 className="m-0 mb-2.5 text-xs font-semibold uppercase tracking-wider text-text-muted">Stats</h4>
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          <div>
            <label className={labelCls} htmlFor="sig">Significance
              <Info label="What is significance?"><b>How sure you want to be</b> the result isn&rsquo;t a fluke. 95% means a 5% chance of a false positive.</Info>
            </label>
            <select id="sig" value={s.sig} onChange={(e) => set("sig", e.target.value)} className={inputCls}>
              {["0.80", "0.85", "0.90", "0.95", "0.99"].map((v) => (
                <option key={v} value={v}>{Math.round(+v * 100)}%</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="pow">Power
              <Info label="What is power?"><b>The chance of catching a real effect</b> if one truly exists. 80% means you&rsquo;d miss a genuine winner 1 time in 5.</Info>
            </label>
            <select id="pow" value={s.pow} onChange={(e) => set("pow", e.target.value)} className={inputCls}>
              {["0.70", "0.80", "0.90", "0.95"].map((v) => (
                <option key={v} value={v}>{Math.round(+v * 100)}%</option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className={labelCls} htmlFor="tails">Tails
              <Info label="What are tails?"><b>Two-sided</b> tests for better or worse. <b>One-sided</b> only tests for better &mdash; blind to losses. Default to two-sided.</Info>
            </label>
            <select id="tails" value={s.tails} onChange={(e) => set("tails", e.target.value)} className={inputCls}>
              <option value="2">Two-sided</option>
              <option value="1">One-sided</option>
            </select>
          </div>
          <div className="flex items-end">
            <label className="m-0 flex cursor-pointer items-center text-[12.5px] font-semibold text-ink-2">
              <input type="checkbox" checked={s.sidak} onChange={(e) => set("sidak", e.target.checked)} className="mr-1.5 align-[-2px]" />
              Šidák correction
              <Info label="What is Sidak correction?">Named after statistician <b>Zbyněk Šidák</b>. With 3+ variations, every comparison raises false-positive odds. Tightens the bar. Leave off for 2-arm tests.</Info>
            </label>
          </div>
        </div>
      </div>
    );
  }

  // ---- verdict ----
  function Verdict() {
    if (mode === "pre") {
      const nEnd = availAtWeek(s.weeks);
      const orders = nEnd * baselineCvr;
      const m = minMde(nEnd);
      const expected = s.expectedLift / 100;
      const powered = isFinite(m) && m <= expected;
      let head: React.ReactNode;
      let extra: React.ReactNode = null;
      if (orders < 100) {
        head = <span className="text-orange-400">NO-GO: below the orders floor.</span>;
        extra = <p className="mt-2 text-[13px] font-semibold text-orange-400">Below 100 orders/arm the test isn&rsquo;t callable. Run longer, pick a higher-traffic surface, or don&rsquo;t brief it.</p>;
      } else if (!powered) {
        head = <span className="text-orange-400">NO-GO as designed: underpowered.</span>;
        extra = <p className="mt-2 text-[13px] font-semibold text-orange-400">You can only detect {isFinite(m) ? (m * 100).toFixed(0) : ">500"}% by week {s.weeks} but expect {s.expectedLift}%. Test a bigger swing, run longer, or pick a higher-traffic surface.</p>;
      } else if (orders < 250) {
        head = <span className="text-emerald-400">GO, with caution: callable but thin.</span>;
        extra = <p className="mt-2 text-[13px] text-emerald-300">Past the 100 orders/arm floor but short of the 250 happy zone &mdash; expect a noisy read.</p>;
      } else {
        head = <span className="text-emerald-400">GO: this test is worth briefing.</span>;
        extra = <p className="mt-2 text-[13px] text-emerald-300">Gates clear, including the 250 orders/arm happy zone.</p>;
      }
      const Tick = ({ ok }: { ok: boolean }) => <span className={ok ? "font-bold text-emerald-400" : "font-bold text-orange-400"}>{ok ? "✓" : "✗"}</span>;
      return (
        <>
          <div className="text-[19px] font-bold leading-tight tracking-tight">{head}</div>
          <p className="mt-2 text-[13px] text-text-inv-muted"><Tick ok={orders >= 100} /> Projected ~{fmt(orders)} orders/arm by week {s.weeks} (floor: 100)</p>
          <p className="mt-1.5 text-[13px] text-text-inv-muted"><Tick ok={orders >= 250} /> Happy zone: 250+ orders/arm</p>
          <p className="mt-1.5 text-[13px] text-text-inv-muted"><Tick ok={powered} /> Smallest detectable lift by week {s.weeks}: ~{isFinite(m) ? (m * 100).toFixed(0) : ">500"}% vs expected {s.expectedLift}%</p>
          {extra}
        </>
      );
    }
    if (!live) return null;
    const d85 = daysFromNow(crossWeekAt(0.85, live.lift));
    const d95 = daysFromNow(crossWeekAt(0.95, live.lift));
    const ratePerDay = livePerArm / Math.max(1, s.testDays);
    const unit = mode === "cvr" ? "visitors" : "sessions";
    let head: React.ReactNode;
    if (live.p2bb >= 0.95) head = <span className="text-emerald-400">Callable now at 95%.</span>;
    else if (live.p2bb >= 0.85) head = <span className="text-emerald-400">Callable now at 85%.</span>;
    else if (live.lift < 0) head = <span className="text-orange-400">Variant is losing.</span>;
    else head = <span className="text-cream">Not callable yet.</span>;
    const liftCls = live.lift > 0 ? "text-emerald-400" : live.lift < 0 ? "text-orange-400" : "text-cream";
    const liftStr = (live.lift >= 0 ? "+" : "") + pct(live.lift, 1);
    const cStr = mode === "rpv" ? money(live.c) : pct(live.c);
    const vStr = mode === "rpv" ? money(live.v) : pct(live.v);
    const ordersOk = mode === "cvr" ? s.cO >= 100 && s.vO >= 100 : true;
    return (
      <>
        <div className="text-[19px] font-bold leading-tight tracking-tight">{head}</div>
        <div className="mt-3.5 grid grid-cols-3 gap-3 border-t border-cream/10 pt-3.5">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-text-inv-muted">Control</div>
            <div className="mt-0.5 text-[17px] font-bold tabular-nums">{cStr}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-text-inv-muted">Variant</div>
            <div className="mt-0.5 text-[17px] font-bold tabular-nums">{vStr}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider text-text-inv-muted">Observed lift</div>
            <div className={`mt-0.5 text-[17px] font-bold tabular-nums ${liftCls}`}>{liftStr}</div>
          </div>
        </div>
        <p className="mt-3 text-[13px] text-text-inv-muted"><b className="text-white">{pct(live.p2bb, 0)}</b> probability variant beats control right now</p>
        {mode === "cvr" && (
          <p className="mt-1.5 text-[13px] text-text-inv-muted"><span className={ordersOk ? "font-bold text-emerald-400" : "font-bold text-orange-400"}>{ordersOk ? "✓" : "✗"}</span> Orders floor: {s.cO} / {s.vO} per arm (need ≥100, want ≥250)</p>
        )}
        <p className="mt-1.5 text-[13px] text-text-inv-muted">Running <b className="text-white">{s.testDays} days</b> at ~{fmt(ratePerDay)} {unit}/arm/day.</p>
        {live.lift > 0 && (
          <>
            {live.p2bb < 0.85 && d85 != null && <p className="mt-1.5 text-[13px] text-text-inv-muted">If this lift holds, <b>85%</b> in <b>~{Math.ceil(d85)} more days</b> (day {Math.ceil(s.testDays + d85)} total).</p>}
            {live.p2bb < 0.95 && d95 != null && <p className="mt-1.5 text-[13px] text-text-inv-muted"><b>95%</b> in <b>~{Math.ceil(d95)} more days</b> (day {Math.ceil(s.testDays + d95)} total).</p>}
            {live.p2bb < 0.85 && d85 == null && <p className="mt-2 text-[13px] font-semibold text-orange-400">85% isn&rsquo;t reachable inside a year at this pace. Lift is too small or variance too high.</p>}
          </>
        )}
        {live.lift <= 0 && live.p2bb < 0.85 && <p className="mt-1.5 text-[13px] text-text-inv-muted">No positive lift to project from yet.</p>}
      </>
    );
  }

  // ---- table ----
  function Grid() {
    const baseP = baselineCvr;
    const tpctRow = mode === "pre" ? +s.expectedLift.toFixed(2) : live ? +(Math.abs(live.lift) * 100).toFixed(2) : 10;
    const rows = Array.from(new Set([...MDES, tpctRow])).sort((a, b) => a - b);
    const targetClass = mode === "pre" ? "purple" : "warm";

    return (
      <div className="overflow-x-auto -mx-2 px-2">
        <table className="min-w-[430px] w-full border-separate border-spacing-0 text-[13px]">
          <thead>
            <tr>
              <th />
              {Array.from({ length: WEEKS }, (_, i) => (
                <th key={i} className="border-b border-ink/15 p-2 text-[11.5px] font-semibold text-text-muted">Wk {i + 1}</th>
              ))}
            </tr>
            {mode === "pre" && (
              <tr>
                <th className="border-b border-ink/15 pr-3 text-right text-[10.5px] font-semibold text-text-muted">orders/arm</th>
                {Array.from({ length: WEEKS }, (_, i) => (
                  <th key={i} className="border-b border-ink/15 p-2 text-[11.5px] font-semibold text-text-muted">{fmt(availAtWeek(i + 1) * baseP)}</th>
                ))}
              </tr>
            )}
            <tr>
              <th className="pr-3 text-right text-[10.5px] font-semibold text-text-muted">min. detectable</th>
              {Array.from({ length: WEEKS }, (_, i) => {
                const m = minMde(availAtWeek(i + 1));
                return (
                  <th key={i} className="p-2 font-bold text-purple">{isFinite(m) ? (m * 100).toFixed(0) + "%" : ">500%"}</th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => {
              const isT = Math.abs(m - tpctRow) < 0.001;
              const r = reqN(m / 100);
              const rowLabel = m % 1 ? m.toFixed(1) : m.toString();
              const targetColor = targetClass === "purple" ? "text-purple" : "text-orange-500";
              const targetBox = targetClass === "purple" ? "shadow-[inset_0_0_0_2px_var(--color-purple,#7c5aec)]" : "shadow-[inset_0_0_0_2px_#ff7a59]";
              return (
                <tr key={m}>
                  <th className={`whitespace-nowrap pr-3 text-right font-bold ${isT ? targetColor : "text-ink-2"}`}>{rowLabel}%</th>
                  {Array.from({ length: WEEKS }, (_, i) => {
                    const ok = availAtWeek(i + 1) >= r;
                    return (
                      <td key={i} className={`rounded-lg p-2 text-center font-semibold tabular-nums ${ok ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"} ${isT ? targetBox : ""}`}>
                        {ok ? "✓" : "·"}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // ---- SVG graph ----
  function Graph() {
    let wmax: number;
    if (mode === "pre") {
      wmax = Math.max(WEEKS, s.weeks);
    } else {
      const lift = live ? live.lift : 0;
      const c95 = crossWeekAt(0.95, lift);
      wmax = Math.min(26, Math.max(WEEKS, Math.ceil(nowWeek) + 1, c95 ? Math.ceil(c95) + 1 : 0));
    }
    const W = 700, H = 240, padL = 46, padR = 16, padT = 16, padB = 32;
    const x = (w: number) => padL + (w / wmax) * (W - padL - padR);
    const y = (p: number) => padT + (1 - (Math.max(0.5, p) - 0.5) / 0.5) * (H - padT - padB);
    const yGrid: React.ReactNode[] = [];
    for (let p = 0.5; p <= 1.001; p += 0.1) {
      const yy = y(p);
      yGrid.push(<line key={`yg${p}`} x1={padL} y1={yy} x2={W - padR} y2={yy} stroke="#e3ddd2" strokeWidth={1} />);
      yGrid.push(<text key={`yl${p}`} x={padL - 7} y={yy + 3.5} textAnchor="end" fontSize={10} fill="#5a5e77">{Math.round(p * 100)}%</text>);
    }
    const xTicks: React.ReactNode[] = [];
    for (let w = 1; w <= wmax; w++) {
      xTicks.push(<text key={`xl${w}`} x={x(w)} y={H - padB + 16} textAnchor="middle" fontSize={10} fill="#5a5e77">wk {w}</text>);
      xTicks.push(<line key={`xt${w}`} x1={x(w)} y1={H - padB} x2={x(w)} y2={H - padB + 4} stroke="#e3ddd2" />);
    }
    const thresholds = [0.85, 0.95].map((thr) => {
      const yy = y(thr);
      return (
        <g key={thr}>
          <line x1={padL} y1={yy} x2={W - padR} y2={yy} stroke="#9b8ce8" strokeWidth={1} strokeDasharray="5 4" />
          <text x={padL + 6} y={yy - 4} fontSize={10} fontWeight={600} fill="#7c5aec">{Math.round(thr * 100)}%</text>
        </g>
      );
    });

    let lift = 0;
    let markerW = 0;
    let markerLabel = "";
    if (mode === "pre") {
      lift = s.expectedLift / 100;
      markerW = s.weeks;
      markerLabel = "planned end";
    } else if (live) {
      lift = live.lift;
      markerW = Math.min(nowWeek, wmax);
      markerLabel = `now (day ${s.testDays})`;
    }

    const marker = markerW > 0 && (
      <g>
        <line x1={x(markerW)} y1={padT} x2={x(markerW)} y2={H - padB} stroke="#ff7a59" strokeWidth={1} strokeDasharray="3 4" />
        <text x={x(markerW)} y={padT + 10} textAnchor="middle" fontSize={10} fontWeight={600} fill="#ff7a59">{markerLabel}</text>
      </g>
    );

    let curve: React.ReactNode = null;
    if (lift > 0) {
      const steps = 120;
      const startW = 0.08;
      let d = "";
      for (let i = 0; i <= steps; i++) {
        const w = startW + (wmax - startW) * (i / steps);
        const n = availAtWeek(w);
        d += (i ? "L" : "M") + x(w).toFixed(1) + " " + y(p2bbAt(n, lift)).toFixed(1);
      }
      const dots: React.ReactNode[] = [];
      [0.85, 0.95].forEach((thr) => {
        let cross: number | null = null;
        for (let i = 0; i <= 600; i++) {
          const w = startW + (wmax - startW) * (i / 600);
          if (p2bbAt(availAtWeek(w), lift) >= thr) {
            cross = w;
            break;
          }
        }
        if (cross !== null && cross > 0.12) {
          dots.push(<circle key={`c${thr}`} cx={x(cross)} cy={y(thr)} r={4.5} fill="#7c5aec" stroke="#fff" strokeWidth={1.5} />);
          dots.push(<text key={`ct${thr}`} x={x(cross) + 7} y={y(thr) + 13} fontSize={10.5} fontWeight={700} fill="#1e2238">wk {cross.toFixed(1)}</text>);
        }
      });
      curve = (<><path d={d} fill="none" stroke="#7c5aec" strokeWidth={2.5} strokeLinecap="round" />{dots}</>);
    } else if (mode !== "pre") {
      curve = <text x={W / 2} y={H / 2} textAnchor="middle" fontSize={13} fill="#5a5e77">No positive lift to project. Variant currently {lift < 0 ? "behind" : "tied with"} control.</text>;
    }

    return (
      <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Probability to beat control by week" className="block w-full h-auto">
        {yGrid}
        {xTicks}
        {thresholds}
        {marker}
        {curve}
        <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="#5a5e77" strokeWidth={1} />
      </svg>
    );
  }

  const tabs: { key: Mode; label: string }[] = [
    { key: "pre", label: "Pre-test go/no-go" },
    { key: "cvr", label: "Live: conversion rate" },
    { key: "rpv", label: "Live: revenue per visitor" },
  ];

  const gridTitle = mode === "rpv" ? "Detectable lift in RPV, by week" : mode === "cvr" ? "Detectable lift in conversion rate, by week" : "Detectable lift by week";

  const graphSub = mode === "pre"
    ? `Bayesian probability variant beats control over time, assuming your expected ${s.expectedLift}% lift is real. Dashed lines mark the 85% and 95% thresholds.`
    : live
      ? `Test has run ${s.testDays} days. Assuming the observed ${(live.lift >= 0 ? "+" : "") + pct(live.lift, 1)} lift holds at the same pace, this projects when probability-to-beat-control crosses the 85% and 95% thresholds. The orange line marks today.`
      : "";

  const foot = mode === "rpv"
    ? "Two-sample means test. p2bb computed from z = Δ / SE using each arm's CV. Projection assumes your observed run rate (sessions ÷ days running) continues. Same model Intelligems and other Bayesian tools report."
    : mode === "cvr"
      ? "Two-proportion z-test. p2bb computed from z = (p₂−p₁) / SE. Projection assumes your observed run rate (visitors ÷ days running) continues. Same model used by Intelligems and other Bayesian tools."
      : "Size on orders, call on your locked primary metric. 100 orders/arm is the callable floor, 250+ is the happy zone. Two-proportion z-test at your significance and power settings.";

  return (
    <div className="space-y-6">
      {/* tabs */}
      <div className="inline-flex flex-wrap gap-1 rounded-xl border border-ink/10 bg-cream-2 p-1" role="tablist">
        {tabs.map((t) => {
          const active = mode === t.key;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={active}
              onClick={() => setMode(t.key)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${active ? "bg-white text-ink shadow-sm" : "text-text-muted hover:text-ink"}`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* inputs + verdict */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="rounded-2xl border border-ink/10 bg-white p-5 md:p-6 lg:col-span-2">
          {mode === "pre" ? <PreInputs /> : mode === "cvr" ? <CvrInputs /> : <RpvInputs />}
        </div>
        <div className="rounded-2xl border border-ink/10 bg-ink p-5 md:p-6 text-cream lg:col-span-3">
          <Verdict />
        </div>
      </div>

      {/* table */}
      <div>
        <h3 className="m-0 mb-1 text-base font-semibold text-ink">{gridTitle}</h3>
        <div className="mb-2.5 flex flex-wrap items-center gap-4 text-xs text-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded bg-emerald-100 ring-1 ring-emerald-600/40" />detectable
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded bg-rose-100 ring-1 ring-rose-600/40" />underpowered
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className={`inline-block h-3 w-3 rounded ring-2 ${mode === "pre" ? "ring-purple" : "ring-orange-500"}`} />
            {mode === "pre" ? "expected lift" : "current observed lift"}
          </span>
        </div>
        <Grid />
        <p className="mt-4 text-[11.5px] leading-relaxed text-text-muted">{foot}</p>
      </div>

      {/* graph */}
      <div>
        <h3 className="m-0 mb-1 text-base font-semibold text-ink">
          {mode === "pre" ? "If the expected lift is real: how confidence builds" : "Projected confidence: where this test is heading"}
        </h3>
        <p className="mb-2.5 text-xs text-text-muted">{graphSub}</p>
        <div className="rounded-2xl border border-ink/10 bg-white p-3.5 pb-1.5">
          <Graph />
        </div>
      </div>
    </div>
  );
}
