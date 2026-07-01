"use client";

import { useI18n } from "@/i18n";
import { siteConfig } from "@/data/site";

const milestones = [
  { year: "2025.01", en: "ASND Label Founded", ko: "ASND 레이블 설립" },
  { year: "2025.02", en: "fromis_9 joins ASND", ko: "프로미스나인 합류" },
  { year: "2025.03", en: "fromis_9 Trademark Secured", ko: "프로미스나인 상표권 획득" },
  { year: "2025.04", en: "Wendy signs with ASND", ko: "웬디 전속계약 체결" },
  { year: "2025.06", en: "fromis_9 'I Like You Better' Release", ko: "프로미스나인 'I Like You Better' 발매" },
];

const values = [
  {
    en: "Artists First",
    ko: "아티스트 우선",
    desc: "Every decision starts with what's best for our artists and their growth.",
    descKo: "모든 결정은 아티스트의 성장을 최우선으로 합니다.",
  },
  {
    en: "Break Boundaries",
    ko: "경계를 넘다",
    desc: "We challenge conventions to create music and content that's never been done before.",
    descKo: "관습에 도전하여 전례 없는 음악과 콘텐츠를 만듭니다.",
  },
  {
    en: "Fan Hearted",
    ko: "팬과 함께",
    desc: "We build everything with flovers at the center, because fans make the dream real.",
    descKo: "플로버를 중심으로 모든 것을 만듭니다, 팬이 꿈을 현실로 만들기 때문입니다.",
  },
];

const sectionHeader = (label: string) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="h-px flex-1 bg-[var(--border)]" />
    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
      {label}
    </span>
    <span className="h-px flex-1 bg-[var(--border)]" />
  </div>
);

export default function AboutPage() {
  const { t, lang } = useI18n();

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <section className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl sm:text-5xl md:text-5xl font-black tracking-tight leading-none mb-4 text-[var(--foreground)]">
            {t.about.title}
          </h1>
          <p className="text-base md:text-lg text-[var(--muted)] max-w-lg mx-auto leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="bg-white rounded-lg border border-[var(--border)] p-8 md:p-12">
            <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed mb-10 max-w-3xl">
              {t.about.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: t.about.ceo, value: siteConfig.ceo },
                { label: t.about.founded, value: siteConfig.founded },
                { label: t.about.location, value: siteConfig.location },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[var(--surface)] rounded-md p-4 border border-[var(--border)]"
                >
                  <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--muted)] font-medium mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="bg-white rounded-lg border border-[var(--border)] p-8 md:p-12">
            <div className="max-w-2xl">
              <h2 className="text-xl md:text-2xl font-black text-[var(--foreground)] mb-3">
                {t.about.vision}
              </h2>
              <p className="text-[var(--muted)] text-base leading-relaxed">
                {t.about.visionText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-4xl">
          {sectionHeader(lang === "ko" ? "주요 이정표" : "Milestones")}
          <div className="bg-white rounded-lg border border-[var(--border)] p-8 md:p-12">
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-[var(--brand)]" />
                    {i < milestones.length - 1 && (
                      <div className="w-px flex-1 min-h-[24px] bg-[var(--border)]" />
                    )}
                  </div>
                  <div className="pt-0">
                    <span className="text-[11px] font-mono text-[var(--muted)]">{m.year}</span>
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      {lang === "ko" ? m.ko : m.en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-4xl">
          {sectionHeader(lang === "ko" ? "우리의 가치" : "Our Values")}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <div
                key={v.en}
                className="bg-white rounded-lg border border-[var(--border)] p-6"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--accent)] mb-3 block">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-bold text-[var(--foreground)] mb-2">
                  {lang === "ko" ? v.ko : v.en}
                </h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">
                  {lang === "ko" ? v.descKo : v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
