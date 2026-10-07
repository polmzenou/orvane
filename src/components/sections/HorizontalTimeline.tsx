"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocale } from "next-intl";
import { timeline } from "@/data/content";
import { img } from "@/lib/images";
import { tr } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/** Pinned section whose track scrolls horizontally with the page (desktop only). */
export function HorizontalTimeline({ eyebrow, title }: { eyebrow: string; title: string }) {
  const locale = useLocale();
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          },
        },
      });
      el.querySelectorAll<HTMLElement>("[data-year]").forEach((year) => {
        gsap.fromTo(
          year,
          { opacity: 0.15, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: { trigger: year, containerAnimation: tween, start: "left 85%", end: "left 45%", scrub: true },
          },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={section} className="relative overflow-hidden bg-coal lg:h-[100svh]">
      <div className="container-luxe pt-24 lg:absolute lg:inset-x-0 lg:top-0 lg:pt-28">
        <p className="eyebrow mb-4 flex items-center gap-4">
          <span className="h-px w-10 bg-gold" />
          {eyebrow}
        </p>
        <h2 className="display text-4xl text-ivory md:text-6xl">{title}</h2>
      </div>
      <div
        ref={track}
        className="flex flex-col gap-16 px-4 py-16 sm:px-8 lg:h-full lg:w-max lg:flex-row lg:items-end lg:gap-24 lg:px-[8vw] lg:pb-24 lg:pt-0"
      >
        {timeline.map((item, i) => (
          <article key={item.year} className="group relative lg:w-[32vw] lg:min-w-[380px]" style={{ marginBottom: i % 2 ? "6vh" : 0 }}>
            <p data-year className="display text-[5.5rem] leading-none text-gold-gradient md:text-[8rem]">
              {item.year}
            </p>
            <div className="relative mt-6 aspect-[16/10] overflow-hidden">
              <Image
                src={img(item.image, 1000)}
                alt=""
                fill
                sizes="(min-width: 1024px) 32vw, 100vw"
                className="object-cover grayscale-[40%] transition-all duration-[1.2s] group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>
            <h3 className="mt-6 font-serif text-2xl text-ivory md:text-3xl">{tr(item.title, locale)}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/60">{tr(item.text, locale)}</p>
          </article>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 hidden h-px bg-line lg:block">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-gold" />
      </div>
    </section>
  );
}
