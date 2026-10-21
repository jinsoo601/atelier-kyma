import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { exhibitions } from "@/content/gallery";

type Props = { params: Promise<{ slug: string }> };
const getExhibition = (slug: string) => exhibitions.find((exhibition) => exhibition.slug === slug && exhibition.migrated);

export function generateStaticParams() { return exhibitions.filter((exhibition) => exhibition.migrated).map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: getExhibition((await params).slug)?.title ?? "전시" };
}

export default async function ExhibitionPage({ params }: Props) {
  const exhibition = getExhibition((await params).slug);
  if (!exhibition) notFound();
  return (
    <main className="shell exhibition-detail">
      <div className="detail-heading"><Link className="eyebrow" href="/exhibitions">← EXHIBITIONS</Link><h1>{exhibition.title}</h1><p>{exhibition.artistName} 개인전 · {exhibition.startDate}—{exhibition.endDate}</p></div>
      {exhibition.image && <figure><div className="exhibition-hero-image"><Image src={exhibition.image.src} alt={exhibition.image.alt} fill sizes="100vw" priority /></div><figcaption className="image-caption"><span>{exhibition.image.caption}</span><span>Atelier Kyma, {exhibition.startDate.slice(0, 4)}</span></figcaption></figure>}
      {exhibition.description && <section className="exhibition-copy section-line"><div><span className="eyebrow">EXHIBITION</span><h2>전시에 관하여</h2></div><p>{exhibition.description}</p></section>}
      {Boolean(exhibition.images?.length) && <section className="section-line"><div className="section-heading"><div><span className="eyebrow">WORKS ON VIEW</span><h2>전시 이미지</h2></div></div><div className="exhibition-gallery">{exhibition.images?.map((image) => <figure key={image.src}><div className="exhibition-gallery-image"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 600px) 100vw, 48vw" /></div>{image.caption && <figcaption>{image.caption}</figcaption>}</figure>)}</div></section>}
    </main>
  );
}
