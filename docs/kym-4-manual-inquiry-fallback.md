# KYM-4 — Manual purchase inquiry fallback

Design proposal, 20 October 2026. Use for a one-of-one work when hosted checkout is not approved, the buyer's payment method cannot handle the amount, international delivery needs a quote, or the gallery chooses to discuss fulfillment first. The first checkout pilot is now **성석진, 청화백금닷 달항아리**, **₩2,000,000**, quantity 1. The earlier **지리산 하동백토, 백유**, **₩12,000,000**, quantity 1 remains a separate example where manual inquiry may be especially useful. The public [Toss payment FAQ](https://docs.tosspayments.com/resources/faq) describes **₩10,000,000 per day for real-time account transfer**, not a general LinkPay price ceiling. The actual gallery contract and payment methods still need confirmation.

## Buyer experience

1. The artwork page shows its verified title, artist, photos, current KRW asking price, and a prominent **구매 문의** action. A short note says **구매 가능 여부와 배송 방법은 갤러리 확인 후 안내드립니다.** It must not imply that sending an inquiry reserves the work.
2. The action opens an **on-site Korean inquiry form** for this artwork. Show its title, artist, and displayed price above the form. Ask for name, one reply method (email or phone), country/city or delivery region, and a short message. Do not ask for a full shipping address, card number, bank details, or an account. The submission carries the stable artwork ID and page URL; the gallery checks the current catalog price rather than trusting a client-submitted price.
3. On successful submission, show **문의가 접수되었습니다. 갤러리에서 확인 후 연락드리겠습니다. 문의만으로 작품이 예약되지는 않습니다.** A failed submission must say it was **not** received and offer the gallery's supplied contact details as a fallback: `info@atelierkyma.com`, `02-3785-0118` (`+82 2-3785-0118` internationally). Confirm that the inbox is monitored and the phone is answered before launch.
4. If the piece also has approved live checkout, keep **구매 문의** as a secondary action for buyers who need delivery help or another payment arrangement. The page must clearly distinguish **바로 구매** from **구매 문의**.
5. When sold, replace both purchase actions with **판매 완료**. A general gallery contact link may remain, but must not promise that this specific piece can still be bought.

## Submission delivery recommendation

Use a form embedded in the Next.js artwork page, with **Formspree as the provisional submission endpoint**. It can send the gallery an email and retain a dashboard copy without adding a database, mail-sending code, or server secret. The public form ID is configuration, not a secret. The buyer stays on the gallery page for form entry and sees Korean success/error text. Configure the recipient as the gallery's confirmed sales inbox, restrict submissions to the site domain, and enable the provider's spam controls. The gallery owner should check the dashboard as a backstop, especially if an expected inquiry email is missing. [Formspree's plans](https://formspree.io/plans) include 50 submissions/month and a 30-day archive on Free; Personal supports 200/month, with $15 monthly billing or $120 annually at the time of this research. [Over-limit submissions](https://help.formspree.io/articles/form-and-project-settings/over-limit-submissions) are held without owner notification emails, so do not rely on an unmonitored Free plan for a live high-value inquiry channel. No account or paid plan has been created.

This does add a third-party service: [Formspree says it hosts in the US](https://formspree.io/security/), and buyer contact details would pass through it. Before launch, add a Korean privacy notice and form consent that accurately names the service, data collected, purpose, retention, and cross-border processing after the owner has reviewed it. If the existing gallery mail provider offers a suitable secure form endpoint, it can replace Formspree later without changing the buyer-facing form or catalog model. Do not put buyer details in Git, analytics events, or public URLs.

Form submission is only a lead. It never reserves stock, collects payment, creates an order, or sends an automatic promise of availability. If delivery or the provider fails, the visible email address and phone remain usable.

## Gallery workflow

| Step | Owner action | Public stock/price implication |
| --- | --- | --- |
| New inquiry | Confirm the artwork is physically available, undamaged, and listed at the current price. Reply with delivery method/cost and the [approved policy](./kym-3-korean-delivery-returns-draft.md). | Inquiry is not a reservation or an order. |
| Quote | Send a written total, delivery/insurance charge, and proposed payment method through the verified gallery inbox. State that availability is subject to confirmation until the work is reserved; do not yet send a payable invoice or bank details. | The quote is not a reservation or a payment request. |
| Reserve and request payment | Once the buyer accepts, recheck physical stock, disable any live checkout link, mark the work **reserved** in a private order log, and confirm a payment deadline in writing. Then send a valid private invoice/payment link for this value or agree transfer to the gallery's verified business account. Do not publish bank details on the site, issue two active payment requests for the same work, or split a single purchase merely to evade a provider limit. | Site can show **예약 중** after the catalog update. If that update is delayed, the page should avoid an unverified “available now” promise. |
| Paid | Owner verifies cleared funds or a confirmed provider payment, sends order confirmation/receipt as applicable, and marks the work **sold** in the private log. Jin Soo or the owner updates the website. | Remove Buy/inquiry-for-this-work action; show **판매 완료**. |
| Unpaid/expired | Owner releases the reservation only after confirming the agreed deadline passed and no payment arrived; notify the buyer if appropriate. | The work may return to inquiry availability. |
| Fulfilled/refunded | Record shipment/hand-delivery and any cancellation/refund against the same inquiry/order ID. | Follow the approved delivery and returns terms. |

The private log needs only: artwork ID, buyer contact, inquiry received date, quoted total/currency, reservation deadline, payment status, and fulfillment status. Keep buyer contact and payment details out of the public catalog and Git repository. For one pilot work, the owner can use inbox folders/labels and a private note; a dedicated order database is unnecessary until volume warrants it.

## Catalog model for KYM-7, KYM-13, and KYM-15

- Keep **availability** (`available`, `reserved`, `sold`) separate from **purchase method** (`checkout`, `inquiry`). This avoids using `inquiry` as a misleading stock state.
- Each artwork has a stable ID, displayed KRW price, and verified gallery contact. `checkout` also has a provider product key and must pass merchant/stock checks. Any item can expose a secondary inquiry action while it is available.
- Do **not** hard-code a ₩10,000,000 threshold. Select checkout per work after provider approval, payment-method limits, stock behavior, and owner preference are known. A failed or unavailable checkout should offer the inquiry path without changing the advertised total.
- For the current ₩2,000,000 pilot, keep purchase method `inquiry` until LinkPay is approved and the KYM-5 tests pass; then switch to `checkout` without changing the displayed price or quantity 1. Keep the separate ₩12,000,000 work inquiry-only unless its high-value merchant and stock checks pass later.

## Korean page copy draft

**Button:** 구매 문의

**Explanation:** 이 작품은 갤러리 확인 후 구매하실 수 있습니다. 문의를 보내주시면 작품의 판매 가능 여부와 배송·결제 방법을 안내드리겠습니다. 문의만으로 작품이 예약되지는 않습니다.

**Form fields:** 성함, 이메일 또는 전화번호, 배송 지역(국가/도시), 문의 내용, 개인정보 수집·이용 및 처리 안내 확인. Include the artwork ID and URL in the gallery's notification, not as editable buyer fields.

**Success:** 문의가 접수되었습니다. 갤러리에서 작품의 판매 가능 여부를 확인한 뒤 연락드리겠습니다. 문의만으로 작품이 예약되지는 않습니다.

**Error:** 문의가 전송되지 않았습니다. 잠시 후 다시 시도하시거나 갤러리 이메일 또는 전화로 연락해 주세요.

## Follow-up work

- KYM-4: confirm LinkPay merchant eligibility and account-specific high-value limits. This manual path is the fallback if it does not fit.
- KYM-7: model availability and purchase method separately; document the price and contact fields.
- KYM-13: render the pilot artwork and its editable price, quantity, availability, and purchase mode.
- KYM-15: build the Korean on-site inquiry form, connect and test the submission endpoint after inbox and privacy setup, and keep visible email and phone as failure fallbacks. If checkout is approved, expose both actions clearly.
- KYM-16: document the owner's private reservation, written quote, payment confirmation, receipt, delivery, and refund procedure.
- KYM-17: verify form success/failure, owner receipt, correct artwork ID/URL, spam and quota behavior, and that reserved/sold work cannot start live checkout or promise an available one-of-one work.
