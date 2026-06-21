import { JypHeroCarousel } from "@/components/home/JypHeroCarousel";
import { NoticeBanner as NewsTicker } from "@/components/home/NoticeBanner";
import { NoticeBanner } from "@/components/ui/NoticeBanner";
import { FeaturedArtists } from "@/components/home/FeaturedArtists";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { ScrollytellingAlbums } from "@/components/home/ScrollytellingAlbums";

export default function HomePage() {
  return (
    <>
      <NoticeBanner
        id="asnd-welcome"
        title="Welcome to ASND"
        titleKo="ASND에 오신 것을 환영합니다"
        message="We are home to fromis_9 and Wendy."
        messageKo="프로미스나인과 웬디의 소속사입니다."
        variant="info"
      />
      <JypHeroCarousel />
      <ScrollytellingAlbums />
      <NewsTicker />
    </>
  );
}
