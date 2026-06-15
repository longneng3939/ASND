"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/i18n";
import { useTransition } from "./PageTransition";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/artists", label: "Artists", labelKo: "아티스트" },
  { href: "/schedule", label: "Schedule", labelKo: "스케줄" },
  { href: "/news", label: "News", labelKo: "뉴스" },
  { href: "/audition", label: "Audition", labelKo: "오디션" },
  { href: "/about", label: "About", labelKo: "소개" },
  { href: "/contact", label: "Contact", labelKo: "문의" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { lang, setLang } = useI18n();
  const menuRef = useRef<HTMLDivElement>(null);
  const { navigate } = useTransition();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const focusableEls = menuRef.current.querySelectorAll(
        'a, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusableEls[0] as HTMLElement;
      const last = focusableEls[focusableEls.length - 1] as HTMLElement;

      const handleTab = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTab);
      first?.focus();

      return () => document.removeEventListener("keydown", handleTab);
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      role="dialog"
      aria-modal={isOpen}
      aria-label="Mobile menu"
    >
      <div
        ref={menuRef}
        className="absolute inset-0 bg-white transition-[clip-path] duration-[400ms] ease-in-out"
        style={{
          clipPath: `circle(${isOpen ? "150%" : "0%"} at calc(100% - 44px) 36px)`,
        }}
      >
        <div
          className={`flex flex-col h-full transition-opacity duration-200 ${
            isOpen ? "opacity-100 delay-150" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-end p-4">
            <button
              onClick={onClose}
              className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-muted hover:text-foreground transition-colors"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-4" aria-label="Mobile navigation">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => { navigate(link.href); onClose(); }}
                    className="block w-full text-left px-4 py-4 text-lg font-medium hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-black min-h-[52px] flex items-center"
                  >
                    {lang === "ko" ? link.labelKo : link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center justify-between px-4">
              <span className="text-sm text-muted">{lang === "en" ? "Language" : "언어"}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { setLang("en"); onClose(); }}
                  className={`px-2.5 py-1.5 text-sm rounded transition-colors ${
                    lang === "en" ? "bg-[#1E2A44] text-white font-medium" : "text-muted hover:text-foreground"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => { setLang("ko"); onClose(); }}
                  className={`px-2.5 py-1.5 text-sm rounded transition-colors ${
                    lang === "ko" ? "bg-[#1E2A44] text-white font-medium" : "text-muted hover:text-foreground"
                  }`}
                >
                  KR
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-4 px-4">
              <a
                href="https://www.youtube.com/@ASNDofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="YouTube"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/asnd_official_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://x.com/asnd_official_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="Twitter/X"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
