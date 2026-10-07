"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type Props = { before: string; after: string; beforeLabel: string; afterLabel: string; alt: string };

export function BeforeAfter({ before, after, beforeLabel, afterLabel, alt }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] w-full select-none overflow-hidden border border-line"
      onPointerDown={(e) => {
        dragging.current = true;
        update(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) update(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerLeave={() => {
        dragging.current = false;
      }}
      style={{ touchAction: "pan-y" }}
      data-cursor="drag"
    >
      <Image src={after} alt={alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={before}
          alt=""
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover blur-[1.5px] brightness-[.55] contrast-[1.4] grayscale"
        />
      </div>
      <span className="absolute left-4 top-4 bg-ink/70 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.25em] text-ivory backdrop-blur">
        {beforeLabel}
      </span>
      <span className="absolute right-4 top-4 bg-gold px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.25em] text-ink">{afterLabel}</span>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-gold" style={{ left: `${pos}%` }}>
        <span
          className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-full border border-gold bg-ink/80 text-gold backdrop-blur"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 12" className="h-3 w-6">
            <path d="M5 1L1 6l4 5M19 1l4 5-4 5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`${beforeLabel} / ${afterLabel}`}
        className="sr-only"
      />
    </div>
  );
}
