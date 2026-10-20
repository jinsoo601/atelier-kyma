import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Atelier Kyma",
    template: "%s | Atelier Kyma",
  },
  description: "서울의 갤러리 아뜰리에 키마. 작가와 작품, 전시를 소개합니다.",
};

const navigation = [
  { href: "/artists", label: "작가" },
  { href: "/exhibitions", label: "전시" },
  { href: "/about", label: "갤러리" },
  { href: "/contact", label: "문의" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[#faf9f6] text-[#1f201e]">
        <header className="border-b border-[#e8e5de]">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-5 md:px-8">
            <Link href="/" aria-label="Atelier Kyma 홈">
              <Image
                src="/logo.png"
                alt="Atelier Kyma"
                width={185}
                height={50}
                priority
              />
            </Link>
            <nav aria-label="주요 메뉴" className="hidden gap-7 text-sm md:flex">
              {navigation.map(({ href, label }) => (
                <Link key={href} href={href} className="hover:underline">
                  {label}
                </Link>
              ))}
            </nav>
            <details className="relative md:hidden">
              <summary className="cursor-pointer list-none py-2 text-sm">메뉴</summary>
              <nav
                aria-label="모바일 주요 메뉴"
                className="absolute right-0 z-10 mt-2 flex min-w-32 flex-col gap-4 border border-[#e8e5de] bg-[#faf9f6] p-4 text-sm shadow-sm"
              >
                {navigation.map(({ href, label }) => (
                  <Link key={href} href={href}>
                    {label}
                  </Link>
                ))}
              </nav>
            </details>
          </div>
        </header>
        <main className="mx-auto min-h-[65vh] max-w-6xl px-5 py-12 md:px-8 md:py-16">
          {children}
        </main>
        <footer className="border-t border-[#e8e5de] px-5 py-8 text-sm text-[#66645e] md:px-8">
          <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 sm:flex-row">
            <span>© Atelier Kyma</span>
            <a href="mailto:info@atelierkyma.com">info@atelierkyma.com</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
