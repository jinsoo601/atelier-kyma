# KYM-13 — One artwork catalog pattern

The first saleable catalog example is 성석진's **청화백금닷 달항아리** (2025, 하동백토·청화유·플래티넘, 20.5 × 20.5 × H21.3 cm). The artist's complete published career is preserved in `content/archive.json` and shown on `/artists/suk-jeen-sung`. The artwork is `kym-artwork-0001`; its inquiry product is `kym-product-0001`. The public asking price is read from that one product record in `content/catalog.ts`: **₩2,000,000**. The owner confirmed one piece in stock and on sale. Domestic delivery **₩10,000** and wooden box packaging **₩15,000** are separate from the artwork price. Checkout is not active.

## Edit an existing work

- Change inquiry price, quantity, availability, domestic delivery fee, or packaging fee in its product record in `content/catalog.ts`. The artwork page, index, and artist card derive the same price. Match the terms in Toss before activating its payment link.
- Change title, ordered images, year, materials, dimensions, or condition in its artwork record. Unknown facts stay `null`; the page omits them. Keep the stable ID even if the title or price changes. A slug change needs a redirect.
- Keep new works at `unconfirmed` while the gallery owner checks physical stock and sale permission. This pilot is `available` because the owner confirmed both; a buyer's inquiry still does not reserve it. If it sells in person, the owner must stop any live Toss link before the site is updated to `sold`.
- The original pilot photo had a physical price tag below the vessel. `assets/pilot/suk-jeen-sung-cheonghwa-baekgeum-dot-moon-jar-clean.jpeg` is a crop of that original at 1630×1790, preserving the actual vessel. The website serves an identical copy from `public/gallery/artworks/suk-jeen-sung-cheonghwa-baekgeum-dot-moon-jar/hero-clean.jpeg`. The 3260×3580 `-clean-2x.jpeg` file is interpolated for optional upload; it does not contain newly recovered detail. Do not use AI-generated variants that change the vessel's glaze or surface as sale photos.

## Add another artist and artwork

1. Add unique artist, artwork, and product IDs to `catalogIds` in `content/catalog.ts`. Choose human-readable slugs separately. Do not reuse an ID from a sold work.
2. Upload approved images to Vercel Blob under `artists/{artist-slug}/` and `artworks/{artwork-slug}/`. Keep the source files and rights record. Give each image Korean alt text and optional caption. Arrange artwork images in display order, with the main view first.
3. Add the artist biography/career blocks in `content/archive.json`. Add the artist display record in `content/gallery.ts` and its ID-to-slug entry in `artistSlugById`. Use `catalogWorksForArtist(newArtistId)` in the artist's `works` list. The `existingWorks` helper is for the two migrated artists only; list a new artist's extra portfolio photos in `works` as image cards without a product.
4. Add an `ArtworkRecord` and an `InquiryProductRecord` in `content/catalog.ts`, then include them in `artworkCatalog` and `productCatalog`. A work needs exactly one linked product to appear in `/artworks`. Set `availability: "unconfirmed"` and `purchaseMethod: "inquiry"` until the owner confirms the facts. The artwork index, detail page, and artist works grid read the new record without another hand-written artwork mapping.
5. Optionally point `content/featured-home.ts` at the new work; check its image, copy, and link together. Run typecheck, lint, and build, then inspect desktop and phone layouts and image URLs before publishing.

For a small good such as a cup, add a unique `kind: "small-good"` product record with name, ordered images, one inquiry price, and quantity in `productCatalog`. It does not need an `ArtworkRecord` unless the gallery wants a separate editorial artwork page. The current website does **not** display standalone small goods yet; adding the record is preparation, not publication.

## Owner and payment handoff

The pilot still needs its condition and confirmation of how the box fee is applied when arranging delivery. The clean crop should be reviewed against the real work. The gallery owner confirmed year, materials, dimensions, price, one-piece stock, sale permission, and separate delivery and packaging charges. The user will register the cleaned photo with Toss LinkPay and supply the resulting link. Merchant approval and stock behavior are checked in KYM-4/5; KYM-15 implements live checkout. Do not place a second checkout price or checkout URL in the repository.
