import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { PortableTextReactComponents } from "@portabletext/react";

import Image from "next/image";
import React from "react";
import { urlFor } from "../../lib/sanityClient";

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: { value: SanityImageSource }) => (
      <div className="relative w-full md:w-2/3 aspect-[1182/1658] mt-4 mb-2">
        <Image src={urlFor(value).url()} alt="image" fill />
      </div>
    ),
  },
  marks: {
    em: ({ children }) => <em>{children}</em>,
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-4 mb-2">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-4 mb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base font-bold mt-4 mb-2">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-sm font-bold mt-4 mb-2">{children}</h6>
    ),
    blockquote: ({ children }) => (
      <blockquote className="text-slate-600 italic border-l-4 border-slate-300 pl-4 my-4 text-sm leading-6">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="my-4 text-sm leading-7">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="list-disc list-inside text-sm leading-6">{children}</li>
    ),
  },
};

export default components;
