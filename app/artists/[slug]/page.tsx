import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArtistWorks from "@/components/gallery/ArtistWorks";
import GalleryImageFrame from "@/components/gallery/GalleryImage";
import { artists, exhibitions, exhibitionHref } from "@/content/gallery";

type Props = { params: Promise<{ slug: string }> };
const getArtist = (slug: string) => artists.find((artist) => artist.slug === slug);

export function generateStaticParams() { return artists.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: getArtist((await params).slug)?.name ?? "작가" };
}

export default async function ArtistPage({ params }: Props) {
  const artist = getArtist((await params).slug);
  if (!artist) notFound();
  const exhibition = exhibitions.find(({ slug }) => slug === artist.relatedExhibitionSlug);

  return (
    <main className="shell">
      <section className="artist-hero">
        <div><span className="eyebrow">ARTIST</span><h1>{artist.name}</h1><p className="roman">{artist.romanName}</p><p className="lead">{artist.introduction}</p></div>
        <figure>
          <GalleryImageFrame image={artist.hero} sizes="(max-width: 800px) 100vw, 55vw" priority />
          <figcaption className="image-caption"><span>{artist.hero.caption}</span></figcaption>
        </figure>
      </section>
      <section className="section-line">
        <div className="section-heading"><div><span className="eyebrow">WORKS</span><h2>작품</h2></div><p className="artist-work-heading-note">{artist.worksLabel}</p></div>
        <ArtistWorks slug={artist.slug} works={artist.works} />
      </section>
      {artist.career.length > 0 && (
        <section className="section-line career-grid">
          <div><span className="eyebrow">BIOGRAPHY</span><h2>작가 이력</h2></div>
          <div>{artist.career.map((group) => <div className="career-group" key={group.heading}><h3>{group.heading}</h3>{group.note ? <blockquote className="career-note">{group.entries.join("\n")}</blockquote> : <ul>{group.entries.map((entry) => <li key={entry}>{entry}</li>)}</ul>}</div>)}</div>
        </section>
      )}
      {exhibition && (
        <section className="section-line career-grid">
          <div><span className="eyebrow">RELATED EXHIBITION</span><h2>관련 전시</h2></div>
          <div><h3>{exhibition.title}</h3><p className="muted">{exhibition.startDate}—{exhibition.endDate} · 아뜰리에 키마</p><Link className="text-link" href={exhibitionHref(exhibition)}>전시 보기</Link></div>
        </section>
      )}
    </main>
  );
}
