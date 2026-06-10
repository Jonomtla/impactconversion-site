"use client";

import { MotionConfig } from "motion/react";

// Honour the user's prefers-reduced-motion setting across every motion
// component (Reveal, Stagger, TiltCard, CountUp). The CSS layer already
// disables keyframe classes; this covers the JS-driven animations too.
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
