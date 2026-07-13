"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useI18n } from "@/i18n";
import { getArtistById } from "@/data/artists";
import { Reveal } from "@/components/ui/Reveal";

export default function ArtistDetailPage() {
  const { t, lang } = useI18n();
  const params = useParams();
  const artist = getArtistById(params.slug as string);

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artist not found</h1>
          <Link href="/artists" className="underline text-muted hover:text-foreground transition-colors">
            Back to artists
          </Link>
        </div>
      </div>
    );
  }

  const displayDescription = lang === "ko" ? artist.descriptionKo : artist.description;
  const albumCount = artist.discography?.length || 0;

  return (
    <div className="min-h-screen bg-surface">

      {/* ───── Content ───── */}
      <section className="px-4 pt-28 pb-12 sm:pb-16 lg:pb-24">
        <div className="mx-auto max-w-6xl">

          {/* Back + title header */}
          <div className="mb-10">
            <Link
              href="/artists"
              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors uppercase tracking-[0.15em] mb-6 cinematic-fade"
              style={{ animationDelay: "0ms" }}
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7-7l-7 7 7 7" />
              </svg>
              {t.artists.all}
            </Link>
            <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted mb-2 cinematic-fade" style={{ animationDelay: "0.05s" }}>
              {artist.type === "group" ? t.artists.groups : t.artists.soloists}
            </span>
            <div className="overflow-hidden">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-none text-rise-blur" style={{ animationDelay: "0.1s" }}>
                {artist.name}
              </h1>
            </div>
            {artist.nameKo && (
              <p className="text-base sm:text-lg text-muted font-medium mt-2 cinematic-fade" style={{ animationDelay: "0.35s" }}>
                {artist.nameKo}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3 mt-3 cinematic-fade" style={{ animationDelay: "0.45s" }}>
              <span className="text-xs sm:text-sm text-muted tracking-wider">
                {t.artists.debut} {artist.debut}
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="text-xs sm:text-sm text-muted tracking-wider">
                {albumCount} {albumCount === 1 ? "Album" : "Albums"}
              </span>
              {artist.members && (
                <>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span className="text-xs sm:text-sm text-muted tracking-wider">
                    {artist.members.length} Members
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">

            {/* Main */}
            <div className="lg:col-span-2 space-y-12 cinematic-fade" style={{ animationDelay: "0.4s" }}>

              {/* About */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-accent to-secondary" />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-semibold">About</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-secondary to-accent" />
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-foreground/75 max-w-3xl">
                  {displayDescription}
                </p>
              </div>

              {/* Members */}
              {artist.members && artist.members.length > 0 && (
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.25em] text-muted font-semibold mb-4">
                    {t.artists.members}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {artist.members.map((member, i) => (
                      <Reveal key={member} delay={i * 80}>
                        <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-border/50">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {member[0]}
                          </div>
                          <span className="text-sm font-medium text-foreground/80 truncate">
                            {member}
                          </span>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              )}

              {/* Social */}
              {artist.social && (
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.25em] text-muted font-semibold mb-4">
                    Social
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {artist.social.instagram && (
                      <Reveal delay={0}>
                        <a
                          href={artist.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium bg-white rounded-xl border border-border/50 text-foreground/70 hover:border-accent hover:text-foreground hover:shadow-sm transition-all"
                        >
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                          Instagram
                        </a>
                      </Reveal>
                    )}
                    {artist.social.twitter && (
                      <Reveal delay={80}>
                        <a
                          href={artist.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium bg-white rounded-xl border border-border/50 text-foreground/70 hover:border-accent hover:text-foreground hover:shadow-sm transition-all"
                        >
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                          X / Twitter
                        </a>
                      </Reveal>
                    )}
                    {artist.social.youtube && (
                      <Reveal delay={160}>
                        <a
                          href={artist.social.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium bg-white rounded-xl border border-border/50 text-foreground/70 hover:border-accent hover:text-foreground hover:shadow-sm transition-all"
                        >
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                          YouTube
                        </a>
                      </Reveal>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar — Profile card */}
            <div className="cinematic-fade" style={{ animationDelay: "0.5s" }}>
              <div className="sticky top-8 space-y-6">
                {/* Photo */}
                <div className="relative">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl bg-white ring-1 ring-border/50 cinematic-img-reveal" style={{ animationDelay: "0.15s" }}>
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  </div>
                  {/* Decorative accent bar */}
                  <div className="absolute -bottom-1 left-4 right-4 h-1 rounded-full bg-gradient-to-r from-accent via-secondary to-accent opacity-60 cinematic-fade" style={{ animationDelay: "0.9s" }} />
                </div>

                {/* Quick facts */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-3 bg-white rounded-xl border border-border/50">
                    <p className="text-lg font-black text-foreground">{artist.debut}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted mt-0.5">Debut</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl border border-border/50">
                    <p className="text-lg font-black text-foreground">{albumCount}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted mt-0.5">Albums</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl border border-border/50">
                    <p className="text-lg font-black text-foreground">
                      {artist.type === "group" ? (artist.members?.length || "-") : "—"}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-muted mt-0.5">Members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Discography ───── */}
      {artist.discography && artist.discography.length > 0 && (
        <section className="px-4 pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="pt-12 border-t border-border">
              <Reveal className="flex items-center gap-3 mb-8">
                <div className="h-px flex-1 bg-gradient-to-r from-accent to-secondary" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted font-semibold">
                  {t.artists.discography}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-secondary to-accent" />
              </Reveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {artist.discography.map((album, i) => (
                  <div
                    key={album.title}
                    className="group bg-white rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1.5"
                  >
                    <Reveal animation="cinematic-img-reveal" delay={i * 120} className="aspect-square relative overflow-hidden bg-surface">
                      {album.image ? (
                        <Image
                          src={album.image}
                          alt={album.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted/20">
                          <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                          </svg>
                        </div>
                      )}
                    </Reveal>
                    <div className="p-4 overflow-hidden">
                      <Reveal animation="text-rise-blur" delay={i * 120 + 150}>
                        <h3 className="text-sm font-bold text-foreground truncate">{album.title}</h3>
                        <p className="text-xs text-muted mt-0.5 truncate">{album.type}</p>
                        <p className="text-[11px] text-muted/50 mt-1.5">{album.releaseDate}</p>
                      </Reveal>
                    </div>
                    <div className="h-0.5 bg-gradient-to-r from-accent to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bottom back link */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="pt-8 border-t border-border flex justify-center">
            <Link
              href="/artists"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-border/50 text-xs font-medium text-muted hover:text-foreground hover:border-accent hover:shadow-sm transition-all uppercase tracking-[0.15em]"
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
