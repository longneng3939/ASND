"use client";

import { useEffect, useState } from "react";
import { MegaMenu } from "./MegaMenu";
import { useTransition } from "./PageTransition";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { navigate } = useTransition();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goHome = () => {
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
          menuOpen
            ? "border-b border-transparent bg-transparent"
            : scrolled
              ? "border-b border-white/[0.08] bg-black/75 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
              : "border-b border-white/[0.06] bg-black"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button
              onClick={goHome}
              className="group relative flex items-center"
              aria-label="Go to homepage"
            >
              <span className="text-xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-[#F7C8D8]">
                ASND
              </span>
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#F7C8D8] transition-all duration-300 ease-out group-hover:w-full" />
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="group flex min-h-[44px] items-center gap-3"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className="hidden overflow-hidden text-[11px] font-semibold uppercase tracking-[0.3em] sm:block">
                <span
                  className={`block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                    menuOpen ? "-translate-y-full" : "translate-y-0"
                  }`}
                >
                  <span className="block text-white/40 transition-colors duration-300 group-hover:text-white">
                    Menu
                  </span>
                  <span className="absolute inset-0 block translate-y-full text-white">
                    Close
                  </span>
                </span>
              </span>
              <span
                className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                  menuOpen
                    ? "border-white/40 bg-white/[0.06]"
                    : "border-white/15 group-hover:border-white/40 group-hover:bg-white/[0.04]"
                }`}
              >
                <span className="relative block h-[10px] w-[18px]">
                  <span
                    className={`absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                      menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 bottom-0 h-[1.5px] w-full rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                      menuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
                    }`}
                  />
                </span>
              </span>
            </button>
          </div>
        </div>
      </header>

      <MegaMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
