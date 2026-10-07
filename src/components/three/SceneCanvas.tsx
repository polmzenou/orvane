"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

type Props = CanvasProps & { className?: string; fallback?: React.ReactNode };

/** Canvas that only renders while visible and degrades gracefully without WebGL. */
export function SceneCanvas({ className, fallback, children, ...props }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [supported, setSupported] = useState<boolean | null>(null);
  const t = useTranslations("common");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- feature detection must run client-side
    setSupported(hasWebGL());
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {supported === false ? (
        fallback ?? (
          <div className="flex h-full w-full items-center justify-center text-sm text-stone">{t("webglFallback")}</div>
        )
      ) : supported ? (
        <Canvas
          dpr={[1, 2]}
          frameloop={visible ? "always" : "never"}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          {...props}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}
