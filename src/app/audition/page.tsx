"use client";

import { useI18n } from "@/i18n";

export default function AuditionPage() {
  const { t, lang } = useI18n();

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

  return (
    <div className="min-h-screen">
      <section className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
            {lang === "ko" ? "오디션" : "Audition"}
          </p>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none mb-3">
            {t.audition.title}
          </h1>
          <p className="text-gray-500 text-base max-w-lg">
            {t.audition.subtitle}
          </p>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-3xl">
          <div className="border-t border-gray-200 pt-10">
            <p className="text-base leading-relaxed text-gray-600 mb-10 max-w-2xl">
              {t.audition.description}
            </p>

            <h2 className="text-sm font-bold uppercase tracking-[0.15em] mb-6">
              {t.audition.requirements}
            </h2>

            <ul className="space-y-3 mb-12">
              {(lang === "ko" ? requirementsKo : requirements).map((req, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="text-gray-300 font-mono text-xs mt-0.5 shrink-0 w-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-100 pt-10 mb-10">
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] mb-4">
                {lang === "ko" ? "모집 분야" : "Available Positions"}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t.audition.positions.join(" · ")}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-10">
              <p className="text-sm text-gray-500 mb-4">{t.audition.emailUs}</p>
              <a
                href="mailto:audition@asndent.com"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                audition@asndent.com
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
