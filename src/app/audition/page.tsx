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

function Star({ className, color }: { className?: string; color: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill={color}>
      <path d="M10 0l2.5 7.5L20 10l-7.5 2.5L10 20l-2.5-7.5L0 10l7.5-2.5L10 0z" />
    </svg>
  );
}

function Diamond({ className, color }: { className?: string; color: string }) {
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        width: "100%",
        height: "100%",
        backgroundColor: color,
        transform: "rotate(45deg)",
      }}
    />
  );
}

const positionColors = [
  { bg: "bg-[var(--accent)]", text: "text-white" },
  { bg: "bg-[var(--secondary)]", text: "text-[var(--foreground)]" },
  { bg: "bg-[var(--foreground)]", text: "text-white" },
];

const requirementAccents = [
  "border-[var(--accent)]",
  "border-[var(--secondary)]",
  "border-[var(--accent)]",
  "border-[var(--secondary)]",
];

export default function AuditionPage() {
  const { t, lang } = useI18n();

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <section className="relative pt-28 pb-24 px-4 bg-[var(--accent-soft)] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Star color="var(--accent)" className="absolute top-8 right-12 w-6 h-6" />
          <Star color="var(--secondary)" className="absolute top-6 right-32 w-3 h-3" />
          <Star color="var(--accent)" className="absolute top-20 left-[15%] w-4 h-4" />
          <Star color="var(--secondary)" className="absolute top-40 right-[20%] w-5 h-5" />
          <Star color="var(--accent)" className="absolute bottom-16 left-[8%] w-5 h-5" />
          <Star color="var(--secondary)" className="absolute bottom-8 right-[15%] w-4 h-4" />
          <Star color="var(--accent)" className="absolute bottom-24 right-[30%] w-3 h-3" />
          <Star color="var(--accent)" className="absolute top-12 left-[40%] w-2 h-2" />
          <Star color="var(--secondary)" className="absolute top-24 right-[10%] w-2 h-2" />
          <Star color="var(--foreground)" className="absolute bottom-10 left-[25%] w-2 h-2" />

          <div className="absolute top-16 right-1/4 w-2 h-2 bg-[var(--accent)]" />
          <div className="absolute bottom-20 left-[35%] w-1.5 h-1.5 bg-[var(--secondary)]" />
          <div className="absolute top-32 left-[5%] w-2 h-2 bg-[var(--accent)]" />

          <div style={{ position: "absolute", top: "25%", left: "8%", width: "6px", height: "6px" }}>
            <Diamond color="var(--accent)" />
          </div>
          <div style={{ position: "absolute", bottom: "30%", right: "8%", width: "5px", height: "5px" }}>
            <Diamond color="var(--secondary)" />
          </div>
          <div style={{ position: "absolute", top: "60%", left: "45%", width: "4px", height: "4px" }}>
            <Diamond color="var(--accent)" />
          </div>
        </div>
        <div className="mx-auto max-w-4xl relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-1 bg-[var(--accent)]" />
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

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-4xl -mt-6">
          <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed mb-14 max-w-3xl bg-white p-8 border border-[var(--border)] border-l-[var(--accent)] border-l-4">
            {t.audition.description}
          </p>

          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--foreground)]">
                {t.audition.requirements}
              </h2>
              <span className="flex-1 h-px bg-[var(--border)]" />
              <Star color="var(--accent)" className="w-3 h-3 shrink-0" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(lang === "ko" ? requirementsKo : requirements).map((req, i) => (
                <div
                  key={i}
                  className={`bg-white border border-[var(--border)] border-t-4 ${requirementAccents[i]} p-5`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-xs font-bold text-white bg-[var(--foreground)] w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm text-[var(--foreground)] font-medium leading-relaxed">{req}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-14 bg-[var(--accent-soft)] border border-[var(--accent)]/20 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Star color="var(--accent)" className="w-3 h-3 shrink-0" />
              <span className="flex-1 h-px bg-[var(--accent)]/20" />
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[var(--accent)]">
                {lang === "ko" ? "모집 분야" : "Positions"}
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {t.audition.positions.map((pos, i) => {
                const c = positionColors[i % positionColors.length];
                return (
                  <span
                    key={pos}
                    className={`text-xs font-bold uppercase tracking-[0.1em] px-4 py-2 ${c.bg} ${c.text}`}
                  >
                    {pos}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="bg-[var(--foreground)] p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-white mb-1">
                {lang === "ko" ? "지원 방법" : "How to Apply"}
              </p>
              <p className="text-sm text-white/60">{t.audition.emailUs}</p>
            </div>
            <a
              href="mailto:audition@asndent.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--foreground)] text-sm font-bold hover:bg-[var(--accent-soft)] transition-colors"
            >
              audition@asndent.com
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-0.5 bg-[var(--accent)]" />
              <span className="w-4 h-0.5 bg-[var(--secondary)]" />
              <span className="w-6 h-0.5 bg-[var(--accent)]" />
            </div>
            <div className="flex items-center gap-1.5">
              <Star color="var(--accent)" className="w-3 h-3" />
              <Star color="var(--secondary)" className="w-2 h-2" />
              <Star color="var(--foreground)" className="w-2 h-2" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
