"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/i18n";

interface NoticeBannerProps {
  id: string;
  title: string;
  titleKo?: string;
  message: string;
  messageKo?: string;
  link?: string;
  linkText?: string;
  linkTextKo?: string;
  variant?: "info" | "warning" | "urgent";
}

export function NoticeBanner({
  id,
  title,
  titleKo,
  message,
  messageKo,
  link,
  linkText,
  linkTextKo,
  variant = "info",
}: NoticeBannerProps) {
  const { lang } = useI18n();
  const storageKey = `notice-dismissed-${id}`;
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (localStorage.getItem(storageKey) === "true") {
      setIsVisible(false);
    }
  }, [storageKey]);

  const displayTitle = lang === "ko" && titleKo ? titleKo : title;
  const displayMessage = lang === "ko" && messageKo ? messageKo : message;
  const displayLinkText = lang === "ko" && linkTextKo ? linkTextKo : linkText;

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(storageKey, "true");
  };

  if (!isVisible) return null;

  const variantStyles = {
    info: "bg-black text-white",
    warning: "bg-amber-500 text-white",
    urgent: "bg-red-500 text-white",
  };

  return (
    <div
      className={`relative ${variantStyles[variant]} px-4 py-3`}
      role="alert"
      aria-live="polite"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {variant === "warning" && (
              <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            {variant === "urgent" && (
              <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span className="font-semibold text-sm">{displayTitle}</span>
          </div>
          <p className="text-sm opacity-90 mt-0.5 ml-7">{displayMessage}</p>
          {link && displayLinkText && (
            <a
              href={link}
              className="text-sm underline ml-7 hover:opacity-80 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              {displayLinkText}
            </a>
          )}
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-white rounded"
          aria-label="Dismiss notice"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
