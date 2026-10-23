import { pilotArtwork } from "@/content/catalog";

/** Edit this one record to replace the home page's lead image and copy. */
export const featuredHome = {
  artworkId: pilotArtwork.id,
  image: pilotArtwork.images[0],
  eyebrow: "ATELIER KYMA · SELECTED WORK",
  title: "작품과 사람 사이, 오래 머무는 시선.",
  description: "아뜰리에 키마가 소개하는 작가와 작품, 전시를 만나보세요",
  href: `/artworks/${pilotArtwork.slug}`,
};
