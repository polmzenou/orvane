"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
  closeLabel?: string;
};

const FOCUSABLE = 'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function Modal({ open, onClose, title, children, className, closeLabel = "Fermer" }: Props) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>(FOCUSABLE);
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>("input, button")?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
      prev?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-lenis-prevent
        >
          <button type="button" tabIndex={-1} aria-label={closeLabel} className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={cn("relative max-h-[90vh] w-full max-w-xl overflow-y-auto border border-line bg-coal p-7 md:p-10", className)}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center text-ivory/60 transition-colors hover:text-gold"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1" />
              </svg>
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
