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
  color?: string;
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
    bannerImage: "/images/logo.jpg",
    social: {
      instagram: "https://instagram.com/fromis_9",
      twitter: "https://twitter.com/fromis_9",
      youtube: "https://youtube.com/@fromis_9",
    },
    discography: [
      {
        title: "I like you better",
        type: "Group",
        releaseDate: "2025-06-25",
        image: "/images/likeyou.jpg"
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
    bannerImage: "/images/Hayoung-bg.png",
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
    bannerImage: "/images/Jiwon-bg.png",
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
    bannerImage: "/images/Chaeyoung.png",
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
    bannerImage: "/images/nagyung-bg.png",
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
    bannerImage: "/images/Jiheon.png",
  },
  {
    id: "wendy",
    name: "Wendy",
    nameKo: "웬디",
    type: "soloist",
    debut: "2015",
    description:
      "South Korean singer, songwriter, and television presenter best known as a member of the K-pop girl group Red Velvet.",
    descriptionKo:
      "대한민국의 가수, 작곡가, 텔레비전 presenter로 K-pop 걸그룹 레드벨벳의 멤버로 가장 잘 알려져 있습니다.",
    image: "/images/wendy.jpg",
    bannerImage: "/images/Wendy.png",
    social: {
      instagram: "https://instagram.com/today_wendy",
      youtube: "https://youtube.com/@wendy",
    },
    discography: [
      {
        title: "Wish You Hell",
        type: "Mini Album",
        releaseDate: "2024-03-12",
        image: "/images/Wishyou.jpg"
      },
      {
        title: "Supersonic",
        type: "Mini Album",
        releaseDate: "2024-08-12",
        image: "/images/Supersonic-album.jpg"
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
