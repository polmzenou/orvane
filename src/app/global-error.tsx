"use client";

import Link from "next/link";
import "./globals.css";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="fr">
      <body className="flex min-h-dvh items-center justify-center bg-ink px-6 text-ivory" style={{ fontFamily: "Georgia, serif" }}>
        <main className="max-w-xl text-center">
          <p className="eyebrow mb-6">500 · ORVANE Genève</p>
          <h1 className="text-5xl font-light md:text-6xl">Un rouage s&apos;est grippé</h1>
          <p className="mt-4 text-2xl italic text-ivory/50">A gear has seized</p>
          <p className="mt-8 text-sm leading-relaxed text-ivory/60" style={{ fontFamily: "system-ui, sans-serif" }}>
            Une erreur inattendue est survenue. · An unexpected error occurred.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4" style={{ fontFamily: "system-ui, sans-serif" }}>
            <button
              type="button"
              onClick={() => reset()}
              className="bg-gold px-8 py-4 text-[0.72rem] uppercase tracking-[0.28em] text-ink"
            >
              Réessayer · Retry
            </button>
            <Link href="" className="border border-gold/50 px-8 py-4 text-[0.72rem] uppercase tracking-[0.28em] text-ivory">
              Accueil · Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
