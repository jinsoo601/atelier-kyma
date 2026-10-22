import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { exhibitions } from "@/content/gallery";
import type { ArchiveBlock } from "@/content/gallery";
import { featuredHome } from "@/content/featured-home";
import { pageMetadata } from "@/lib/siteMetadata";

type Props = { params: Promise<{ slug: string }> };
const getExhibition = (slug: string) => exhibitions.find((exhibition) => exhibition.slug === slug && exhibition.migrated);

function ArchiveContent({ blocks, title }: { blocks: ArchiveBlock[]; title: string }) {
  const groups: ArchiveBlock[][] = [];
  for (const block of blocks) {
    const previous = groups.at(-1);
    if (previous?.[0].type === block.type) previous.push(block);
    else groups.push([block]);
  }

  return <>{groups.map((group, groupIndex) => group[0].type === "image"
    ? <div className="archive-image-grid" key={groupIndex}>{group.map((block, index) => block.type === "image" &&
      <figure className="archive-content-image" key={`${block.src}-${index}`}>
        <div className="exhibition-gallery-image"><Image src={block.src} alt={block.alt || `${title} 전시 기록 ${index + 1}`} fill sizes="(max-width: 600px) 100vw, (max-width: 1500px) 45vw, 650px" /></div>
        {block.caption && <figcaption>{block.caption}</figcaption>}
      </figure>)}</div>
    : <div className="archive-content" key={groupIndex}>{group.map((block, index) => {
      if (block.type !== "text") return null;
      if (block.style.startsWith("h")) return <h3 key={index}>{block.text}</h3>;
      if (block.style === "blockquote") return <blockquote key={index}>{block.text}</blockquote>;
      return <p key={index} className={block.list ? "archive-bullet" : undefined}>{block.text}</p>;
    })}</div>)}</>;
}

export function generateStaticParams() { return exhibitions.filter((exhibition) => exhibition.migrated).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const exhibition = getExhibition((await params).slug);
  if (!exhibition) notFound();
  const image = exhibition.image ?? featuredHome.image;
  return pageMetadata({
    title: exhibition.title,
    description: `${exhibition.title} · ${exhibition.startDate}부터 ${exhibition.endDate}까지. 아뜰리에 키마의 전시 기록과 작품 이미지를 살펴보세요.`,
    path: `/exhibitions/${exhibition.slug}`,
    image: image.src,
    imageAlt: image.alt,
  });
}

export default async function ExhibitionPage({ params }: Props) {
  const exhibition = getExhibition((await params).slug);
  if (!exhibition) notFound();
  return (
    <main className="shell exhibition-detail">
      <div className="detail-heading"><Link className="eyebrow" href="/exhibitions">← EXHIBITIONS</Link><h1>{exhibition.title}</h1><p>{exhibition.artistName ? `${exhibition.artistName} · ` : ""}{exhibition.startDate}—{exhibition.endDate}</p></div>
      {exhibition.image && <figure><div className="exhibition-hero-image"><Image src={exhibition.image.src} alt={exhibition.image.alt} fill sizes="100vw" priority /></div><figcaption className="image-caption"><span>{exhibition.image.caption}</span><span>Atelier Kyma, {exhibition.startDate.slice(0, 4)}</span></figcaption></figure>}
      {exhibition.description && <section className="exhibition-copy section-line"><div><span className="eyebrow">EXHIBITION</span><h2>전시에 관하여</h2></div><p>{exhibition.description}</p></section>}
      {Boolean(exhibition.content?.length) && <section className="exhibition-archive section-line"><div className="exhibition-archive-heading"><span className="eyebrow">EXHIBITION ARCHIVE</span><h2>전시 기록</h2></div><ArchiveContent blocks={exhibition.content ?? []} title={exhibition.title} /></section>}
      {Boolean(exhibition.images?.length) && <section className="section-line"><div className="section-heading"><div><span className="eyebrow">WORKS ON VIEW</span><h2>전시 이미지</h2></div></div><div className="exhibition-gallery">{exhibition.images?.map((image) => <figure key={image.src}><div className="exhibition-gallery-image"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 600px) 100vw, 48vw" /></div>{image.caption && <figcaption>{image.caption}</figcaption>}</figure>)}</div></section>}
    </main>
  );
}
