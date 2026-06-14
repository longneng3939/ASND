"use client";

import Link from "next/link";
import { useI18n } from "@/i18n";

export function HeroBanner() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/30 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--brand)_0%,_transparent_60%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--accent)_0%,_transparent_60%)] opacity-20" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-muted mb-8">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            ASND Label — Est. 2025
          </div>
        </div>

        <h1 className="animate-slide-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6 whitespace-pre-line">
          {t.home.heroTitle}
        </h1>

        <p className="animate-slide-up text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10" style={{ animationDelay: "0.2s" }}>
          {t.home.heroSubtitle}
        </p>

        <div className="animate-slide-up flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: "0.4s" }}>
          <Link
            href="/artists"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full gradient-brand text-white font-semibold hover:opacity-90 transition-opacity"
          >
            {t.home.viewArtists}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full glass text-foreground font-semibold hover:bg-white/10 transition-colors"
          >
            {t.common.learnMore}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
