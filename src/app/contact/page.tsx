"use client";

import { useI18n } from "@/i18n";

export default function ContactPage() {
  const { t } = useI18n();

  const categories = [
    { label: t.contact.business, email: "business@asndent.com" },
    { label: t.contact.press, email: "press@asndent.com" },
    { label: t.contact.fan, email: "fan@asndent.com" },
  ];

  return (
    <div className="min-h-screen">
      <section className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
            Contact
          </p>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none mb-3">
            {t.contact.title}
          </h1>
          <p className="text-gray-500 text-base">
            {t.contact.subtitle}
          </p>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-3xl">
          <div className="border-t border-gray-200 pt-10">
            {/* Contact categories */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-200 mb-14">
              {categories.map((cat) => (
                <div key={cat.label} className="bg-white p-6">
                  <h3 className="text-sm font-bold mb-2">{cat.label}</h3>
                  <a
                    href={`mailto:${cat.email}`}
                    className="text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    {cat.email}
                  </a>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="border-t border-gray-100 pt-10">
              <form className="max-w-xl" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">
                      {t.contact.formName}
                    </label>
                    <input
                      type="text"
                      className="w-full px-0 py-2 border-b border-gray-200 text-sm text-foreground placeholder:text-gray-300 focus:outline-none focus:border-black transition-colors bg-transparent"
                      placeholder={t.contact.formName}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">
                      {t.contact.formEmail}
                    </label>
                    <input
                      type="email"
                      className="w-full px-0 py-2 border-b border-gray-200 text-sm text-foreground placeholder:text-gray-300 focus:outline-none focus:border-black transition-colors bg-transparent"
                      placeholder={t.contact.formEmail}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-medium text-gray-500 mb-2">
                    {t.contact.formSubject}
                  </label>
                  <input
                    type="text"
                    className="w-full px-0 py-2 border-b border-gray-200 text-sm text-foreground placeholder:text-gray-300 focus:outline-none focus:border-black transition-colors bg-transparent"
                    placeholder={t.contact.formSubject}
                  />
                </div>

                <div className="mb-10">
                  <label className="block text-xs font-medium text-gray-500 mb-2">
                    {t.contact.formMessage}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-0 py-2 border-b border-gray-200 text-sm text-foreground placeholder:text-gray-300 focus:outline-none focus:border-black transition-colors bg-transparent resize-none"
                    placeholder={t.contact.formMessage}
                  />
                </div>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  {t.contact.formSubmit}
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
