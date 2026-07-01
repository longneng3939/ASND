"use client";

import { useI18n } from "@/i18n";
import { getRecentNews } from "@/data/news";

const categoryConfig: Record<string, { en: string; ko: string; color: string; bg: string }> = {
  notice: { en: "Notice", ko: "공지", color: "#1e2a44", bg: "rgba(30,42,68,0.08)" },
  media: { en: "Media", ko: "미디어", color: "#f7c8d8", bg: "rgba(247,200,216,0.15)" },
  update: { en: "Update", ko: "업데이트", color: "#a9d8ff", bg: "rgba(169,216,255,0.15)" },
};

function relativeDate(dateStr: string, lang: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return lang === "ko" ? "예정" : "Upcoming";
  if (diffDays === 0) return lang === "ko" ? "오늘" : "Today";
  if (diffDays === 1) return lang === "ko" ? "어제" : "Yesterday";
  if (diffDays < 7) return lang === "ko" ? `${diffDays}일 전` : `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return lang === "ko" ? `${weeks}주 전` : `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return lang === "ko" ? `${months}개월 전` : `${months} month${months > 1 ? "s" : ""} ago`;
  }
  const years = Math.floor(diffDays / 365);
  return lang === "ko" ? `${years}년 전` : `${years} year${years > 1 ? "s" : ""} ago`;
}

const sectionHeader = (label: string) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="h-px flex-1 bg-[var(--border)]" />
    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
      {label}
    </span>
    <span className="h-px flex-1 bg-[var(--border)]" />
  </div>
);

export default function NewsPage() {
  const { t, lang } = useI18n();
  const news = getRecentNews();

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <section className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-5xl md:text-5xl font-black tracking-tight leading-none mb-3 text-[var(--foreground)]">
            {t.news.title}
          </h1>
          <p className="text-[var(--muted)] text-base max-w-lg mx-auto">
            {t.news.subtitle}
          </p>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-4xl">
          {news.length === 0 ? (
            <p className="text-center text-[var(--muted)] py-20 text-sm">{t.news.noNews}</p>
          ) : (
            <div className="space-y-6">
              {sectionHeader(lang === "ko" ? "최신 소식" : "Latest")}

              {news.map((item, i) => {
                const cat = categoryConfig[item.category];
                const dateLabel = relativeDate(item.date, lang);
                const isNew = relativeDate(item.date, lang) === (lang === "ko" ? "오늘" : "Today") ||
                  relativeDate(item.date, lang) === (lang === "ko" ? "어제" : "Yesterday");
                return (
                  <article
                    key={item.id}
                    className="bg-white rounded-lg border border-[var(--border)] p-6 md:p-8"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {cat && (
                        <span
                          className="text-[11px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-md"
                          style={{ color: cat.color, backgroundColor: cat.bg }}
                        >
                          {cat[lang as keyof typeof cat] || cat.en}
                        </span>
                      )}
                      <span className="text-[var(--muted)] text-xs">{dateLabel}</span>
                      {isNew && (
                        <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--accent)]">
                          {lang === "ko" ? "NEW" : "NEW"}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-[var(--foreground)] leading-snug mb-2">
                      {lang === "ko" ? item.titleKo : item.title}
                    </h3>
                    <p className="text-sm text-[var(--muted)] leading-relaxed">
                      {lang === "ko" ? item.excerptKo : item.excerpt}
                    </p>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
