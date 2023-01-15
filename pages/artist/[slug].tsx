import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { Image as SanityImage, PortableTextBlock } from "@sanity/types";

import { client } from "../../lib/sanityClient";
import SanityBlockRenderer from "../../components/SanityBlockRenderer";

type ArtistDetail = {
  name: string;
  career: Array<SanityImage | PortableTextBlock>;
};

type Props = {
  artistDetail: ArtistDetail;
};

type Params = ParsedUrlQuery & {
  slug: string;
};

export default function ArtistDetail({ artistDetail }: Props) {
  return (
    <main>
      <header className="text-xl font-semibold">{artistDetail.name}</header>
      <SanityBlockRenderer value={artistDetail.career} />
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = '*[_type == "artist"]{slug {current} }';
  const artists: Array<{ slug: { current: string } }> = await client.fetch(
    query
  );
  const paths = artists.map((artist) => ({
    params: {
      slug: artist.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const query = `*[_type == "artist" && slug.current == "${
    params!.slug
  }"][0]{name, career}`;
  const artistDetail: ArtistDetail = await client.fetch(query);

  return {
    props: {
      artistDetail,
    },
  };
};
