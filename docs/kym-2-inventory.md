# KYM-2 — Current site and source inventory

Audited 20 October 2026 (Asia/Seoul). This is a migration inventory, not a product catalog. The public website and the public Sanity `production` dataset were read; no production content or settings were changed.

## Implementation scope decided after the audit

The first new artist profiles will be **Suk Jeen Sung (성석진)** and **In Sook Rhee (이인숙)**. One representative artwork establishes the artwork, image, and checkout pattern: **청화백금닷 달항아리**, **₩2,000,000**, assumed quantity 1 pending owner confirmation, with [a supplied photo](../assets/pilot/suk-jeen-sung-cheonghwa-baekgeum-dot-moon-jar.jpeg). This replaces the earlier $1,000 development sample, $10,000 USD planning figure, and ₩12,000,000 지리산 하동백토, 백유 pilot selection. The latter remains a separate high-value candidate for later inquiry or checkout review. **All 12 existing exhibitions will be ported** to the new routes with their original slugs and content. Other artists, artworks, and small goods can be added later using the documented pattern. The URL inventory below remains useful for preserving the existing editorial pages; it is not a request to curate every artwork for launch.

## Companion files

- [`kym-2-url-map.csv`](kym-2-url-map.csv): every currently live page URL and the proposed destination. All 28 existing URLs currently return HTTP 200. The new App Router uses plural `/artists` and `/exhibitions` paths; old singular URLs redirect after their destination pages are ready. A separate row proposes a new Kimi Kim artist URL for owner review.
- [`kym-2-content.csv`](kym-2-content.csv): every published artist, exhibition, about, and contact document, with slug, dates, image counts, and Sanity ID.
- [`kym-2-image-placements.csv`](kym-2-image-placements.csv): all 285 locations where an image is used in current content, including the 43 artwork images and captions embedded directly in two page source files.
- [`kym-2-assets.csv`](kym-2-assets.csv): 266 Sanity image assets and 50 files in `public/`, with source URLs or repository paths, filenames, dimensions, bytes, usage, and whether each is referenced. This is metadata only; no CDN image files were downloaded.

## Pages and URL plan

| Current path group | Live count | Proposed route | Notes |
| --- | ---: | --- | --- |
| `/` | 1 | `/` | Current page uses a client-side push to `/exhibition`; the rebuild can give `/` a real home page. |
| `/about`, `/contact` | 2 | Same paths | About intentionally shows Korean, English, and French intros. Jin Soo confirmed the published opening hours on 21 October 2026; verify the street address before launch. |
| `/artist`, `/exhibition` | 2 | `/artists`, `/exhibitions` | Build plural routes alongside the old singular routes, then redirect at cutover. |
| `/artist/{slug}` | 11 | `/artists/{slug}` | Keep the artist slug; redirect each old URL after its destination is live. |
| `/exhibition/{slug}` | 12 | `/exhibitions/{slug}` | Keep the exhibition slug. All 12 are past events; the latest ended 31 October 2024. Three detail routes have custom source files. |

The site has no live `/robots.txt` or `/sitemap.xml` (both return 404). These should be added in the rebuild. The apex domain's redirect to `www` is covered in KYM-1.

## Content and image sources

- Published Sanity documents: **12 artists, 12 exhibitions, 1 about, 1 contact, 0 consulting**. The consulting schema exists but has no published document. The live `/artist` index contains **11** artists; Kimi Kim's Sanity record was added after the deployed build, has no slug or career content, and does not appear on that page.
- Sanity image library: **266** asset records. **207** distinct assets are referenced by published content; **59** are unreferenced. All 242 Sanity image placements resolve to an asset record. Of the 207 referenced assets, **113** have a longest side of at most 1,000 px. The original upload filename and dimensions are recorded, but the dataset does not establish whether an archival master exists elsewhere.
- Repository `public/`: **50** files, including **34** Jeong Hyun Ha exhibition JPEGs, **11** Jiyu Kwak exhibition images, a logo, favicon, and three template SVGs. The two exhibition pages explicitly display **32** Jeong images and all **11** Jiyu images. Jeong files `5-1.jpeg` and `5-2.jpeg` are present but unused. The 34 Jeong JPEGs have a longest side no greater than 710 px; higher resolution sources will be needed if these works are offered for sale or shown in large detail views.
- There are **217** image placements within Sanity rich text, plus **43** hardcoded artwork image placements in the two custom pages. The latter have image-specific captions in source code. Sanity body images have no dedicated title, medium, dimensions, price, or stock fields; some nearby freeform text appears to describe artworks. An image placement is not necessarily a unique or saleable artwork.
- There is **no structured artwork or product document type** in the existing Sanity schema or page code. No source of truth for SKU, edition/quantity, price, availability, shipping, or sale rights was found in this repository or the published Sanity documents.

## Owner review before migration

1. **Catalog scope:** decide which artists, exhibitions, and individual works should remain public. Confirm whether Kimi Kim gets a new artist profile and approve its slug and biography. Keep the old singular URLs available until their plural destinations exist, then redirect each old path.
2. **Sale inventory:** supply a separate approved list of saleable originals and small goods with title, artist, medium, dimensions, year, price/currency, quantity or edition, availability, and fulfillment details. Do not infer saleability from gallery photos or past exhibition pages.
3. **Image masters and rights:** locate higher resolution originals for intended sale items, particularly the small Jeong files and low-resolution Sanity assets. Confirm permission to publish/use each image and preserve existing artist copyright credits from the custom exhibition pages.
4. **Legacy image selection:** decide whether the 59 unreferenced Sanity assets and two unused Jeong files should be kept. They are excluded from the proposed migrated page content by default; the asset manifest retains them for review.
5. **Editorial checks:** verify the gallery contact details and opening hours (contact record last updated March 2023), the multilingual text policy, and whether the 2022–2024 exhibition archive is complete. The current exhibition index has no current event as of this audit.

## Migration handling

Build the new `/artists` and `/exhibitions` routes while the existing `/artist` and `/exhibition` routes remain live. Redirect an old path only when its mapped plural page is ready; preserve slugs and avoid sending old detail URLs to an unrelated index page. Export the approved rich text and referenced images, then convert artwork candidates into explicit records only after owner review. Preserve the 43 hardcoded image-to-caption pairs; they are not in Sanity. Map every approved image to its source locator in the asset manifest before any Vercel Blob upload.
