import type { GetStaticProps } from "next/types";
import type { Image as SanityImage, Slug } from "@sanity/types";

import { client, urlFor } from "../../lib/sanityClient";
import Link from "next/link";
import Image from "next/image";

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
    <main>
      {artists.map(({ name, slug, profileImage }) => (
        <Link key={slug.current} href={`/artist/${slug.current}`}>
          <Image
            src={urlFor(profileImage).width(200).height(250).url()}
            alt={name}
            width={200}
            height={250}
          />
          <p>{name}</p>
        </Link>
      ))}
    </main>
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
