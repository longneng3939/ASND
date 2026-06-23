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
    descKo: "관습에 도전하여前所未有の 음악과 콘텐츠를 만듭니다.",
  },
  {
    en: "Fan Hearted",
    ko: "팬과 함께",
    desc: "We build everything with flovers at the center, because fans make the dream real.",
    descKo: "플로버를 중심으로 모든 것을 만듭니다, 팬이 꿈을 현실로 만들기 때문입니다.",
  },
];

export default function AboutPage() {
  const { t, lang } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#fdf8fa] to-white">
      <section className="pt-28 pb-12 md:pb-16 px-4 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[var(--secondary)]/5 rounded-full blur-3xl" />
        <div className="mx-auto max-w-4xl relative z-10">
          <span className="inline-block text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--muted)] bg-[var(--accent-soft)] px-4 py-1.5 rounded-full mb-4">
            {t.about.title}
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-4 text-[var(--foreground)]">
            {t.about.title}
          </h1>
          <p className="text-lg md:text-xl text-[var(--brand-light)] font-medium max-w-xl leading-relaxed">
            &ldquo;{t.about.subtitle}&rdquo;
          </p>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6 md:p-10 shadow-sm">
            <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed mb-10 max-w-3xl">
              {t.about.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {[
                { label: t.about.ceo, value: siteConfig.ceo },
                { label: t.about.founded, value: siteConfig.founded },
                { label: t.about.location, value: siteConfig.location },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-gradient-to-br from-[var(--accent-soft)] to-white rounded-xl p-5 border border-[var(--accent)]/10"
                >
                  <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--muted)] font-medium mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm font-bold text-[var(--foreground)]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--foreground)] mb-3">
              {t.about.vision}
            </h2>
            <p className="text-[var(--muted)] text-base max-w-2xl mx-auto leading-relaxed">
              {t.about.visionText}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-[var(--foreground)] via-[var(--brand-light)] to-[var(--brand-dark)] rounded-2xl p-6 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--accent)]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-[var(--secondary)]/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-6 block">
                {lang === "ko" ? "주요 이정표" : "Milestones"}
              </span>
              <div className="space-y-6">
                {milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] ring-4 ring-[var(--accent)]/20" />
                      {i < milestones.length - 1 && (
                        <div className="w-px flex-1 min-h-[24px] bg-white/10" />
                      )}
                    </div>
                    <div className="pt-0">
                      <span className="text-[11px] font-mono text-white/40">{m.year}</span>
                      <p className="text-sm font-medium text-white/90">
                        {lang === "ko" ? m.ko : m.en}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-xl md:text-2xl font-black text-[var(--foreground)] mb-2">
              {lang === "ko" ? "우리의 가치" : "Our Values"}
            </h2>
            <p className="text-sm text-[var(--muted)]">
              {lang === "ko" ? "ASND를 움직이는 세 가지 원칙" : "Three principles that drive ASND"}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map((v) => (
              <div
                key={v.en}
                className="bg-white rounded-xl border border-[var(--border)] p-6 hover:shadow-md hover:border-[var(--accent)]/30 transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--accent-soft)] flex items-center justify-center mb-4">
                  <span className="w-3 h-3 rounded-full bg-[var(--accent)]" />
                </div>
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
