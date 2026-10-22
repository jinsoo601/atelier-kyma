import type { Metadata } from "next";

export const siteUrl = "https://www.atelierkyma.com";
export const siteName = "Atelier Kyma";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
};

export function pageMetadata({ title, description, path, image, imageAlt }: PageMetadata): Metadata {
  const url = new URL(path, siteUrl).toString();
  const imageUrl = new URL(image, siteUrl).toString();
  const socialTitle = `${title} | ${siteName}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName,
      locale: "ko_KR",
      type: "website",
      images: [{ url: imageUrl, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
  };
}
