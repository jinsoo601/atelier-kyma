import artistImageManifest from "@/docs/kym-10-assets/artist-gallery-manifest.json";
import archive from "@/content/archive.json";
import { artworkCatalog, catalogIds, pilotArtwork, productCatalog, type Availability, type ArtworkRecord } from "@/content/catalog";

export type GalleryImage = { src: string; alt: string; caption?: string };
export type ArtistWork = GalleryImage & { id: string; title: string; artworkSlug?: string; priceLabel?: string };
export type CareerGroup = { heading: string; entries: string[]; note?: boolean; prose?: boolean };
export type ArchiveBlock =
  | { type: "text"; style: string; list: boolean; text: string }
  | { type: "image"; src: string; alt: string; caption: string };
export type Artist = {
  id: string;
  slug: string;
  name: string;
  romanName: string;
  introduction: string;
  hero: GalleryImage;
  worksLabel: string;
  works: ArtistWork[];
  career: CareerGroup[];
  relatedExhibitionSlug?: string;
};
export type Artwork = {
  id: string;
  productId: string;
  slug: string;
  title: string;
  artistId: string;
  artistSlug: string;
  image: GalleryImage;
  images: GalleryImage[];
  category: ArtworkRecord["category"];
  priceKrw: number;
  domesticShippingFeeKrw: number | null;
  woodenBoxPackagingFeeKrw: number | null;
  woodenBoxPackagingOptional: boolean;
  availability: Availability;
  purchaseMethod: "inquiry";
  details: { label: string; value: string }[];
};
export type Exhibition = {
  id: string;
  slug: string;
  title: string;
  artistName?: string;
  startDate: string;
  endDate: string;
  image?: GalleryImage;
  description?: string;
  images?: GalleryImage[];
  content?: ArchiveBlock[];
  migrated?: boolean;
};

const blobBase = "https://rw1qqgsmaxclw3vy.public.blob.vercel-storage.com";
const pilotSrc = pilotArtwork.images[0].src;
const artistImage = (file: string) => `/gallery/artists/${file}`;
const sungPortfolioImage = (order: number) =>
  `${blobBase}/artists/suk-jeen-sung/portfolio-${String(order).padStart(2, "0")}.jpg`;

const artistSlugById: Record<string, string> = {
  [catalogIds.artists.sukJeenSung]: "suk-jeen-sung",
  [catalogIds.artists.inSookRhee]: "in-sook-rhee",
  [catalogIds.artists.ahnSeongmin]: "ahn-seongmin",
  [catalogIds.artists.ehjaKang]: "ehja-kang",
  [catalogIds.artists.hongSungchul]: "hong-sungchul",
  [catalogIds.artists.jeongHyunHa]: "jeong-hyun-ha",
  [catalogIds.artists.jiyuKwak]: "jiyu-kwak",
  [catalogIds.artists.laurentDorchin]: "laurent-dorchin",
  [catalogIds.artists.muGyuLee]: "mu-gyu-lee",
  [catalogIds.artists.yongHoonKim]: "yong-hoon-kim",
  [catalogIds.artists.zinooPark]: "zinoo-park",
};

function artworkDetails(record: ArtworkRecord): Artwork["details"] {
  return [
    { label: "제작 연도", value: record.year === null ? null : String(record.year) },
    { label: "재료", value: record.materials },
    { label: "크기", value: record.dimensions },
  ].filter((detail): detail is Artwork["details"][number] => detail.value !== null);
}

export const artworks: Artwork[] = artworkCatalog.map((record) => {
  const matchingProducts = productCatalog.filter((item) => item.kind === "unique-artwork" && item.artworkId === record.id);
  const product = matchingProducts[0];
  const artistSlug = artistSlugById[record.artistId];
  if (matchingProducts.length !== 1 || !artistSlug) {
    throw new Error(`Artwork ${record.id} needs exactly one product and a registered artist.`);
  }
  if (product.purchaseMethod !== "inquiry") {
    throw new Error(`Artwork ${record.id} checkout rendering requires KYM-15.`);
  }
  return {
    id: record.id,
    productId: product.id,
    slug: record.slug,
    title: record.title,
    artistId: record.artistId,
    artistSlug,
    image: record.images[0],
    images: record.images,
    category: record.category,
    priceKrw: product.priceKrw,
    domesticShippingFeeKrw: product.domesticShippingFeeKrw,
    woodenBoxPackagingFeeKrw: product.woodenBoxPackagingFeeKrw,
    woodenBoxPackagingOptional: product.woodenBoxPackagingOptional,
    availability: product.availability,
    purchaseMethod: product.purchaseMethod,
    details: artworkDetails(record),
  };
});

const catalogWorksForArtist = (artistId: string): ArtistWork[] =>
  artworks.filter((artwork) => artwork.artistId === artistId).map((artwork) => ({
    id: artwork.id,
    title: artwork.title,
    ...artwork.image,
    artworkSlug: artwork.slug,
    priceLabel: formatKrw(artwork.priceKrw),
  }));

const existingWorks = (artist: string): ArtistWork[] =>
  artistImageManifest
    .filter((item) => item.artist === artist)
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      id: `${artist === "성석진" ? catalogIds.artists.sukJeenSung : catalogIds.artists.inSookRhee}-portfolio-${item.file}`,
      src: artist === "성석진" ? sungPortfolioImage(item.order) : rheePortfolioImages[item.order - 1]?.src ?? artistImage(item.file),
      title: item.caption || `작품 사진 ${String(item.order).padStart(2, "0")}`,
      alt: item.caption
        ? `${artist}의 ${item.caption}`
        : artist === "이인숙"
          ? rheePortfolioImages[item.order - 1]?.alt || `${artist}의 도자 작업 ${item.order}`
          : `${artist}의 도자 작업 ${item.order}`,
    }));

const rheePortfolioImages = archive.artists["in-sook-rhee"].career.filter((block) => block.type === "image");

const careerGroups = (slug: keyof typeof archive.artists): CareerGroup[] => {
  const groups: CareerGroup[] = [];
  for (const block of archive.artists[slug].career as ArchiveBlock[]) {
    if (block.type !== "text") continue;
    const cleanedText = block.text.replace(/\u200d/g, "").trim();
    if (!cleanedText || cleanedText === "_") continue;
    if (block.style.startsWith("h")) {
      groups.push({ heading: cleanedText, entries: [] });
    } else if (block.style === "blockquote") {
      groups.push({ heading: "작가 노트", entries: [cleanedText], note: true });
    } else {
      const prose = !block.list;
      if (!groups.length) groups.push({ heading: "작가 소개", entries: [], prose });
      const current = groups[groups.length - 1];
      if (current.entries.length && (Boolean(current.prose) !== prose || current.note)) {
        groups.push({ heading: "", entries: [], prose });
      } else if (!current.entries.length) {
        current.prose = prose;
      }
      groups[groups.length - 1].entries.push(cleanedText);
    }
  }
  return groups.filter((group) => group.entries.length);
};

const migratedArtistProfiles: {
  id: string;
  slug: keyof typeof archive.artists;
  name: string;
  romanName: string;
  introduction: string;
  worksLabel: string;
  relatedExhibitionSlug?: string;
}[] = [
  { id: catalogIds.artists.ahnSeongmin, slug: "ahn-seongmin", name: "안성민", romanName: "Ahn Seongmin", introduction: "안성민 작가의 작품과 활동 기록을 소개합니다.", worksLabel: "회화 작업", relatedExhibitionSlug: "ahn-seongmin-solo-exhibition-n-less-than-itaewon-memoir-greater-than" },
  { id: catalogIds.artists.ehjaKang, slug: "ehja-kang", name: "강애자", romanName: "Ehja Kang", introduction: "강애자 작가의 작품과 활동 기록을 소개합니다.", worksLabel: "작품 아카이브" },
  { id: catalogIds.artists.hongSungchul, slug: "hong-sungchul", name: "홍성철", romanName: "Hong Sungchul", introduction: "홍성철 작가의 작품과 활동 기록을 소개합니다.", worksLabel: "작품 아카이브", relatedExhibitionSlug: "hong-sungchul-solo-exhibition-through-the-lines" },
  { id: catalogIds.artists.jeongHyunHa, slug: "jeong-hyun-ha", name: "하정현", romanName: "Jeong Hyun Ha", introduction: "하정현 작가의 작품과 활동 기록을 소개합니다.", worksLabel: "작품 아카이브", relatedExhibitionSlug: "jeong-hyun-ha-solo-exhibition" },
  { id: catalogIds.artists.jiyuKwak, slug: "jiyu-kwak", name: "곽지유", romanName: "Jiyu Kwak", introduction: "곽지유 작가의 작품과 활동 기록을 소개합니다.", worksLabel: "작품 아카이브", relatedExhibitionSlug: "jiyu-kwak-solo-exhibition-layers" },
  { id: catalogIds.artists.laurentDorchin, slug: "laurent-dorchin", name: "로렝 도친", romanName: "Laurent Dorchin", introduction: "로렝 도친 작가의 작품과 소개를 만나보세요.", worksLabel: "회화 작업" },
  { id: catalogIds.artists.muGyuLee, slug: "mu-gyu-lee", name: "이무규", romanName: "Mu Gyu Lee", introduction: "이무규 작가의 가구와 활동 기록을 소개합니다.", worksLabel: "가구 작업" },
  { id: catalogIds.artists.yongHoonKim, slug: "yong-hoon-kim", name: "김용훈", romanName: "Yong Hoon Kim", introduction: "김용훈 작가의 사진과 활동 기록을 소개합니다.", worksLabel: "사진 작업", relatedExhibitionSlug: "yong-hoon-kim-solo-exhibition" },
  { id: catalogIds.artists.zinooPark, slug: "zinoo-park", name: "지누박", romanName: "Zinoo Park", introduction: "지누박 작가의 작품과 활동 기록을 소개합니다.", worksLabel: "작품 아카이브" },
];

const migratedArtists: Artist[] = migratedArtistProfiles.map((profile) => {
  const original = archive.artists[profile.slug];
  const imageBlocks = (original.career as ArchiveBlock[]).filter(
    (block): block is Extract<ArchiveBlock, { type: "image" }> => block.type === "image",
  );
  return {
    ...profile,
    hero: { src: original.profileImage, alt: `${profile.name} 작가의 대표 이미지`, caption: profile.name },
    works: imageBlocks.map((block, index) => ({
      id: `${profile.id}-portfolio-${String(index + 1).padStart(2, "0")}`,
      title: block.caption || `작품 사진 ${String(index + 1).padStart(2, "0")}`,
      src: block.src,
      alt: block.alt && !/작품 사진 \d+$/.test(block.alt)
        ? block.alt
        : `${profile.name}의 ${profile.worksLabel} 이미지 ${index + 1}`,
      caption: block.caption || undefined,
    })),
    career: careerGroups(profile.slug),
  };
});

export const artists: Artist[] = [
  {
    id: catalogIds.artists.sukJeenSung,
    slug: "suk-jeen-sung",
    name: "성석진",
    romanName: "Suk Jeen Sung",
    introduction: "달항아리 작업과 아뜰리에 키마에서 소개한 작품을 한곳에서 만나보세요.",
    hero: { src: pilotSrc, alt: pilotArtwork.images[0].alt, caption: "성석진 · 청화백금닷 달항아리" },
    worksLabel: "달항아리와 도자 작업",
    works: [
      ...catalogWorksForArtist(catalogIds.artists.sukJeenSung),
      ...existingWorks("성석진"),
    ],
    career: careerGroups("suk-jeen-sung"),
    relatedExhibitionSlug: "suk-jeen-sung-moon-jar-exhibit",
  },
  {
    id: catalogIds.artists.inSookRhee,
    slug: "in-sook-rhee",
    name: "이인숙",
    romanName: "In Sook Rhee",
    introduction: "이인숙의 도자 작업과 아뜰리에 키마의 전시 기록을 소개합니다.",
    hero: { src: archive.artists["in-sook-rhee"].profileImage, alt: "이인숙의 초록색 도자 주전자와 금빛 점 장식 치타, 잎 모양 받침 위 찻잔", caption: "이인숙 · 대표 작업 이미지" },
    worksLabel: "Urban Jungle Project — Porcelain",
    works: [...catalogWorksForArtist(catalogIds.artists.inSookRhee), ...existingWorks("이인숙")],
    career: careerGroups("in-sook-rhee"),
    relatedExhibitionSlug: "rhee-in-sook-solo-exhibition-less-than-her-universe-greater-than",
  },
  ...migratedArtists,
];

const exhibitionSummaries: Exhibition[] = [
  { id: "kym-exhibition-0001", slug: "kimi-kim-solo-exhibition-less-than-unbound-greater-than", title: "키미 킴 개인전 〈UNBOUND〉", startDate: "2024-10-08", endDate: "2024-10-31" },
  { id: "kym-exhibition-0002", slug: "rhee-in-sook-solo-exhibition-less-than-her-universe-greater-than", title: "이인숙 개인전 〈Her Universe〉", artistName: "이인숙", startDate: "2024-05-03", endDate: "2024-05-30" },
  { id: "kym-exhibition-0003", slug: "ahn-seongmin-solo-exhibition-n-less-than-itaewon-memoir-greater-than", title: "안성민 개인전 〈Itaewon Memoir〉", startDate: "2024-01-19", endDate: "2024-02-16" },
  { id: "kym-exhibition-0004", slug: "hong-sungchul-solo-exhibition-through-the-lines", title: "홍성철 개인전 〈Through the Lines〉", startDate: "2023-11-04", endDate: "2023-11-30" },
  { id: "kym-exhibition-0005", slug: "yong-hoon-kim-solo-exhibition", title: "김용훈 사진전 〈형과 색 그리고 빛〉", startDate: "2023-09-09", endDate: "2023-10-13" },
  { id: "kym-exhibition-0006", slug: "jeong-hyun-ha-solo-exhibition", title: "Glad Landsby; 행복마을", artistName: "하정현", startDate: "2023-07-18", endDate: "2023-08-19" },
  { id: "kym-exhibition-0007", slug: "jiyu-kwak-solo-exhibition-layers", title: "곽지유 개인전 〈겹; Layers〉", startDate: "2023-06-03", endDate: "2023-07-05" },
  { id: "kym-exhibition-0008", slug: "suk-jeen-sung-moon-jar-exhibit", title: "성석진 달항아리전", artistName: "성석진", startDate: "2023-01-16", endDate: "2023-05-25" },
  { id: "kym-exhibition-0009", slug: "premier-art-seoul-2022", title: "Premier Art Seoul 2022", startDate: "2022-10-13", endDate: "2022-10-16" },
  { id: "kym-exhibition-0010", slug: "the-waning-light", title: "김찬수 사진전 〈빛 속으로〉", startDate: "2022-08-04", endDate: "2022-08-14" },
  { id: "kym-exhibition-0011", slug: "art-race-in-jeju", title: "아트 레이스 인 제주", startDate: "2022-07-30", endDate: "2022-09-04" },
  { id: "kym-exhibition-0012", slug: "the-11th-pink-art-fair-seoul-2022", title: "The 11th Pink Art Fair Seoul", startDate: "2022-07-07", endDate: "2022-07-10" },
];

export const exhibitions: Exhibition[] = exhibitionSummaries.map((summary) => {
  const original = archive.exhibitions.find((item) => item.slug === summary.slug);
  if (!original) throw new Error(`Missing exhibition archive: ${summary.slug}`);
  return {
    ...summary,
    image: { src: original.poster, alt: `${summary.title} 전시 포스터`, caption: summary.title },
    description: undefined,
    content: original.content as ArchiveBlock[],
    migrated: true,
  };
});

export const contact = {
  email: archive.contact.email,
  phoneDisplay: "+82 2-3785-0118",
  phoneHref: "tel:+82237850118",
  address: "서울시 용산구 녹사평대로32길 47, 1층 102호",
  instagram: archive.contact.instagram,
  hours: ["화–금 11:00–19:00", "토 12:00–18:00", "일–월 휴무"],
};

export function formatKrw(value: number) { return `₩${value.toLocaleString("ko-KR")}`; }
export const exhibitionHref = (exhibition: Exhibition) =>
  exhibition.migrated ? `/exhibitions/${exhibition.slug}` : `/exhibition/${exhibition.slug}`;
