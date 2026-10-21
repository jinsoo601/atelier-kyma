import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "갤러리" };

export default function GalleryPage() {
  return (
    <main className="shell">
      <section className="about-lead">
        <div><span className="eyebrow">ABOUT ATELIER KYMA</span><h1>갤러리</h1></div>
        <p>작품과 작가, 그리고 그 작품을 만나는 사람들 사이에서 새로운 물결을 만들어 갑니다.</p>
      </section>
      <section className="language-section"><h2>한국어 <span className="muted">/ Korean</span></h2><p lang="ko">키마는 그리스어로 ‘물결’이라는 뜻입니다. 평면회화, 다양한 입체작업과 공예, 그리고 디자인 분야를 아우르며 예술을 더 가까이 소개하고자 합니다.</p></section>
      <section className="language-section"><h2>English</h2><p lang="en">Kyma means “wave” in Greek. Atelier Kyma brings the public closer to artists working across painting, sculpture, craft, and design.</p></section>
      <section className="language-section"><h2>Français</h2><p lang="fr">Kyma signifie « vague » en grec. L’Atelier Kyma rapproche le public des œuvres d’artistes de différentes disciplines.</p></section>
      <div className="about-visit"><Link className="text-link" href="/inquiries">방문 정보 보기</Link></div>
    </main>
  );
}
