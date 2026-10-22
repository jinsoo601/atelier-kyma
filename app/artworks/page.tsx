import type { Metadata } from "next";
import Link from "next/link";
import GalleryImageFrame from "@/components/gallery/GalleryImage";
import PageTitle from "@/components/gallery/PageTitle";
import { artists, artworks, formatKrw } from "@/content/gallery";
import { featuredHome } from "@/content/featured-home";
import { pageMetadata } from "@/lib/siteMetadata";

export const metadata: Metadata = pageMetadata({
  title: "작품",
  description: "아뜰리에 키마의 작품을 살펴보고 가격, 제작 정보, 구매 문의 방법을 확인하세요.",
  path: "/artworks",
  image: artworks[0]?.image.src ?? featuredHome.image.src,
  imageAlt: artworks[0]?.image.alt ?? featuredHome.image.alt,
});

const categoryLabel = {
  ceramics: "도자",
  painting: "회화",
  photography: "사진",
  other: "기타",
} as const;

export default function ArtworksPage() {
  return (
    <main className="shell">
      <PageTitle eyebrow="ARTWORKS" title="작품" description="판매 또는 구매 문의가 가능한 작품입니다. 각 작품의 가격과 구매 방법을 상세 페이지에서 확인하세요." />
      <div className="artwork-grid">
        {artworks.map((artwork) => {
          const artist = artists.find(({ slug }) => slug === artwork.artistSlug);
          return <article key={artwork.slug}><Link href={`/artworks/${artwork.slug}`}>
            <GalleryImageFrame image={artwork.image} sizes="(max-width: 600px) 100vw, 32vw" />
            <h2>{artwork.title} ↗</h2><p>{artist?.name} · {categoryLabel[artwork.category]}</p><p className="price">{formatKrw(artwork.priceKrw)}</p>
          </Link></article>;
        })}
      </div>
    </main>
  );
}
