"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Monogram } from "@/components/ui/Logo";

const KEY = "orvane_intro_seen";

/** Short intro shown once per browsing session. */
export function Preloader() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* private mode */
    }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- decided from session storage
    setShow(true);
    document.documentElement.style.overflow = "hidden";
    const finish = () => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {
        /* private mode */
      }
      setShow(false);
      document.documentElement.style.overflow = "";
    };
    const start = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const p = Math.min(1, (now - start) / 1800);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    // Timer-based exit so the intro never blocks the page, even if frames are throttled.
    const done = setTimeout(finish, 2100);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="relative h-28 w-28 text-gold">
            <Monogram className="h-28 w-28 opacity-30" />
            <motion.span
              className="absolute left-1/2 top-1/2 h-10 w-px origin-bottom bg-gold"
              style={{ translateX: "-50%", translateY: "-100%" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.8, ease: "linear" }}
            />
            <motion.span
              className="absolute left-1/2 top-1/2 h-7 w-[2px] origin-bottom bg-gold-soft"
              style={{ translateX: "-50%", translateY: "-100%" }}
              animate={{ rotate: 30 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </div>
          <p className="mt-10 font-serif text-2xl tracking-[0.5em] text-ivory">ORVANE</p>
          <p className="mt-3 text-[0.6rem] tracking-[0.5em] text-gold">GENÈVE · 1891</p>
          <p className="absolute bottom-10 right-10 font-serif text-6xl tabular-nums text-ivory/20 md:text-8xl">{count}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
