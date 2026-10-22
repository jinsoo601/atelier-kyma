/** Stable catalog identities are never derived from a title or a route slug. */
export const catalogIds = {
  artists: {
    sukJeenSung: "kym-artist-0001",
    inSookRhee: "kym-artist-0002",
  },
  artworks: {
    moonJar: "kym-artwork-0001",
  },
  products: {
    moonJar: "kym-product-0001",
  },
} as const;

export type CatalogImage = { src: string; alt: string; caption?: string };
export type Availability = "unconfirmed" | "available" | "reserved" | "sold";

export type ArtworkRecord = {
  id: string;
  slug: string;
  artistId: string;
  title: string;
  category: "ceramics" | "painting" | "photography" | "other";
  images: [CatalogImage, ...CatalogImage[]];
  year: number | null;
  materials: string | null;
  dimensions: string | null;
  condition: string | null;
};

type ProductBase = {
  id: string;
  availability: Availability;
};

type ProductSubject =
  | { kind: "unique-artwork"; artworkId: string }
  | { kind: "small-good"; name: string; images: [CatalogImage, ...CatalogImage[]]; artworkId?: never };

/** Repository price and quantity are authoritative only for inquiry products. */
export type InquiryProductRecord = ProductBase & ProductSubject & {
  purchaseMethod: "inquiry";
  priceKrw: number;
  quantity: number;
  domesticShippingFeeKrw: number | null;
  woodenBoxPackagingFeeKrw: number | null;
  woodenBoxPackagingOptional: boolean;
  priceConfirmed: boolean;
  stockConfirmed: boolean;
  tossProductKey?: never;
};

/** A live checkout must read price, stock and URL from Toss on the server. */
export type CheckoutProductRecord = ProductBase & ProductSubject & {
  purchaseMethod: "checkout";
  tossProductKey: string;
  priceKrw?: never;
  quantity?: never;
  priceConfirmed?: never;
  stockConfirmed?: never;
};

export type ProductRecord = InquiryProductRecord | CheckoutProductRecord;

const pilotImage: CatalogImage = {
  src: "/gallery/artworks/suk-jeen-sung-cheonghwa-baekgeum-dot-moon-jar/hero-clean.jpeg",
  alt: "성석진의 청화백금닷 달항아리",
};

export const pilotArtwork: ArtworkRecord = {
  id: catalogIds.artworks.moonJar,
  slug: "suk-jeen-sung-cheonghwa-baekgeum-dot-moon-jar",
  artistId: catalogIds.artists.sukJeenSung,
  title: "청화백금닷 달항아리",
  category: "ceramics",
  images: [pilotImage],
  year: 2025,
  materials: "하동백토, 청화유, 플래티넘",
  dimensions: "20.5 × 20.5 × H21.3 cm",
  condition: "완벽한 상태, 파손 없음",
};

export const pilotProduct: InquiryProductRecord = {
  id: catalogIds.products.moonJar,
  artworkId: pilotArtwork.id,
  kind: "unique-artwork",
  availability: "available",
  purchaseMethod: "inquiry",
  priceKrw: 2_000_000,
  quantity: 1,
  domesticShippingFeeKrw: 10_000,
  woodenBoxPackagingFeeKrw: 15_000,
  woodenBoxPackagingOptional: true,
  priceConfirmed: true,
  stockConfirmed: true,
};

/** Add future editorial artwork records here, in the order they should appear on /artworks. */
export const artworkCatalog: ArtworkRecord[] = [pilotArtwork];

/** A portfolio photograph needs no product. Small goods may have a product without an artwork page. */
export const productCatalog: ProductRecord[] = [pilotProduct];
