# KYM-8 — Visual direction and sitemap (review draft)

21 October 2026. This is a design brief for Jin Soo and the gallery owner to review before KYM-10 page templates. It follows the approved [launch scope](./kym-3-launch-scope.md). It does not approve any artwork for sale or publish unconfirmed business details. Jin Soo confirmed the logo, navigation, initial artist selection, full exhibition migration, and the intentional three-language About content. He selected the **Image-led** home-page preview, with the exhibition section titled **전시 아카이브** and an artist list that can grow beyond the first two profiles. Jin Soo confirmed the gallery's current opening hours on 21 October 2026.

[Open the saved home-page mockup](./kym-8-home-preview.html) in a browser to review it. It is a self-contained design preview with the current logo and pilot photo embedded; it is not a production page.

## Direction

**An image-led gallery with a clear purchase path.** In practical terms, this means generous space around each work, easy-to-read titles and details, and navigation that stays out of the artwork's way. **Keep the current logo**, as Jin Soo requested. Use an off-white canvas, near-black text, fine dividers, and a small warm accent drawn from the existing site. Avoid heavy cards, decorative shadows, autoplay, and cropped artwork images. The existing logo file can be used now; seek a high-resolution/vector source only if the current file looks soft at the intended display size.

Use a Korean-capable sans-serif for interface and long text, with carefully sized headings rather than decorative type that competes with the work. Make image backgrounds neutral and use `contain` for artwork detail views so the entire object can be seen. Listing thumbnails may use a consistent frame but should not cut off the work. Keep captions and artwork details adjacent to the image. Show price and availability as plain text; any purchase action should be unmistakable and have a neighboring inquiry route.

On phones, use one content column, generous margins, a simple logo + menu header, and tap targets of comfortable size. On wider screens, preserve large image space and use a two-column artwork detail layout. Ensure keyboard access, visible focus, useful alternative text, and readable contrast. Do not use animation as the primary navigation cue.

## Proposed navigation and sitemap

The logo links to `/`. Jin Soo approved primary navigation **작가 · 작품 · 전시 · 갤러리 · 문의**. `작품` means a page listing works offered for sale or inquiry; it is separate from the artists' biographies and exhibition archive. The first version can show one approved work, then grow without changing the navigation. Do not populate it with unapproved legacy gallery images. `갤러리` replaces the old About label. The footer repeats core links and shows verified contact information and required business/policy links once confirmed.

```text
/
├── /artists                         작가
│   ├── /artists/suk-jeen-sung      성석진
│   └── /artists/in-sook-rhee       이인숙
├── /artworks                        작품 (approved works only)
│   └── /artworks/{artwork-slug}     individual work, price/status/inquiry or Buy
├── /exhibitions                     전시 (all 12 existing exhibitions; current section only if verified)
│   └── /exhibitions/{slug}         preserve every existing exhibition slug
├── /about                           갤러리 소개
├── /contact                         문의/방문 정보
└── /policies/...                    delivery, returns, privacy, required commerce disclosures
```

The policy URLs are placeholders for KYM-16; their exact names and final text are not yet set. Existing singular `/artist` and `/exhibition` routes remain available while plural pages are built. KYM-14 redirects each old URL only when its corresponding new page exists.

## Mobile-first page layouts

| Page | Phone order (top to bottom) | Wider layout |
| --- | --- | --- |
| **Home** `/` | Header → one prominent featured image with title/artist → short gallery introduction → an expandable artist list (initially 성석진 and 이인숙, with a path to more artists) → **전시 아카이브** → contact/footer. The first image establishes focus; supporting images can be added when approved. No stale “upcoming” label. | Use the selected **Image-led** split hero: image beside editorial text, with quieter sections below. |
| **Artists** `/artists` | Page title → one-column images/names for 성석진 and 이인숙 → footer. | Calm two-column image grid, preserving subject framing. |
| **Artist** `/artists/{slug}` | Name (Korean, then established Romanization) → portrait or representative work → short introduction → selected works → biography/career → related exhibition links. | Biography alongside image; works in an image-led grid below. |
| **Artworks** `/artworks` | Page title → approved work image, artist, title, price or inquiry label, availability. No cart for the one-work pilot. | Two- or three-column grid that can grow as more works are approved. |
| **Artwork** `/artworks/{slug}` | Full uncropped image, optional other views → artist/title → KRW price or inquiry-only state → availability → Buy or 구매 문의 → year/materials/dimensions/condition → delivery/returns links. | Large image left, details/action right; avoid a sticky Buy button that hides content. |
| **Exhibitions** `/exhibitions` | Title → current exhibition only if owner confirms one → dated archive of all 12 existing exhibitions. | Editorial rows or grid with dates and posters. |
| **Exhibition** `/exhibitions/{slug}` | Title/dates → hero poster or installation image → description → gallery images/captions → related artist. | Wider image sequence with readable text column. |
| **About** `/about` | Gallery introduction in **Korean, English, and French**, each clearly labeled or headed, retaining all three existing passages → location/contact CTA. | Generous reading columns; keep the three languages visibly distinct. |
| **Contact** `/contact` | Email and phone → address/map link → verified hours → Instagram → visit details → purchase inquiry entry point. | Contact and visit details side by side. |

The purchase inquiry form itself is defined in [KYM-4's fallback plan](./kym-4-manual-inquiry-fallback.md). It should carry the artwork ID/title from the artwork page, and should say clearly that sending an inquiry does not reserve the work. A live Buy button waits for KYM-4/5/17 and owner approval.

The homepage's featured image is a **content choice**, not part of the page layout. Put its artwork/image reference and accompanying text in one obvious, documented content record so either editor can replace it without editing the page template. The pilot photo is a preview placeholder; a final homepage photo is not a KYM-8 decision. Before publication, confirm the selected image's rights and ensure any visible physical price card agrees with the current listing price.

## Language and content

Korean is the launch **interface** language and the default text for new catalog and commerce pages. **About intentionally presents Korean, English, and French together.** Jin Soo explained that his mother lived in France for ten years and speaks all three languages; this is part of the gallery's identity. Keep the three existing introductions visible and orderly on `/about`, rather than hiding English/French for later. Preserve established English artist names and artwork titles where relevant. A fully translated interface or language switcher is a separate future decision.

The public exhibition page currently labels Kimi Kim's 2024 show “UPCOMING”; the [KYM-2 inventory](./kym-2-inventory.md) found all 12 published exhibitions ended by October 2024. Use a dated archive until the gallery owner confirms a current program. The home page must not silently reuse that stale state.

## Decisions for review

1. Jin Soo selected the **Image-led** home layout and **전시 아카이브** wording. Gallery-owner design review remains before marking KYM-8 Done.
2. The homepage photo is intentionally swappable through content data. Its final selection belongs to content review before launch, not KYM-8.
3. Confirm the actual content and approved photos for **성석진 and 이인숙**. Port all 12 existing exhibitions and preserve their old links; review any missing/corrupt archive media during migration.
4. The screenshot supplied by Jin Soo repeats the current contact page's email (`info@atelierkyma.com`), phone (`+82 2-3785-0118`), address (`서울시 용산구 녹사평대로32길 47, 1층 102호`), Instagram (`atelierkyma`), and hours (Tue–Fri 11:00–19:00, Sat 12:00–18:00, Sun–Mon closed). **Jin Soo confirmed these hours are current on 21 October 2026.** Confirm the address with the owner before publication. Also confirm whether a current exhibition exists before presenting one as current.

KYM-9 can proceed using this structure. After the gallery owner reviews the visual direction, record that review in KYM-8 and close the issue; content and launch checks above remain with KYM-10/12/19.
