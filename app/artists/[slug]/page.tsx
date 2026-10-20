import type { Metadata } from "next";
import type { TypedObject } from "@sanity/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import artistComponents from "@/components/ArtistComponents";
import { client } from "@/lib/sanityClient";

type Props = { params: Promise<{ slug: string }> };
type Artist = { name: string; career?: TypedObject[] };

const approvedSlugs = new Set(["suk-jeen-sung", "in-sook-rhee"]);

async function getArtist(slug: string) {
  if (!approvedSlugs.has(slug)) return null;
  return client.fetch<Artist | null>(
    '*[_type == "artist" && slug.current == $slug][0]{name, career}',
    { slug },
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artist = await getArtist((await params).slug);
  return { title: artist?.name ?? "작가" };
}

export default async function ArtistPage({ params }: Props) {
  const artist = await getArtist((await params).slug);
  if (!artist) notFound();

  return (
    <article>
      <Link href="/artists" className="text-sm text-[#66645e] hover:underline">
        ← 작가
      </Link>
      <h1 className="mt-8 border-b border-[#dedbd4] pb-6 text-3xl font-medium">
        {artist.name}
      </h1>
      <div className="mt-8 grid gap-x-4 md:grid-cols-4">
        <PortableText value={artist.career ?? []} components={artistComponents} />
      </div>
    </article>
  );
}
