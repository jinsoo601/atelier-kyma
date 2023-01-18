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
    <div className="divide-y-2 divide-slate-500">
      <p className="whitespace-pre-line mb-6">{about.koreanIntro}</p>
      <p className="whitespace-pre-line pt-6 mb-6">{about.englishIntro}</p>
      <p className="whitespace-pre-line pt-6">{about.frenchIntro}</p>
    </div>
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
