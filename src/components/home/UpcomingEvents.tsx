"use client";

import Link from "next/link";
import { useI18n } from "@/i18n";
import { getUpcomingEvents } from "@/data/schedule";
import { artists } from "@/data/artists";
import { EventCard } from "@/components/ui/EventCard";
import { Reveal } from "@/components/ui/Reveal";

export function UpcomingEvents() {
  const { t } = useI18n();
  const events = getUpcomingEvents(3);

  if (events.length === 0) return null;

  return (
    <section className="py-24 px-4 bg-black/[0.02]">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted mb-3">
              {t.nav.schedule}
            </p>
            <div className="overflow-hidden">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-rise-blur">
                {t.home.scheduleTitle}
              </h2>
            </div>
            <p className="text-muted cinematic-fade" style={{ animationDelay: "0.15s" }}>{t.home.scheduleSubtitle}</p>
          </div>
          <Link
            href="/schedule"
            className="hidden sm:inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors"
          >
            {t.common.viewAll}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </Reveal>

        <div className="space-y-4">
          {events.map((event, i) => (
            <Reveal key={event.id} delay={i * 120}>
              <EventCard
                title={event.title}
                titleKo={event.titleKo}
                date={event.date}
                type={event.type as "concert" | "fanmeet" | "release" | "broadcast" | "other"}
                artistName={event.artist}
                artistImage={artists.find((a) => a.name === event.artist || a.nameKo === event.artist)?.image || `/images/${event.artist.toLowerCase()}.jpg`}
                location={event.venue}
                description={event.artist}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={150} className="text-center mt-8 sm:hidden">
          <Link
            href="/schedule"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors"
          >
            {t.common.viewAll}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
