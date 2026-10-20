import type { SanityImageSource } from "@sanity/image-url";

import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: "s617s8hp",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
