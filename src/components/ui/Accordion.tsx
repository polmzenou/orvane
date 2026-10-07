"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export type AccordionItem = { title: string; content: ReactNode };

export function Accordion({ items, defaultOpen = -1, className }: { items: AccordionItem[]; defaultOpen?: number; className?: string }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-line">
            <h3>
              <button
                type="button"
                id={`${id}-h-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                data-cursor="hover"
              >
                <span className="font-serif text-xl text-ivory transition-colors group-hover:text-gold-soft md:text-2xl">{item.title}</span>
                <span className="relative h-3 w-3 shrink-0" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-px w-3 bg-gold" />
                  <span
                    className={cn(
                      "absolute left-1/2 top-0 h-3 w-px bg-gold transition-transform duration-500",
                      isOpen && "rotate-90 scale-y-0",
                    )}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-p-${i}`}
                  role="region"
                  aria-labelledby={`${id}-h-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-6 pr-8 text-[0.95rem] leading-relaxed text-ivory/70">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
