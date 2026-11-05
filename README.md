# Pickleball Sales

Online store for **Pickleball Sales**, a Sunshine Coast business selling genuine Luzz pickleball paddles Australia-wide.

**Live site:** https://pickleball-site-pi.vercel.app

## Why it was built

Pickleball Sales sources paddles to order and needed a way to sell online: a storefront that presents the range well on phones and desktops, takes payment securely, and explains shipping and returns clearly. This was built as a client project to get the business selling and accepting payments.

## What it does

- **Shop:** six paddles with category filters, a spec comparison table and a page for each paddle, with a colour/edition picker that swaps photos and price.
- **Cart:** saved in the browser, with quantity controls and a free-shipping progress message.
- **Checkout:** Stripe Checkout in AUD with Australian shipping, card, Apple Pay, Google Pay, Link, Klarna and Zip.
- **Order handling:** a Stripe webhook confirms each paid order, and the thank-you page shows the order reference.
- **Store pages:** paddle technology guide, FAQ, shipping & returns, privacy policy and contact form.
- **Hero:** a product video that tilts in 3D toward the cursor (and floats gently on phones).

## How it was built

- **Next.js 16** (App Router) with **TypeScript**, **Tailwind CSS** and **Framer Motion**, hosted on **Vercel**.
- No database: the catalogue and prices live in one file (`data/products.ts`), and store settings (shipping fee, free-shipping threshold, lead times, contact details) in `lib/site.ts`.
- Prices are always looked up on the server at checkout, so a customer can't change what they pay from the browser.
- Static pages for speed, with structured product data and a sitemap for search engines.

## Payments with Stripe

I set up the business's Stripe account and connected it to the store to give Pickleball Sales a direct way to take payments and receive payouts:

- Stripe Checkout handles payment, shipping address and receipts, so no card details touch the site.
- Shipping is calculated by order value (free over $199), limited to Australia, with the sourcing lead time shown at checkout.
- Card, wallet and buy-now-pay-later methods are switched on from the Stripe dashboard with no code changes.
- The full purchase flow (checkout, webhook and order confirmation) has been tested end to end in Stripe's test mode. Switching to live payments is the final step.

## Running locally

```bash
npm install
cp .env.example .env.local   # add Stripe test keys (optional)
npm run dev
```

Without Stripe keys the store still runs; checkout shows a "not connected yet" message. Environment variables:

| Variable | Purpose |
| --- | --- |
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_…` or `sk_live_…`) |
| `STRIPE_WEBHOOK_SECRET` | Signing secret for `/api/webhooks/stripe` |
| `NEXT_PUBLIC_SITE_URL` | Public site address, used for metadata and the sitemap |

Keys are only ever set in `.env.local` (git-ignored) or the Vercel dashboard, never committed.
