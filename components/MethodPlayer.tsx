"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  ResearchVisual,
  PrioritiseVisual,
  TestVisual,
  CompoundVisual,
} from "./HowVisuals";

const steps = [
  {
    n: "01",
    h: "Research",
    short: "Research",
    p: "We combine analytics, customer interviews, surveys and session recordings to find where buyers hesitate and why.",
    example: "Evidence: buyers keep looking for an answer the product page does not give them.",
    Visual: ResearchVisual,
  },
  {
    n: "02",
    h: "Prioritise",
    short: "Prioritise",
    p: "We rank the opportunity against the rest of the backlog by potential value, strength of evidence and cost to test.",
    example: "Decision: test the missing answer before lower-value cosmetic changes.",
    Visual: PrioritiseVisual,
  },
  {
    n: "03",
    h: "Test",
    short: "Test",
    p: "We build a controlled variation, check the tracking and let enough customers see both versions to make a sound call.",
    example: "Comparison: the current page versus a version that answers the objection in context.",
    Visual: TestVisual,
  },
  {
    n: "04",
    h: "Keep what works",
    short: "Keep",
    p: "If the variation improves the agreed revenue metric, it stays. Either way, the result shapes the next test.",
    example: "Outcome: a documented decision, a permanent winner when there is one, and better evidence for what comes next.",
    Visual: CompoundVisual,
  },
];

export default function MethodPlayer() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const player = playerRef.current;
    if (!player || reduce) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          setPlaying(true);
        }
      },
      { threshold: 0.45 }
    );
    observer.observe(player);
    return () => observer.disconnect();
  }, [reduce]);

  useEffect(() => {
    if (!playing || reduce) return;
    const timer = window.setInterval(() => {
      setActive((current) => {
        if (current === steps.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 4200);
    return () => window.clearInterval(timer);
  }, [playing, reduce]);

  const step = steps[active];
  const Visual = step.Visual;

  return (
    <div ref={playerRef} className="mt-14 overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-[0_24px_70px_-45px_rgba(20,23,42,0.35)]">
      <div className="border-b border-ink/10 p-4 sm:p-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
          Stage {active + 1} of {steps.length}
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (active === steps.length - 1) setActive(0);
              setPlaying((current) => !current);
            }}
            className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-ink text-cream transition-colors hover:bg-purple"
            aria-label={playing ? "Pause method walkthrough" : active === steps.length - 1 ? "Replay method walkthrough" : "Play method walkthrough"}
          >
            {playing ? (
              <span aria-hidden className="flex gap-1"><span className="h-4 w-1 rounded bg-current" /><span className="h-4 w-1 rounded bg-current" /></span>
            ) : active === steps.length - 1 ? (
              <span aria-hidden className="text-xl leading-none">↻</span>
            ) : (
              <span aria-hidden className="ml-0.5 text-base">▶</span>
            )}
          </button>
          <div className="grid min-w-0 flex-1 grid-cols-4 gap-2" role="tablist" aria-label="Impact Conversion method">
            {steps.map((item, index) => (
              <button
                key={item.n}
                type="button"
                role="tab"
                aria-label={`Stage ${item.n}: ${item.h}`}
                aria-selected={active === index}
                aria-controls="method-panel"
                onClick={() => {
                  setActive(index);
                  setPlaying(false);
                }}
                className="group min-w-0 text-left"
              >
                <span className="block h-1.5 overflow-hidden rounded-full bg-ink/10">
                  <motion.span
                    className="block h-full origin-left rounded-full bg-purple"
                    initial={false}
                    animate={{ scaleX: index < active ? 1 : index === active ? (playing ? 1 : 0.18) : 0 }}
                    transition={playing && index === active && !reduce ? { duration: 4.2, ease: "linear" } : { duration: 0.25 }}
                  />
                </span>
                <span className="mt-2 block truncate text-[10px] font-semibold text-text-muted group-aria-selected:text-purple sm:text-xs">
                  {item.short}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div id="method-panel" role="tabpanel" className="grid items-center gap-8 p-7 md:grid-cols-[0.9fr_1.1fr] md:p-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.n}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-purple">Stage {step.n}</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-text">{step.h}</h3>
            <p className="mt-4 text-lg leading-relaxed text-text-muted">{step.p}</p>
            <p className="mt-5 rounded-xl bg-purple-soft p-4 text-sm font-medium leading-relaxed text-text">{step.example}</p>
          </motion.div>
        </AnimatePresence>
        <div className="rounded-2xl border border-ink/10 bg-cream-2 p-6 md:p-8">
          <Visual />
        </div>
      </div>
    </div>
  );
}
