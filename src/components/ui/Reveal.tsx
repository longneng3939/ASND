"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

type RevealAnimation = "cinematic-fade" | "cinematic-img-reveal" | "text-rise-blur";

interface UseRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function useReveal<T extends HTMLElement = HTMLElement>(options: UseRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -8% 0px", once = true } = options;
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, visible };
}

interface RevealProps {
  children: ReactNode;
  animation?: RevealAnimation;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

export function Reveal({
  children,
  animation = "cinematic-fade",
  delay = 0,
  className = "",
  style,
  threshold,
  rootMargin,
  once,
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold, rootMargin, once });
  return (
    <div
      ref={ref}
      className={`${className} ${visible ? animation : "reveal-hidden"}`}
      style={{ ...style, animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
