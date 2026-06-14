export interface HeroSlide {
  id: string;
  artist: string;
  title: string;
  titleKo: string;
  album?: string;
  albumKo?: string;
  description?: string;
  descriptionKo?: string;
  releaseDate?: string;
  youtubeId: string;
  startTime?: number;
  endTime?: number;
  albumImage?: string;
  linkType: "none" | "more" | "youtube";
  moreUrl?: string;
}

export const heroSlides: HeroSlide[] = [
  {
    id: "fromis-comeback",
    artist: "fromis_9",
    title: "Supersonic",
    titleKo: "Supersonic",
    album: "Supersonic",
    albumKo: "Supersonic",
    description: "fromis_9's vibrant summer return",
    descriptionKo: "프로미스나인의 화려한 여름 컴백",
    releaseDate: "2026-07-12",
    youtubeId: "0LiQp7y8Wwc",
    startTime: 45,
    endTime: 90,
    linkType: "youtube",
    moreUrl: "/artists/fromis_9",
  },
  {
    id: "fromis-winter",
    artist: "Fromis_9",
    title: "White Longing",
    titleKo: "하얀 그리움",
    album: "Winter Album",
    albumKo: "윈터 앨범",
    description: "Fromis_9 Winter Album",
    descriptionKo: "프로미스나인 윈터 앨범",
    releaseDate: "2025-12-25",
    youtubeId: "5ZB9JLfIw_Q",
    startTime: 40,
    endTime: 85,
    linkType: "more",
    moreUrl: "/artists/fromis_9",
  },
  {
    id: "asnd-launch",
    artist: "ASND",
    title: "Achieve Something Never Done Before",
    titleKo: "이루지 못한 것을 이루다",
    description: "A new beginning for fromis_9 and Wendy",
    descriptionKo: "프로미스나인과 웬디의 새로운 시작",
    youtubeId: "5PS2cJsSJrI",
    startTime: 0,
    endTime: 15,
    linkType: "youtube",
    moreUrl: "/artists/fromis_9",
  },
  {
    id: "fromis-fanmeet",
    artist: "fromis_9",
    title: "Fan Meeting",
    titleKo: "팬미팅",
    album: "fromis_9 Fan Meeting",
    albumKo: "프로미스나인 팬미팅",
    description: "I Like You Better - fromis_9",
    descriptionKo: "서울 YES24 라이브홀에서 개최",
    releaseDate: "2026-07-05",
    youtubeId: "r1QapH1SIAI",
    startTime: 60,
    endTime: 120,
    linkType: "youtube",
    moreUrl: "/schedule",
  },
];
//https://youtu.be/r1QapH1SIAI?si=Myn4etPCvY5eJM0Z