import type { GetStaticProps } from "next/types";
import type { Image as SanityImage, Slug } from "@sanity/types";

import { client, urlFor } from "../../lib/sanityClient";
import Link from "next/link";
import Image from "next/image";

type Exhibition = {
  name: string;
  slug: Slug;
  posterImage: SanityImage;
};

type Props = {
  exhibitions: Exhibition[];
};

export default function Exhibition({ exhibitions }: Props) {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-4 gap-6">
      {exhibitions.map(({ name, slug, posterImage }) => (
        <Link
          key={slug.current}
          href={`/exhibition/${slug.current}`}
          className="flex flex-col items-center transition-transform hover:scale-105 duration-500"
        >
          <Image
            src={urlFor(posterImage).width(400).height(574).url()}
            alt={name}
            width={400}
            height={574}
          />
          <p className="font-semibold mt-2">{name}</p>
        </Link>
      ))}
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const query = `*[_type == "exhibition"]{name, slug, startDate, posterImage} | order(startDate desc)`;
  const exhibitions: Exhibition[] = await client.fetch(query);

  return {
    props: {
      exhibitions,
    },
  };
};
