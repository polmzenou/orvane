"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type Props = HTMLMotionProps<"div"> & { delay?: number; y?: number };

export function Reveal({ children, delay = 0, y = 40, className, ...rest }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Splits a heading into words that rise from a mask. */
export function RevealText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <Tag className={cn(className)} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%", rotate: 4 }}
            {...(immediate ? { animate: { y: "0%", rotate: 0 } } : { whileInView: { y: "0%", rotate: 0 } })}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ duration: 1.1, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
