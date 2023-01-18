import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { PortableTextProps } from "@portabletext/react";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import React from "react";
import { urlFor } from "../lib/sanityClient";

type TextProps = {
  children: JSX.Element;
};

const components = {
  types: {
    image: ({ value }: { value: SanityImageSource }) => (
      <div className="relative w-full md:w-1/2 h-80 md:h-[60vh] bg-slate-200 border-solid border-4 border-black mt-4 mb-2 md:mx-auto">
        <Image
          src={urlFor(value).url()}
          alt="image"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
  },
  marks: {
    em: ({ children }: TextProps) => (
      <em className="block text-center">{children}</em>
    ),
  },
  block: {
    h1: ({ children }: TextProps) => (
      <h1 className="text-3xl font-bold mt-4 mb-2">{children}</h1>
    ),
    h2: ({ children }: TextProps) => (
      <h2 className="text-2xl font-bold mt-4 mb-2">{children}</h2>
    ),
    h3: ({ children }: TextProps) => (
      <h3 className="text-xl font-bold mt-4 mb-2">{children}</h3>
    ),
    h4: ({ children }: TextProps) => (
      <h4 className="text-lg font-bold mt-4 mb-2">{children}</h4>
    ),
    h5: ({ children }: TextProps) => (
      <h5 className="text-base font-bold mt-4 mb-2">{children}</h5>
    ),
    h6: ({ children }: TextProps) => (
      <h6 className="text-sm font-bold mt-4 mb-2">{children}</h6>
    ),
    blockquote: ({ children }: TextProps) => (
      <blockquote className="text-slate-600 italic border-l-4 border-slate-300 pl-4 my-4 text-sm leading-6">
        {children}
      </blockquote>
    ),
    normal: ({ children }: TextProps) => (
      <p className="my-4 text-sm leading-7">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: TextProps) => <ul>{children}</ul>,
  },
  listItem: {
    bullet: ({ children }: TextProps) => (
      <li className="list-disc list-inside text-sm">{children}</li>
    ),
  },
};

export default function SanityBlockRenderer({ value }: PortableTextProps) {
  return <PortableText value={value} components={components} />;
}
