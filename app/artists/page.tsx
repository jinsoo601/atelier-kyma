import type { Metadata } from "next";
import Link from "next/link";
import { artists } from "@/content/gallery";
import GalleryImageFrame from "@/components/gallery/GalleryImage";
import PageTitle from "@/components/gallery/PageTitle";
import { pageMetadata } from "@/lib/siteMetadata";

export const metadata: Metadata = pageMetadata({
  title: "작가",
  description: "아뜰리에 키마가 소개하는 작가들의 작품과 이력, 관련 전시를 살펴보세요.",
  path: "/artists",
  image: artists[0].hero.src,
  imageAlt: artists[0].hero.alt,
});

export default function ArtistsPage() {
  return (
    <main className="shell artists-page">
      <PageTitle eyebrow="ARTISTS" title="작가" description="아뜰리에 키마와 함께하는 작가들을 소개합니다." />
      <div className="artist-index">
        {artists.map((artist) => (
          <article key={artist.slug}>
            <Link href={`/artists/${artist.slug}`}>
              <GalleryImageFrame image={artist.hero} sizes="(max-width: 600px) 100vw, (max-width: 1200px) 48vw, 520px" />
              <h2>{artist.name} ↗</h2><p>{artist.romanName}</p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
