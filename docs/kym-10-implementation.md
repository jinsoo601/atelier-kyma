# KYM-10 implementation state

The approved [interactive page mock](./kym-10-page-preview.html) is now represented by responsive Next.js App Router templates. This is code on the KYM-10 branch, not a change to the production site. The existing Pages Router `/`, `/about`, `/contact`, `/artist/*`, and `/exhibition/*` routes remain in place.

| Template | Working route during migration | Intended route at launch |
| --- | --- | --- |
| Home | `/home` | `/` |
| Artist index and detail | `/artists`, `/artists/[slug]` | same |
| Saleable works and detail | `/artworks`, `/artworks/[slug]` | same |
| Exhibition archive and sample detail | `/exhibitions`, `/exhibitions/jeong-hyun-ha-solo-exhibition` | same; remaining details follow in KYM-12 |
| Gallery introduction | `/gallery` | `/about` |
| Contact and inquiry layout | `/inquiries` | `/contact` |

The new routes render sample repository records from [`content/gallery.ts`](../content/gallery.ts). The home hero image, title, description, and destination live together in `featuredHome`, so an editor can change them without changing the page template. Artist portfolios use twenty checked-in image copies (plus one representative image) under `public/gallery/artists/` and show six at first, with a keyboard-accessible button to reveal all. The pilot work and its ₩2,000,000 price are the only saleable artwork record; the other portfolio photos have no price or purchase link. The exhibition index includes the twelve known records; until KYM-12 ports their details, eleven rows continue to their existing singular Pages Router URLs.

This sample content is a working shape for templates, not the final KYM-7 content format or a full migration. KYM-7 still needs to settle stable IDs and the editing workflow. KYM-11 will move approved images to the chosen asset storage. KYM-12 will port complete artist biographies, every exhibition detail, and the full Korean/English/French introduction. The current short passages are placement samples. The contact page shows the intended form layout, but online submission remains unavailable until the inquiry delivery work is complete; email and phone remain usable. Checkout is not enabled. Confirmed stock, fulfillment and payment activation belong to the later commerce tasks.

Before replacing the old `/`, `/about`, and `/contact`, migrate their approved content and connect the inquiry form. When each route is ready, remove its Pages Router file in the same change that adds the App Router page at that path, update navigation links, and verify old URLs and redirects. Keep KYM-10 in progress until that work and owner review are complete.

Validation on 21 October 2026: `npm run typecheck`, `npm run lint`, and `npm run build` pass when the build can read the old Sanity-backed Pages Router data. The new routes were inspected in the local browser. At 390px and 320px CSS width, the artist grid has two columns and no horizontal overflow; the first six work cards expand to all thirteen Sung cards.
