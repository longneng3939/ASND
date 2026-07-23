"use client";

import { useState, type CSSProperties } from "react";
import { useI18n } from "@/i18n";
import { Reveal } from "@/components/ui/Reveal";

const heroSlides = ["/images/Group.jpg", "/images/likeyou.jpg"];

const gallery = [
  { src: "/images/Hayoungmr.jpg", name: "Hayoung", nameKo: "하영" },
  { src: "/images/jiwonme.jpg", name: "Jiwon", nameKo: "지원" },
  { src: "/images/jiheonme.jpg", name: "Jiheon", nameKo: "지헌" },
  { src: "/images/chaeyoungme.jpg", name: "Chaeyoung", nameKo: "채영" },
  { src: "/images/nagyungme.jpg", name: "Nagyung", nameKo: "나경" },
];

/* Deterministic pseudo-random so server & client markup match */
function seededRandom(seed: number) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = seededRandom(9);
const starField = Array.from({ length: 26 }, (_, i) => ({
  id: i,
  top: rand() * 88 + 4,
  left: rand() * 92 + 4,
  size: rand() * 10 + 5,
  delay: rand() * 4,
  duration: rand() * 3 + 2.5,
  color: i % 3 === 0 ? "#F7C8D8" : i % 3 === 1 ? "#a9d8ff" : "#ffffff",
}));

function Star({ className, style, color }: { className?: string; style?: CSSProperties; color: string }) {
  return (
    <svg className={className} style={style} viewBox="0 0 20 20" fill={color}>
      <path d="M10 0l2.5 7.5L20 10l-7.5 2.5L10 20l-2.5-7.5L0 10l7.5-2.5L10 0z" />
    </svg>
  );
}

export default function CreatorPage() {
  const { lang } = useI18n();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    });
  };

  const parallax = (depth: number): CSSProperties => ({
    transform: `translate3d(${mouse.x * depth}px, ${mouse.y * depth}px, 0)`,
    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  });

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      {/* ===== Hero ===== */}
      <section
        onMouseMove={handleMouseMove}
        className="relative flex min-h-[88vh] flex-col overflow-hidden bg-[#050505]"
      >
        {/* Animated fromis_9 background slideshow */}
        <div style={parallax(12)} className="pointer-events-none absolute inset-0">
          {heroSlides.map((src, i) => (
            <div
              key={src}
              aria-hidden
              className="hero-slide absolute -inset-6 bg-cover bg-center"
              style={{
                backgroundImage: `url(${src})`,
                animationDelay: `${i * 7}s`,
              }}
            />
          ))}
        </div>

        {/* Cinematic readability overlays */}
        <div className="pointer-events-none absolute inset-0 bg-[#050505]/30" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050505]/85 via-[#050505]/40 to-[#050505]" />

        {/* Aurora glows */}
        <div style={parallax(34)} className="pointer-events-none absolute inset-0">
          <div className="animate-aurora absolute -top-32 left-[10%] h-[26rem] w-[26rem] rounded-full bg-[#6C3FD1]/15 blur-[110px]" />
          <div
            className="animate-aurora absolute right-[5%] top-[30%] h-[22rem] w-[22rem] rounded-full bg-[#F7C8D8]/[0.08] blur-[110px]"
            style={{ animationDelay: "-6s" }}
          />
          <div
            className="animate-aurora absolute bottom-[5%] left-[30%] h-[18rem] w-[18rem] rounded-full bg-[#a9d8ff]/[0.07] blur-[100px]"
            style={{ animationDelay: "-11s" }}
          />
        </div>

        {/* Twinkling star field */}
        <div style={parallax(18)} className="pointer-events-none absolute inset-0">
          {starField.map((s) => (
            <Star
              key={s.id}
              color={s.color}
              className="animate-twinkle absolute"
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: s.size,
                height: s.size,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Copy */}
        <div
          style={parallax(8)}
          className="relative mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-6 pt-24 pb-20 text-center"
        >
          <div className="cinematic-fade mb-6 flex items-center gap-3" style={{ animationDelay: "150ms" }}>
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#F7C8D8]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#F7C8D8]">
              {lang === "ko" ? "만든 사람" : "Made by a flover"}
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#F7C8D8]" />
          </div>

          <h1 className="bg-[linear-gradient(120deg,#ffffff_0%,#F7C8D8_35%,#a9d8ff_70%,#ffffff_100%)] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x text-7xl font-black tracking-tight sm:text-8xl md:text-9xl">
            {"flover".split("").map((ch, i) => (
              <span key={i} className="inline-block overflow-hidden pb-2 align-bottom">
                <span
                  className="text-rise-blur inline-block"
                  style={{ animationDelay: `${300 + i * 90}ms` }}
                >
                  {ch}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="cinematic-fade mt-6 max-w-lg text-base font-medium leading-relaxed text-white/60 md:text-lg"
            style={{ animationDelay: "950ms" }}
          >
            {lang === "ko"
              ? "fromis_9을 사랑하는 한 플로버가 만든 사이트"
              : "This site was made by a flover who loves fromis_9"}
          </p>

          <div className="cinematic-fade mt-10 flex flex-wrap items-center justify-center gap-2" style={{ animationDelay: "1150ms" }}>
            {["fromis_9", "ASND", "Cambodia"].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium tracking-wide text-white/50 backdrop-blur-sm transition-colors duration-300 hover:border-[#F7C8D8]/40 hover:text-white"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="cinematic-fade pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2" style={{ animationDelay: "1600ms" }}>
          <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
            <span className="animate-scroll-dot h-1.5 w-1.5 rounded-full bg-[#F7C8D8]" />
          </div>
        </div>

        {/* Marquee */}
        <div className="relative border-t border-white/[0.06] py-4">
          <div className="animate-menu-marquee flex w-max whitespace-nowrap">
            {[0, 1].map((copy) => (
              <span
                key={copy}
                aria-hidden={copy === 1}
                className="flex items-center text-xs font-medium uppercase tracking-[0.35em] text-white/20"
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <span key={i} className="flex items-center">
                    <span className="mx-8">flover ✦ fromis_9 ✦ ASND</span>
                    <span className="text-[#F7C8D8]/30">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== About + Gallery ===== */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal animation="cinematic-fade" className="mb-10 flex items-center gap-3">
            <span className="h-px flex-1 bg-[var(--border)]" />
            <Star color="var(--accent)" className="h-3 w-3 shrink-0" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              {lang === "ko" ? "소개" : "The story"}
            </span>
            <Star color="var(--accent)" className="h-3 w-3 shrink-0" />
            <span className="h-px flex-1 bg-[var(--border)]" />
          </Reveal>

          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-5">
            <Reveal animation="cinematic-fade" delay={100} className="md:col-span-2 md:sticky md:top-24">
              <h2 className="mb-5 text-3xl font-black tracking-tight text-[var(--foreground)] md:text-4xl">
                {lang === "ko" ? "안녕하세요" : "Hi there"}
                <span className="text-[var(--accent)]">.</span>
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-[var(--muted)] md:text-base">
                <p>
                  {lang === "ko"
                    ? "저는 fromis_9을 진심으로 사랑하는 캄벴디아의 플로버입니다."
                    : "I'm a flover from Cambodia who truly loves fromis_9."}
                </p>
                <p>
                  {lang === "ko"
                    ? "이 웹사이트는 제가 fromis_9과 ASND 레이블에 대한 사랑과 열정으로 만든 팬 프로젝트입니다."
                    : "This website is a fan project I built with love and passion for fromis_9 and ASND Label."}
                </p>
                <p>
                  {lang === "ko"
                    ? "이 사이트가 fromis_9과 플로버들에게 조금이나마 도움이 되길 바랍니다."
                    : "I hope this site can be a small help to fromis_9 and flovers around the world."}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2">
                <span className="h-0.5 w-8 bg-[var(--accent)]" />
                <span className="h-0.5 w-4 bg-[var(--accent)]/60" />
                <span className="h-0.5 w-2 bg-[var(--accent)]/30" />
              </div>
            </Reveal>

            <div className="md:col-span-3">
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {gallery.map((item, i) => (
                  <Reveal
                    key={item.src}
                    animation="cinematic-fade"
                    delay={150 + i * 90}
                    className={i === 0 ? "col-span-2 row-span-2" : ""}
                  >
                    <div className="group relative h-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(30,42,68,0.18)] hover:ring-[var(--accent)]/50">
                      <img
                        src={item.src}
                        alt={item.name}
                        className={`w-full object-cover transition-transform duration-700 ease-out group-hover:rotate-1 group-hover:scale-110 ${
                          i === 0 ? "h-full" : "aspect-square"
                        }`}
                      />
                      <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-[#1E2A44]/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <span className="flex w-full items-center justify-between p-3">
                          <span className="text-xs font-bold uppercase tracking-wider text-white">
                            {lang === "ko" ? item.nameKo : item.name}
                          </span>
                          <Star color="#F7C8D8" className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Thank you ===== */}
      <section className="px-4 pb-24">
        <Reveal animation="cinematic-fade" className="mx-auto max-w-4xl">
          <div className="rounded-[2rem] bg-gradient-to-r from-[#F7C8D8]/50 via-white/10 to-[#6C3FD1]/50 p-[1.5px]">
            <div className="relative overflow-hidden rounded-[calc(2rem-1.5px)] bg-[#0A0A0F] p-8 md:p-12">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#F7C8D8]/10 blur-[80px]" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#6C3FD1]/20 blur-[80px]" />

              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <Star color="#F7C8D8" className="animate-float h-4 w-4 shrink-0" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#F7C8D8]">
                    {lang === "ko" ? "감사합니다" : "Thank you"}
                  </span>
                </div>
                <p className="max-w-2xl text-lg font-medium leading-relaxed text-white/85 md:text-xl">
                  {lang === "ko"
                    ? "fromis_9과 플로버 여러분, 항상 응원하고 사랑합니다. 이 사이트가 여러분께 작은 기쁨이 되길 바랍니다."
                    : "To fromis_9 and all flovers around the world: thank you for being the light. This site is for you."}
                </p>
                <div className="mt-8 flex items-end justify-between">
                  <span className="font-serif text-sm italic text-white/40">
                    {lang === "ko" ? "— 캄벴디아 플로버 드림" : "— a flover, from Cambodia"}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="h-0.5 w-6 bg-[#F7C8D8]" />
                    <span className="h-0.5 w-4 bg-[#F7C8D8]/60" />
                    <span className="h-0.5 w-2 bg-white/30" />
                    <Star color="#F7C8D8" className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
