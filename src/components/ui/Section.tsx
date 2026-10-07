import { cn } from "@/lib/utils";
import { Reveal, RevealText } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  text,
  className,
  align = "left",
  as = "h2",
  immediate = false,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  className?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  immediate?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal y={16}>
          <p className={cn("eyebrow mb-6 flex items-center gap-4", align === "center" && "justify-center")}>
            <span className="h-px w-10 bg-gold" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <RevealText
        as={as}
        text={title}
        immediate={immediate}
        className={cn("display text-ivory", as === "h1" ? "text-5xl sm:text-6xl md:text-7xl lg:text-8xl" : "text-4xl sm:text-5xl md:text-6xl")}
      />
      {text && (
        <Reveal delay={0.2}>
          <p className={cn("mt-8 max-w-2xl text-base leading-relaxed text-ivory/65 md:text-lg", align === "center" && "mx-auto")}>{text}</p>
        </Reveal>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pb-16 pt-40 md:pb-24 md:pt-52">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]"
      />
      <div className="container-luxe relative">
        {children}
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} text={text} immediate className="mt-8 max-w-5xl" />
      </div>
    </section>
  );
}
