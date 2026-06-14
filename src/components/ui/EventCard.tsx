"use client";

import Image from "next/image";
import { useI18n } from "@/i18n";

interface EventCardProps {
  title: string;
  titleKo?: string;
  date: string;
  type: "concert" | "fanmeet" | "release" | "broadcast" | "other";
  artistName?: string;
  artistNameKo?: string;
  artistImage?: string;
  location?: string;
  locationKo?: string;
  description?: string;
  descriptionKo?: string;
  link?: string;
  isPast?: boolean;
}

export function EventCard({
  title,
  titleKo,
  date,
  type,
  artistName,
  artistNameKo,
  artistImage,
  location,
  locationKo,
  description,
  descriptionKo,
  link,
  isPast = false,
}: EventCardProps) {
  const { lang } = useI18n();
  const displayTitle = lang === "ko" && titleKo ? titleKo : title;
  const displayLocation = lang === "ko" && locationKo ? locationKo : location;
  const displayDescription =
    lang === "ko" && descriptionKo ? descriptionKo : description;
  const displayArtistName =
    lang === "ko" && artistNameKo ? artistNameKo : artistName;

  const typeLabels = {
    concert: lang === "ko" ? "콘서트" : "Concert",
    fanmeet: lang === "ko" ? "팬미팅" : "Fan Meeting",
    release: lang === "ko" ? "발매" : "Release",
    broadcast: lang === "ko" ? "방송" : "Broadcast",
    other: lang === "ko" ? "기타" : "Other",
  };

  const CardContent = (
    <div
      className={`flex gap-4 p-4 rounded-xl border transition-all duration-300 ${
        isPast
          ? "bg-gray-50 border-gray-200 opacity-70"
          : "bg-white border-gray-100 hover:shadow-lg hover:border-black"
      }`}
    >
      <div className="flex-shrink-0 w-16 text-center">
        <div className="text-xs font-medium text-gray-500 uppercase">
          {new Date(date).toLocaleDateString(
            lang === "ko" ? "ko-KR" : "en-US",
            { month: "short" }
          )}
        </div>
        <div className="text-2xl font-bold">{new Date(date).getDate()}</div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              isPast ? "bg-gray-100 text-gray-500" : "bg-black text-white"
            }`}
          >
            {typeLabels[type]}
          </span>
          {isPast && (
            <span className="text-xs text-gray-400">
              {lang === "ko" ? "종료" : "Past"}
            </span>
          )}
        </div>
        <h3 className="font-bold truncate">{displayTitle}</h3>
        {displayDescription && (
          <p className="text-sm text-gray-600 line-clamp-1 mt-0.5">
            {displayDescription}
          </p>
        )}
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
          {displayLocation && (
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {displayLocation}
            </span>
          )}
          {displayArtistName && (
            <span className="flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {displayArtistName}
            </span>
          )}
        </div>
      </div>

      {artistImage && (
        <div className="flex-shrink-0 self-center">
          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-100">
            <Image
              src={artistImage}
              alt={displayArtistName || "Artist"}
              fill
              className="object-cover"
              sizes="40px"
            />
          </div>
        </div>
      )}
    </div>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none focus:ring-2 focus:ring-black rounded-xl"
      >
        {CardContent}
      </a>
    );
  }

  return CardContent;
}
