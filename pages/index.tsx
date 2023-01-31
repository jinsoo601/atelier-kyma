import type { GetStaticProps } from "next/types";
import type { Image as SanityImage, Slug } from "@sanity/types";

import { client, urlFor } from "../lib/sanityClient";
import Link from "next/link";
import Image from "next/image";

type Exhibition = {
  name: string;
  slug: Slug;
  posterImage: SanityImage;
};

type Props = {
  currentExhibition: Exhibition;
};

export default function Exhibition({
  currentExhibition: { name, slug, posterImage },
}: Props) {
  return (
    <div className="flex flex-col-reverse md:flex-row md:justify-center">
      <div className="flex flex-col justify-center items-start md:mr-4 mt-6 md:mt-0">
        <h5 className="text-sm opacity-70 mb-4">Now Showing</h5>
        <h1 className="text-2xl font-semibold">{name}</h1>
        <Link
          href={`/exhibition/${slug.current}`}
          className="inline-block text-lg font-medium border-2 border-black py-2 px-12 mt-6"
        >
          Details
        </Link>
      </div>
      <div className="relative w-full md:w-1/2 h-[50vh] md:h-[75vh] md:ml-4">
        <Image
          src={urlFor(posterImage).url()}
          alt={name + " poster"}
          fill
          style={{ objectFit: "contain", objectPosition: "right" }}
        />
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const today = new Date().toISOString().split("T")[0];
  const query = `*[_type == "exhibition" && endDate > "${today}"][0]{name, slug, posterImage}`;
  const currentExhibition: Exhibition | null = await client.fetch(query);

  if (!currentExhibition) {
    return {
      redirect: {
        destination: "/about",
        permanent: false,
      },
    };
  }

  return {
    props: {
      currentExhibition,
    },
  };
};
