"use client";

import { useI18n } from "@/i18n";

type EntryStatus = "verified" | "pending";

interface DisclosureEntry {
  labelKo: string;
  labelEn: string;
  value: string;
  status: EntryStatus;
}

function SealIndicator({ status }: { status: EntryStatus }) {
  if (status === "verified") {
    return (
      <span className="seal-verified" aria-hidden="true">
        인
      </span>
    );
  }
  return (
    <span className="seal-pending" aria-hidden="true">
      —
    </span>
  );
}

function LedgerEntry({
  entry,
  index,
  lang,
}: {
  entry: DisclosureEntry;
  index: number;
  lang: "ko" | "en" | string;
}) {
  const statusLabel =
    entry.status === "verified"
      ? lang === "ko"
        ? "확인됨"
        : "Verified"
      : lang === "ko"
        ? "승인 대기 중"
        : "Pending verification";

  return (
    <div
      className="ledger-entry animate-cinematic-reveal"
      style={{ animationDelay: `${index * 100}ms` }}
      role="group"
      aria-label={`${entry.labelKo} — ${statusLabel}`}
    >
      <div className="entry-left">
        <dt className="entry-label-ko">{entry.labelKo}</dt>
        <dt className="entry-label-en">{entry.labelEn}</dt>
      </div>
      <div className="entry-right">
        <dd className="entry-value">{entry.value}</dd>
        <SealIndicator status={entry.status} />
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { lang } = useI18n();

  const disclosures: DisclosureEntry[] = [
    {
      labelKo: "회사명",
      labelEn: "Company Name",
      value: "ASND Label",
      status: "verified",
    },
    {
      labelKo: "대표자",
      labelEn: "Representative",
      value: lang === "ko" ? "김에이전시" : "Kim Agency",
      status: "verified",
    },
    {
      labelKo: "사업자등록번호",
      labelEn: "Business Registration",
      value: "000-00-00000",
      status: "pending",
    },
    {
      labelKo: "통신판매업신고",
      labelEn: "Online Business Report",
      value: "2024-XXX-XXXX",
      status: "pending",
    },
    {
      labelKo: "주소",
      labelEn: "Address",
      value: lang === "ko" ? "서울특별시 강남구" : "Seoul, South Korea",
      status: "verified",
    },
    {
      labelKo: "대표 이메일",
      labelEn: "Representative Email",
      value: "contact@asndent.com",
      status: "verified",
    },
  ];

  return (
    <div className="min-h-screen bg-(--paper-dark)">
      {/* Page wrapper with paper shadow */}
      <div className="hanji-surface mx-auto max-w-3xl min-h-screen shadow-[0_8px_40px_rgba(0,0,0,0.10),0_0_0_1px_rgba(0,0,0,0.04)]">
        <div className="px-6 md:px-12 py-20 md:py-24">
          {/* Header */}
          <header className="text-center mb-16">
            <span className="inline-block text-[11px] font-medium tracking-[0.25em] uppercase text-(--ink-light) border border-(--rule) px-5 py-1.5 mb-8">
              {lang === "ko" ? "공시" : "Disclosure"}
            </span>
            <h1
              className="text-[32px] md:text-[52px] font-bold leading-[1.15] tracking-[-0.01em] text-(--ink)"
              style={{ fontFamily: "var(--font-serif-kr), serif" }}
            >
              {lang === "ko" ? "사업자 정보 공시" : "Public Disclosure"}
            </h1>
            <p className="mt-3 text-sm md:text-lg font-normal tracking-[0.08em] uppercase text-(--ink-light)">
              {lang === "ko" ? "사업자 정보 공시" : "Public Disclosure"}
            </p>
            <p
              className="mt-6 text-[15px] text-(--ink-light) leading-relaxed"
              style={{ fontFamily: "var(--font-serif-kr), serif" }}
            >
              {lang === "ko"
                ? "ASND 레이블의 사업자 등록 정보입니다.\n본 문서는 전자상거래법에 의거한 사업자 정보 공시입니다."
                : "Business registration information of ASND Label.\nThis document is a public disclosure in accordance with the E-Commerce Act."}
            </p>
          </header>

          {/* Top ornamental rule */}
          <div className="mb-12">
            <div className="h-0.5 bg-(--rule-thick)" />
            <div className="h-px bg-(--rule) mt-1.5" />
          </div>

          {/* Ledger entries */}
          <dl>
            {disclosures.map((entry, index) => (
              <LedgerEntry
                key={entry.labelEn}
                entry={entry}
                index={index}
                lang={lang}
              />
            ))}
          </dl>

          {/* Bottom rule */}
          <div className="mt-0">
            <div className="h-px bg-(--rule)" />
          </div>

          {/* Final seal */}
          <div className="mt-16 text-center">
            <div
              className="seal-final animate-stamp-in mx-auto"
              style={{ animationDelay: `${disclosures.length * 100 + 200}ms` }}
              aria-hidden="true"
            >
              ASND
            </div>
            <p className="mt-3 text-[11px] font-medium tracking-[0.15em] uppercase text-(--ink-light)">
              {lang === "ko"
                ? "Achieve Something Never Done Before"
                : "Achieve Something Never Done Before"}
            </p>
          </div>
        </div>
      </div>

      {/* Inline ledger styles (Tailwind can't do everything) */}
      <style jsx>{`
        .ledger-entry {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 0;
          border-bottom: 1px solid var(--rule);
        }
        .ledger-entry:first-child {
          border-top: 2px solid var(--rule-thick);
        }
        .entry-left {
          flex: 1;
        }
        .entry-label-ko {
          font-family: var(--font-serif-kr), serif;
          font-size: 14px;
          font-weight: 400;
          color: var(--ink-light);
          margin-bottom: 2px;
        }
        .entry-label-en {
          font-size: 11px;
          font-weight: 400;
          color: #8a95a8;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .entry-right {
          text-align: right;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .entry-value {
          font-size: 17px;
          font-weight: 600;
          color: var(--ink);
          text-align: right;
        }
        @media (max-width: 767px) {
          .ledger-entry {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            padding: 20px 0;
          }
          .entry-right {
            width: 100%;
            flex-direction: row;
            justify-content: space-between;
          }
          .entry-value {
            font-size: 15px;
          }
        }
      `}</style>
    </div>
  );
}
