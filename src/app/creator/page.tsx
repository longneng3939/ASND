"use client";

import { useI18n } from "@/i18n";

const gallery = [
  "/images/Hayoungmr.jpg",
  "/images/jiwonme.jpg",
  "/images/jiheonme.jpg",
  "/images/chaeyoungme.jpg",
  "/images/nagyungme.jpg",
];

function Star({ className, color }: { className?: string; color: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill={color}>
      <path d="M10 0l2.5 7.5L20 10l-7.5 2.5L10 20l-2.5-7.5L0 10l7.5-2.5L10 0z" />
    </svg>
  );
}

function Diamond({ className, color }: { className?: string; color: string }) {
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        width: "100%",
        height: "100%",
        backgroundColor: color,
        transform: "rotate(45deg)",
      }}
    />
  );
}

export default function CreatorPage() {
  const { lang } = useI18n();

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <section className="relative pt-28 pb-16 px-4 bg-[var(--foreground)] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Star color="var(--secondary)" className="absolute top-8 right-12 w-6 h-6" />
          <Star color="rgba(169,216,255,0.5)" className="absolute top-6 right-32 w-3 h-3" />
          <Star color="var(--secondary)" className="absolute top-20 left-[15%] w-4 h-4" />
          <Star color="rgba(169,216,255,0.5)" className="absolute top-36 right-[20%] w-5 h-5" />
          <Star color="var(--secondary)" className="absolute bottom-12 left-[10%] w-5 h-5" />
          <Star color="rgba(169,216,255,0.5)" className="absolute bottom-8 right-[15%] w-4 h-4" />
          <Star color="var(--secondary)" className="absolute top-12 left-[40%] w-2 h-2" />
          <Star color="rgba(169,216,255,0.5)" className="absolute top-28 right-[10%] w-2 h-2" />

          <div className="absolute top-16 right-1/4 w-2 h-2 bg-[var(--secondary)]" />
          <div className="absolute bottom-20 left-[35%] w-1.5 h-1.5 bg-[var(--secondary)]" />

          <div style={{ position: "absolute", top: "25%", left: "8%", width: "6px", height: "6px" }}>
            <Diamond color="var(--secondary)" />
          </div>
          <div style={{ position: "absolute", bottom: "25%", right: "8%", width: "5px", height: "5px" }}>
            <Diamond color="rgba(169,216,255,0.5)" />
          </div>
        </div>
        <div className="mx-auto max-w-3xl relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-1 bg-[var(--secondary)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[var(--secondary)] font-semibold">
              {lang === "ko" ? "만든 사람" : "flover"}
            </span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none mb-4 text-white">
            flover
          </h1>
          <p className="text-lg text-white/70 font-medium max-w-lg leading-relaxed">
            {lang === "ko"
              ? "fromis_9을 사랑하는 한 플로버가 만든 사이트"
              : "This site was made by a flover who loves fromis_9"}
          </p>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex-1 h-px bg-[var(--border)]" />
            <Star color="var(--foreground)" className="w-3 h-3 shrink-0" />
            <span className="flex-1 h-px bg-[var(--border)]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-2 md:pr-4">
              <h2 className="text-lg font-bold text-[var(--foreground)] mb-4">
                {lang === "ko" ? "안녕하세요" : "Hi there"}
              </h2>
              <div className="space-y-4 text-sm text-[var(--muted)] leading-relaxed">
                <p>
                  {lang === "ko"
                    ? "저는 fromis_9을 진심으로 사랑하는 캄보디아의 플로버입니다."
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
            </div>
            <div className="md:col-span-3">
              <div className="grid grid-cols-3 gap-3">
                {gallery.map((src, i) => (
                  <div
                    key={i}
                    className={`overflow-hidden bg-[var(--surface)] border border-[var(--border)] ${i === 0 ? "col-span-2 row-span-2" : i === 1 ? "" : "col-span-1"
                      }`}
                  >
                    <img
                      src={src}
                      alt=""
                      className={`w-full hover:scale-105 transition-transform duration-500 ${i === 0 ? "h-full object-cover" : "aspect-square object-cover"
                        }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="bg-[var(--foreground)] p-8">
            <div className="flex items-center gap-3 mb-4">
              <Star color="var(--secondary)" className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[var(--secondary)]">
                {lang === "ko" ? "감사합니다" : "Thank you"}
              </span>
            </div>
            <p className="text-base text-white/85 font-medium leading-relaxed max-w-2xl">
              {lang === "ko"
                ? "fromis_9과 플로버 여러분, 항상 응원하고 사랑합니다. 이 사이트가 여러분께 작은 기쁨이 되길 바랍니다."
                : "To fromis_9 and all flovers around the world: thank you for being the light. This site is for you."}
            </p>
            <div className="flex justify-end items-center gap-1.5 mt-6">
              <span className="w-6 h-0.5 bg-[var(--secondary)]" />
              <span className="w-4 h-0.5 bg-[var(--secondary)]" />
              <span className="w-2 h-0.5 bg-white/40" />
              <Star color="var(--secondary)" className="w-3 h-3" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
