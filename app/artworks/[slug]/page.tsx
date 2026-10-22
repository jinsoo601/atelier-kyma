import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import GalleryImageFrame from "@/components/gallery/GalleryImage";
import { artists, artworks, formatKrw } from "@/content/gallery";

type Props = { params: Promise<{ slug: string }> };
const getArtwork = (slug: string) => artworks.find((artwork) => artwork.slug === slug);

export function generateStaticParams() { return artworks.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: getArtwork((await params).slug)?.title ?? "작품" };
}

export default async function ArtworkPage({ params }: Props) {
  const artwork = getArtwork((await params).slug);
  if (!artwork) notFound();
  const artist = artists.find(({ slug }) => slug === artwork.artistSlug);

  return (
    <main className="shell">
      <div className="artwork-detail">
        <div className="artwork-media">
          <figure>
            <GalleryImageFrame image={artwork.image} sizes="(max-width: 800px) 100vw, 60vw" priority />
            <figcaption className="image-caption"><span>{artwork.image.caption ?? "작품 전체 모습"}</span></figcaption>
          </figure>
          {artwork.images.length > 1 && <div className="artwork-secondary-images">
            {artwork.images.slice(1).map((image) => <figure key={image.src}>
              <GalleryImageFrame image={image} sizes="(max-width: 800px) 50vw, 28vw" />
              {image.caption && <figcaption className="image-caption"><span>{image.caption}</span></figcaption>}
            </figure>)}
          </div>}
        </div>
        <div>
          <Link className="eyebrow" href="/artworks">← ARTWORKS</Link>
          <h1>{artwork.title}</h1>
          {artist && <Link href={`/artists/${artist.slug}`} className="artist-name">{artist.name} · {artist.romanName} ↗</Link>}
          <p className="price">{formatKrw(artwork.priceKrw)}</p>
          <p className="availability">{artwork.availability === "sold" ? "판매 완료된 작품입니다." : artwork.availability === "reserved" ? "예약 중인 작품입니다." : artwork.availability === "available" ? "판매 중 · 구매 확정 전 갤러리에서 재고를 다시 확인합니다." : "재고와 배송 방법은 갤러리 확인 후 안내드립니다."}</p>
          {artwork.purchaseMethod === "inquiry" && !["reserved", "sold"].includes(artwork.availability) && <Link className="secondary-button" href={`/inquiries?artwork=${encodeURIComponent(artwork.slug)}`}>구매 문의</Link>}
          {artwork.details.length > 0 && <dl className="facts">{artwork.details.map(({ label, value }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
          <p className="shipping">{artwork.domesticShippingFeeKrw !== null && artwork.woodenBoxPackagingFeeKrw !== null
            ? `국내 배송비(${formatKrw(artwork.domesticShippingFeeKrw)})와 오동나무 상자 포장비(${formatKrw(artwork.woodenBoxPackagingFeeKrw)})는 작품 가격과 별도입니다. 서울 내 직접 전달은 별도 협의합니다.`
            : "국내 배송 또는 서울 내 직접 전달을 협의합니다. 배송비와 일정은 구매 확정 전에 안내합니다."}</p>
        </div>
      </div>
    </main>
  );
}
