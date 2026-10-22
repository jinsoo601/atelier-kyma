import type { Metadata } from "next";

import SiteHeader from "@/components/gallery/SiteHeader";
import { contact } from "@/content/gallery";
import { siteUrl } from "@/lib/siteMetadata";
import "@/styles/globals.css";
import "@/styles/gallery.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Atelier Kyma", template: "%s | Atelier Kyma" },
  description: "서울의 갤러리 아뜰리에 키마. 작가와 작품, 전시를 소개합니다.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <SiteHeader />
        <div className="site-content">{children}</div>
        <footer className="site-footer">
          <strong>Atelier Kyma</strong>
          <address className="footer-details">
            <span>{contact.address}</span>
            <span><a href={`mailto:${contact.email}`}>{contact.email}</a></span>
            <span><a href={contact.phoneHref}>{contact.phoneDisplay}</a></span>
          </address>
        </footer>
      </body>
    </html>
  );
}
