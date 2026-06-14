export interface Event {
  id: string;
  title: string;
  titleKo: string;
  date: string;
  time?: string;
  type: "concert" | "fanmeeting" | "release" | "appearance" | "other";
  artist: string;
  venue?: string;
  location?: string;
  link?: string;
}

export const events: Event[] = [
  {
    id: "fromis-comeback-1",
    title: "fromis_9 Comeback",
    titleKo: "프로미스나인 컴백",
    date: "2026-06-15",
    type: "release",
    artist: "fromis_9",
  },
  {
    id: "wendy-festival-1",
    title: "Wendy - University Festival",
    titleKo: "웬디 - 대학축제",
    date: "2026-06-20",
    type: "appearance",
    artist: "Wendy",
    venue: "Seoul National University",
    location: "Seoul",
  },
  {
    id: "fromis-fanmeet-1",
    title: "fromis_9 Fan Meeting",
    titleKo: "프로미스나인 팬미팅",
    date: "2026-07-05",
    type: "fanmeeting",
    artist: "fromis_9",
    venue: "YES24 Live Hall",
    location: "Seoul",
  },
];

export function getUpcomingEvents(count?: number): Event[] {
  const now = new Date();
  const sorted = [...events]
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return count ? sorted.slice(0, count) : sorted;
}
