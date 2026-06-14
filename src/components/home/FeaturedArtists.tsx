"use client";

import Link from "next/link";
import { useI18n } from "@/i18n";
import { artists } from "@/data/artists";
import { ArtistCard } from "@/components/ui/ArtistCard";

export function FeaturedArtists() {
  const { t } = useI18n();
  const featured = artists.filter((a) => a.type === "group" || a.id === "wendy");

  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t.home.featuredTitle}
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            {t.home.featuredSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((artist) => (
            <ArtistCard
              key={artist.id}
              id={artist.id}
              name={artist.name}
              nameKo={artist.nameKo}
              image={artist.image}
              type={artist.type === "group" ? "group" : "solo"}
              description={artist.description}
              descriptionKo={artist.descriptionKo}
              variant="featured"
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/artists"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass text-sm font-medium hover:bg-black/10 transition-colors"
          >
            {t.artists.all}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
