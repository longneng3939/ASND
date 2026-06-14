"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/i18n";

interface ArtistCardProps {
  id: string;
  name: string;
  nameKo?: string;
  image: string;
  type: "group" | "solo";
  description?: string;
  descriptionKo?: string;
  variant?: "default" | "compact" | "featured";
}

export function ArtistCard({
  id,
  name,
  nameKo,
  image,
  type,
  description,
  descriptionKo,
  variant = "default",
}: ArtistCardProps) {
  const { lang } = useI18n();
  const displayName = lang === "ko" && nameKo ? nameKo : name;
  const displayDescription =
    lang === "ko" && descriptionKo ? descriptionKo : description;

  if (variant === "compact") {
    return (
      <Link
        href={`/artists/${id}`}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-black"
        aria-label={`View ${displayName} profile`}
      >
        <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
          <Image
            src={image}
            alt={displayName}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{displayName}</p>
          <p className="text-xs text-gray-500">
            {type === "group" ? "Group" : "Solo"}
          </p>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/artists/${id}`}
        className="group relative block overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
        aria-label={`View ${displayName} profile`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={displayName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-white/20 text-white rounded-full mb-2 backdrop-blur-sm">
              {type === "group" ? "Group" : "Solo"}
            </span>
            <h3 className="text-xl font-bold text-white">{displayName}</h3>
            {displayDescription && (
              <p className="text-sm text-white/80 mt-1 line-clamp-2">
                {displayDescription}
              </p>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/artists/${id}`}
      className="group block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black"
      aria-label={`View ${displayName} profile`}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={displayName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold group-hover:text-black transition-colors">
            {displayName}
          </h3>
          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
            {type === "group" ? "Group" : "Solo"}
          </span>
        </div>
        {displayDescription && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {displayDescription}
          </p>
        )}
      </div>
    </Link>
  );
}
