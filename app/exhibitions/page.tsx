import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { client, urlFor } from "@/lib/sanityClient";

export const metadata: Metadata = { title: "전시 아카이브" };

type Exhibition = {
  name: string;
  slug: { current: string };
  startDate?: string;
  endDate?: string;
  posterImage?: { asset?: { _ref: string } };
};

export default async function ExhibitionsPage() {
  const exhibitions = await client.fetch<Exhibition[]>(
    '*[_type == "exhibition" && defined(slug.current)]{name, slug, startDate, endDate, posterImage} | order(startDate desc)',
  );

  return (
    <>
      <div className="mb-10 border-b border-[#dedbd4] pb-6">
        <p className="mb-3 text-xs tracking-[0.2em] text-[#77746c]">
          EXHIBITIONS
        </p>
        <h1 className="text-3xl font-medium">전시 아카이브</h1>
      </div>
      <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {exhibitions.map((exhibition) => (
          <Link
            key={exhibition.slug.current}
            href={`/exhibitions/${exhibition.slug.current}`}
            className="group"
          >
            <div className="relative aspect-[4/5] bg-[#e9e5dc]">
              {exhibition.posterImage?.asset && (
                <Image
                  src={urlFor(exhibition.posterImage).width(720).url()}
                  alt={`${exhibition.name} 포스터`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
            </div>
            <h2 className="mt-4 whitespace-pre-line text-base group-hover:underline">
              {exhibition.name.replaceAll("\\n", "\n")}
            </h2>
            <p className="mt-2 text-sm text-[#77746c]">
              {exhibition.startDate} – {exhibition.endDate}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
}
