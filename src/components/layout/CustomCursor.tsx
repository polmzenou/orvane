"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type State = "default" | "hover" | "drag";

/** Ring cursor for fine pointers; reacts to links, buttons and [data-cursor]. */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<State>("default");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- capability check on mount
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-cursor], a, button, input, select, textarea, label");
      if (!el) setState("default");
      else if (el.dataset.cursor === "drag") setState("drag");
      else setState("hover");
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = state === "hover" ? 64 : state === "drag" ? 84 : 28;
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[300] flex items-center justify-center rounded-full border border-gold mix-blend-difference"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: size, height: size, opacity: visible ? 1 : 0, backgroundColor: state === "hover" ? "rgba(201,168,106,0.15)" : "rgba(0,0,0,0)" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {state === "drag" && <span className="text-[0.55rem] uppercase tracking-[0.2em] text-gold">drag</span>}
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[300] h-1.5 w-1.5 rounded-full bg-gold"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      />
    </>
  );
}
