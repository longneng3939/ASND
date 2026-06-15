"use client";

import { useI18n } from "@/i18n";
import { siteConfig } from "@/data/site";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen">
      <section className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
            About
          </p>
          <h1 className="text-3xl sm:text-6xl font-black tracking-tight leading-none mb-3">
            {t.about.title}
          </h1>
          <p className="text-gray-500 text-base max-w-lg">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-3xl">
          <div className="border-t border-gray-200 pt-10">
            <p className="text-base leading-relaxed text-gray-600 mb-12 max-w-2xl">
              {t.about.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-200 mb-12">
              <div className="bg-white p-6">
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-1">
                  {t.about.ceo}
                </p>
                <p className="text-sm font-medium">{siteConfig.ceo}</p>
              </div>
              <div className="bg-white p-6">
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-1">
                  {t.about.founded}
                </p>
                <p className="text-sm font-medium">{siteConfig.founded}</p>
              </div>
              <div className="bg-white p-6">
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-1">
                  {t.about.location}
                </p>
                <p className="text-sm font-medium">{siteConfig.location}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-10">
              <h2 className="text-sm font-bold uppercase tracking-[0.15em] mb-4">
                {t.about.vision}
              </h2>
              <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                {t.about.visionText}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
