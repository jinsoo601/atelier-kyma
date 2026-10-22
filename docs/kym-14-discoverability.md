# KYM-14 — Search and sharing preparation

The new App Router pages under `/home`, `/artists`, `/artworks`, `/exhibitions`, `/gallery`, and `/inquiries` have their own titles, descriptions, canonical URLs, and Open Graph/Twitter previews. The preview photos come from existing page content, so changing a featured artist, artwork, or exhibition also changes its associated preview. `/sitemap.xml` lists the public new routes, including all 11 artist profiles, the current saleable artwork, and all 12 migrated exhibitions. `/robots.txt` points crawlers to that sitemap. The inquiry page has one canonical URL even when an artwork query parameter is present.

## Existing URL inventory

The complete legacy-to-new inventory remains in [`kym-2-url-map.csv`](./kym-2-url-map.csv). Its 11 published artist detail slugs and 12 exhibition detail slugs all have matching new pages with the **same slug**. The two legacy indexes map as follows:

| Existing route | Prepared destination |
| --- | --- |
| `/artist` | `/artists` |
| `/artist/[slug]` | `/artists/[slug]` for each of the 11 published artists |
| `/exhibition` | `/exhibitions` |
| `/exhibition/[slug]` | `/exhibitions/[slug]` for each of the 12 published exhibitions |

There are no known slug exceptions in this inventory. The proposed `/artists/kimi-kim` record has no published legacy artist URL and has not been created; it is excluded from the sitemap. The existing `/`, `/about`, and `/contact` routes remain separate from this artist/exhibition redirect plan. These older pages and all singular artist/exhibition routes remain live during the build.

## Image descriptions

The catalog artwork and its featured artist image describe the visible blue glaze and platinum dots. The eight 이인숙 portfolio images now have individual descriptions based on the preserved source photographs. Migrated artist images with no published title use artist and work category as a fallback; exhibition archive images with no original caption use their exhibition title and sequence number. Editors should replace these fallbacks with verified work titles or visual descriptions when those facts are available.

## Launch handoff

KYM-23 owns activation and production verification of redirects. Before enabling them, compare the live destinations with the CSV, confirm each detail page exists, then check the HTTP redirect status and final destination for both indexes and every important detail URL. Record any newly discovered slug exceptions and the rollback procedure in the launch checklist. KYM-14 adds **no active redirect**.
