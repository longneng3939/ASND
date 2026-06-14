"use client";

import { useI18n } from "@/i18n";
import { events } from "@/data/schedule";
import { getArtistById } from "@/data/artists";
import Image from "next/image";

const typeLabel: Record<string, { en: string; ko: string }> = {
  concert: { en: "Concert", ko: "콘서트" },
  fanmeeting: { en: "Fan Meeting", ko: "팬미팅" },
  release: { en: "Release", ko: "발매" },
  appearance: { en: "Appearance", ko: "출연" },
  other: { en: "Event", ko: "이벤트" },
};

function getArtistImage(artistName: string) {
  const artist = getArtistById(artistName.toLowerCase().replace(/\s+/g, "-")) ||
    getArtistById(artistName.toLowerCase().replace(/\s+/g, ""));
  return artist?.image || null;
}

function monthKey(date: string) {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth()}`;
}

function monthLabel(date: string, lang: string) {
  const d = new Date(date);
  return d.toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US", { year: "numeric", month: "long" });
}

export default function SchedulePage() {
  const { t, lang } = useI18n();

  const sorted = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const upcoming = sorted.filter((e) => new Date(e.date) >= new Date());
  const past = sorted.filter((e) => new Date(e.date) < new Date());

  const grouped = (list: typeof events) => {
    const months: { key: string; label: string; items: typeof events }[] = [];
    list.forEach((e) => {
      const key = monthKey(e.date);
      const existing = months.find((m) => m.key === key);
      if (existing) {
        existing.items.push(e);
      } else {
        months.push({ key, label: monthLabel(e.date, lang), items: [e] });
      }
    });
    return months;
  };

  const upcomingGroups = grouped(upcoming);
  const pastGroups = grouped(past);

  return (
    <div className="min-h-screen">

      {/* Header */}
      <section className="pt-28 pb-12 px-4">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
            {lang === "ko" ? "일정" : "Schedule"}
          </p>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none mb-3">
            {t.schedule.title}
          </h1>
          <p className="text-gray-500 text-base max-w-lg">
            {t.schedule.subtitle}
          </p>
        </div>
      </section>

      {/* Upcoming Events — Timeline */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-4xl">
          {upcoming.length === 0 && past.length === 0 ? (
            <p className="text-center text-gray-400 py-20 text-sm">{t.schedule.noEvents}</p>
          ) : (
            <div className="relative pl-6 sm:pl-8 border-l-2 border-black">
              {upcomingGroups.map((month) => (
                <div key={month.key}>
                  <div className="sticky top-20 z-10 -ml-6 sm:-ml-8 mb-6 bg-white pt-2 pb-2">
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] bg-black text-white px-3 py-1 rounded-full">
                      {month.label}
                    </span>
                  </div>
                  {month.items.map((event) => {
                    const isPast = new Date(event.date) < new Date();
                    const artistImage = getArtistImage(event.artist);
                    const d = new Date(event.date);
                    return (
                      <div
                        key={event.id}
                        className="relative pb-10 group"
                      >
                        <div className="absolute -left-[25px] sm:-left-[33px] top-1 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-black bg-white group-hover:bg-black transition-colors duration-200" />
                        <div className="pl-3 sm:pl-4">
                          <div className="flex items-start gap-4">
                            <div className="text-right flex-shrink-0 w-14 pt-0.5">
                              <div className="text-2xl font-black leading-none">{d.getDate()}</div>
                              <div className="text-[11px] uppercase tracking-wider text-gray-400">
                                {d.toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US", { weekday: "short" })}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className={`text-[11px] uppercase tracking-[0.15em] font-semibold ${isPast ? "text-gray-300" : "text-gray-400"}`}>
                                  {typeLabel[event.type]?.[lang as keyof typeof typeLabel[string]] || typeLabel[event.type]?.en}
                                </span>
                                {isPast && (
                                  <span className="text-[10px] uppercase tracking-wider text-gray-300">
                                    {lang === "ko" ? "종료" : "Ended"}
                                  </span>
                                )}
                              </div>
                              <h3 className={`text-lg font-bold leading-tight ${isPast ? "text-gray-400 line-through decoration-1" : "text-black"}`}>
                                {lang === "ko" ? event.titleKo : event.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2 mt-1">
                                <span className="text-sm text-gray-500">{event.artist}</span>
                                {event.venue && (
                                  <>
                                    <span className="text-gray-300">·</span>
                                    <span className="text-sm text-gray-500">{event.venue}</span>
                                  </>
                                )}
                                {event.location && (
                                  <>
                                    <span className="text-gray-300">·</span>
                                    <span className="text-sm text-gray-500">{event.location}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            {artistImage && (
                              <div className="hidden sm:block flex-shrink-0 self-start mt-1">
                                <div className="relative h-9 w-9 rounded-full overflow-hidden bg-gray-100 ring-2 ring-white">
                                  <Image
                                    src={artistImage}
                                    alt={event.artist}
                                    fill
                                    className="object-cover"
                                    sizes="36px"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Past events heading */}
              {pastGroups.length > 0 && (
                <div className="relative pb-10">
                  <div className="absolute -left-[25px] sm:-left-[33px] top-1 w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 border-gray-200 bg-gray-50" />
                  <div className="pl-3 sm:pl-4 pt-2">
                    <span className="text-xs uppercase tracking-[0.15em] text-gray-300 font-medium">
                      {lang === "ko" ? "지난 일정" : "Past Events"}
                    </span>
                  </div>
                </div>
              )}

              {pastGroups.map((month) => (
                <div key={month.key}>
                  <div className="sticky top-20 z-10 -ml-8 mb-6 bg-white pt-2 pb-2">
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-gray-600 transition-colors cursor-default">
                      {month.label}
                    </span>
                  </div>
                  {month.items.map((event) => {
                    const d = new Date(event.date);
                    return (
                      <div
                        key={event.id}
                        className="relative pb-8 group"
                      >
                        <div className="absolute -left-[25px] sm:-left-[33px] top-1 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-gray-200 bg-gray-50" />
                        <div className="pl-3 sm:pl-4 opacity-55">
                          <div className="flex items-start gap-4">
                            <div className="text-right flex-shrink-0 w-14 pt-0.5">
                              <div className="text-lg font-black leading-none text-gray-400">{d.getDate()}</div>
                              <div className="text-[10px] uppercase tracking-wider text-gray-300">
                                {d.toLocaleDateString(lang === "ko" ? "ko-KR" : "en-US", { weekday: "short" })}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-gray-300">
                                  {typeLabel[event.type]?.[lang as keyof typeof typeLabel[string]] || typeLabel[event.type]?.en}
                                </span>
                              </div>
                              <h4 className="text-sm font-medium text-gray-400 line-through decoration-1">
                                {lang === "ko" ? event.titleKo : event.title}
                              </h4>
                              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                                <span className="text-xs text-gray-300">{event.artist}</span>
                                {event.venue && (
                                  <>
                                    <span className="text-gray-200">·</span>
                                    <span className="text-xs text-gray-300">{event.venue}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* End dot */}
              <div className="absolute bottom-0 -left-[23px] sm:-left-[31px] w-[5px] h-[5px] sm:w-[6px] sm:h-[6px] rounded-full bg-gray-200" />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
