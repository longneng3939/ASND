export interface NewsItem {
  id: string;
  title: string;
  titleKo: string;
  date: string;
  category: "notice" | "media" | "update";
  excerpt: string;
  excerptKo: string;
  content: string;
  contentKo: string;
  image?: string;
}

export const newsItems: NewsItem[] = [
  {
    id: "asnd-launch",
    title: "ASND Label Officially Launches",
    titleKo: "ASND 레이블 공식 출범",
    date: "2025-02-19",
    category: "notice",
    excerpt:
      "ASND Label has officially launched its social media accounts, marking the beginning of its journey in the K-pop industry.",
    excerptKo:
      "ASND 레이블이 공식 SNS 계정을 오픈하며 K-pop 업계에서의 첫 발을 내디뎠습니다.",
    content:
      "ASND Label has officially launched its social media accounts, marking the beginning of its journey. The agency, home to five fromis_9 members, shared a message with fans stating their commitment to supporting the artists' dreams and keeping fans updated with various news and activities.",
    contentKo:
      "ASND 레이블이 공식 SNS 계정을 오픈하며 본격적인 활동을 시작했습니다. 5명의 프로미스나인 멤버들이 소속된 이 기관은 팬들에게 아티스트들의 꿈을 지원하고 다양한 소식과 활동을 전하겠다는 메시지를 전했습니다.",
  },
  {
    id: "wendy-signs",
    title: "Wendy Signs Exclusive Contract with ASND",
    titleKo: "웬디, ASND와 전속계약 체결",
    date: "2025-04-25",
    category: "notice",
    excerpt:
      "Red Velvet's Wendy has signed an exclusive contract with ASND for her solo activities.",
    excerptKo:
      "Red Velvet의 웬디가 솔로 활동을 위해 ASND와 전속계약을 체결했습니다.",
    content:
      "On April 25, ASND announced that Wendy has signed an exclusive contract with them. The agency expressed excitement about working with Wendy, who has proven her exceptional capabilities in various fields. ASND plans to actively support Wendy's activities with Red Velvet while also maximizing her individual career.",
    contentKo:
      "4월 25일, ASND는 웬디와 전속계약을 체결했다고 발표했습니다. 소속사는 다양한 분야에서 뛰어난 역량을 입증한 웬디와 함께하게 되어 기쁘다고 전했습니다. ASND는 Red Velvet 활동을 적극 지원하면서 웬디의 개인 활동도 극대화할 계획입니다.",
  },
  {
    id: "trademark-obtained",
    title: "ASND Obtains fromis_9 Trademark Rights",
    titleKo: "ASND, 프로미스나인 상표권 획득",
    date: "2025-03-26",
    category: "update",
    excerpt:
      "ASND has successfully obtained the trademark rights for the group name fromis_9.",
    excerptKo:
      "ASND가 프로미스나인 그룹명에 대한 상표권을 성공적으로 획득했습니다.",
    content:
      "On March 26, ASND posted a teaser for 'fromis_9', indicating they have obtained trademark rights for the group. This allows the group to continue using the name fromis_9 under their new agency, marking a significant milestone for both the artists and their fans.",
    contentKo:
      "3월 26일, ASND는 '프로미스나인' 티저를 게시하며 그룹명에 대한 상표권을 획득했음을 알렸습니다. 이를 통해 그룹은 새 소속사에서도 프로미스나인이라는 이름으로 활동을 이어갈 수 있게 되었으며, 이는 아티스트와 팬 모두에게 뜻깊은 이정표가 되었습니다.",
  },
];

export function getRecentNews(count?: number): NewsItem[] {
  const sorted = [...newsItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return count ? sorted.slice(0, count) : sorted;
}
