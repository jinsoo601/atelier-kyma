# KYM-22 — Remaining artist migration

The nine published legacy artist profiles below now use repository content and Vercel Blob on `/artists/[slug]`. The old `/artist/[slug]` pages still exist while the new site is built.

| Artist | Slug | Portfolio images |
| --- | --- | ---: |
| 안성민 | `ahn-seongmin` | 18 |
| 강애자 | `ehja-kang` | 12 |
| 홍성철 | `hong-sungchul` | 9 |
| 하정현 | `jeong-hyun-ha` | 14 |
| 곽지유 | `jiyu-kwak` | 8 |
| 로렝 도친 | `laurent-dorchin` | 3 |
| 이무규 | `mu-gyu-lee` | 8 |
| 김용훈 | `yong-hoon-kim` | 16 |
| 지누박 | `zinoo-park` | 17 |

The source was the public Sanity `production` dataset used by the legacy site. Text, image order, and available image captions were copied into [`content/archive.json`](../content/archive.json). The nine artist records and stable catalog IDs are in [`content/gallery.ts`](../content/gallery.ts) and [`content/catalog.ts`](../content/catalog.ts). Portfolio photos remain editorial images; they are not sale listings and have no prices.

The 81 newly uploaded Blob files, source URLs, dimensions, file sizes, and local SHA-256 hashes are recorded in [`kym-22-asset-manifest.json`](./kym-22-asset-manifest.json). Images for 안성민 and 홍성철 that were already migrated for exhibitions reuse their Blob URLs from [`kym-12-asset-manifest.json`](./kym-12-asset-manifest.json). Some source images are small originals in Sanity, so those photos may appear softer than newer uploads.

The old 하정현 biography included an email address, mobile number, and studio address. Those personal contact details are omitted from the new archive pending gallery review. The rest of her published biography remains. The unpublished Kimi Kim artist draft was outside this migration.

To edit the artist biographies or photo order later, follow [the gallery content editor skill](../.agents/skills/atelier-kyma-content-editor/SKILL.md). New image uploads should go to Vercel Blob and use their exact public URLs in the archive; image binaries should not be committed to the repository.
