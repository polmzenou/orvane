import { cn } from "@/lib/utils";

export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = [...items, ...items];
  return (
    <div className={cn("relative overflow-hidden border-y border-line py-6", className)} aria-hidden="true">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-12 font-serif text-3xl italic text-ivory/80 md:text-5xl">
            {item}
            <span className="h-2 w-2 rotate-45 bg-gold" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
