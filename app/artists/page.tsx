import type { Metadata } from "next";
import Link from "next/link";
import { artists } from "@/content/gallery";
import GalleryImageFrame from "@/components/gallery/GalleryImage";
import PageTitle from "@/components/gallery/PageTitle";

export const metadata: Metadata = { title: "작가" };

export default function ArtistsPage() {
  return (
    <main className="shell">
      <PageTitle eyebrow="ARTISTS" title="작가" description="아뜰리에 키마와 함께하는 작가들을 소개합니다." />
      <div className="artist-index">
        {artists.map((artist) => (
          <article key={artist.slug}>
            <Link href={`/artists/${artist.slug}`}>
              <GalleryImageFrame image={artist.hero} sizes="(max-width: 600px) 100vw, 48vw" />
              <h2>{artist.name} ↗</h2><p>{artist.romanName}</p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
