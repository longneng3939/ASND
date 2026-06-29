"use client";

import { useI18n } from "@/i18n";

const requirements = [
  "Age 10-25 (born 2000-2015)",
  "Any nationality (must be able to reside in Korea)",
  "No exclusive contract with other agencies",
  "Basic proficiency in Korean (preferred)",
];

const requirementsKo = [
  "만 10세 ~ 25세 (2000년 ~ 2015년생)",
  "국적 제한 없음 (한국 거주 가능자)",
  "타 기획사와 전속계약이 없는 자",
  "기초 한국어 소통 가능자 (우대)",
];

function StarDeco({ className, color }: { className?: string; color: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill={color}>
      <path d="M10 0l2.5 7.5L20 10l-7.5 2.5L10 20l-2.5-7.5L0 10l7.5-2.5L10 0z" />
    </svg>
  );
}

export default function AuditionPage() {
  const { t, lang } = useI18n();

  const positionColors = [
    { bg: "bg-[var(--accent)]", text: "text-white" },
    { bg: "bg-[var(--secondary)]", text: "text-[var(--foreground)]" },
    { bg: "bg-[var(--foreground)]", text: "text-white" },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <section className="relative pt-28 pb-20 px-4 bg-[var(--accent-soft)] overflow-hidden">
        <StarDeco color="var(--accent)" className="absolute top-8 right-12 w-5 h-5" />
        <StarDeco color="var(--secondary)" className="absolute bottom-16 left-16 w-4 h-4" />
        <StarDeco color="var(--accent)" className="absolute top-20 left-1/3 w-3 h-3" />
        <div className="mx-auto max-w-4xl relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-0.5 bg-[var(--accent)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--accent)] font-semibold">
              {lang === "ko" ? "오디션" : "Audition"}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none mb-4 text-[var(--foreground)]">
            {t.audition.title}
          </h1>
          <p className="text-lg md:text-xl text-[var(--brand-light)] font-medium max-w-xl leading-relaxed">
            {t.audition.subtitle}
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 -mt-10">
        <div className="mx-auto max-w-4xl">
          <div className="bg-white border border-[var(--border)] p-8 md:p-10">
            <div className="flex items-center gap-2 mb-8">
              <span className="w-10 h-1 bg-[var(--accent)]" />
              <span className="w-6 h-1 bg-[var(--secondary)]" />
              <span className="w-3 h-1 bg-[var(--foreground)]" />
            </div>

            <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed mb-12 max-w-3xl">
              {t.audition.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--foreground)] mb-6">
                  {t.audition.requirements}
                </h2>
                <ul className="space-y-5">
                  {(lang === "ko" ? requirementsKo : requirements).map((req, i) => (
                    <li key={i} className="flex items-start gap-4 pl-4 border-l-4 border-[var(--accent)]">
                      <span className="text-xs font-bold text-[var(--accent)] shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm text-[var(--foreground)] font-medium">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[var(--surface)] p-6 border border-[var(--border)]">
                <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--foreground)] mb-6">
                  {lang === "ko" ? "모집 분야" : "Positions"}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {t.audition.positions.map((pos, i) => {
                    const c = positionColors[i % positionColors.length];
                    return (
                      <span
                        key={pos}
                        className={`text-xs font-bold uppercase tracking-[0.1em] px-3 py-1.5 ${c.bg} ${c.text}`}
                      >
                        {pos}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="border-t-2 border-[var(--accent-soft)] pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[var(--foreground)] mb-1">
                  {lang === "ko" ? "지원 방법" : "How to Apply"}
                </p>
                <p className="text-sm text-[var(--muted)]">{t.audition.emailUs}</p>
              </div>
              <a
                href="mailto:audition@asndent.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--foreground)] text-white text-sm font-bold hover:bg-[var(--brand-light)] transition-colors"
              >
                audition@asndent.com
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            <div className="flex justify-end items-center gap-2 mt-8">
              <StarDeco color="var(--foreground)" className="w-3 h-3" />
              <span className="w-3 h-0.5 bg-[var(--foreground)]" />
              <span className="w-6 h-0.5 bg-[var(--secondary)]" />
              <span className="w-10 h-0.5 bg-[var(--accent)]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
