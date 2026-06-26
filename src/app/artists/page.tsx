"use client";

import { useI18n } from "@/i18n";
import { artists } from "@/data/artists";
import { ArtistCard } from "@/components/ui/ArtistCard";

export default function ArtistsPage() {
  const { t } = useI18n();
  const groups = artists.filter((a) => a.type === "group");
  const soloists = artists.filter((a) => a.type === "soloist");

  return (
    <div className="min-h-screen">
      <section className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
            Artists
          </p>
          <h1 className="text-3xl sm:text-6xl font-black tracking-tight leading-none mb-3">
            {t.artists.title}
          </h1>
          <p className="text-gray-500 text-base">
            {t.artists.subtitle}
          </p>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl">
          {groups.length > 0 && (
            <div className="mb-20">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">
                {t.artists.groups}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {groups.map((artist, i) => (
                  <ArtistCard
                    key={artist.id}
                    id={artist.id}
                    name={artist.name}
                    nameKo={artist.nameKo}
                    image={artist.image}
                    type={artist.type === "group" ? "group" : "solo"}
                    description={artist.description}
                    descriptionKo={artist.descriptionKo}
                    variant="photocard"
                    index={i}
                  />
                ))}
              </div>
            </div>
          )}

          {soloists.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">
                {t.artists.soloists}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {soloists.map((artist, i) => (
                  <ArtistCard
                    key={artist.id}
                    id={artist.id}
                    name={artist.name}
                    nameKo={artist.nameKo}
                    image={artist.image}
                    type={artist.type === "group" ? "group" : "solo"}
                    description={artist.description}
                    descriptionKo={artist.descriptionKo}
                    variant="photocard"
                    index={groups.length + i}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
