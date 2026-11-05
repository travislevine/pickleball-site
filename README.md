# Pickleball Sales

Storefront for genuine Luzz pickleball paddles in Australia. Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion and Stripe Checkout. No database: products and prices live in `data/products.ts`.

## Local setup

```bash
npm install
cp .env.example .env.local   # then fill in your Stripe keys
npm run dev
```

Open http://localhost:3000. To try it on your phone, run `npm run dev -- -H 0.0.0.0` and open `http://<your-computer's-local-IP>:3000` on a phone on the same Wi-Fi.

The hero video (`public/videos/racket-hovering.mp4`) is not in git (`*.mp4` is ignored). Copy it into `public/videos/` on each machine, or remove `*.mp4` from `.gitignore` to commit it. Without it the hero shows the poster image.

The site runs without Stripe keys: checkout buttons show a "Checkout isn't connected yet" message instead.

## Stripe setup

1. Create a Stripe account with Australia as the country and AUD as the currency.
2. In the dashboard, go to **Developers → API keys** and copy the test secret key (`sk_test_...`) into `STRIPE_SECRET_KEY` in `.env.local`.
3. Test with card `4242 4242 4242 4242`, any future expiry date and any CVC.
4. Optional: switch on Apple Pay, Google Pay, Link, Klarna or Zip under **Settings → Payment methods**. Checkout shows whatever is enabled there.

The business is not registered for GST, so no tax is added and Stripe Tax is not used. Promotion codes created in the dashboard can be entered at checkout.

### Webhooks locally

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the `whsec_...` secret it prints into `STRIPE_WEBHOOK_SECRET`. Completed orders are logged to the server console (see the TODO in `app/api/webhooks/stripe/route.ts` for fulfilment emails).

## Deploy to Vercel

1. Import the GitHub repo in Vercel.
2. Add the environment variables `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` and `NEXT_PUBLIC_SITE_URL` (your live URL, e.g. `https://example.com.au`).
3. In Stripe, add a webhook endpoint at `https://<your-domain>/api/webhooks/stripe` for the `checkout.session.completed` event, and use its signing secret as `STRIPE_WEBHOOK_SECRET`.
4. When ready to take real orders, swap in your live keys (`sk_live_...`) and the live webhook secret.

## Editing the store

- **Products and prices:** `data/products.ts`. Prices are in AUD. Set `compareAtPrice` to show a "was" price and Sale badge.
- **Images:** `public/images/products/<product>/<variant>-NN.jpg` (square JPGs), referenced from `data/products.ts`.
- **Store settings:** `lib/site.ts` holds the business name, email, ABN, shipping fee, free-shipping threshold, sourcing and delivery times, returns window and footer disclaimer. The policy pages read from it.
- **Policies:** `app/shipping-returns/page.tsx`, `app/privacy/page.tsx` and `app/faq/page.tsx`.

## Scripts

- `npm run dev`: start the development server
- `npm run build`: production build
- `npm run lint`: lint
