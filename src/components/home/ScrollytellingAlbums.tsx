"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useI18n } from "@/i18n";

interface Album {
  id: string;
  artist: string;
  artistKo: string;
  title: string;
  titleKo: string;
  image: string;
  releaseDate: string;
  type: string;
  color: string;
  ropeColor: string;
  ropeColorEnd: string;
  mood: string;
  moodKo: string;
}

const albums: Album[] = [
  {
    id: "fromis-like-you-better",
    artist: "fromis_9",
    artistKo: "프로미스나인",
    title: "I Like You Better",
    titleKo: "I Like You Better",
    image: "/images/likeyou.jpg",
    releaseDate: "2025-06-25",
    type: "Single",
    color: "#F7C8D8",
    ropeColor: "#7EC8A0",
    ropeColorEnd: "#F7C8D8",
    mood: "Fresh",
    moodKo: "清新",
  },
  {
    id: "fromis-supersonic",
    artist: "fromis_9",
    artistKo: "프로미스나인",
    title: "Supersonic",
    titleKo: "Supersonic",
    image: "/images/Supersonic-album.jpg",
    releaseDate: "2024-08-12",
    type: "Mini Album",
    color: "#A9D8FF",
    ropeColor: "#4DA8E8",
    ropeColorEnd: "#7DD8FF",
    mood: "Youth",
    moodKo: "청춘",
  },
  {
    id: "wendy-wish-you-hell",
    artist: "Wendy",
    artistKo: "웬디",
    title: "Wish You Hell",
    titleKo: "Wish You Hell",
    image: "/images/wishyou.jpg",
    releaseDate: "2024-03-12",
    type: "Mini Album",
    color: "#E8D5F5",
    ropeColor: "#C27DD8",
    ropeColorEnd: "#E8A0D0",
    mood: "Bold",
    moodKo: "대담",
  },
];

function lerpColor(a: string, b: string, t: number): string {
  const parse = (c: string) => {
    const hex = c.replace("#", "");
    return [
      parseInt(hex.substring(0, 2), 16),
      parseInt(hex.substring(2, 4), 16),
      parseInt(hex.substring(4, 6), 16),
    ];
  };
  const [r1, g1, b1] = parse(a);
  const [r2, g2, b2] = parse(b);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const bl = Math.round(b1 + (b2 - b1) * t);
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(bl)}`;
}

function ColorRope({
  activeIndex,
  progress,
}: {
  activeIndex: number;
  progress: number;
}) {
  const current = albums[activeIndex];
  const next = albums[Math.min(activeIndex + 1, albums.length - 1)];
  const t = Math.max(0, Math.min(1, progress));
  const color =
    activeIndex < albums.length - 1
      ? lerpColor(current.ropeColor, next.ropeColor, t)
      : current.ropeColor;
  const colorEnd =
    activeIndex < albums.length - 1
      ? lerpColor(current.ropeColorEnd, next.ropeColorEnd, t)
      : current.ropeColorEnd;

  return (
    <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 z-0 pointer-events-none w-full max-w-6xl mx-auto">
      {/* Main rope line */}
      <div
        className="absolute left-[50%] top-0 bottom-0 w-[2px]"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${color} 8%, ${colorEnd} 50%, ${color} 92%, transparent 100%)`,
          filter: "blur(0.3px)",
          transition: "background 0.3s ease",
        }}
      />

      {/* Glow behind the rope */}
      <div
        className="absolute left-[50%] -translate-x-1/2 top-0 bottom-0 w-[60px]"
        style={{
          background: `linear-gradient(180deg, transparent 0%, ${color}15 15%, ${colorEnd}20 50%, ${color}15 85%, transparent 100%)`,
          filter: "blur(20px)",
          transition: "background 0.3s ease",
        }}
      />

      {/* Knot dots at each album position */}
      {albums.map((album, i) => {
        const isActive = i === activeIndex;
        const knotColor = i === activeIndex ? color : album.ropeColor;
        return (
          <div
            key={album.id}
            className="absolute left-[50%] -translate-x-1/2 transition-all duration-500"
            style={{ top: `${(i / (albums.length - 1)) * 80 + 10}%` }}
          >
            <div
              className="transition-all duration-500"
              style={{
                width: isActive ? 14 : 8,
                height: isActive ? 14 : 8,
                borderRadius: "50%",
                background: knotColor,
                boxShadow: isActive
                  ? `0 0 20px ${knotColor}60, 0 0 40px ${knotColor}30`
                  : "none",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

function MoodBadge({ album, isVisible }: { album: Album; isVisible: boolean }) {
  const { lang } = useI18n();
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-medium border transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
      style={{
        borderColor: `${album.ropeColor}50`,
        backgroundColor: `${album.ropeColor}12`,
        color: album.ropeColor,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: album.ropeColor }}
      />
      {lang === "ko" ? album.moodKo : album.mood}
    </div>
  );
}

function VinylDisc({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 right-0 w-[75%] md:w-[70%] lg:w-[65%]"
      style={{ zIndex: 0 }}
    >
      <div
        className="w-full aspect-square rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #111 0%, #1a1a1a 20%, #111 21%, #222 40%, #111 41%, #1a1a1a 60%, #111 61%, #222 80%, #111 100%)",
          border: "1px solid rgba(0,0,0,0.05)",
          transform: `rotate(${scrollProgress * 210}deg)`,
          transition: "transform 0.1s linear",
        }}
      >
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[28%] aspect-square rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
            <div className="w-[35%] aspect-square rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AlbumCard({
  album,
  index,
  onProgressChange,
}: {
  album: Album;
  index: number;
  onProgressChange: (index: number, progress: number) => void;
}) {
  const { lang } = useI18n();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 1 - rect.top / viewH));
      setScrollProgress(progress);
      onProgressChange(index, progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [index, onProgressChange]);

  const parallaxY = (1 - scrollProgress) * 60;
  const albumRotation = (scrollProgress - 0.5) * 8;

  return (
    <div
      ref={cardRef}
      className={`min-h-[80vh] md:min-h-[90vh] flex items-center px-6 md:px-12 lg:px-20 py-16 transition-opacity duration-1000 relative ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`flex flex-col ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        } items-center gap-8 md:gap-16 lg:gap-24 max-w-6xl mx-auto w-full relative z-10`}
      >
        {/* Album art — container holds cover + vinyl, no overflow needed */}
        <div
          className="relative w-[240px] md:w-[300px] lg:w-[380px] flex-shrink-0"
          style={{
            transform: `translateY(${parallaxY}px) rotate(${albumRotation}deg)`,
            transition: "transform 0.1s linear",
          }}
        >
          {/* Glow behind the album — uses rope color for emotional connection */}
          <div
            className="absolute -inset-6 md:-inset-10 rounded-3xl blur-3xl opacity-20 transition-opacity duration-700"
            style={{ backgroundColor: album.ropeColor }}
          />

          {/* Vinyl record — BEHIND the cover, peeks right. Always round. */}
          <VinylDisc scrollProgress={scrollProgress} />

          {/* Album cover — on top, square */}
          <div
            className="relative rounded-xl overflow-hidden shadow-2xl border border-black/10 aspect-square"
            style={{ zIndex: 1 }}
          >
            <Image
              src={album.image}
              alt={lang === "ko" ? album.titleKo : album.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 240px, (max-width: 1024px) 300px, 380px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>

        {/* Album info */}
        <div
          className={`flex-1 text-center ${
            isEven ? "md:text-left" : "md:text-right"
          }`}
          style={{
            transform: `translateY(${parallaxY * 0.4}px)`,
            transition: "transform 0.1s linear",
          }}
        >
          <MoodBadge album={album} isVisible={isVisible} />

          <p
            className={`text-xs uppercase tracking-[0.25em] font-medium mb-3 mt-4 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{ color: album.color }}
          >
            {lang === "ko" ? album.artistKo : album.artist}
          </p>
          <h3
            className={`text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-[var(--foreground)] leading-none mb-4 transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {lang === "ko" ? album.titleKo : album.title}
          </h3>
          <div
            className={`flex items-center gap-3 mb-6 transition-all duration-700 delay-200 ${
              isEven ? "md:justify-start" : "md:justify-end"
            } justify-center ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-medium border"
              style={{
                borderColor: `${album.color}40`,
                backgroundColor: `${album.color}15`,
                color: "var(--foreground)",
              }}
            >
              {album.type}
            </span>
            <span className="text-xs text-[var(--muted)]">
              {album.releaseDate}
            </span>
          </div>
          <p
            className={`text-[var(--muted)] text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0 transition-all duration-700 delay-300 ${
              isEven ? "" : "md:ml-auto"
            } ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            {album.id === "fromis-like-you-better"
              ? lang === "ko"
                ? "프로미스나인의 밝고 에너지 넘치는 여름 싱글. 설레는 감정을 솔직하게 표현한 곡."
                : "fromis_9's bright and energetic summer single. A sincere expression of fluttering emotions."
              : album.id === "fromis-supersonic"
                ? lang === "ko"
                  ? "프로미스나인의 역동적인 미니앨범. 한여름의 청량함과 강렬한 비트가 만나는 순간."
                  : "fromis_9's dynamic mini album. Where midsummer freshness meets an intense beat."
                : lang === "ko"
                  ? "웬디의 솔로 미니앨범. 강렬하고 솔직한 감정을 록 사운드로 풀어낸 작품."
                  : "Wendy's solo mini album. Bold, honest emotions channeled through rock-inspired sound."}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ScrollytellingAlbums() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeProgress, setActiveProgress] = useState(0);

  const handleProgressChange = useCallback(
    (index: number, progress: number) => {
      if (progress > 0.3) {
        setActiveIndex(index);
        setActiveProgress(progress);
      }
    },
    [],
  );

  return (
    <section className="relative bg-background overflow-hidden">
      <SectionHeader />

      <div className="relative">
        {/* The rope — runs through the center connecting all albums */}
        <ColorRope activeIndex={activeIndex} progress={activeProgress} />

        {/* Album cards */}
        {albums.map((album, index) => (
          <AlbumCard
            key={album.id}
            album={album}
            index={index}
            onProgressChange={handleProgressChange}
          />
        ))}
      </div>

      <div className="h-24 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}

function SectionHeader() {
  const { lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center py-20 md:py-32 px-6">
      <p
        className={`text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-4 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {lang === "ko" ? "음악" : "Discography"}
      </p>
      <h2
        className={`text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-[var(--foreground)] leading-tight transition-all duration-700 delay-100 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {lang === "ko" ? "앨범 컬렉션" : "Album Collection"}
      </h2>
      <div
        className={`mt-6 mx-auto w-12 h-px bg-[var(--accent)] transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        }`}
      />
    </div>
  );
}
