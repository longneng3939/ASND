"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { en, type Translation } from "./en";
import { ko } from "./ko";

const translations: Record<string, Translation> = { en, ko };

type Lang = "en" | "ko";

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translation;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang] || translations["en"] || en;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
