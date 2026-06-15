"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useI18n } from "@/i18n";
import { getArtistById } from "@/data/artists";

export default function ArtistDetailPage() {
  const { t, lang } = useI18n();
  const params = useParams();
  const artist = getArtistById(params.slug as string);

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artist not found</h1>
          <Link href="/artists" className="underline text-gray-500 hover:text-black transition-colors">
            Back to artists
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">

      {/* Artist Header */}
      <section className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/artists"
            className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-black transition-colors mb-8 uppercase tracking-[0.15em]"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7-7l-7 7 7 7" />
            </svg>
            {t.artists.all}
          </Link>

          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1 order-2 md:order-1">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">
                {artist.type === "group" ? t.artists.groups : t.artists.soloists}
              </p>
              <h1 className="text-3xl sm:text-6xl font-black tracking-tight leading-none mb-2">
                {artist.name}
              </h1>
              {artist.nameKo && (
                <p className="text-lg text-gray-400 mt-1 mb-4">
                  {artist.nameKo}
                </p>
              )}

              <div className="flex items-center gap-4 text-xs text-gray-400 uppercase tracking-wider mb-6">
                <span>{t.artists.debut} {artist.debut}</span>
              </div>

              <p className="text-base leading-relaxed text-gray-600 max-w-2xl">
                {lang === "ko" ? artist.descriptionKo : artist.description}
              </p>

              {artist.members && (
                <div className="mt-8">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
                    {t.artists.members}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {artist.members.map((member) => (
                      <span
                        key={member}
                        className="text-sm text-gray-500"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {artist.social && (
                <div className="flex gap-6 mt-8">
                  {artist.social.instagram && (
                    <a
                      href={artist.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-black transition-colors uppercase tracking-[0.15em]"
                    >
                      Instagram
                    </a>
                  )}
                  {artist.social.twitter && (
                    <a
                      href={artist.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-black transition-colors uppercase tracking-[0.15em]"
                    >
                      Twitter / X
                    </a>
                  )}
                  {artist.social.youtube && (
                    <a
                      href={artist.social.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-400 hover:text-black transition-colors uppercase tracking-[0.15em]"
                    >
                      YouTube
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="w-full md:w-96 shrink-0 order-1 md:order-2">
              <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discography */}
      {artist.discography && artist.discography.length > 0 && (
        <section className="px-4 pb-24">
          <div className="mx-auto max-w-5xl">
            <div className="border-t border-gray-200 pt-10">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">
                {t.artists.discography}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
                {artist.discography.map((album) => (
                  <div key={album.title} className="bg-white p-6">
                    <h3 className="text-sm font-bold mb-1">{album.title}</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{album.type}</p>
                    <p className="text-xs text-gray-300 mt-2">{album.releaseDate}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Back link */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="border-t border-gray-200 pt-10">
            <Link
              href="/artists"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-black transition-colors uppercase tracking-[0.15em]"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7-7l-7 7 7 7" />
              </svg>
              {t.artists.all}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
