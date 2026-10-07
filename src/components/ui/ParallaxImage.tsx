"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
  priority?: boolean;
  sizes?: string;
  overlay?: boolean;
};

export function ParallaxImage({ src, alt, className, strength = 12, priority, sizes = "100vw", overlay = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div className="absolute -inset-y-[15%] inset-x-0" style={reduce ? undefined : { y }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </motion.div>
      {overlay && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />}
    </div>
  );
}
