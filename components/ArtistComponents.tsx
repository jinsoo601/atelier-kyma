import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { PortableTextReactComponents } from "@portabletext/react";

import Image from "next/image";
import React from "react";
import { urlFor } from "../lib/sanityClient";

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: { value: SanityImageSource }) => {
      return (
        <div className={`relative w-full mt-2 aspect-square`}>
          <Image
            src={urlFor(value).url()}
            alt="image"
            fill
            style={{ objectFit: "contain", objectPosition: "top" }}
          />
        </div>
      );
    },
  },
  marks: {
    em: ({ children }) => <em>{children}</em>,
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-4 mb-2 col-span-full">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-4 mb-2 col-span-full">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold mt-4 mb-2 col-span-full">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold mt-4 mb-2 col-span-full">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base font-bold mt-4 mb-2 col-span-full">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-sm text-medium mt-4 mb-2">{children}</h6>
    ),
    blockquote: ({ children }) => (
      <blockquote className="text-slate-600 italic my-8 text-sm leading-6 col-span-full px-[20%]">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="my-4 text-sm leading-6 col-span-full">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="col-span-full">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="list-disc list-inside text-sm leading-6">{children}</li>
    ),
  },
};

export default components;
