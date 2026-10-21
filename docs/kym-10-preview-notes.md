# KYM-10 page design preview

Open [the interactive HTML mock](./kym-10-page-preview.html) in a browser. Use the page selector above the gallery header, the site navigation, or the links within a page. Resize the browser to review the phone layout. This file is a design proposal, not a production route; its checkout and inquiry controls do not send anything.

The homepage continues the approved KYM-8 Image-led direction. The mock covers home, the artist list and two artist details, artwork list and detail, all 12 exhibition archive entries and one detailed exhibition example, gallery introduction, and contact/inquiry. The current logo is retained. The artist, artwork, and exhibition images are framed to show complete works without clipping. The About example visibly keeps Korean, English, and French.

The pilot pottery photo comes from `assets/pilot/suk-jeen-sung-cheonghwa-baekgeum-dot-moon-jar.jpeg`. The 이인숙 preview image is a local copy of the gallery's existing [Sanity asset](https://cdn.sanity.io/images/s617s8hp/production/4626f930961119fb2781bda3da8e51903a2226b6-1080x1350.jpg), staged under `docs/kym-10-assets/` solely for this offline mock. The exhibition example uses existing checked-in images from `public/jeong-hyun-ha-solo-exhibition/`. Replace preview images through the planned asset workflow before launch; the mock does not introduce a new Sanity dependency.

Content labeled “갤러리 확인 후 입력” and short sample introductions are placement examples. The full artist biographies, three About passages, all exhibition details, delivery terms, and artwork metadata still need the content and owner review described in KYM-3, KYM-11, KYM-12, and KYM-16. Only the 하정현 exhibition row opens the detailed exhibition example in this mock; all 12 rows will receive their own production detail pages.

After layout review, implement the approved templates in the App Router using repository content records from KYM-7, keeping the existing Pages Router routes in place during migration. The homepage image and text will be read from one featured-content record so it can be changed without editing the template.
