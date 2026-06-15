"use client";

import { type ReactNode } from "react";
import { I18nProvider } from "@/i18n";
import { TransitionProvider } from "@/components/layout/PageTransition";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <TransitionProvider>{children}</TransitionProvider>
    </I18nProvider>
  );
}
