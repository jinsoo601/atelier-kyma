import type { Metadata } from "next";
import Link from "next/link";
import archive from "@/content/archive.json";

export const metadata: Metadata = { title: "갤러리" };

const paragraphs = (copy: string) => copy.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);

export default function GalleryPage() {
  return (
    <main className="shell">
      <section className="about-lead">
        <div><span className="eyebrow">ABOUT ATELIER KYMA</span><h1>갤러리</h1></div>
        <p>작품과 작가, 그리고 그 작품을 만나는 사람들 사이에서 새로운 물결을 만들어 갑니다.</p>
      </section>
      <section className="language-section"><h2>한국어 <span className="muted">/ Korean</span></h2><div lang="ko" className="language-copy">{paragraphs(archive.about.korean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
      <section className="language-section"><h2>English</h2><div lang="en" className="language-copy">{paragraphs(archive.about.english).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
      <section className="language-section"><h2>Français</h2><div lang="fr" className="language-copy">{paragraphs(archive.about.french).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
      <div className="about-visit"><Link className="text-link" href="/inquiries">방문 정보 보기</Link></div>
    </main>
  );
}
