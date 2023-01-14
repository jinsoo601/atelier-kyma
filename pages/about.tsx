import React from "react";
import { client } from "../lib/sanityClient";

export default function About({ about }) {
  return (
    <main>
      <p className="whitespace-pre-line mb-8">{about.koreanIntro}</p>
      <p className="whitespace-pre-line mb-8">{about.englishIntro}</p>
      <p className="whitespace-pre-line">{about.frenchIntro}</p>
    </main>
  );
}

export async function getStaticProps() {
  const query = '*[_type == "about"][0]';
  const about = await client.fetch(query);

  return {
    props: {
      about,
    },
  };
}
