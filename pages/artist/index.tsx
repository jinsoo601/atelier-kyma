import type { GetStaticProps } from "next/types";
import type { Image as SanityImage, Slug } from "@sanity/types";

import { client, urlFor } from "../../lib/sanityClient";
import Link from "next/link";
import Image from "next/image";
import Heading from "@/components/Heading";

type Artist = {
  name: string;
  slug: Slug;
  profileImage: SanityImage;
};

type Props = {
  artists: Artist[];
};

export default function Artist({ artists }: Props) {
  return (
    <>
      <Heading value="ARTISTS" />
      <div className=" grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {artists.map(({ name, slug, profileImage }) => (
          <Link
            key={slug.current}
            href={`/artist/${slug.current}`}
            className="flex flex-col items-center transition-transform hover:scale-105 duration-500"
          >
            <Image
              src={urlFor(profileImage).width(200).height(250).url()}
              alt={name}
              width={200}
              height={250}
            />
            <p className="text-sm font-semibold mt-2">{name}</p>
          </Link>
        ))}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const query = '*[_type == "artist"]{name, slug, profileImage}';
  const artists: Artist[] = await client.fetch(query);

  return {
    props: {
      artists,
    },
  };
};
