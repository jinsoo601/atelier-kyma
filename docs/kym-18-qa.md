# KYM-18: Mobile, accessibility, and performance QA

Checked on 23 October 2026 against the new App Router pages. The production build was used for interaction and image-loading checks; the development server was used for responsive layout checks.

For interactive checks on the development server, use `http://localhost:3000`. This Next.js setup blocks development resources from `127.0.0.1` unless that origin is explicitly allowed; an inert button at that origin was a local test-host mismatch, while the same button worked at `localhost` and in the production build.

## Pages and viewports

- Reviewed `/home`, `/artists`, `/artists/suk-jeen-sung`, `/artworks`, the pilot artwork detail, `/exhibitions`, `/exhibitions/jeong-hyun-ha-solo-exhibition`, `/gallery`, and `/inquiries`.
- At 320, 390, 768, and 1440 CSS pixels, the representative pages had no horizontal overflow. The mobile artwork and exhibition detail pages were also visually inspected.
- Each checked page had one descriptive `h1` and a page-specific browser title. All rendered `<img>` elements had alt attributes. The About page marks its English and French introductions with `lang="en"` and `lang="fr"`.
- The native mobile menu exposes its links when opened. The artist portfolio starts with six works; in the production build, More expands to all thirteen sample works and Enter on Collapse restores six.

## Fixes

- Added a keyboard-visible skip link before the shared header. Enter moves focus to the content wrapper, and the next Tab reaches the first link in the main content.
- Darkened the shared muted-text color from `#777670` to `#696862`. Contrast against the paper background improves from approximately 4.25:1 to 5.21:1; against the photo background it is approximately 4.73:1.
- Removed global smooth scrolling so skip links and route changes do not animate unexpectedly, including for visitors who request reduced motion.

## Image and build checks

- All eleven artist detail hero images and all twelve exhibition detail posters rendered in the production build. The pilot artwork also rendered. The exhibition's offscreen images use native lazy loading and responsive `sizes`; the poster and logo are preloaded.
- `npm run lint`, `npm run typecheck`, and `npm run build` passed. The build also prerendered all eleven new artist pages and twelve new exhibition pages.

## Remaining launch checks

- KYM-15 must finish the on-site inquiry form before submission, error, privacy-consent, and spam handling can be tested. The current form controls are intentionally disabled, with email and phone available.
- KYM-5 and KYM-17 cover live checkout, payment outcomes, and stock behavior after Toss provides a usable test path.
- Check real-device loading and a production-domain performance trace after the new site is launched. Local build and image-loading checks do not establish a real-user speed score. A mobile PageSpeed Insights request against the Vercel preview returned HTTP 429, so no Lighthouse score was recorded.
