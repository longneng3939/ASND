export const siteConfig = {
  name: "ASND",
  fullName: "ASND Label",
  tagline: "Achieve Something Never Done Before",
  taglineKorean: "이루지 못한 것을 이루다",
  description:
    "ASND Label is a South Korean entertainment company founded in 2025, home to fromis_9 and Wendy.",
  url: "https://asndent.com",
  ceo: "Seo Beop-su",
  founded: "January 26, 2025",
  location: "Seoul, South Korea",
  brandColor: "#6C3FD1",
  social: {
    instagram: "https://instagram.com/asndlabel",
    twitter: "https://x.com/ASNDLABEL",
    youtube: "https://youtube.com/@asndentertainment",
  },
  navItems: [
    { label: "Home", labelKo: "홈", href: "/" },
    { label: "Artists", labelKo: "아티스트", href: "/artists" },
    { label: "Schedule", labelKo: "스케줄", href: "/schedule" },
    { label: "News", labelKo: "소식", href: "/news" },
    { label: "Audition", labelKo: "오디션", href: "/audition" },
    { label: "About", labelKo: "회사소개", href: "/about" },
    { label: "Contact", labelKo: "문의", href: "/contact" },
  ],
} as const;
