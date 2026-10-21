import artistImageManifest from "@/docs/kym-10-assets/artist-gallery-manifest.json";

export type GalleryImage = { src: string; alt: string; caption?: string };
export type ArtistWork = GalleryImage & { id: string; title: string; artworkSlug?: string; priceLabel?: string };
export type CareerGroup = { heading: string; entries: string[] };
export type Artist = {
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
  slug: string;
  title: string;
  artistSlug: string;
  image: GalleryImage;
  priceKrw: number;
  purchase: { kind: "inquiry" } | { kind: "checkout"; url: string };
  details: { label: string; value: string }[];
};
export type Exhibition = {
  slug: string;
  title: string;
  artistName?: string;
  startDate: string;
  endDate: string;
  image?: GalleryImage;
  description?: string;
  images?: GalleryImage[];
  migrated?: boolean;
};

const pilotSrc = "/gallery/pilot/suk-jeen-sung-cheonghwa-baekgeum-dot-moon-jar.jpeg";
const artistImage = (file: string) => `/gallery/artists/${file}`;

export const artworks: Artwork[] = [
  {
    slug: "suk-jeen-sung-cheonghwa-baekgeum-dot-moon-jar",
    title: "청화백금닷 달항아리",
    artistSlug: "suk-jeen-sung",
    image: { src: pilotSrc, alt: "성석진의 청화백금닷 달항아리" },
    priceKrw: 2_000_000,
    purchase: { kind: "inquiry" },
    details: [],
  },
];

const existingWorks = (artist: string): ArtistWork[] =>
  artistImageManifest
    .filter((item) => item.artist === artist)
    .sort((a, b) => a.order - b.order)
    .map((item) => ({
      id: `${artist}-${item.order}`,
      src: artistImage(item.file),
      title: item.caption || `작품 사진 ${String(item.order).padStart(2, "0")}`,
      alt: item.caption ? `${artist}의 ${item.caption}` : `${artist}의 도자 작업 사진 ${item.order}`,
    }));

export const artists: Artist[] = [
  {
    slug: "suk-jeen-sung",
    name: "성석진",
    romanName: "Suk Jeen Sung",
    introduction: "달항아리 작업과 아뜰리에 키마에서 소개한 작품을 한곳에서 만나보세요.",
    hero: { src: pilotSrc, alt: "성석진의 달항아리 작품", caption: "성석진 · 청화백금닷 달항아리" },
    worksLabel: "달항아리와 도자 작업",
    works: [
      { id: "pilot-moon-jar", title: artworks[0].title, ...artworks[0].image, artworkSlug: artworks[0].slug, priceLabel: "₩2,000,000" },
      ...existingWorks("성석진"),
    ],
    career: [
      { heading: "학력", entries: ["2003 · 일본 동경예술대학 대학원 도예전공 졸업", "1998 · 서울대학교 미술대학 도예과 졸업"] },
      { heading: "주요 개인전", entries: ["2022 · 성석진 달항아리전, 1707갤러리", "2022 · 성석진 달항아리전—전통과 현대의 조화, 갤러리 가비"] },
    ],
    relatedExhibitionSlug: "suk-jeen-sung-moon-jar-exhibit",
  },
  {
    slug: "in-sook-rhee",
    name: "이인숙",
    romanName: "In Sook Rhee",
    introduction: "이인숙의 도자 작업과 아뜰리에 키마의 전시 기록을 소개합니다.",
    hero: { src: artistImage("in-sook-rhee-preview.jpeg"), alt: "이인숙의 도자 작업", caption: "이인숙 · 대표 작업 이미지" },
    worksLabel: "Urban Jungle Project — Porcelain",
    works: existingWorks("이인숙"),
    career: [],
    relatedExhibitionSlug: "rhee-in-sook-solo-exhibition-less-than-her-universe-greater-than",
  },
];

export const exhibitions: Exhibition[] = [
  { slug: "kimi-kim-solo-exhibition-less-than-unbound-greater-than", title: "키미 킴 개인전 〈UNBOUND〉", startDate: "2024-10-08", endDate: "2024-10-31" },
  { slug: "rhee-in-sook-solo-exhibition-less-than-her-universe-greater-than", title: "이인숙 개인전 〈Her Universe〉", artistName: "이인숙", startDate: "2024-05-03", endDate: "2024-05-30" },
  { slug: "ahn-seongmin-solo-exhibition-n-less-than-itaewon-memoir-greater-than", title: "안성민 개인전 〈Itaewon Memoir〉", startDate: "2024-01-19", endDate: "2024-02-16" },
  { slug: "hong-sungchul-solo-exhibition-through-the-lines", title: "홍성철 개인전 〈Through the Lines〉", startDate: "2023-11-04", endDate: "2023-11-30" },
  { slug: "yong-hoon-kim-solo-exhibition", title: "김용훈 사진전 〈형과 색 그리고 빛〉", startDate: "2023-09-09", endDate: "2023-10-13" },
  {
    slug: "jeong-hyun-ha-solo-exhibition",
    title: "Glad Landsby; 행복마을",
    artistName: "하정현",
    startDate: "2023-07-18",
    endDate: "2023-08-19",
    image: { src: "/jeong-hyun-ha-solo-exhibition/1-1.jpeg", alt: "하정현 개인전 출품작", caption: "Glad Landsby; 행복마을" },
    description: "하정현 개인전의 작품과 전시 기록을 소개합니다.",
    images: [
      { src: "/jeong-hyun-ha-solo-exhibition/2-1.jpeg", alt: "하정현 개인전 출품작 이미지 2" },
      { src: "/jeong-hyun-ha-solo-exhibition/3-1.jpeg", alt: "하정현 개인전 출품작 이미지 3" },
    ],
    migrated: true,
  },
  { slug: "jiyu-kwak-solo-exhibition-layers", title: "곽지유 개인전 〈겹; Layers〉", startDate: "2023-06-03", endDate: "2023-07-05" },
  { slug: "suk-jeen-sung-moon-jar-exhibit", title: "성석진 달항아리전", artistName: "성석진", startDate: "2023-01-16", endDate: "2023-05-25" },
  { slug: "premier-art-seoul-2022", title: "Premier Art Seoul 2022", startDate: "2022-10-13", endDate: "2022-10-16" },
  { slug: "the-waning-light", title: "김찬수 사진전 〈빛 속으로〉", startDate: "2022-08-04", endDate: "2022-08-14" },
  { slug: "art-race-in-jeju", title: "아트 레이스 인 제주", startDate: "2022-07-30", endDate: "2022-09-04" },
  { slug: "the-11th-pink-art-fair-seoul-2022", title: "The 11th Pink Art Fair Seoul", startDate: "2022-07-07", endDate: "2022-07-10" },
];

export const featuredHome = {
  image: artworks[0].image,
  eyebrow: "ATELIER KYMA · SELECTED WORK",
  title: "작품과 사람 사이, 오래 머무는 시선.",
  description: "성석진의 달항아리에서 시작해, 아뜰리에 키마가 소개하는 작가와 전시를 만나보세요.",
  href: `/artworks/${artworks[0].slug}`,
};

export const contact = {
  email: "info@atelierkyma.com",
  phoneDisplay: "+82 2-3785-0118",
  phoneHref: "tel:+82237850118",
  address: "서울시 용산구 녹사평대로32길 47, 1층 102호",
  instagram: "atelierkyma",
  hours: ["화–금 11:00–19:00", "토 12:00–18:00", "일–월 휴무"],
};

export const formatKrw = (value: number) => `₩${value.toLocaleString("ko-KR")}`;
export const exhibitionHref = (exhibition: Exhibition) =>
  exhibition.migrated ? `/exhibitions/${exhibition.slug}` : `/exhibition/${exhibition.slug}`;
