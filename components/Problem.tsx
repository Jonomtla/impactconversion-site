"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import LeakyFunnel from "./LeakyFunnel";
import VirtuousLoop from "./VirtuousLoop";
import ABTestBars from "./ABTestBars";
import Reveal from "./motion/Reveal";
import { StaggerGroup, StaggerItem } from "./motion/Stagger";
import TiltCard from "./motion/TiltCard";

const pillars = [
  {
    h: "You&apos;re leaking money right now",
    p: "Every click you buy is a deposit, and on most sites 97 out of 100 visitors walk away without spending a dollar. We find the holes in your funnel and close them, so more of the traffic you already paid for actually converts.",
    stat: "97 of 100",
    statLabel: "visitors leave without buying",
    Visual: LeakyFunnel,
  },
  {
    h: "Conversion wins compound",
    p: "When you lift the conversion rate once, every downstream metric moves with it and keeps paying on the same ad budget. Winners stay live forever, so the revenue compounds month after month instead of resetting.",
    stat: "Same budget",
    statLabel: "30 to 60% more revenue",
    Visual: VirtuousLoop,
  },
  {
    h: "Guessing is expensive",
    p: "Most agencies sell taste or templates, but we sell proof. Every change runs as a controlled experiment, so you see the result in your P&amp;L rather than in a Figma file.",
    stat: "95% confidence",
    statLabel: "on metrics locked at launch",
    Visual: ABTestBars,
  },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const gradX = useTransform(scrollYProgress, [0, 1], ["-10%", "30%"]);
  const gradY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const gradOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.9, 0.9, 0]);
  const gradScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.3]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cream py-24 md:py-32"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[700px] w-[700px] rounded-full blur-3xl"
        style={{
          x: gradX,
          y: gradY,
          opacity: gradOpacity,
          scale: gradScale,
          background:
            "radial-gradient(circle, rgba(124,90,236,0.35) 0%, rgba(124,90,236,0) 70%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-[800px] w-[800px] rounded-full blur-3xl"
        style={{
          x: useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]),
          y: useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]),
          opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.6, 0.7, 0]),
          background:
            "radial-gradient(circle, rgba(255,122,89,0.28) 0%, rgba(255,122,89,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-purple">
            The real problem
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-text md:text-5xl">
            You don&apos;t have a traffic problem.
            <br />
            You have a{" "}
            <span className="text-gradient-flow">conversion problem.</span>
          </h2>
          <p className="mt-6 text-lg text-text-muted">
            Buying more cold traffic is the expensive answer, while converting
            the traffic you already have is the cheap one, and it keeps paying
            month after month.
          </p>
        </Reveal>

        <StaggerGroup className="mt-16 grid gap-8 md:grid-cols-3" stagger={0.15}>
          {pillars.map((p) => {
            const V = p.Visual;
            return (
              <StaggerItem key={p.h}>
                <TiltCard className="flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-8 md:p-10 transition-shadow hover:shadow-[0_30px_60px_-20px_rgba(124,90,236,0.35)]">
                  <div className="-mx-2 mb-2">
                    <V />
                  </div>
                  <h3
                    className="mt-4 text-2xl font-semibold tracking-tight text-text md:text-[26px]"
                    dangerouslySetInnerHTML={{ __html: p.h }}
                  />
                  <p
                    className="mt-4 flex-1 text-text-muted leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: p.p }}
                  />
                  <div className="mt-6 flex items-baseline gap-3 border-t border-ink/10 pt-5">
                    <span className="text-lg font-bold text-purple">
                      {p.stat}
                    </span>
                    <span className="text-sm text-text-muted">
                      {p.statLabel}
                    </span>
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
