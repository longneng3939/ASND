"use client";

import Link from "next/link";
import { useI18n } from "@/i18n";
import { siteConfig } from "@/data/site";

const familySites = [
  { name: "ASND AUDITION", href: "/audition" },
  { name: "ASND RECRUIT", href: "/contact" },
  { name: "ASND SHOP", href: "#" },
  { name: "ASND FANS", href: "#" },
  { name: "ASND PUBLISHING", href: "#" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: siteConfig.social.instagram,
    hoverColor: "hover:text-[#E4405F]",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: siteConfig.social.twitter,
    hoverColor: "hover:text-[#000000]",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: siteConfig.social.youtube,
    hoverColor: "hover:text-[#FF0000]",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
];

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border mt-auto bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {/* Logo Column - Space for your logo */}
          <div className="col-span-2 sm:col-span-4 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <span className="text-xl font-black tracking-tight">ASND</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed mb-4">
              {siteConfig.tagline}
            </p>
            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-muted ${link.hoverColor} transition-colors p-2 rounded-lg hover:bg-surface-hover`}
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">
              {t.nav.artists}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/artists/fromis_9" className="text-sm text-muted hover:text-brand transition-colors">
                  fromis_9
                </Link>
              </li>
              <li>
                <Link href="/artists/hayoung" className="text-sm text-muted hover:text-brand transition-colors">
                  Song Hayoung
                </Link>
              </li>
              <li>
                <Link href="/artists/jiwon" className="text-sm text-muted hover:text-brand transition-colors">
                  Park Jiwon
                </Link>
              </li>
              <li>
                <Link href="/artists/chaeyoung" className="text-sm text-muted hover:text-brand transition-colors">
                  Lee Chaeyoung
                </Link>
              </li>
              <li>
                <Link href="/artists/nagyung" className="text-sm text-muted hover:text-brand transition-colors">
                  Lee Nagyung
                </Link>
              </li>
              <li>
                <Link href="/artists/jiheon" className="text-sm text-muted hover:text-brand transition-colors">
                  Baek Jiheon
                </Link>
              </li>
              <li>
                <Link href="/artists/wendy" className="text-sm text-muted hover:text-brand transition-colors">
                  Wendy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">
              {t.footer.family}
            </h3>
            <ul className="space-y-2.5">
              {familySites.map((site) => (
                <li key={site.name}>
                  <Link
                    href={site.href}
                    className="text-sm text-muted hover:text-brand transition-colors"
                  >
                    {site.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-4">
              {t.nav.about}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-sm text-muted hover:text-brand transition-colors">
                  {t.about.title}
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-sm text-muted hover:text-brand transition-colors">
                  {t.nav.news}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted hover:text-brand transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link href="/audition" className="text-sm text-muted hover:text-brand transition-colors">
                  {t.nav.audition}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} {siteConfig.fullName}. {t.footer.rights}
          </p>
          <div className="flex gap-4">
            <Link href="/contact" className="text-xs text-muted hover:text-brand transition-colors">
              {t.footer.privacy}
            </Link>
            <span className="text-xs text-muted">|</span>
            <Link href="/contact" className="text-xs text-muted hover:text-brand transition-colors">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
