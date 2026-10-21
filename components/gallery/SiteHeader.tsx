"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/artists", label: "작가" },
  { href: "/artworks", label: "작품" },
  { href: "/exhibitions", label: "전시" },
  { href: "/gallery", label: "갤러리" },
  { href: "/inquiries", label: "문의" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const current = (href: string) => pathname && (pathname === href || pathname.startsWith(`${href}/`)) ? "page" : undefined;
  return (
    <header className="site-header">
      <Link href="/home" aria-label="Atelier Kyma 홈" className="logo-link">
        <Image src="/logo.png" alt="Atelier Kyma" width={218} height={59} priority />
      </Link>
      <nav className="site-nav" aria-label="주요 메뉴">
        {navigation.map(({ href, label }) => <Link key={href} href={href} aria-current={current(href)}>{label}</Link>)}
      </nav>
      <details className="mobile-menu" ref={menu}>
        <summary>메뉴 <span aria-hidden="true">☰</span></summary>
        <nav aria-label="모바일 주요 메뉴">
          {navigation.map(({ href, label }) => <Link key={href} href={href} aria-current={current(href)} onClick={() => { if (menu.current) menu.current.open = false; }}>{label}</Link>)}
        </nav>
      </details>
    </header>
  );
}
