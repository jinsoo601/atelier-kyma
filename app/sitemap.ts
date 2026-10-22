import type { MetadataRoute } from "next";
import { artists, artworks, exhibitions } from "@/content/gallery";
import { siteUrl } from "@/lib/siteMetadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/home",
    "/artists",
    ...artists.map(({ slug }) => `/artists/${slug}`),
    "/artworks",
    ...artworks.map(({ slug }) => `/artworks/${slug}`),
    "/exhibitions",
    ...exhibitions.filter(({ migrated }) => migrated).map(({ slug }) => `/exhibitions/${slug}`),
    "/gallery",
    "/inquiries",
  ];

  return paths.map((path) => ({ url: new URL(path, siteUrl).toString() }));
}
