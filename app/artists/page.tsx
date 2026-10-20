import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { client, urlFor } from "@/lib/sanityClient";

export const metadata: Metadata = { title: "작가" };

type Artist = {
  name: string;
  slug: { current: string };
  profileImage?: { asset?: { _ref: string } };
};

const firstArtistSlugs = ["suk-jeen-sung", "in-sook-rhee"];

export default async function ArtistsPage() {
  const records = await client.fetch<Artist[]>(
    '*[_type == "artist" && slug.current in $slugs]{name, slug, profileImage}',
    { slugs: firstArtistSlugs },
  );
  const artists = firstArtistSlugs
    .map((slug) => records.find((artist) => artist.slug?.current === slug))
    .filter((artist): artist is Artist => Boolean(artist));

  return (
    <>
      <div className="mb-10 border-b border-[#dedbd4] pb-6">
        <p className="mb-3 text-xs tracking-[0.2em] text-[#77746c]">ARTISTS</p>
        <h1 className="text-3xl font-medium">작가</h1>
      </div>
      <div className="grid gap-10 sm:grid-cols-2">
        {artists.map((artist) => (
          <Link
            key={artist.slug.current}
            href={`/artists/${artist.slug.current}`}
            className="group"
          >
            <div className="relative aspect-[4/5] bg-[#e9e5dc]">
              {artist.profileImage?.asset && (
                <Image
                  src={urlFor(artist.profileImage).width(960).url()}
                  alt={`${artist.name} 대표 이미지`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              )}
            </div>
            <h2 className="mt-4 text-lg group-hover:underline">{artist.name}</h2>
          </Link>
        ))}
      </div>
    </>
  );
}
