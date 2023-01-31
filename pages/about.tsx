import Heading from "@/components/Heading";
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
    <div className="">
      <div className="md:w-1/2 md:ml-auto">
        <Heading value="ABOUT" />
      </div>
      <p className="whitespace-pre-line text-sm leading-6 md:w-1/2 md:ml-auto">
        {about.koreanIntro}
      </p>
      <div className="w-full h-1 bg-slate-300 my-4 md:bg-transparent" />
      <p className="whitespace-pre-line text-sm leading-6 md:w-1/2 md:mr-auto">
        {about.englishIntro}
      </p>
      <div className="w-full h-1 bg-slate-300 my-4 md:bg-transparent" />
      <p className="whitespace-pre-line text-sm leading-6 md:w-1/2 md:ml-auto">
        {about.frenchIntro}
      </p>
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
