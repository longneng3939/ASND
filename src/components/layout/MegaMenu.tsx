"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/i18n";
import { useTransition } from "./PageTransition";
import { artists } from "@/data/artists";
import { events } from "@/data/schedule";
import { siteConfig } from "@/data/site";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/artists", label: "Artists", labelKo: "아티스트", desc: "Meet our roster", descKo: "아티스트 소개" },
  { href: "/album", label: "Album", labelKo: "앨범", desc: "All releases", descKo: "전체 앨범" },
  { href: "/schedule", label: "Schedule", labelKo: "스케줄", desc: "Upcoming events", descKo: "일정 안내" },
  { href: "/news", label: "News", labelKo: "뉴스", desc: "Latest updates", descKo: "최신 소식" },
  { href: "/audition", label: "Audition", labelKo: "오디션", desc: "Join ASND", descKo: "지원하기" },
  { href: "/about", label: "About", labelKo: "소개", desc: "Our story", descKo: "ASND 소개" },
  { href: "/contact", label: "Contact", labelKo: "문의", desc: "Get in touch", descKo: "연락처" },
  { href: "/creator", label: "Creator", labelKo: "크리에이터", desc: "About the creator", descKo: "제작자 정보" },
];

const socialLinks = [
  {
    label: "YouTube",
    href: siteConfig.social.youtube,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: siteConfig.social.twitter,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const { lang, setLang } = useI18n();
  const menuRef = useRef<HTMLDivElement>(null);
  const { navigate } = useTransition();

  const upcomingEvent = events
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

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

  const handleNav = (href: string) => {
    navigate(href);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      role="dialog"
      aria-modal={isOpen}
      aria-label="Navigation menu"
    >
      <div
        ref={menuRef}
        className={`absolute inset-0 origin-top-right transition-all duration-[400ms] ease-in-out ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <div className="h-full w-full bg-[#050505] text-white overflow-y-auto">
          <div className="flex flex-col min-h-full">
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 md:px-10 py-4 md:py-6">
              <button
                onClick={() => handleNav("/")}
                className="text-xl font-black tracking-tight text-white"
              >
                ASND
              </button>
              <button
                onClick={onClose}
                className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 px-6 md:px-10 pb-10">
              {/* Left: Editorial Nav Links — spans 4 cols */}
              <nav className="md:col-span-4 space-y-0" aria-label="Main navigation">
                {navLinks.map((link, i) => (
                  <button
                    key={link.href}
                    onClick={() => handleNav(link.href)}
                    className="group w-full text-left py-3 md:py-4 border-b border-white/[0.04] transition-all duration-300"
                    style={{ transitionDelay: isOpen ? `${i * 60}ms` : "0ms" }}
                  >
                    <span className="block text-2xl md:text-4xl font-medium tracking-wide text-white/80 group-hover:text-[#F7C8D8] transition-all duration-300">
                      {lang === "ko" ? link.labelKo : link.label}
                    </span>
                    <span className="block text-xs md:text-sm text-white/20 group-hover:text-white/40 transition-all duration-300 mt-1">
                      {lang === "ko" ? link.descKo : link.desc}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Center: Artist Grid — spans 5 cols (desktop) */}
              <div className="md:col-span-5">
                <span className="text-xs font-medium tracking-widest text-white/30 uppercase mb-4 block">
                  {lang === "ko" ? "아티스트" : "Artists"}
                </span>
                <div className="grid grid-cols-3 md:grid-cols-3 gap-3 md:gap-4">
                  {artists.slice(0, 9).map((artist, i) => (
                    <div
                      key={artist.id}
                      onClick={() => handleNav(`/artists/${artist.id}`)}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleNav(`/artists/${artist.id}`); } }}
                      role="button"
                      tabIndex={0}
                      className="group text-left cursor-pointer"
                      style={{ transitionDelay: isOpen ? `${300 + i * 50}ms` : "0ms" }}
                    >
                      <div className="relative overflow-hidden rounded-2xl">
                        <div
                          className="w-full aspect-square rounded-2xl bg-cover bg-center border border-white/[0.06]"
                          style={{
                            backgroundImage: artist.bannerImage ? `url(${artist.bannerImage})` : undefined,
                            backgroundColor: artist.bannerImage ? undefined : (artist.color || "#222"),
                          }}
                        />
                        <div className="absolute inset-0 z-10 transition-transform duration-300 ease-in-out group-hover:translate-x-[70%]">
                          <div
                            className="h-full w-full bg-cover bg-center rounded-2xl border border-white/[0.06]"
                            style={{ backgroundImage: `url(${artist.image})` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Featured + Quick Links + Social — spans 3 cols (desktop) */}
              <div className="md:col-span-3 flex flex-col gap-6">
                {/* Glass panel */}
                <div className="rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06] p-5">
                  <span className="text-xs font-medium tracking-widest text-white/30 uppercase block mb-3">
                    {lang === "ko" ? "다음 일정" : "Upcoming"}
                  </span>
                  {upcomingEvent ? (
                    <div>
                      <p className="text-lg font-semibold text-white/90">
                        {lang === "ko" ? upcomingEvent.titleKo : upcomingEvent.title}
                      </p>
                      <p className="text-sm text-white/40 mt-1">
                        {new Date(upcomingEvent.date).toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US", {
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-white/40">No upcoming events</p>
                  )}
                </div>

                {/* Quick links */}
                <div className="space-y-2">
                  <span className="text-xs font-medium tracking-widest text-white/30 uppercase block">
                    {lang === "ko" ? "바로가기" : "Quick Links"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleNav("/audition")}
                      className="px-4 py-2 text-sm font-medium rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] transition-all duration-200 hover:scale-[1.02]"
                    >
                      {lang === "ko" ? "오디션" : "Audition"}
                    </button>
                    <button
                      onClick={() => handleNav("/contact")}
                      className="px-4 py-2 text-sm font-medium rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] transition-all duration-200 hover:scale-[1.02]"
                    >
                      {lang === "ko" ? "문의" : "Contact"}
                    </button>
                    <button
                      onClick={() => handleNav("/news")}
                      className="px-4 py-2 text-sm font-medium rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] transition-all duration-200 hover:scale-[1.02]"
                    >
                      {lang === "ko" ? "뉴스" : "News"}
                    </button>
                  </div>
                </div>

                {/* Social + Language */}
                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-3">
                    {socialLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-9 w-9 flex items-center justify-center rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white/50 hover:text-white transition-all duration-200 hover:scale-110"
                        aria-label={link.label}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setLang("en")}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                        lang === "en"
                          ? "bg-white text-black"
                          : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      EN
                    </button>
                    <span className="text-white/20 text-xs">/</span>
                    <button
                      onClick={() => setLang("ko")}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                        lang === "ko"
                          ? "bg-white text-black"
                          : "text-white/50 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      KR
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
