"use client";

import { useI18n } from "@/i18n";
import { siteConfig } from "@/data/site";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MobileMenu } from "./MobileMenu";
import { useTransition } from "./PageTransition";

const languages = [
  { code: "en", label: "EN" },
  { code: "ko", label: "KR" },
] as const;

const socialLinks = [
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    hoverColor: "hover:text-[#E4405F]",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: siteConfig.social.twitter,
    hoverColor: "hover:text-[#000000]",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: siteConfig.social.youtube,
    hoverColor: "hover:text-[#FF0000]",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function Header() {
  const { t, lang, setLang } = useI18n();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { navigate } = useTransition();

  const nav = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.artists, href: "/artists" },
    { label: t.nav.schedule, href: "/schedule" },
    { label: t.nav.news, href: "/news" },
    { label: t.nav.audition, href: "/audition" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button onClick={() => navigate("/")} className="flex items-center">
              <span className="text-xl font-black tracking-tight">ASND</span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {nav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <button
                    key={item.href}
                    onClick={() => navigate(item.href)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "text-white bg-[#1E2A44]"
                        : "text-muted hover:text-foreground hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-muted ${link.hoverColor} transition-colors p-1.5 rounded-lg hover:bg-surface`}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
                <div className="h-4 w-px bg-border" />
              </div>

              <div className="relative flex items-center bg-gray-100 rounded-lg p-0.5 h-8 w-[72px]">
                <div
                  className="absolute inset-y-0.5 w-1/2 bg-white rounded-md shadow-sm transition-transform duration-200 ease-in-out"
                  style={{ transform: `translateX(${lang === "en" ? "0" : "100"}%)` }}
                />
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code as "en" | "ko")}
                    className="relative z-10 flex-1 text-center text-xs font-medium leading-none text-muted"
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2.5 text-muted hover:text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <div className="relative w-5 h-3.5">
                  <span
                    className={`absolute left-0 top-0 h-[2px] w-full bg-current rounded-sm transition-all duration-300 origin-center ${
                      mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 -mt-[1px] h-[2px] w-full bg-current rounded-sm transition-all duration-300 ${
                      mobileOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 bottom-0 h-[2px] w-full bg-current rounded-sm transition-all duration-300 origin-center ${
                      mobileOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
