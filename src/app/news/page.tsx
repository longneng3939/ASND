"use client";

import { useI18n } from "@/i18n";
import { getRecentNews } from "@/data/news";

const categoryLabels: Record<string, { en: string; ko: string }> = {
  notice: { en: "Notice", ko: "공지" },
  media: { en: "Media", ko: "미디어" },
  update: { en: "Update", ko: "업데이트" },
};

export default function NewsPage() {
  const { t, lang } = useI18n();
  const news = getRecentNews();

  return (
    <div className="min-h-screen">
      <section className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
            {lang === "ko" ? "소식" : "News"}
          </p>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none mb-3">
            {t.news.title}
          </h1>
          <p className="text-gray-500 text-base">
            {t.news.subtitle}
          </p>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-3xl">
          {news.length === 0 ? (
            <p className="text-center text-gray-400 py-20 text-sm">{t.news.noNews}</p>
          ) : (
            <div className="divide-y divide-gray-100 border-t border-gray-200">
              {news.map((item) => (
                <article key={item.id} className="py-6 first:pt-8 last:pb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] uppercase tracking-[0.15em] text-gray-400 font-medium">
                      {categoryLabels[item.category]?.[lang as keyof typeof categoryLabels[string]] || categoryLabels[item.category]?.en}
                    </span>
                    <span className="text-gray-200">·</span>
                    <span className="text-xs text-gray-300">
                      {new Date(item.date).toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold mb-1.5 leading-snug">
                    {lang === "ko" ? item.titleKo : item.title}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {lang === "ko" ? item.excerptKo : item.excerpt}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
