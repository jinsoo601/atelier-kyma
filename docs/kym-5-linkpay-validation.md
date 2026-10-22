# KYM-5 — LinkPay checkout and inventory validation

Started 22 October 2026. Pilot: 성석진, **청화백금닷 달항아리**, ₩2,000,000, one physical work. The gallery's Toss LinkPay application is still **심사중**. This is an observation and test log, not approval to enable Buy on the gallery website.

## Verified in the gallery's merchant account

- The LinkPay product exists at the [owner-supplied public URL](https://buy.tosspayments.com/products/GdBoWN-sqU). Its title, image, and displayed artwork price match the gallery catalog. The product editor offers an amount field, so a price can be changed there; a changed price and final charged amount have **not** been tested.
- The product editor has two selectable packaging choices: no additional package and an optional 오동나무 상자 for ₩15,000. Domestic delivery is listed separately at ₩10,000, with a maximum two-week delivery period. Jin Soo's earlier product screenshot shows the optional choice on the buyer page; the final checkout total for each choice has **not** been verified.
- The product preview lists card, account transfer, and virtual account. This is a list shown in the preview, **not** proof that each method is enabled for this merchant or that a ₩2m payment will succeed.
- The live product editor's **재고 설정 was off** when inspected. We enabled it, set product stock to **1**, saved, and reopened the editor to confirm the saved value. The form presents one product-level stock field alongside the two packaging choices. Whether Toss actually shares that single unit across both choices, and when it reserves or deducts it, remain untested.
- The merchant settings show an order notification contact and the product editor offers a buyer payment-message field. We have not observed a real or test order notification.
- Switching the merchant dashboard to **테스트 모드** opens the sandbox, but the LinkPay product page says **“제공되지 않는 화면이에요. 샌드박스 환경에서 이용할수 없는 메뉴에요. 라이브환경을 이용해주세요.”** We returned the dashboard to live view. No payment was initiated and no live charge was made.

## Test matrix

| Scenario | Current result | Required evidence before checkout launch |
| --- | --- | --- |
| Correct product, artwork price, shipping and packaging text | Title, artwork price, and delivery visible on public listing; packaging configured in editor and shown in Jin Soo's screenshot | Confirm both final checkout totals: ₩2,010,000 without wooden box, ₩2,025,000 with it, if no other fees apply. |
| Stock limited to one | Product-level stock setting saved as 1 | Confirm both packaging choices draw from the same single unit. |
| Price edit | Editable amount field visible | In a safe test environment, edit and restore price; compare site display, public product, order summary, and charged amount. |
| Card attempt, abandonment, simultaneous buyers | Not tested: LinkPay sandbox UI unavailable | Determine reservation/deduction timing, second-buyer behavior, and stock recovery after abandonment. |
| Virtual account issued but unpaid, expiry, cancellation | Not tested | Determine stock timing and recovery; ensure one physical work cannot be paid for twice. |
| Paid order, sold-out, cancellation/refund | Not tested | Confirm product state and stock after payment, full cancellation, and refund for each enabled method. |
| In-gallery sale | Product exposure toggle and stock editor are visible; disabling behavior not tested | Verify the exact dashboard action that stops an already shared link immediately; then update gallery catalog availability. |
| Owner fulfillment and notification | Delivery period and notification contact visible | Confirm order alert, buyer shipping details, and manual dispatch workflow. |
| Small good with quantity 20 | No small-good pilot in this test | Repeat stock and order tests once a real small good is added. |

The expected totals are arithmetic from the listed charges, **not observed payment totals**. A public **결제하기** button does not establish merchant approval or successful checkout.

## Next safe step

Ask Toss whether this LinkPay merchant can use a separate product/payment sandbox or test API while the dashboard says LinkPay is unavailable in test mode. Request an explicit way to test stock-one behavior across packaging choices, card attempts, and unpaid virtual accounts **without a live charge**. If Toss offers no safe test path, retain the site's inquiry action and do not enable Buy until merchant approval and the stock/checkout behavior can be validated. KYM-15 implements the site action after KYM-5 and owner/provider gates; KYM-17 covers broader launch verification.

Suggested Korean question for Toss support:

> 링크페이 상품 심사 중인 가맹점입니다. 상점관리자에서 테스트 모드를 켜면 링크페이 판매상품 메뉴가 “샌드박스 환경에서 이용할 수 없는 메뉴”로 표시됩니다. 실제 결제 없이 저희 상품의 재고 1개, 두 포장 옵션 간 공통 재고, 카드 결제 시도·이탈, 가상계좌 발급 후 미입금·만료, 취소·환불 시 재고 복구를 검증할 수 있는 테스트 방법이 있나요? 별도 테스트 링크 또는 링크페이 테스트 API를 사용할 수 있다면 설정 방법을 알려주세요. 테스트가 불가능하다면 각 상황에서 재고가 예약·차감·복구되는 정확한 시점을 확인 부탁드립니다.

Official reference: [LinkPay guide](https://docs.tosspayments.com/guides/v2/linkpay), [LinkPay API product and stock model](https://docs.tosspayments.com/reference/linkpay).
