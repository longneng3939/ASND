"use client";

import { useI18n } from "@/i18n";
import { getRecentNews } from "@/data/news";

const categoryConfig: Record<string, { en: string; ko: string; color: string; bg: string }> = {
  notice: { en: "Notice", ko: "공지", color: "#1e2a44", bg: "rgba(30,42,68,0.08)" },
  media: { en: "Media", ko: "미디어", color: "#f7c8d8", bg: "rgba(247,200,216,0.15)" },
  update: { en: "Update", ko: "업데이트", color: "#a9d8ff", bg: "rgba(169,216,255,0.15)" },
};

export default function NewsPage() {
  const { t, lang } = useI18n();
  const news = getRecentNews();
  const featured = news[0];
  const rest = news.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#fdf8fa] to-white">
      <section className="pt-28 pb-8 md:pb-12 px-4">
        <div className="mx-auto max-w-4xl">
          <span className="inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--muted)] bg-[var(--accent-soft)] px-4 py-1.5 rounded-full mb-4">
            {lang === "ko" ? "소식" : "News"}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-3 text-[var(--foreground)]">
            {t.news.title}
          </h1>
          <p className="text-[var(--muted)] text-base max-w-lg">
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
              {featured && (
                <article className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[var(--foreground)] via-[var(--brand-light)] to-[var(--brand-dark)] p-6 md:p-10 cursor-default">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--secondary)]/10 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-[11px] font-semibold uppercase tracking-[0.15em] px-3 py-1 rounded-full"
                        style={{
                          color: categoryConfig[featured.category]?.color || "#1e2a44",
                          backgroundColor: categoryConfig[featured.category]?.bg || "rgba(30,42,68,0.08)",
                        }}
                      >
                        {categoryConfig[featured.category]?.[lang as keyof typeof categoryConfig[string]] || categoryConfig[featured.category]?.en}
                      </span>
                      <span className="text-white/40 text-xs">
                        {new Date(featured.date).toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-3xl font-bold text-white leading-snug mb-3 max-w-2xl">
                      {lang === "ko" ? featured.titleKo : featured.title}
                    </h2>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl">
                      {lang === "ko" ? featured.excerptKo : featured.excerpt}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.15em] text-[var(--accent)]">
                      <span>{t.news.readMore}</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </article>
              )}

              <div className="border-t border-[var(--border)] pt-6 space-y-1">
                {rest.map((item) => {
                  const cat = categoryConfig[item.category];
                  return (
                    <article
                      key={item.id}
                      className="group relative p-5 md:p-6 rounded-xl transition-all duration-300 hover:bg-[var(--surface)] hover:shadow-sm cursor-default"
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-4">
                        <div className="flex-shrink-0 hidden md:block">
                          <div className="w-0.5 h-full min-h-[4rem] bg-[var(--border)] group-hover:bg-[var(--accent)] transition-colors duration-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            {cat && (
                              <span
                                className="text-[11px] font-semibold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full"
                                style={{ color: cat.color, backgroundColor: cat.bg }}
                              >
                                {cat[lang as keyof typeof cat] || cat.en}
                              </span>
                            )}
                            <span className="text-[var(--muted)] text-xs">
                              {new Date(item.date).toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                          <h3 className="text-base md:text-lg font-bold text-[var(--foreground)] leading-snug mb-1.5 group-hover:text-[var(--brand-light)] transition-colors">
                            {lang === "ko" ? item.titleKo : item.title}
                          </h3>
                          <p className="text-sm text-[var(--muted)] leading-relaxed line-clamp-2">
                            {lang === "ko" ? item.excerptKo : item.excerpt}
                          </p>
                        </div>
                        <div className="hidden md:flex items-center self-center md:self-center">
                          <div className="w-8 h-8 rounded-full bg-[var(--surface)] group-hover:bg-[var(--accent-soft)] transition-colors duration-300 flex items-center justify-center">
                            <svg className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="text-center pt-8">
                <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                  <span className="w-8 h-px bg-[var(--border)]" />
                  <span>fromis_9</span>
                  <span className="w-8 h-px bg-[var(--border)]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
