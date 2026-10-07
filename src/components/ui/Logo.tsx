import { cn } from "@/lib/utils";

export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("h-9 w-9", className)} aria-hidden="true">
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="M24 2.5v6M24 39.5v6M2.5 24h6M39.5 24h6" stroke="currentColor" strokeWidth="0.8" />
      <path d="M24 12 L26.2 24 L24 26 L21.8 24 Z" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3 text-gold", className)}>
      <Monogram />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-[1.55rem] tracking-[0.32em] text-ivory">ORVANE</span>
          <span className="mt-1 text-[0.55rem] tracking-[0.55em] text-gold">GENÈVE · 1891</span>
        </span>
      )}
    </span>
  );
}
