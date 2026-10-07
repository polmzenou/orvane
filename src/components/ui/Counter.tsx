"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

export function Counter({ value, locale, className }: { value: number; locale: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const isYear = value > 1800 && value < 2100;
  const fmt = (n: number) => (isYear ? String(Math.round(n)) : new Intl.NumberFormat(locale).format(Math.round(n)));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- skip animation for reduced motion
      setDisplay(value);
      return;
    }
    const controls = animate(isYear ? value - 120 : 0, value, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: setDisplay,
    });
    return () => controls.stop();
  }, [inView, value, reduce, isYear]);

  return (
    <span ref={ref} className={className}>
      {fmt(display)}
    </span>
  );
}
