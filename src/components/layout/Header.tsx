"use client";

import { useState } from "react";
import { MegaMenu } from "./MegaMenu";
import { useTransition } from "./PageTransition";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { navigate } = useTransition();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button onClick={() => navigate("/")} className="flex items-center">
              <span className="text-xl font-black tracking-tight text-white">ASND</span>
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2.5 text-white/70 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <div className="relative w-5 h-3.5">
                <span
                  className={`absolute left-0 top-0 h-[2px] w-full bg-current rounded-sm transition-all duration-300 origin-center ${
                    menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 -mt-[1px] h-[2px] w-full bg-current rounded-sm transition-all duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-0 h-[2px] w-full bg-current rounded-sm transition-all duration-300 origin-center ${
                    menuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      <MegaMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
