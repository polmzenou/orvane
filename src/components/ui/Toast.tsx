"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

type Toast = { id: number; message: string };
const ToastContext = createContext<(message: string) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((message: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div
        className="pointer-events-none fixed bottom-6 left-1/2 z-[90] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 flex-col items-center gap-3"
        role="status"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 border border-gold/40 bg-coal/95 px-6 py-4 text-sm text-ivory shadow-2xl backdrop-blur"
            >
              <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
