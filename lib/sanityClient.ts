import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "s617s8hp",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
