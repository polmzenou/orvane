"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/ui/Logo";
import { img, type ImageKey } from "@/lib/images";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLenis } from "./SmoothScroll";

const menuImages: Record<string, ImageKey> = {
  collections: "watchBlueSun",
  maison: "valley",
  craft: "watchDark",
  boutiques: "salon",
  journal: "night",
  contact: "wristSuit",
};

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string>("collections");

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 300 && y > prev && !open);
  });

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a href="#main" className="sr-only z-[120] bg-gold px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        {t("skip")}
      </a>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,backdrop-filter] duration-700",
          scrolled && !open ? "border-b border-line/60 bg-ink/70 backdrop-blur-xl" : "border-b border-transparent",
        )}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container-luxe flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.fullName} — ${t("home")}`} className="relative z-[70]">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navLinks.slice(0, 5).map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      "group relative py-2 text-[0.7rem] uppercase tracking-[0.24em] transition-colors",
                      isActive(l.href) ? "text-gold" : "text-ivory/75 hover:text-ivory",
                    )}
                  >
                    {t(l.key)}
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gold transition-transform duration-500",
                        isActive(l.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-[70] flex items-center gap-5">
            <LanguageSwitcher className="hidden sm:flex" />
            <Link
              href="/contact"
              className="hidden border border-gold/50 px-5 py-2.5 text-[0.65rem] uppercase tracking-[0.24em] text-ivory transition-colors hover:bg-gold hover:text-ink md:inline-block"
            >
              {t("appointment")}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              className="group flex items-center gap-3 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-ivory lg:hidden"
            >
              <span className="hidden sm:inline">{open ? t("close") : t("menu")}</span>
              <span className="relative block h-3 w-7" aria-hidden="true">
                <span className={cn("absolute left-0 top-0 h-px w-7 bg-gold transition-transform duration-500", open && "top-1.5 rotate-45")} />
                <span className={cn("absolute bottom-0 left-0 h-px w-5 bg-gold transition-all duration-500", open && "bottom-1.5 w-7 -rotate-45")} />
              </span>
              <span className="sr-only sm:hidden">{open ? t("close") : t("menu")}</span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            className="fixed inset-0 z-[55] bg-ink"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <div className="container-luxe grid h-full grid-cols-1 items-center gap-10 overflow-y-auto pb-10 pt-[calc(var(--header-h)+2rem)] md:grid-cols-2">
              <nav aria-label="Mobile">
                <ul className="space-y-2">
                  {navLinks.map((l, i) => (
                    <li key={l.href} className="overflow-hidden">
                      <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{ duration: 0.8, delay: 0.25 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Link
                          href={l.href}
                          onMouseEnter={() => setHovered(l.key)}
                          className="group flex items-baseline gap-5 py-1"
                        >
                          <span className="text-[0.65rem] tracking-[0.2em] text-gold">0{i + 1}</span>
                          <span
                            className={cn(
                              "display text-5xl transition-all duration-500 group-hover:translate-x-3 group-hover:italic sm:text-6xl",
                              isActive(l.href) ? "text-gold-soft italic" : "text-ivory",
                            )}
                          >
                            {t(l.key)}
                          </span>
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex items-center gap-6 sm:hidden">
                  <LanguageSwitcher />
                </div>
              </nav>
              <div className="relative hidden aspect-[4/5] max-h-[70vh] overflow-hidden md:block">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={hovered}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image src={img(menuImages[hovered] ?? "valley", 1000)} alt="" fill sizes="45vw" className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[0.65rem] uppercase tracking-[0.25em] text-ivory/70">
                  <span>{site.address.street}</span>
                  <span>{site.phone}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
