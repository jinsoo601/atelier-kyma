import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { Image as SanityImage, PortableTextBlock } from "@sanity/types";

import { PortableText } from "@portabletext/react";
import { client } from "../../lib/sanityClient";
import components from "./_sanityBlockComponents";

type ExhibitionDetail = {
  name: string;
  description: Array<SanityImage | PortableTextBlock>;
  startDate: string;
  endDate: string;
};

type Props = {
  exhibitionDetail: ExhibitionDetail;
};

type Params = ParsedUrlQuery & {
  slug: string;
};

export default function ExhibitionDetail({ exhibitionDetail }: Props) {
  const startDate = exhibitionDetail.startDate.replaceAll("-", ".");
  const endDate = exhibitionDetail.endDate.replaceAll("-", ".");
  return (
    <>
      <header className="text-xl font-semibold">{exhibitionDetail.name}</header>
      <h5 className="text-base font-bold mt-4 mb-2">일시</h5>
      <p>
        {startDate} ~ {endDate}
      </p>
      <PortableText
        value={exhibitionDetail.description}
        components={components}
      />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const query = '*[_type == "exhibition"]{slug {current} }';
  const exhibitions: Array<{ slug: { current: string } }> = await client.fetch(
    query
  );
  const paths = exhibitions.map((exhibition) => ({
    params: {
      slug: exhibition.slug.current,
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
  const query = `*[_type == "exhibition" && slug.current == "${
    params!.slug
  }"][0]{name, description, startDate, endDate}`;
  const exhibitionDetail: ExhibitionDetail = await client.fetch(query);

  return {
    props: {
      exhibitionDetail,
    },
  };
};
