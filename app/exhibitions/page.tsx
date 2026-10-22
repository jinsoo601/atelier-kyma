import type { Metadata } from "next";
import Link from "next/link";
import GalleryImageFrame from "@/components/gallery/GalleryImage";
import PageTitle from "@/components/gallery/PageTitle";
import { exhibitionHref, exhibitions } from "@/content/gallery";
import { featuredHome } from "@/content/featured-home";
import { pageMetadata } from "@/lib/siteMetadata";

const exhibitionImage = exhibitions.find((exhibition) => exhibition.image)?.image ?? featuredHome.image;
export const metadata: Metadata = pageMetadata({
  title: "전시 아카이브",
  description: "아뜰리에 키마의 지난 전시를 날짜별로 살펴보세요. 전시 소개와 작품 이미지가 보관되어 있습니다.",
  path: "/exhibitions",
  image: exhibitionImage.src,
  imageAlt: exhibitionImage.alt,
});

export default function ExhibitionsPage() {
  const featured = exhibitions.find((exhibition) => exhibition.migrated && exhibition.image);
  return (
    <main className="shell">
      <PageTitle eyebrow="EXHIBITIONS" title="전시 아카이브" description="아뜰리에 키마가 소개한 전시를 날짜별로 살펴보세요." />
      {featured?.image && <Link href={exhibitionHref(featured)} className="exhibition-lead">
        <GalleryImageFrame image={featured.image} sizes="(max-width: 800px) 100vw, 55vw" />
        <div><span className="eyebrow">FROM THE ARCHIVE · {featured.startDate.slice(0, 4)}</span><h2>{featured.title}</h2><p>{featured.artistName} 개인전 · {featured.startDate}—{featured.endDate}</p><span className="text-link">전시 보기</span></div>
      </Link>}
      <div className="archive-list">
        <div className="section-heading section-line"><div><span className="eyebrow">ALL EXHIBITIONS</span><h2>지난 전시</h2></div><span className="muted">{exhibitions.length} exhibitions</span></div>
        {exhibitions.map((exhibition) => <Link className="archive-row" key={exhibition.slug} href={exhibitionHref(exhibition)}>
          <span className="year">{exhibition.startDate.slice(0, 4)}</span><strong>{exhibition.title}</strong>
          <span className="date">{exhibition.startDate.slice(5).replace("-", ".")}—{exhibition.endDate.slice(5).replace("-", ".")}</span><span className="arrow" aria-hidden="true">↗</span>
        </Link>)}
      </div>
    </main>
  );
}
