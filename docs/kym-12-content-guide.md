# KYM-12 content migration and editing guide

The new pages use repository content in [`content/archive.json`](../content/archive.json) and [`content/gallery.ts`](../content/gallery.ts). The App Router pages for `/gallery`, `/artists/suk-jeen-sung`, `/artists/in-sook-rhee`, and all 12 `/exhibitions/[slug]` routes do not read Sanity at runtime. The older singular routes remain available during the transition.

## What was moved

- The published Korean, English, and French gallery introductions are copied in full into `archive.json`. Keep all three languages together when updating the About page.
- Both initial artist profiles retain their complete published career text. Their portfolio images appear in the works grid. 성석진's 12 portfolio images were uploaded for KYM-11; 이인숙's eight images belong under `artists/in-sook-rhee/` in Blob.
- All 12 exhibition slugs, original titles, start and end dates, posters, and ordered text/image blocks are stored in `archive.json`. The curated Korean display titles are in `gallery.ts`. The 32 paintings from the old 하정현 page and 11 from the old 곽지유 page were also preserved with their original captions. All 12 dates are in the past, so the index labels them as an archive.
- `kym-12-asset-manifest.json` maps each new Blob path to its published source image for verification and recovery. It is migration provenance; the new pages use Blob URLs in `archive.json`.

## Adding an artist or exhibition

1. Upload images to the **atelier-kyma-images** public Vercel Blob store. Use stable paths under `artists/<slug>/` or `exhibitions/<slug>/`, with random suffix disabled. Retain the original source files separately.
2. Add the content record to `content/archive.json`. Text blocks use `type: "text"`, a `style` such as `normal` or `h5`, `list` as a boolean, and `text`. Image blocks use `type: "image"`, `src`, `alt`, and `caption`. Keep the blocks in display order.
3. Add the artist or exhibition summary in `content/gallery.ts`. Artist works are listed there; a price and `artworkSlug` should appear only when the artwork has its own approved sale page. For an exhibition, keep the `slug` equal to the old published slug so old-to-new mapping is obvious.
4. Run `npm run typecheck`, `npm run lint`, and `npm run build`. Review desktop and phone layouts plus image loading before publishing.

The old-to-new route inventory is in [`kym-2-url-map.csv`](kym-2-url-map.csv). Leave old singular routes active until the final switch and redirects are reviewed. The gallery owner confirmed the published hours, and Jin Soo confirmed the street address (서울시 용산구 녹사평대로32길 47, 1층 102호) on 21 October 2026. Sanity client, Studio, and legacy assets can be removed only after the remaining old pages are migrated or retired.
