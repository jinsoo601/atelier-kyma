import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArtistWorks from "@/components/gallery/ArtistWorks";
import GalleryImageFrame from "@/components/gallery/GalleryImage";
import { artists, exhibitions, exhibitionHref } from "@/content/gallery";
import { pageMetadata } from "@/lib/siteMetadata";

type Props = { params: Promise<{ slug: string }> };
const getArtist = (slug: string) => artists.find((artist) => artist.slug === slug);

export function generateStaticParams() { return artists.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artist = getArtist((await params).slug);
  if (!artist) notFound();
  return pageMetadata({
    title: `${artist.name} · ${artist.romanName}`,
    description: `${artist.name} 작가의 작품과 이력, 아뜰리에 키마에서 소개한 전시를 만나보세요.`,
    path: `/artists/${artist.slug}`,
    image: artist.hero.src,
    imageAlt: artist.hero.alt,
  });
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
      <section className="section-line artist-works-section">
        <div className="section-heading"><div><span className="eyebrow">WORKS</span><h2>작품</h2></div><p className="artist-work-heading-note">{artist.worksLabel}</p></div>
        <ArtistWorks slug={artist.slug} works={artist.works} />
      </section>
      {artist.career.length > 0 && (
        <section className="section-line career-grid">
          <div><span className="eyebrow">BIOGRAPHY</span><h2>작가 이력</h2></div>
          <div>{artist.career.map((group, index) => <div className="career-group" key={`${group.heading}-${index}`}>{group.heading && <h3>{group.heading}</h3>}{group.note ? <blockquote className="career-note">{group.entries.join("\n")}</blockquote> : group.prose ? <div className="career-prose">{group.entries.map((entry, entryIndex) => <p key={entryIndex}>{entry}</p>)}</div> : <ul>{group.entries.map((entry, entryIndex) => <li key={entryIndex}>{entry}</li>)}</ul>}</div>)}</div>
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
