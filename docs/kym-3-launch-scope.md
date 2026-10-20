# KYM-3 — Launch catalog and publishing rules

Approved scope, 20 October 2026. This is the implementation brief. Jin Soo approves the Korean policy draft; its operational placeholders must be completed with the gallery owner before publication.

## Agreed scope

| Area | Rule |
| --- | --- |
| Launch language | Korean interface and commerce copy. Jin Soo reviews the Korean text. The existing About introduction intentionally remains in Korean, English, and French. A fully translated interface can be added later; do not imply that international checkout is available at launch. |
| Catalog slice | Two initial artist profiles, 성석진 (Suk Jeen Sung) and 이인숙 (In Sook Rhee), and one ceramic work establish the repeatable artist/artwork/product pattern. Migrate all 12 existing exhibitions. A full artwork catalog migration and small-goods cart are later work. |
| Pilot work | **성석진, 청화백금닷 달항아리**. Jin Soo selected this instead of **지리산 하동백토, 백유** on 20 October 2026 for the first payment/catalog test. Confirm the year, dimensions, materials, condition, current physical availability, and sale permission with the owner before a live listing. The ₩12,000,000 work remains a separate later candidate. |
| Image | Jin Soo supplied a 1630 × 2082 JPEG, staged at [`assets/pilot/suk-jeen-sung-cheonghwa-baekgeum-dot-moon-jar.jpeg`](../assets/pilot/suk-jeen-sung-cheonghwa-baekgeum-dot-moon-jar.jpeg). Use it for the pilot and upload through the chosen Vercel Blob workflow in KYM-6; retain its source and rights note. The photo includes a physical ₩2,000,000 price card, so obtain a clean photo or crop that card before a future price edit could make the image disagree with the listed price. More angles would improve the final listing. |
| Price and stock | **₩2,000,000** supplied by Jin Soo. Use **quantity 1** as the test assumption for this original work; confirm actual physical stock with the owner before live sale. This supersedes the earlier ₩12,000,000 pilot selection, the $1,000 development sample, and the $10,000 USD planning figure. Use Toss test mode for checkout tests; do not enable a real charge until owner and provider launch checks pass. Charge KRW, with no automatic FX quote shown as a guaranteed charge. |
| Checkout | The first owner-approved work is intended to show a live Buy action after provider and launch checks pass. `inquiry` means a public page with a `문의하기` action and no checkout, useful for other or unconfirmed works. `draft` is hidden; `sold` remains visible without checkout. |
| Price editing | A price change must be possible through one documented, simple edit workflow. KYM-7 names the authoritative price field/provider record, and KYM-5 verifies that displayed and charged totals stay equal after an edit. Never maintain two unrelated, manually entered live prices. |
| Delivery | Korea only for live checkout initially. Owner mails the work or arranges hand delivery within Seoul. Display shipping fee, delivery area, expected dispatch window, and any Seoul hand-delivery conditions before payment. Occasional overseas sales use direct inquiry and a separate shipping/payment quote until that flow is approved. |
| Operations | The gallery owner receives and fulfills orders and promptly marks an in-gallery sale as unavailable in the checkout system, then updates the site listing. Provider stock-one behavior and simultaneous purchase handling must be verified in KYM-5/KYM-17. |
| Returns and refunds | Jin Soo approves the wording in the separate [Korean draft](./kym-3-korean-delivery-returns-draft.md). Fill its operational placeholders with the owner before publication. A unique or expensive work is not automatically exempt from statutory withdrawal rights. |
| Existing routes | Keep old singular `/artist` and `/exhibition` pages running while new plural `/artists` and `/exhibitions` routes are built. Redirect only after the corresponding new page exists. |

## Checkout gate

The goal is **live checkout for this one work**, after all of these are true:

1. The owner confirms the work's year, dimensions, materials, condition, photos/rights, actual availability, and whether Korean delivery is included in the proposed ₩2,000,000 price or separately priced.
2. KYM-4 confirms a provider/account that accepts the chosen high-value KRW payment; KYM-5 validates checkout, price changes, stock-one/sold-out handling, and order notification. If LinkPay cannot safely gate one-of-one inventory, keep the listing at `inquiry` until another supported flow is ready.
3. Jin Soo supplied the gallery contact details: `info@atelierkyma.com`, `02-3785-0118` (`+82 2-3785-0118` internationally). Confirm that the email is monitored and the phone is answered for order/refund requests. Jin Soo and the owner fill the remaining Korean policy placeholders with delivery cost/timing and the practical packing/insurance/dispatch process (KYM-16) before publishing that copy.
4. KYM-17 verifies live configuration cannot charge a stale price or sell the item twice, including an in-gallery sale update.

Toss Payments' [foreign-payment guide](https://docs.tosspayments.com/guides/v2/learn/foreign-payment) describes KRW and USD as separate merchant configurations, with USD foreign-card payment requiring an additional contract. The pilot's Korean checkout price is ₩2,000,000. KYM-4 must confirm actual provider and LinkPay terms. The inquiry already sent to Toss concerned the separate ₩12,000,000 work and remains useful for its later sale.

## Open implementation details before launch

- Owner's year, dimensions, condition, and sale rights for the pictured work.
- Whether Korean shipping/Seoul hand delivery are included in ₩2,000,000; concrete delivery fees and time window.
- Confirmed monitoring of the supplied order/refund email and phone; return address, packing, and insured transport arrangement.
- Completed operational placeholders in the Korean policy and provider's merchant/inventory suitability.

KYM-3 scope is approved. KYM-4, KYM-5, KYM-7, KYM-16, and KYM-17 hold the actual implementation and launch checks.
