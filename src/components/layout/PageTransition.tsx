"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface TransitionContextType {
  navigate: (href: string) => void;
  isLoading: boolean;
}

const TransitionContext = createContext<TransitionContextType>({
  navigate: () => {},
  isLoading: false,
});

export function useTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  const navigate = useCallback((href: string) => {
    setIsLoading(true);
    if (href === pathname) {
      setTimeout(() => setIsLoading(false), 400);
      return;
    }
    router.push(href);
  }, [router, pathname]);

  return (
    <TransitionContext.Provider value={{ navigate, isLoading }}>
      {children}
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1E2A44] animate-fade-in">
          <span className="text-5xl font-black tracking-tight text-white animate-pulse">
            ASND
          </span>
        </div>
      )}
    </TransitionContext.Provider>
  );
}
