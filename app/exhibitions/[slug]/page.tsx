import type { Metadata } from "next";
import type { TypedObject } from "@sanity/types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

import exhibitionComponents from "@/components/ExhibitionComponents";
import { client } from "@/lib/sanityClient";

type Props = { params: Promise<{ slug: string }> };
type Exhibition = {
  name: string;
  startDate?: string;
  endDate?: string;
  description?: TypedObject[];
};

async function getExhibition(slug: string) {
  return client.fetch<Exhibition | null>(
    '*[_type == "exhibition" && slug.current == $slug][0]{name, startDate, endDate, description}',
    { slug },
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const exhibition = await getExhibition((await params).slug);
  return { title: exhibition?.name ?? "전시" };
}

export default async function ExhibitionPage({ params }: Props) {
  const exhibition = await getExhibition((await params).slug);
  if (!exhibition) notFound();

  return (
    <article>
      <Link
        href="/exhibitions"
        className="text-sm text-[#66645e] hover:underline"
      >
        ← 전시 아카이브
      </Link>
      <h1 className="mt-8 whitespace-pre-line text-3xl font-medium">
        {exhibition.name.replaceAll("\\n", "\n")}
      </h1>
      <p className="mt-4 border-b border-[#dedbd4] pb-6 text-sm text-[#77746c]">
        {exhibition.startDate} – {exhibition.endDate}
      </p>
      <div className="mt-8 grid gap-x-4 md:grid-cols-4">
        <PortableText
          value={exhibition.description ?? []}
          components={exhibitionComponents}
        />
      </div>
    </article>
  );
}
