"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface TransitionContextType {
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  navigate: () => {},
});

export function useTransition() {
  return useContext(TransitionContext);
}

const MAX_LOADING_MS = 2000;

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setIsLoading(false);
  }

  const clearLoading = useCallback(() => {
    setIsLoading(false);
    if (safetyTimer.current) {
      clearTimeout(safetyTimer.current);
      safetyTimer.current = null;
    }
  }, []);

  useEffect(() => {
    if (safetyTimer.current) {
      clearTimeout(safetyTimer.current);
      safetyTimer.current = null;
    }
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (safetyTimer.current) clearTimeout(safetyTimer.current);
    };
  }, []);

  const navigate = useCallback(
    (href: string) => {
      setIsLoading(true);
      if (safetyTimer.current) clearTimeout(safetyTimer.current);
      safetyTimer.current = setTimeout(() => clearLoading(), MAX_LOADING_MS);

      if (href === pathname) {
        setTimeout(() => clearLoading(), 400);
        return;
      }
      router.push(href);
    },
    [router, pathname, clearLoading]
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1E2A44] animate-fade-in">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-5xl font-black tracking-tight text-white animate-pulse"
            aria-label="Go to home page"
          >
            ASND
          </button>
        </div>
      )}
    </TransitionContext.Provider>
  );
}
