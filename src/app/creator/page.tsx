"use client";

import { useI18n } from "@/i18n";

const heartMessages = [
  { en: "fromis_9 brought me joy when I needed it most.", ko: "프로미스나인은 제가 가장 필요할 때 기쁨을 주었습니다." },
  { en: "Their music feels like a warm hug on a cold day.", ko: "그들의 음악은 추운 날의 따뜻한 포옹 같아요." },
  { en: "Every flover knows — this is more than just music.", ko: "모든 플로버는 알아요 — 이것은 단순한 음악이 아니라는 것을." },
  { en: "Built with love, for the ones who make us feel alive.", ko: "사랑으로 만들었습니다, 우리를 살게 하는 분들을 위해." },
];

const gallery = [
  "/images/Me.jpg",
  "/images/jiwonme.jpg",
  "/images/jiheonme.jpg",
  "/images/chaeyoungme.jpg",
  "/images/nagyungme.jpg"
];

export default function CreatorPage() {
  const { lang } = useI18n();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#fdf8fa] to-[var(--accent-soft)]/30">
      <section className="pt-28 pb-12 px-4 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-[var(--accent)]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-56 h-56 bg-[var(--secondary)]/8 rounded-full blur-3xl" />
        <div className="mx-auto max-w-3xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 text-[var(--accent)] mb-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
              {lang === "ko" ? "만든 사람" : "Hayoung x Jiwon the Best"}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none mb-4 text-[var(--foreground)]">
            flover
          </h1>
          <p className="text-[var(--muted)] text-base max-w-md mx-auto">
            {lang === "ko"
              ? "이 사이트는 fromis_9을 사랑하는 한 플로버가 만들었습니다"
              : "This site was made by a flover who loves fromis_9"}
          </p>
        </div>
      </section>

      <section className="px-4 pb-12">
        <div className="mx-auto max-w-3xl">
          <div className="bg-white rounded-2xl border border-[var(--border)] p-6 md:p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <h2 className="text-lg font-bold text-[var(--foreground)] mb-4">
                  {lang === "ko" ? "안녕하세요 " : "Hi there "}
                </h2>
                <div className="space-y-4 text-sm text-[var(--muted)] leading-relaxed">
                  <p>
                    {lang === "ko"
                      ? "저는 fromis_9을 진심으로 사랑하는 캄보디아의 플로버입니다."
                      : "I'm a flover from Cambodia who truly loves fromis_9."}
                  </p>
                  <p>
                    {lang === "ko"
                      ? "이 웹사이트는 제가 fromis_9과 ASND 레이블에 대한 사랑과 열정으로 만든 팬 프로젝트입니다. 모든 디테일 하나하나에 정성을 담았습니다."
                      : "This website is a fan project I built with love and passion for fromis_9 and ASND Label. Every detail was crafted with care."}
                  </p>
                  <p>
                    {lang === "ko"
                      ? "이 사이트가 fromis_9과 플로버들에게 조금이나마 도움이 되길 바랍니다. "
                      : "I hope this site can be a small help to fromis_9 and flovers around the world. "}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {gallery.map((src, i) => (
                  <div
                    key={i}
                    className={`rounded-3xl overflow-hidden bg-[var(--surface)] ${
                      i === 0 ? "col-span-2 aspect-video" : "aspect-square"
                    }`}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
