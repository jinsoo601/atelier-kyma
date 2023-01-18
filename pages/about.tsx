import type { GetStaticProps } from "next/types";

import React from "react";
import { client } from "../lib/sanityClient";

type About = {
  koreanIntro: string;
  englishIntro: string;
  frenchIntro: string;
};

type Props = {
  about: About;
};

export default function About({ about }: Props) {
  return (
    <main className="p-10">
      <p className="whitespace-pre-line mb-8">{about.koreanIntro}</p>
      <p className="whitespace-pre-line mb-8">{about.englishIntro}</p>
      <p className="whitespace-pre-line">{about.frenchIntro}</p>
    </main>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const query = '*[_type == "about"][0]';
  const about: About = await client.fetch(query);

  return {
    props: {
      about,
    },
  };
};
