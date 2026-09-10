"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { WinCard } from "@/lib/case-studies";

export default function WinsCarousel({
  cards,
  label,
}: {
  cards: WinCard[];
  label: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? i : (i + dir + cards.length) % cards.length)),
    [cards.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step]);

  const active = open === null ? null : cards[open];

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">
        {label}
      </p>
      <p className="mt-3 text-base text-text-muted">
        Click any card to see the control and the variation side by side.
      </p>

      <ul className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
        {cards.map((c, i) => (
          <li key={c.id} className="min-w-[15rem] flex-1 snap-start">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-purple/25 bg-cream text-left transition hover:border-purple/60 hover:shadow-lg focus-visible:border-purple"
            >
              <span className="relative block h-36 w-full overflow-hidden bg-ink">
                <Image
                  src={c.image}
                  alt=""
                  width={c.width}
                  height={c.height}
                  sizes="240px"
                  className="h-full w-full object-cover object-top opacity-90 transition group-hover:scale-[1.03] group-hover:opacity-100"
                />
              </span>
              <span className="flex flex-1 flex-col p-5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-purple">
                  {c.id}
                </span>
                <span className="mt-2 text-xl font-semibold tracking-tight text-text">
                  {c.lift}
                </span>
                <span className="mt-auto pt-3 text-sm text-text-muted">
                  {c.name}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.id}: ${active.name}`}
          className="fixed inset-0 z-50 flex flex-col bg-ink/95 p-4 md:p-8"
          onClick={close}
        >
          <div className="mx-auto flex w-full max-w-5xl flex-shrink-0 items-start justify-between gap-6 pb-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-purple-2">
                {active.id}
              </p>
              <p className="mt-1 text-xl font-semibold text-cream">
                {active.lift}
              </p>
              <p className="text-sm text-text-inv-muted">{active.name}</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="rounded-full border border-cream/25 px-4 py-2 text-sm text-cream transition hover:bg-cream/10"
            >
              Close
            </button>
          </div>

          <div
            className="mx-auto w-full max-w-5xl flex-1 overflow-y-auto rounded-2xl bg-ink"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.image}
              alt={`${active.name}: control on the left, variation on the right`}
              width={active.width}
              height={active.height}
              sizes="(min-width: 1024px) 900px, 100vw"
              className="h-auto w-full"
            />
          </div>

          <div
            className="mx-auto flex w-full max-w-5xl flex-shrink-0 items-center justify-between pt-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              className="rounded-full border border-cream/25 px-4 py-2 text-sm text-cream transition hover:bg-cream/10"
            >
              Previous
            </button>
            <span className="text-sm text-text-inv-muted">
              {(open ?? 0) + 1} of {cards.length}
            </span>
            <button
              type="button"
              onClick={() => step(1)}
              className="rounded-full border border-cream/25 px-4 py-2 text-sm text-cream transition hover:bg-cream/10"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
