export interface Artist {
  id: string;
  name: string;
  nameKo: string;
  type: "group" | "soloist";
  debut: string;
  members?: string[];
  description: string;
  descriptionKo: string;
  image: string;
  bannerImage?: string;
  color: string;
  social?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
  discography?: {
    title: string;
    titleKo?: string;
    type: string;
    releaseDate: string;
    image?: string;
  }[];
}

export const artists: Artist[] = [
  {
    id: "fromis_9",
    name: "fromis_9",
    nameKo: "프로미스나인",
    type: "group",
    debut: "2018",
    members: ["Hayoung", "Jiwon", "Chaeyoung", "Nagyung", "Jiheon"],
    description:
      "fromis_9 is a South Korean girl group formed through the survival show 'Idol School'. Known for their bright and energetic concepts, the group continues their journey under ASND Label with five members.",
    descriptionKo:
      "프로미스나인은 서바이벌 프로그램 '아이돌학교'를 통해 결성된 대한민국 걸그룹입니다. 밝고 에너제틱한 콘셉트로 사랑받으며, ASND 레이블에서 5인의 멤버로 새로운 도약을 이어가고 있습니다.",
    image: "/images/Group.jpg",
    color: "#FF6B9D",
    social: {
      instagram: "https://instagram.com/fromis_9",
      twitter: "https://twitter.com/fromis_9",
      youtube: "https://youtube.com/@fromis_9",
    },
    discography: [
      {
        title: "From",
        type: "Special Single",
        releaseDate: "2024-12-23",
      },
    ],
  },
  {
    id: "hayoung",
    name: "Song Hayoung",
    nameKo: "송하영",
    type: "soloist",
    debut: "2018",
    description:
      "Main vocalist of fromis_9 with a warm and powerful voice. Known for her emotional delivery and stage presence.",
    descriptionKo:
      "프로미스나인의 메인보컬로 따뜻하고 파워풀한 목소리를 가진 송하영은 감성적인 전달력과 무대 장악력으로 잘 알려져 있습니다.",
    image: "/images/Hayoung.jpg",
    color: "#FF8C42",
  },
  {
    id: "jiwon",
    name: "Park Jiwon",
    nameKo: "박지원",
    type: "soloist",
    debut: "2018",
    description:
      "Leader and lead vocalist of fromis_9. Charismatic performer with exceptional dance and vocal skills.",
    descriptionKo:
      "프로미스나인의 리더이자 리드보컬인 박지원은 뛰어난 댄스와 보컬 실력을 겸비한 카리스마 넘치는 퍼포머입니다.",
    image: "/images/Jiwon.jpg",
    color: "#4ECDC4",
  },
  {
    id: "chaeyoung",
    name: "Lee Chaeyoung",
    nameKo: "이채영",
    type: "soloist",
    debut: "2018",
    description:
      "Main dancer and lead rapper of fromis_9. Known for her sharp dance moves and unique rap style.",
    descriptionKo:
      "프로미스나인의 메인댄서이자 리드래퍼인 이채영은 날카로운 춤선과 독특한 랩 스타일로 유명합니다.",
    image: "/images/chaeyoung.jpg",
    color: "#A855F7",
  },
  {
    id: "nagyung",
    name: "Lee Nagyung",
    nameKo: "이나경",
    type: "soloist",
    debut: "2018",
    description:
      "Lead dancer and vocalist of fromis_9. Known for her stunning visuals and elegant stage presence.",
    descriptionKo:
      "프로미스나인의 리드댄서이자 보컬리스트인 이나경은 뛰어난 비주얼과 우아한 무대 매너로 잘 알려져 있습니다.",
    image: "/images/Nagyung.jpg",
    color: "#F472B6",
  },
  {
    id: "jiheon",
    name: "Baek Jiheon",
    nameKo: "백지헌",
    type: "soloist",
    debut: "2018",
    description:
      "Vocalist and maknae of fromis_9. Known for her sweet voice and bright, youthful energy.",
    descriptionKo:
      "프로미스나인의 보컬리스트이자 막내인 백지헌은 달콤한 목소리와 밝고 youthful한 에너지로 사랑받고 있습니다.",
    image: "/images/Jiheon.jpg",
    color: "#60A5FA",
  },
  {
    id: "wendy",
    name: "Wendy",
    nameKo: "웬디",
    type: "soloist",
    debut: "2021",
    description:
      "Soloist and member of Red Velvet. Known for her powerful vocals, versatility in music, and warm personality. Wendy continues her solo journey with ASND while maintaining group activities with Red Velvet.",
    descriptionKo:
      "솔로 아티스트이자 Red Velvet의 멤버인 웬디는 파워풀한 보컬과 다양한 음악적 스펙트럼, 따뜻한 성격으로 잘 알려져 있습니다. ASND에서 솔로 활동을 이어가며 Red Velvet 그룹 활동도 병행합니다.",
    image: "/images/wendy.jpg",
    color: "#FFD700",
    social: {
      instagram: "https://instagram.com/today_wendy",
      youtube: "https://youtube.com/@wendy",
    },
    discography: [
      {
        title: "Like Water",
        type: "Mini Album",
        releaseDate: "2021-04-05",
      },
      {
        title: "Wish You Hell",
        type: "Mini Album",
        releaseDate: "2024-03-12",
      },
    ],
  },
];

export function getArtistById(id: string): Artist | undefined {
  return artists.find((a) => a.id === id);
}

export function getArtistsByType(type: "group" | "soloist"): Artist[] {
  return artists.filter((a) => a.type === type);
}

export function getGroupMembers(groupId: string): Artist[] {
  const group = artists.find((a) => a.id === groupId);
  if (!group?.members) return [];
  return artists.filter((a) => group.members!.includes(a.name.split(" ").pop()!));
}
