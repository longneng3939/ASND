"use client";

import { useI18n } from "@/i18n";

export function LanguageToggle() {
  const { lang, setLang } = useI18n();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "ko" : "en")}
      className="text-sm font-medium text-muted hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-black/5"
      aria-label="Toggle language"
    >
      {lang === "en" ? "KR" : "EN"}
    </button>
  );
}
