"use client";

import { useRef, useEffect } from "react";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxSection({ children, speed = 0.3, className = "" }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    let rafId: number;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const wh = window.innerHeight;

      if (rect.bottom > 0 && rect.top < wh) {
        const progress = (wh - rect.top) / (wh + rect.height);
        const offset = (progress - 0.5) * speed * 60;
        bg.style.transform = `translateY(${offset}px)`;
      }
    };

    const handleScroll = () => {
      rafId = requestAnimationFrame(onScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "translateY(0)" }}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
