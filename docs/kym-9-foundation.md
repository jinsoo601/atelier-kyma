# KYM-9: Next.js foundation and preview

## Route transition

- New App Router pages live at `/artists`, `/artists/[slug]`, `/exhibitions`, and `/exhibitions/[slug]`.
- Existing Pages Router URLs, including `/`, `/artist`, `/artist/[slug]`, `/exhibition`, `/exhibition/[slug]`, `/about`, and `/contact`, continue to run. Do not add an App Router page at one of those exact URLs until its Pages Router page is removed in the same change.
- Do not redirect a singular URL until its plural destination contains the equivalent public content. The new exhibition pages currently render Sanity's shared description; three old exhibition pages also contain custom hardcoded content, which belongs to the exhibition migration task.
- The new artist index intentionally shows only 성석진 and 이인숙 for the initial design scope. The new exhibition index queries all exhibitions with a slug.

## Build and preview

- Root app: Next.js 16.4.2, React 19.3.1, Node.js 24.x. The separate `atelier-kyma-sanity` Studio remains outside the root app build.
- `npm ci`, `npm run typecheck`, `npm run lint`, and `npm run build` validate the root app. The build uses Next's supported Webpack mode because the local environment prevents Turbopack from binding its worker port.
- The build fetches the public Sanity dataset. It needs network access. Existing records without a usable slug or image are excluded from the old listing pages so they do not break the build.
- Push this branch to trigger a Vercel preview. Check the old and new routes before merging. Keep `main` and the live domain untouched until the new site is ready; the existing Vercel production deployment remains the rollback point.

## Follow-on work

- The pilot artwork, checkout and inquiry flow, final home page, and replacement `/about` and `/contact` pages are separate tasks.
- Update the new navigation as those pages are added, then remove the corresponding old Pages Router files only at cutover.
