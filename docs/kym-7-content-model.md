# KYM-7 — Catalog identities and editing rules

Decision recorded 21 October 2026. The first validated example is 성석진's **청화백금닷 달항아리**. The site still offers inquiry only; the gallery has applied for LinkPay and has not reported merchant approval. This document defines the format for KYM-13 and the commerce gates for KYM-15. It does not activate checkout.

## Where content lives

| Record | Editable source | Stable key | Public route |
| --- | --- | --- | --- |
| Artist | `content/gallery.ts` plus the preserved biography blocks in `content/archive.json` | Explicit `id`, such as `kym-artist-0001` | `/artists/{slug}` |
| Artwork | `content/catalog.ts` | Explicit `id`, such as `kym-artwork-0001` | `/artworks/{slug}` |
| Product | `content/catalog.ts` | Explicit `id`, such as `kym-product-0001` | Artwork page or a future goods page |
| Exhibition | `content/gallery.ts` summary plus the ordered archive in `content/archive.json` | Explicit `id`, such as `kym-exhibition-0001` | `/exhibitions/{slug}` |
| Home feature | `content/featured-home.ts` | An artwork/image reference; no separate sale product | `/home` |

An ID is assigned once and never derived from the title, artist name, image filename, display order, or URL slug. Do not reuse an ID when a work is sold. Slugs preserve published URLs where possible; a slug change requires a redirect in KYM-14 but does not change the ID. The archived portfolio photographs have image/card IDs and are **not** assumed to be saleable artwork records. The existing `archive.json` artist keys and exhibition slugs are migration lookup keys; the explicit IDs in `gallery.ts` are the stable identities for new content.

## Record fields

- **Artist:** `id`, `slug`, Korean and romanized names, introduction, hero image, ordered portfolio images, complete career blocks, optional related exhibition. Add future artist IDs in `catalogIds` and keep biography/career information separate from sale claims.
- **Artwork:** `id`, `slug`, `artistId`, title, category, ordered images with `src` and Korean `alt` (optional caption), year, materials, and dimensions. Use `null` for a fact not yet verified; do not invent a year or dimensions. The gallery inspects works before listing; there is no public condition field. Image URLs are stable Vercel Blob paths and source files/rights remain separately traceable.
- **Exhibition:** `id`, `slug`, title, dates, poster, ordered content blocks and image captions. A past exhibition remains an archive item; IDs survive title corrections.
- **Product:** `id`, `kind` (`unique-artwork` or `small-good`), link to `artworkId` for an artwork or a standalone name/images for a small good, `availability`, and a separate `purchaseMethod`. For inquiry, also store one KRW asking price, quantity, and separate price/stock confirmation flags. For approved checkout, store the Toss `productKey` **instead of** a second editable price or quantity. Each small-good variant can initially be a separate product record; a cart and variant UI are later work.

Current pilot identifiers: artist `kym-artist-0001`, artwork `kym-artwork-0001`, product `kym-product-0001`. The title is **청화백금닷 달항아리**, the provisional asking price is **₩2,000,000**, and quantity **1** is an unconfirmed assumption. The first gallery image is at the Blob path in `content/catalog.ts`. The physical price card visible in the supplied photo must be removed with a clean approved image or crop before any price change is published.

## Availability and purchase method

`availability` is `unconfirmed`, `available`, `reserved`, or `sold`. `unconfirmed` is the current pilot state until the owner checks the physical work and sale rights. `purchaseMethod` is independently `inquiry` or `checkout`; a work can be available for inquiry without offering immediate payment. An inquiry never reserves or decrements stock. A reserve or in-gallery sale requires the owner to stop any active Toss checkout first, then update the repository state. Reserved and sold works must not display a Buy action.

Do not select checkout automatically from a price threshold. Approval is per work and depends on merchant terms, delivery, stock behavior, and owner decision. The ₩12,000,000 work remains a separate future candidate.

## One price and stock workflow

1. **Inquiry product:** the owner approves the amount and physical quantity; an editor changes `priceKrw`, `quantity`, and `availability` in `content/catalog.ts` through a reviewed Git change. The artwork detail, artwork index, and artist card all derive their current price from this one product record. A sale or reservation is reflected by changing `availability`; private buyer/order details never go in Git.
2. **Checkout product, after approval:** the record changes to `purchaseMethod: "checkout"` with its Toss `productKey`. The website server reads Toss's Product `amount`, `currency`, `status`, checkout `url`, and remaining `stock` for that key; the site renders the returned KRW amount and only offers Buy when both Toss and the gallery's availability state allow it. Do not keep a separate public checkout price or checkout URL in Git. If the provider read fails, do not show a potentially stale Buy action or price; show the inquiry fallback. Credentials stay server-side. KYM-15 implements this read; KYM-5 verifies it on the approved account first.
3. **Changing a live checkout price:** the owner changes the Toss product amount in the merchant dashboard, checks the public amount against the hosted payment page, and records the change in the private sales log. The site should read the new provider amount without a repository price edit. If delivery is charged separately, show the provider's delivery fee and total before payment; the artwork price alone is not a final delivered total.
4. **Stock-one safety:** Toss is the authority for online checkout stock, while the gallery owner controls physical availability. The owner must disable the Toss product immediately on an in-gallery reserve or sale. The website must honor either `reserved`/`sold` in the repository or `SOLD_OUT`/zero remaining stock at Toss. KYM-5 and KYM-17 must test simultaneous and pending payments; this schema alone does not guarantee no double sale.

The [official LinkPay API](https://docs.tosspayments.com/reference/linkpay) documents product keys, amount, currency, status, URL, and remaining stock. The [LinkPay guide](https://docs.tosspayments.com/guides/v2/linkpay) describes hosted links and the additional contract. Those public descriptions do not establish approval, account-specific limits, or reservation behavior for this gallery.

## Repeatable editor steps

The reusable [Atelier Kyma content editor skill](../.agents/skills/atelier-kyma-content-editor/SKILL.md) turns these rules into a working checklist for ChatGPT or Codex sessions with access to this repository.

1. Create a new ID in `catalogIds`; choose a human-readable slug separately. Never copy an existing product ID or a Toss `productKey`.
2. Upload approved photos to Vercel Blob under `artists/{slug}/`, `artworks/{slug}/`, or `exhibitions/{slug}/`. Record source provenance, rights, alt text, and captions. Avoid a visible physical price label that could conflict with a later edit.
3. Add or edit the artist, artwork, exhibition, and product records as applicable. A portfolio image alone needs no product. A small good needs a product with its own quantity and price but no artwork record unless it merits an editorial artwork page.
4. Keep new products at `unconfirmed` and `inquiry` until the owner approves the facts, actual stock, price, sale rights, and delivery terms. Checkout additionally requires KYM-4/5/15/17 gates and a real Toss product key.
5. For the home hero, edit the single record in `content/featured-home.ts`; check its image, copy, link, rights, and any visible physical price card together.
6. Review the change with Jin Soo or the gallery owner, run typecheck/lint/build, and verify the page on desktop and phone before publishing. A ChatGPT session can prepare the Git change; no editor dashboard is required for launch.

Open pilot facts for the owner: creation year, materials, dimensions, photo rights/clean image, actual physical stock, sale permission, and whether Korean delivery is included in the asking price. These belong to KYM-13 and KYM-16 before live checkout.
