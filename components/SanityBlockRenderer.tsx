import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { PortableTextProps } from "@portabletext/react";

import { PortableText } from "@portabletext/react";
import Image from "next/image";
import React from "react";
import { urlFor } from "../lib/sanityClient";

const components = {
  types: {
    image: ({ value }: { value: SanityImageSource }) => (
      <div className="relative w-64 md:w-96 h-64 md:h-96 bg-slate-200 border-solid border-4 border-black mt-4 mb-2">
        <Image
          src={urlFor(value).url()}
          alt="image"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
  },
};

export default function SanityBlockRenderer({ value }: PortableTextProps) {
  return <PortableText value={value} components={components} />;
}
