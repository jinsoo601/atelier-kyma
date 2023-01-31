// import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { SanityImageSource } from "@sanity/asset-utils/dist/types";
import type { PortableTextReactComponents } from "@portabletext/react";

import Image from "next/image";
import React from "react";
import { urlFor } from "../lib/sanityClient";
import { getImageDimensions } from "@sanity/asset-utils";

const components: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }: { value: SanityImageSource }) => {
      const { width, height } = getImageDimensions(value);
      let aspectStyle = "aspect-square";
      let colSpanStyle = "md:col-span-1";
      if (width / height >= 1.5) {
        aspectStyle = "aspect-[3/2]";
        colSpanStyle = "md:col-span-2";
      } else if (width / height <= 0.75) {
        aspectStyle = "aspect-[2/3]";
      }
      return (
        <div className={`relative w-full ${aspectStyle} mt-2 ${colSpanStyle}`}>
          <Image
            src={urlFor(value).width(width).height(height).url()}
            alt="image"
            fill
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
      <h6 className="text-sm font-bold mt-4 mb-2 col-span-full">{children}</h6>
    ),
    blockquote: ({ children }) => (
      <blockquote className="text-slate-600 italic border-l-4 border-slate-300 pl-4 my-4 text-sm leading-6">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-sm leading-7 col-span-full">{children}</p>
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
