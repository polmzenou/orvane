"use client";

import { useRef, type ComponentProps, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] transition-colors duration-500 ease-[var(--ease-luxe)] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-ink hover:text-ink",
  outline: "border border-gold/50 text-ivory hover:text-ink hover:border-gold",
  ghost: "text-ivory px-0 py-2",
};

function Inner({ children, variant }: { children: ReactNode; variant: Variant }) {
  if (variant === "ghost") {
    return (
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full bg-gold/30" />
        <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:origin-left group-hover:scale-x-100" />
      </span>
    );
  }
  return (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 -z-0 translate-y-full transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:translate-y-0",
          variant === "gold" ? "bg-gold-soft" : "bg-gold",
        )}
      />
      <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
    </>
  );
}

/** Wrapper adding a subtle magnetic pull toward the cursor. */
function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

export function ButtonLink({
  href,
  variant = "gold",
  className,
  children,
  ...rest
}: Omit<ComponentProps<typeof Link>, "href"> & { href: string; variant?: Variant }) {
  return (
    <Magnetic>
      <Link href={href} className={cn(base, variants[variant], className)} data-cursor="hover" {...rest}>
        <Inner variant={variant}>{children}</Inner>
      </Link>
    </Magnetic>
  );
}

export function Button({
  variant = "gold",
  className,
  children,
  ...rest
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <Magnetic>
      <button className={cn(base, variants[variant], className)} data-cursor="hover" {...rest}>
        <Inner variant={variant}>{children}</Inner>
      </button>
    </Magnetic>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 10" className={cn("h-2.5 w-6 transition-transform duration-500 group-hover:translate-x-1", className)} aria-hidden="true">
      <path d="M0 5h22M18 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
