"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
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
  { href: "/creator", label: "Creator", labelKo: "크리에이터", desc: "About the creator", descKo: "제작자 정보" },
];

const socialLinks = [
  {
    label: "YouTube",
    href: siteConfig.social.youtube,
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: siteConfig.social.twitter,
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

const EASE = "ease-[cubic-bezier(0.76,0,0.24,1)]";

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const { lang, setLang } = useI18n();
  const menuRef = useRef<HTMLDivElement>(null);
  const { navigate } = useTransition();
  const pathname = usePathname();

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

  /** Staggered entrance delay — only when opening, instant on close */
  const delay = (ms: number) => ({
    transitionDelay: isOpen ? `${ms}ms` : "0ms",
  });

  const reveal = `transition-all duration-700 ease-out ${isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`;

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? "" : "pointer-events-none"}`}
      role="dialog"
      aria-modal={isOpen}
      aria-hidden={!isOpen}
      aria-label="Navigation menu"
    >
      {/* Curtain panel — wipes down from the top */}
      <div
        className={`absolute inset-0 transition-[clip-path] duration-[850ms] ${EASE}`}
        style={{ clipPath: isOpen ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
      >
        <div className="relative h-full w-full overflow-hidden bg-[#050505] text-white">
          {/* Ambient brand glows */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-[#6C3FD1]/[0.14] blur-[120px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-48 -right-32 h-[30rem] w-[30rem] rounded-full bg-[#F7C8D8]/[0.07] blur-[120px]"
          />

          <div
            ref={menuRef}
            className="relative flex h-full flex-col overflow-y-auto overscroll-contain pt-16"
          >
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 md:px-10">
              {/* Content grid */}
              <div className="grid flex-1 grid-cols-1 gap-10 py-8 md:grid-cols-12 md:gap-8 md:py-12 lg:gap-12">
                {/* Left: Editorial nav — 5 cols */}
                <nav className="md:col-span-5" aria-label="Main navigation">
                  <span
                    className={`mb-4 block text-[11px] font-semibold uppercase tracking-[0.3em] text-white/25 ${reveal}`}
                    style={delay(150)}
                  >
                    {lang === "ko" ? "메뉴" : "Menu"}
                  </span>
                  <ul>
                    {navLinks.map((link, i) => {
                      const isActive =
                        pathname === link.href ||
                        (link.href !== "/" && pathname.startsWith(link.href));
                      const label = lang === "ko" ? link.labelKo : link.label;
                      return (
                        <li
                          key={link.href}
                          className={reveal}
                          style={delay(200 + i * 60)}
                        >
                          <button
                            onClick={() => handleNav(link.href)}
                            className="group flex w-full items-center gap-4 border-b border-white/[0.06] py-3.5 text-left md:py-4"
                          >
                            <span
                              className={`font-mono text-[11px] tracking-wider transition-colors duration-300 ${
                                isActive
                                  ? "text-[#F7C8D8]"
                                  : "text-white/25 group-hover:text-[#F7C8D8]"
                              }`}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>

                            {/* Rolling dual-label hover */}
                            <span className="relative block flex-1 overflow-hidden">
                              <span
                                className={`block text-2xl font-semibold tracking-tight transition-transform duration-500 ${EASE} group-hover:-translate-y-full md:text-4xl lg:text-[2.75rem] lg:leading-[1.15] ${
                                  isActive ? "text-white" : "text-white/75"
                                }`}
                              >
                                {label}
                              </span>
                              <span
                                aria-hidden
                                className={`absolute inset-0 block translate-y-full text-2xl font-semibold tracking-tight text-[#F7C8D8] transition-transform duration-500 ${EASE} group-hover:translate-y-0 md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]`}
                              >
                                {label}
                              </span>
                            </span>

                            <span className="hidden text-right text-[11px] leading-snug text-white/25 transition-colors duration-300 group-hover:text-white/50 lg:block lg:max-w-[7rem]">
                              {lang === "ko" ? link.descKo : link.desc}
                            </span>

                            <svg
                              className={`h-4 w-4 shrink-0 transition-all duration-300 ${EASE} ${
                                isActive
                                  ? "text-[#F7C8D8]"
                                  : "-translate-x-2 text-white/50 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.5}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
                            </svg>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Center: Artist grid — 4 cols */}
                <div className="md:col-span-4">
                  <span
                    className={`mb-4 block text-[11px] font-semibold uppercase tracking-[0.3em] text-white/25 ${reveal}`}
                    style={delay(350)}
                  >
                    {lang === "ko" ? "아티스트" : "Artists"}
                  </span>
                  <div className="grid grid-cols-3 gap-3 md:gap-4">
                    {artists.slice(0, 9).map((artist, i) => (
                      <div
                        key={artist.id}
                        onClick={() => handleNav(`/artists/${artist.id}`)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleNav(`/artists/${artist.id}`);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label={artist.name}
                        className={`group cursor-pointer rounded-2xl transition-all duration-700 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7C8D8]/60 ${
                          isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-95 opacity-0"
                        }`}
                        style={delay(400 + i * 45)}
                      >
                        <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/[0.06] transition-shadow duration-300 group-hover:ring-[#F7C8D8]/40 group-hover:shadow-[0_8px_30px_rgba(247,200,216,0.12)]">
                          <div
                            className="aspect-square w-full rounded-2xl bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
                            style={{
                              backgroundImage: artist.bannerImage ? `url(${artist.bannerImage})` : undefined,
                              backgroundColor: artist.bannerImage ? undefined : artist.color || "#222",
                            }}
                          />
                          <div
                            className={`absolute inset-0 z-10 transition-transform duration-500 ${EASE} group-hover:translate-x-[70%]`}
                          >
                            <div
                              className="h-full w-full rounded-2xl bg-cover bg-center ring-1 ring-white/[0.06]"
                              style={{ backgroundImage: `url(${artist.image})` }}
                            />
                          </div>
                          {/* Name overlay on hover */}
                          <div className="pointer-events-none absolute inset-0 z-20 flex items-end rounded-2xl bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <span className="w-full truncate p-2 text-[10px] font-semibold uppercase tracking-wider text-white">
                              {lang === "ko" ? artist.nameKo : artist.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Featured + Quick Links + Social — 3 cols */}
                <div className="flex flex-col gap-6 md:col-span-3">
                  {/* Upcoming event glass panel */}
                  <div
                    className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-xl transition-colors duration-300 hover:border-[#F7C8D8]/30 ${reveal}`}
                    style={delay(500)}
                    onClick={() => handleNav("/schedule")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleNav("/schedule");
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <span className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#F7C8D8] to-[#6C3FD1]" />
                    <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.3em] text-white/30">
                      {lang === "ko" ? "다음 일정" : "Upcoming"}
                    </span>
                    {upcomingEvent ? (
                      <div>
                        <p className="text-lg font-semibold leading-snug text-white/90 transition-colors duration-300 group-hover:text-white">
                          {lang === "ko" ? upcomingEvent.titleKo : upcomingEvent.title}
                        </p>
                        <p className="mt-1 text-sm text-white/40">
                          {new Date(upcomingEvent.date).toLocaleDateString(
                            lang === "ko" ? "ko-KR" : "en-US",
                            { month: "long", day: "numeric" }
                          )}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-white/40">No upcoming events</p>
                    )}
                  </div>

                  {/* Quick links */}
                  <div className={reveal} style={delay(560)}>
                    <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.3em] text-white/25">
                      {lang === "ko" ? "바로가기" : "Quick Links"}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { href: "/audition", en: "Audition", ko: "오디션" },
                        { href: "/news", en: "News", ko: "뉴스" },
                      ].map((q) => (
                        <button
                          key={q.href}
                          onClick={() => handleNav(q.href)}
                          className="group/btn flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.05] px-4 py-2 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/30 hover:bg-white hover:text-black"
                        >
                          {lang === "ko" ? q.ko : q.en}
                          <svg
                            className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Social + Language */}
                  <div className={`mt-auto space-y-5 pt-2 ${reveal}`} style={delay(620)}>
                    <div className="flex items-center gap-3">
                      {socialLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.05] text-white/50 transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-black"
                          aria-label={link.label}
                        >
                          {link.icon}
                        </a>
                      ))}
                    </div>

                    <div className="flex w-fit items-center gap-1 rounded-full border border-white/[0.1] p-1">
                      {(["en", "ko"] as const).map((l) => (
                        <button
                          key={l}
                          onClick={() => setLang(l)}
                          className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 ${
                            lang === l
                              ? "bg-white text-black"
                              : "text-white/40 hover:text-white"
                          }`}
                        >
                          {l === "en" ? "EN" : "KR"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom marquee */}
              <div
                className={`overflow-hidden border-t border-white/[0.06] py-4 ${reveal}`}
                style={delay(700)}
              >
                <div className="animate-menu-marquee flex w-max whitespace-nowrap">
                  {[0, 1].map((copy) => (
                    <span
                      key={copy}
                      aria-hidden={copy === 1}
                      className="flex items-center text-xs font-medium uppercase tracking-[0.35em] text-white/15"
                    >
                      {Array.from({ length: 4 }).map((_, i) => (
                        <span key={i} className="flex items-center">
                          <span className="mx-8">{siteConfig.tagline}</span>
                          <span className="text-[#F7C8D8]/25">✦</span>
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
