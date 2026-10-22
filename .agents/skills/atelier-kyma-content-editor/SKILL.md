---
name: atelier-kyma-content-editor
description: Add or update Atelier Kyma artists, artworks, small goods, exhibitions, and home features in the atelier-kyma repository. Use for repeatable gallery content edits with stable IDs, approved images, and owner-checked sale facts; do not use for building payment integration.
---

# Atelier Kyma Content Editor

Use this with the `atelier-kyma` repository. Work from the current code, not an old example. Read `docs/kym-7-content-model.md` for identity and commerce rules, `docs/kym-12-content-guide.md` for the migrated archive format, and `docs/kym-13-catalog-guide.md` for the copyable catalog pattern. Check `AGENTS.md` before code changes.

## Gather the content

For an artist, obtain the Korean and romanized names, introduction, complete career text, image order/captions, and any related exhibition. For an artwork or small good, obtain title, artist, approved photos, price in KRW, physical quantity, and the owner's decision about availability and sale method. Record year, materials, dimensions, condition, delivery terms, photo rights, and sale permission only when confirmed; use `null` or an explicit unconfirmed state otherwise. For an exhibition, obtain the original published slug if one exists, title, dates, poster, and ordered text/image blocks. Do not invent missing facts or copy buyer/order details into Git.

If required files or decisions are missing, prepare the content and implementation that can be done safely, then ask the gallery owner or Jin Soo for the specific outstanding items. A draft inquiry page can remain `unconfirmed`; that state does not authorize checkout.

## Make the edit

1. Inspect existing records and assign a new unique ID in `content/catalog.ts`'s `catalogIds` for each new artist, artwork, or product. Exhibition IDs live in `content/gallery.ts`. Keep IDs stable across title, price, image, order, and slug changes. Choose a readable slug separately. Preserve published slugs when possible; plan a redirect before changing one. Never reuse an ID or a Toss product key.
2. Upload approved photos to the public Vercel Blob store using stable paths such as `artists/{slug}/`, `artworks/{slug}/`, or `exhibitions/{slug}/`. Keep the source and permission record traceable; add Korean alt text and useful captions. If this session cannot upload, give the editor exact upload paths and ask for the resulting URLs. Check for a visible price label in photos before changing prices.
3. Edit the applicable content sources: `content/archive.json` for preserved biographies and ordered exhibition blocks; `content/gallery.ts` for displayed artist and exhibition records; `content/catalog.ts` for saleable artwork/product records; `content/featured-home.ts` for the home feature. A portfolio photo alone is not a product. A small good can have a product without a separate editorial artwork page.
4. Include new artwork and product records in `artworkCatalog` and `productCatalog` in `content/catalog.ts`. Add a new artist's ID-to-slug entry and artist display record in `content/gallery.ts`. Check artist works, artwork index/detail, exhibition index/detail, and `generateStaticParams` behavior as applicable. Keep one inquiry price and quantity in the product record; derive public labels from it. A small-good product has no public page yet.
5. Keep a new product at `availability: "unconfirmed"` and `purchaseMethod: "inquiry"` until the owner confirms physical stock, price, sale rights, and delivery. Inquiry does not reserve stock. For reserved or sold works, remove the Buy action. Never switch to live checkout just because a price is below a threshold. Live checkout requires merchant approval and the KYM-4/5/15/17 payment and stock work; its price, URL, and stock must come from Toss server-side rather than a second editable copy in Git.
6. For a home change, update the single feature record and check image, text, link, rights, and any visible physical price card together.

## Verify and hand off

Review names, IDs, slugs, image order, alt text, gallery copy, price, and availability with Jin Soo or the gallery owner. Run `npm run typecheck`, `npm run lint`, and `npm run build`; if an unrelated legacy network dependency blocks the build, report the exact failure and verify the affected new route separately. Inspect the relevant page on desktop and phone, including image loading and links. Summarize what was changed, what remains unconfirmed, and where the editor can adjust it later. Publishing or enabling live checkout follows the project's normal review and merchant gates.
