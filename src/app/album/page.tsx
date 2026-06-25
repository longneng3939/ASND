"use client";

import { useI18n } from "@/i18n";
import { artists, type Artist } from "@/data/artists";

interface AlbumItem {
  artistName: string;
  artistNameKo: string;
  artistImage: string;
  artistId: string;
  title: string;
  titleKo?: string;
  type: string;
  releaseDate: string;
  image?: string;
}

export default function AlbumPage() {
  const { lang } = useI18n();

  const albums: AlbumItem[] = artists.flatMap((artist) =>
    (artist.discography || []).map((album) => ({
      artistName: artist.name,
      artistNameKo: artist.nameKo,
      artistImage: artist.image,
      artistId: artist.id,
      title: album.title,
      titleKo: album.titleKo,
      type: album.type,
      releaseDate: album.releaseDate,
      image: album.image,
    }))
  );

  albums.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

  return (
    <div className="min-h-screen">
      <section className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
            Album
          </p>
          <h1 className="text-3xl sm:text-6xl font-black tracking-tight leading-none mb-3">
            {lang === "ko" ? "앨범" : "Albums"}
          </h1>
          <p className="text-gray-500 text-base">
            {lang === "ko" ? "ASND 레이블 아티스트의 모든 앨범" : "All releases from ASND Label artists"}
          </p>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-6xl">
          <div className="border-t border-gray-200 pt-10">
            {albums.length === 0 ? (
              <p className="text-gray-400">{lang === "ko" ? "앨범이 없습니다." : "No albums yet."}</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {albums.map((album, i) => (
                  <div key={`${album.artistId}-${album.title}-${i}`} className="group">
                    <div className="aspect-square rounded-xl border border-white/10 p-5 flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-cover bg-center opacity-70"
                        style={{ backgroundImage: `url(${album.image || album.artistImage})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-gray/40 via-gray/10 to-transparent" />

                      <div className="relative z-10 w-4/5 sm:w-[65%] aspect-square rounded-full overflow-hidden flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.7)] border-[3px] border-white/15 transition-transform duration-700 group-hover:rotate-12 flex-shrink-0">
                        <div
                          className="absolute inset-0 bg-cover bg-center rounded-full"
                          style={{ backgroundImage: `url(${album.image || album.artistImage})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent rounded-full" />
                        <div className="w-[18%] h-[18%] rounded-full bg-gradient-to-br from-gray-200 via-white to-gray-400 shadow-inner relative z-10 border-2 border-white/30" />
                      </div>

                      <div className="relative z-10 mt-3 sm:mt-4 text-center">
                        <p className="text-xs sm:text-sm md:text-base font-bold text-white leading-tight">
                          {lang === "ko" && album.titleKo ? album.titleKo : album.title}
                        </p>
                        <p className="text-[10px] sm:text-xs text-white/50 mt-0.5 sm:mt-1">
                          {lang === "ko" ? album.artistNameKo : album.artistName}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-white/30 mt-1 sm:mt-1.5">
                          {album.type} · {new Date(album.releaseDate).getFullYear()}
                        </p>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
