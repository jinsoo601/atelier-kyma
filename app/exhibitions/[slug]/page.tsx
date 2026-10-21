import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { exhibitions } from "@/content/gallery";
import type { ArchiveBlock } from "@/content/gallery";

type Props = { params: Promise<{ slug: string }> };
const getExhibition = (slug: string) => exhibitions.find((exhibition) => exhibition.slug === slug && exhibition.migrated);

function ArchiveContent({ blocks, title }: { blocks: ArchiveBlock[]; title: string }) {
  return <div className="archive-content">{blocks.map((block, index) => {
    if (block.type === "image") return <figure className="archive-content-image" key={`${block.src}-${index}`}>
      <div className="exhibition-gallery-image"><Image src={block.src} alt={block.alt || `${title} 전시 기록 ${index + 1}`} fill sizes="(max-width: 800px) 100vw, 75vw" /></div>
      {block.caption && <figcaption>{block.caption}</figcaption>}
    </figure>;
    if (block.style.startsWith("h")) return <h3 key={index}>{block.text}</h3>;
    if (block.style === "blockquote") return <blockquote key={index}>{block.text}</blockquote>;
    return <p key={index} className={block.list ? "archive-bullet" : undefined}>{block.text}</p>;
  })}</div>;
}

export function generateStaticParams() { return exhibitions.filter((exhibition) => exhibition.migrated).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: getExhibition((await params).slug)?.title ?? "전시" };
}

export default async function ExhibitionPage({ params }: Props) {
  const exhibition = getExhibition((await params).slug);
  if (!exhibition) notFound();
  return (
    <main className="shell exhibition-detail">
      <div className="detail-heading"><Link className="eyebrow" href="/exhibitions">← EXHIBITIONS</Link><h1>{exhibition.title}</h1><p>{exhibition.artistName ? `${exhibition.artistName} · ` : ""}{exhibition.startDate}—{exhibition.endDate}</p></div>
      {exhibition.image && <figure><div className="exhibition-hero-image"><Image src={exhibition.image.src} alt={exhibition.image.alt} fill sizes="100vw" priority /></div><figcaption className="image-caption"><span>{exhibition.image.caption}</span><span>Atelier Kyma, {exhibition.startDate.slice(0, 4)}</span></figcaption></figure>}
      {exhibition.description && <section className="exhibition-copy section-line"><div><span className="eyebrow">EXHIBITION</span><h2>전시에 관하여</h2></div><p>{exhibition.description}</p></section>}
      {Boolean(exhibition.content?.length) && <section className="exhibition-archive section-line"><div><span className="eyebrow">EXHIBITION ARCHIVE</span><h2>전시 기록</h2></div><ArchiveContent blocks={exhibition.content ?? []} title={exhibition.title} /></section>}
      {Boolean(exhibition.images?.length) && <section className="section-line"><div className="section-heading"><div><span className="eyebrow">WORKS ON VIEW</span><h2>전시 이미지</h2></div></div><div className="exhibition-gallery">{exhibition.images?.map((image) => <figure key={image.src}><div className="exhibition-gallery-image"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 600px) 100vw, 48vw" /></div>{image.caption && <figcaption>{image.caption}</figcaption>}</figure>)}</div></section>}
    </main>
  );
}
