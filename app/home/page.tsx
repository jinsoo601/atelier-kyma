import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { artists } from "@/content/gallery";
import { featuredHome } from "@/content/featured-home";

export const metadata: Metadata = { title: "홈" };

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-image">
          <Image src={featuredHome.image.src} alt={featuredHome.image.alt} fill sizes="(max-width: 800px) 100vw, 50vw" priority />
        </div>
        <div className="hero-copy">
          <span className="eyebrow">{featuredHome.eyebrow}</span>
          <h1>{featuredHome.title}</h1>
          <p>{featuredHome.description}</p>
          <Link className="text-link" href={featuredHome.href}>작품 보기</Link>
        </div>
      </section>
      <div className="shell">
        <section className="home-intro section-line">
          <div><span className="eyebrow">ABOUT THE GALLERY</span><h2>새로운 물결을 만드는 공간</h2></div>
          <p>키마는 그리스어로 ‘물결’을 뜻합니다. 회화와 공예, 디자인을 가로지르며 작가의 세계를 가까이에서 소개합니다.</p>
        </section>
        <div className="home-links">
          <section>
            <span className="eyebrow">ARTISTS</span><h2>작가</h2>
            <div className="name-list">
              {artists.slice(0, 2).map((artist) => <Link key={artist.slug} href={`/artists/${artist.slug}`}><span>{artist.name}</span><small>{artist.romanName}</small></Link>)}
            </div>
            <Link className="text-link" href="/artists">전체 작가 보기</Link>
          </section>
          <section>
            <span className="eyebrow">EXHIBITIONS</span><h2>전시 아카이브</h2>
            <p>지난 전시의 이미지와 이야기를 날짜별로 살펴보세요.</p>
            <Link className="text-link" href="/exhibitions">전시 보기</Link>
          </section>
        </div>
      </div>
    </main>
  );
}
