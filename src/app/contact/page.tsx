"use client";

import { useI18n } from "@/i18n";

export default function ContactPage() {
  const { lang } = useI18n();

  const disclosures = [
    {
      label: lang === "ko" ? "회사명" : "Company Name",
      value: "ASND Label",
    },
    {
      label: lang === "ko" ? "대표자" : "Representative",
      value: lang === "ko" ? "김에이전시" : "Kim Agency",
    },
    {
      label: lang === "ko" ? "사업자등록번호" : "Business Registration",
      value: "000-00-00000",
    },
    {
      label: lang === "ko" ? "통신판매업신고" : "Online Business Report",
      value: "2024-XXX-XXXX",
    },
    {
      label: lang === "ko" ? "주소" : "Address",
      value: lang === "ko" ? "서울특별시 강남구" : "Seoul, South Korea",
    },
    {
      label: lang === "ko" ? "대표 이메일" : "Representative Email",
      value: "contact@asndent.com",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="pt-28 pb-16 px-4">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-4">
            {lang === "ko" ? "공시" : "Disclosure"}
          </p>
          <h1 className="text-3xl sm:text-6xl font-black tracking-tight leading-none mb-3">
            {lang === "ko" ? "공시 정보" : "Public Disclosure"}
          </h1>
          <p className="text-gray-500 text-base">
            {lang === "ko" ? "ASND 레이블의 사업자 정보입니다." : "Business information of ASND Label."}
          </p>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="mx-auto max-w-3xl">
          <div className="border-t border-gray-200 pt-10">
            <dl className="divide-y divide-gray-200">
              {disclosures.map((item) => (
                <div key={item.label} className="flex items-center justify-between py-4">
                  <dt className="text-sm text-gray-500">{item.label}</dt>
                  <dd className="text-sm font-medium text-right">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
