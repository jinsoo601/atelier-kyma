import type { Metadata } from "next";
import Link from "next/link";
import GalleryImageFrame from "@/components/gallery/GalleryImage";
import PageTitle from "@/components/gallery/PageTitle";
import { artists, artworks, formatKrw } from "@/content/gallery";

export const metadata: Metadata = { title: "작품" };

export default function ArtworksPage() {
  return (
    <main className="shell">
      <PageTitle eyebrow="ARTWORKS" title="작품" description="판매 또는 구매 문의가 가능한 작품입니다. 각 작품의 가격과 구매 방법을 상세 페이지에서 확인하세요." />
      <div className="artwork-grid">
        {artworks.map((artwork) => {
          const artist = artists.find(({ slug }) => slug === artwork.artistSlug);
          return <article key={artwork.slug}><Link href={`/artworks/${artwork.slug}`}>
            <GalleryImageFrame image={artwork.image} sizes="(max-width: 600px) 100vw, 32vw" />
            <h2>{artwork.title} ↗</h2><p>{artist?.name} · 도자</p><p className="price">{formatKrw(artwork.priceKrw)}</p>
          </Link></article>;
        })}
      </div>
    </main>
  );
}
