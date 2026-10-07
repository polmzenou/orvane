import type { Metadata } from "next";
import Link from "next/link";
import { cormorant, manrope } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — ORVANE Genève",
  description: "Page introuvable · Page not found",
};

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="grain flex min-h-dvh items-center justify-center bg-ink px-6 text-ivory">
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 flex items-center justify-center font-serif text-[40vw] leading-none text-ivory/[0.03]">
          404
        </div>
        <main className="relative max-w-xl text-center">
          <p className="eyebrow mb-6">ORVANE · Genève</p>
          <h1 className="display text-5xl md:text-7xl">Ce moment n&apos;existe pas</h1>
          <p className="mt-4 font-serif text-2xl italic text-ivory/50">This moment does not exist</p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="" className="bg-gold px-8 py-4 text-[0.72rem] uppercase tracking-[0.28em] text-ink transition-colors hover:bg-gold-soft">
              Accueil
            </Link>
            <Link href="" className="border border-gold/50 px-8 py-4 text-[0.72rem] uppercase tracking-[0.28em] text-ivory transition-colors hover:border-gold">
              Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
