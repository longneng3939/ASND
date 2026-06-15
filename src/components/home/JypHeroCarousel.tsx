"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useI18n } from "@/i18n";
import { heroSlides, type HeroSlide } from "@/data/hero";

function SlideBackground({ slide, isActive, offset }: { slide: HeroSlide; isActive: boolean; offset: number }) {
  return (
    <div
      className="absolute inset-0 transition-opacity duration-700"
      style={{ transform: `translateY(${offset}px)` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#1E2A44]/70 via-[#1E2A44]/10 to-transparent z-10" />
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${slide.youtubeId}?autoplay=${isActive ? 1 : 0}&mute=1&loop=1&playlist=${slide.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1${slide.startTime !== undefined ? `&start=${slide.startTime}` : ''}${slide.endTime !== undefined ? `&end=${slide.endTime}` : ''}`}
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            height: "56.25vw",
            minHeight: "100vh",
            minWidth: "177.78vh",
          }}
          allow="autoplay; encrypted-media"
          title={slide.title}
        />
      </div>
    </div>
  );
}

function AlbumInfoModal({
  slide,
  onClose,
}: {
  slide: HeroSlide;
  onClose: () => void;
}) {
  const { lang } = useI18n();

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500">{slide.artist}</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {lang === "ko" && slide.titleKo ? slide.titleKo : slide.title}
            </h3>
            {slide.album && (
              <p className="text-sm text-gray-500 mt-1">
                {lang === "ko" && slide.albumKo ? slide.albumKo : slide.album}
              </p>
            )}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-900 p-1">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {slide.releaseDate && (
          <div className="mb-4">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Release Date</p>
            <p className="text-sm font-medium text-gray-900">{slide.releaseDate}</p>
          </div>
        )}

        {(slide.description || slide.descriptionKo) && (
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            {lang === "ko" && slide.descriptionKo ? slide.descriptionKo : slide.description}
          </p>
        )}

        {slide.linkType === "more" && slide.moreUrl && (
          <Link
            href={slide.moreUrl}
            onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            more
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        )}

        {slide.linkType === "youtube" && (
          <a
            href={`https://youtu.be/${slide.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube
          </a>
        )}
      </div>
    </div>
  );
}

export function JypHeroCarousel() {
  const { lang } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const [infoSlide, setInfoSlide] = useState<HeroSlide | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const slide = heroSlides[activeIndex];

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const currentSlide = heroSlides[activeIndex];
    const duration = currentSlide?.endTime && currentSlide?.startTime !== undefined
      ? (currentSlide.endTime - currentSlide.startTime) * 1000
      : 45000;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroSlides.length);
    }, duration);
  }, [activeIndex]);

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoPlay]);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallaxOffset = scrollY * 0.35;

  const goTo = (index: number) => {
    setActiveIndex(index);
    setInfoSlide(null);
    startAutoPlay();
  };

  const next = () => goTo((activeIndex + 1) % heroSlides.length);
  const prev = () => goTo((activeIndex - 1 + heroSlides.length) % heroSlides.length);

  return (
    <section className="relative h-screen overflow-x-hidden bg-[#1E2A44]">
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <SlideBackground slide={s} isActive={i === activeIndex} offset={parallaxOffset} />
        </div>
      ))}

      <div
        className="absolute bottom-28 sm:bottom-32 left-0 right-0 z-10 text-center px-6 sm:px-4"
        style={{ transform: `translateY(${Math.max(0, parallaxOffset * -1)}px)`, opacity: Math.max(0, 1 - scrollY / 600) }}
      >
        <div className="animate-fade-in max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm text-white/50 uppercase tracking-[0.2em] mb-2 sm:mb-3">
            {slide.artist}
          </p>
          <h2 className="text-2xl sm:text-5xl md:text-7xl font-black tracking-tight text-white leading-none mb-3 sm:mb-4">
            {lang === "ko" && slide.titleKo ? slide.titleKo : slide.title}
          </h2>
          {slide.description && (
            <p className="text-sm sm:text-lg text-white/60 max-w-xl mx-auto">
              {lang === "ko" && slide.descriptionKo ? slide.descriptionKo : slide.description}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={() => setInfoSlide(slide)}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 px-5 sm:px-6 py-2 sm:py-2.5 border border-white/20 text-white/70 text-xs sm:text-sm font-medium hover:bg-white/10 hover:text-white transition-all rounded-full backdrop-blur-sm"
      >
        Album Info
      </button>

      {infoSlide && (
        <AlbumInfoModal slide={infoSlide} onClose={() => setInfoSlide(null)} />
      )}

      <div className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2 sm:gap-3">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className={`transition-all duration-500 ${
              i === activeIndex
                ? "w-6 sm:w-8 h-[3px] bg-white"
                : "w-1.5 sm:w-2 h-[3px] bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-2 text-white/30 hover:text-white transition-colors"
        aria-label="Previous"
      >
        <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-2 text-white/30 hover:text-white transition-colors"
        aria-label="Next"
      >
        <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
