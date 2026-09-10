"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/* Read-position indicator, following the Rare UI Scroll Progress spec
   (rareui.com/components/scrollprogressindicator): pinned to the top edge,
   a few pixels tall, driven by scaleX from a left origin so scrolling never
   touches layout, spring-smoothed unless the reader asked for reduced motion.
   Decorative only, so it is hidden from assistive tech. Credit: Rare UI. */
export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-purple"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  );
}
