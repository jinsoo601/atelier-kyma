# KYM-13 — One artwork catalog pattern

The first saleable catalog example is 성석진's **청화백금닷 달항아리**. The artist's complete published career is preserved in `content/archive.json` and shown on `/artists/suk-jeen-sung`. The artwork is `kym-artwork-0001`; its inquiry product is `kym-product-0001`. The public asking price is read from that one product record in `content/catalog.ts`: **₩2,000,000**. Quantity **1** is the working assumption. Checkout is not active.

## Edit an existing work

- Change inquiry price, quantity, or availability in its product record in `content/catalog.ts`. The artwork page, index, and artist card derive the same price. Check any physical price card visible in photos before changing a price.
- Change title, ordered images, year, materials, dimensions, or condition in its artwork record. Unknown facts stay `null`; the page omits them. Keep the stable ID even if the title or price changes. A slug change needs a redirect.
- Keep the work at `unconfirmed` while the gallery owner checks physical stock and sale permission. A buyer's inquiry does not reserve it. If it sells in person, the owner must stop any live Toss link before the site is updated to `sold`.

## Add another artist and artwork

1. Add unique artist, artwork, and product IDs to `catalogIds` in `content/catalog.ts`. Choose human-readable slugs separately. Do not reuse an ID from a sold work.
2. Upload approved images to Vercel Blob under `artists/{artist-slug}/` and `artworks/{artwork-slug}/`. Keep the source files and rights record. Give each image Korean alt text and optional caption. Arrange artwork images in display order, with the main view first.
3. Add the artist biography/career blocks in `content/archive.json`. Add the artist display record in `content/gallery.ts` and its ID-to-slug entry in `artistSlugById`. Use `catalogWorksForArtist(newArtistId)` in the artist's `works` list. The `existingWorks` helper is for the two migrated artists only; list a new artist's extra portfolio photos in `works` as image cards without a product.
4. Add an `ArtworkRecord` and an `InquiryProductRecord` in `content/catalog.ts`, then include them in `artworkCatalog` and `productCatalog`. A work needs exactly one linked product to appear in `/artworks`. Set `availability: "unconfirmed"` and `purchaseMethod: "inquiry"` until the owner confirms the facts. The artwork index, detail page, and artist works grid read the new record without another hand-written artwork mapping.
5. Optionally point `content/featured-home.ts` at the new work; check its image, copy, and link together. Run typecheck, lint, and build, then inspect desktop and phone layouts and image URLs before publishing.

For a small good such as a cup, add a unique `kind: "small-good"` product record with name, ordered images, one inquiry price, and quantity in `productCatalog`. It does not need an `ArtworkRecord` unless the gallery wants a separate editorial artwork page. The current website does **not** display standalone small goods yet; adding the record is preparation, not publication.

## Owner and payment handoff

The pilot still needs owner confirmation of production year, materials, dimensions, condition, actual physical stock, sale permission, photo rights, a clean image or approved crop without the visible price card, and whether domestic delivery is included in ₩2,000,000. Until those are confirmed, the site remains inquiry-only. A matching Toss LinkPay product/key can be recorded only after it exists and the merchant approval and stock behavior are checked in KYM-4/5. KYM-15 implements live checkout. Do not place a second checkout price or checkout URL in the repository.
