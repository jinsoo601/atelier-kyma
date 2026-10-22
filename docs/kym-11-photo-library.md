# KYM-11 photo library

The sample photo library for 성석진 is in the public Vercel Blob store `atelier-kyma-images` (Seoul/ICN1). The website reads public image URLs directly; displaying these photos needs no Blob API token. The production site still uses its existing routes until the rebuild is launched.

## Uploaded selection

| Order | Caption | Web copy | Available source | Web SHA-256 | Published image |
| --- | --- | --- | --- | --- | --- |
| Pilot, clean crop | 청화백금닷 달항아리 | 1630×1790 | 1630×2082 original | `8f17192a241b6f43aee7bfb08a3f230bb5688782515155e89366da8d6325ebad` | [Blob](https://rw1qqgsmaxclw3vy.public.blob.vercel-storage.com/artworks/suk-jeen-sung-cheonghwa-baekgeum-dot-moon-jar/suk-jeen-sung-cheonghwa-baekgeum-dot-moon-jar-clean.jpeg) |
| 01 | 지리산 하동백토, 백유 | 1000×1064 | 2000×2127 | `3699e300bcbc0b34b79b6e82ec440c3a7c2930a8806b4a279a12ed53c771295c` | [Blob](https://rw1qqgsmaxclw3vy.public.blob.vercel-storage.com/artists/suk-jeen-sung/portfolio-01.jpg) |
| 02 | 지리산하동백토 , 백유+재유(2중시유), 수금(3벌소성) | 1000×752 | 500×376 | `5348db1bcff600e65ff7dee17172b69792399f2b4d155f376841382ac286fca2` | [Blob](https://rw1qqgsmaxclw3vy.public.blob.vercel-storage.com/artists/suk-jeen-sung/portfolio-02.jpg) |
| 03 | 지리산하동백토 , 백유+재유(2중시유), 수금(3벌소성) | 1000×698 | 500×349 | `91e8d608aaa4067c19caa2af5cdc3fd8635f9f36d0f022d5205e611ffe22a2a6` | [Blob](https://rw1qqgsmaxclw3vy.public.blob.vercel-storage.com/artists/suk-jeen-sung/portfolio-03.jpg) |
| 04 | 지리산 하동백토, 흑유, 백금 (3벌소성) | 1000×722 | 500×361 | `19e66c2e79844e8f7ba1fa8f44a07471a88a5596db51f87adf1ba5e69fae20d7` | [Blob](https://rw1qqgsmaxclw3vy.public.blob.vercel-storage.com/artists/suk-jeen-sung/portfolio-04.jpg) |
| 05 | 지리산 하동백토, 흑유 , 수금(3벌소성) | 1000×722 | 500×361 | `1a2c9ad14974fbc1b6ebf3a653800d69cc67fdf30d860e3e5c1c2011e50a8eb2` | [Blob](https://rw1qqgsmaxclw3vy.public.blob.vercel-storage.com/artists/suk-jeen-sung/portfolio-05.jpg) |
| 06 | 지리산 하동백토, 청화 , 백유 , 백금 (3벌소성) | 1000×722 | 500×361 | `674d55baee1b260a2c8783634fccaea84cd837ab003a8a14514c7533375cd9dd` | [Blob](https://rw1qqgsmaxclw3vy.public.blob.vercel-storage.com/artists/suk-jeen-sung/portfolio-06.jpg) |
| 07 | 지리산 하동백토, 백유, 수금 | 1000×1176 | 500×588 | `c20cd95cb93121d6d3802cce765c0bdcec7be2b3c302cd163503b568e6137588` | [Blob](https://rw1qqgsmaxclw3vy.public.blob.vercel-storage.com/artists/suk-jeen-sung/portfolio-07.jpg) |
| 08 | Universe, 하동백토, 백유+재유, 수금 3벌 소성 | 1000×1086 | 500×543 | `d01d6ed1d29240358ee201ccb10e8e9087b9f0a862afe31128732da8ca6eed36` | [Blob](https://rw1qqgsmaxclw3vy.public.blob.vercel-storage.com/artists/suk-jeen-sung/portfolio-08.jpg) |
| 09 | Universe, 하동백토, 백유 + 재유 | 1000×1086 | 500×543 | `8546fa34959713a85ced2d943f0d2c9ca3e82e8b9e112c7d1152f83ef1e31391` | [Blob](https://rw1qqgsmaxclw3vy.public.blob.vercel-storage.com/artists/suk-jeen-sung/portfolio-09.jpg) |
| 10 | Black Universe, 흑유, 수금 3벌 소성 | 1000×1080 | 500×540 | `d3b1893969e80f59b07e49313c0a10b056fcec33e18366c3b98d5192e6e43ee7` | [Blob](https://rw1qqgsmaxclw3vy.public.blob.vercel-storage.com/artists/suk-jeen-sung/portfolio-10.jpg) |
| 11 | White Universe, 백유, 수금 3벌 소성 | 1000×1082 | 500×541 | `aa1ca0332dc77ecca2bf39b8a6913290b67d396c0e0c6a8b57987758359fc2b3` | [Blob](https://rw1qqgsmaxclw3vy.public.blob.vercel-storage.com/artists/suk-jeen-sung/portfolio-11.jpg) |
| 12 | Universe, 하동백토, 백유+재유(2중시유), 수금 3벌소성 | 1000×1045 | 2591×2707 | `b7c399499576096b9b317a8bf89bd15da91d3f2fde2691fae74aeddb123dda50` | [Blob](https://rw1qqgsmaxclw3vy.public.blob.vercel-storage.com/artists/suk-jeen-sung/portfolio-12.jpg) |

The pilot work is the ₩2,000,000, one-of-one artwork record in [`content/gallery.ts`](../content/gallery.ts). Portfolio orders 01–12 are display-only work photos. The portfolio captions and exact legacy Sanity source URLs are recorded in [`artist-gallery-manifest.json`](./kym-10-assets/artist-gallery-manifest.json). The image paths in this table are used by the artist and home pages through `content/gallery.ts`.

## Source backup and quality

The 12 source files are backed up in [`assets/masters/suk-jeen-sung/`](../assets/masters/suk-jeen-sung/), outside `public/`. The pilot source is also in [`assets/pilot/`](../assets/pilot/) and its backup is `assets/masters/suk-jeen-sung/cheonghwa-baekgeum-dot-moon-jar-source.jpeg`. `portfolio-01` and `portfolio-12` have higher-resolution legacy sources (2000×2127 and 2591×2707). The other ten legacy Sanity sources are only about 500 pixels wide; their 1000-pixel web copies do not add detail. Obtain gallery-owned originals for those ten if higher-quality images become available. Do not describe these 500-pixel files as high-resolution masters.

The initial files were downloaded from Blob on 21 October 2026 and checked byte-for-byte against the web copies. The clean pilot crop was uploaded on 22 October 2026; Vercel's ETag matched the local file's MD5, and its SHA-256 is recorded above. The earlier [`hero.jpeg`](https://rw1qqgsmaxclw3vy.public.blob.vercel-storage.com/artworks/suk-jeen-sung-cheonghwa-baekgeum-dot-moon-jar/hero.jpeg) remains in Blob as the price-tagged original but is not used by the new site.

## Repeat for a new artwork or artist

1. Put the best available source file in `assets/masters/{artist-slug}/` and keep it outside `public/`. Record where it came from, the title/caption, dimensions, and any usage approval. Export a web copy without enlarging a small source merely to reach a target dimension.
2. Give the web copy a stable, ASCII path: `artists/{artist-slug}/portfolio-01.jpg` for portfolio photos or `artworks/{artwork-slug}/hero.jpeg` for a saleable artwork. Keep its original extension when practical. Avoid reusing a path for a different photo because the public URL may be cached.
3. In the Vercel project, open **Storage → atelier-kyma-images → Manage Blobs**. Create the parent folder if needed, then use **Upload** or **More upload options → Upload folder**. Leave random suffix off for stable paths. Confirm the uploaded photo and copy its public URL.
4. Add the title and source URL to the gallery manifest, then map the public Blob URL to the artist or artwork record in `content/gallery.ts`. If using a new Blob store, add only its exact hostname to `images.remotePatterns` in `next.config.js`.
5. Check the artist and artwork pages at desktop and mobile widths. Confirm the image and caption match, and compare the downloaded Blob file's SHA-256 to the exported web copy. An artwork being shown in a portfolio does not make it available for purchase; checkout and stock are separate decisions.

For this first batch, source URLs, captions, file hashes and the published URLs above provide a trace from each page image to its origin. Future entries should follow the same pattern; no editing dashboard or upload secret is required for manual uploads by an authorized Vercel project member.

## Validation

On 21 October 2026, `npm run typecheck`, `npm run lint`, and `npm run build` passed. All 13 published Blob files matched their web sources by SHA-256. The built `/home`, `/artists/suk-jeen-sung`, and pilot artwork pages returned successfully, and Next.js optimized the pilot and `portfolio-12` images successfully. The artist page was also visually checked in a browser. The legacy Pages Router still fetches Sanity data at build time, so running the complete build requires network access until those old routes are retired.
