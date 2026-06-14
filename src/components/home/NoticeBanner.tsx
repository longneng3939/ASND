"use client";

import Link from "next/link";
import { useI18n } from "@/i18n";
import { getRecentNews } from "@/data/news";

export function NoticeBanner() {
  const { t, lang } = useI18n();
  const latest = getRecentNews(1)[0];

  if (!latest) return null;

  return (
    <section className="border-b border-black/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-4">
          <span className="text-xs font-semibold text-muted uppercase tracking-wider shrink-0">
            {t.news.title}
          </span>
          <div className="h-3 w-px bg-black/10" />
          <Link
            href="/news"
            className="text-sm text-muted hover:text-foreground transition-colors truncate"
          >
            {lang === "ko" ? latest.titleKo : latest.title}
          </Link>
          <span className="text-xs text-muted shrink-0 ml-auto">
            {latest.date}
          </span>
          <Link
            href="/news"
            className="text-xs text-brand-light hover:underline shrink-0"
          >
            {t.common.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
