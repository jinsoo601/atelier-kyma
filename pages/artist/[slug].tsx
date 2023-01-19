import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { TypedObject } from "@sanity/types";

import { PortableText } from "@portabletext/react";
import { client } from "../../lib/sanityClient";
import components from "./_sanityBlockComponents";

type ArtistDetail = {
  name: string;
  career: TypedObject[];
};

type Props = {
  artistDetail: ArtistDetail;
};

type Params = ParsedUrlQuery & {
  slug: string;
};

export default function ArtistDetail({ artistDetail }: Props) {
  return (
    <>
      <header className="text-xl font-semibold">{artistDetail.name}</header>
      <PortableText value={artistDetail.career} components={components} />
    </>
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
