import type Stripe from "stripe";
import { isValidQuantity, MAX_LINES, resolveLine, type CartItem, type ResolvedLine } from "@/lib/cart";
import { standardShippingFee } from "@/lib/shipping";
import { site } from "@/lib/site";
import { stripe } from "@/lib/stripe";

const cents = (aud: number) => Math.round(aud * 100);

function bad(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

function baseUrl(req: Request): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  // Fallback for Vercel preview deployments.
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  return host ? `${proto}://${host}` : new URL(req.url).origin;
}

export async function POST(req: Request) {
  if (!stripe) {
    return Response.json({ error: "checkout_not_configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return bad("Request body must be JSON.");
  }

  const rawItems = (body as { items?: unknown })?.items;
  if (!Array.isArray(rawItems) || rawItems.length < 1 || rawItems.length > MAX_LINES) {
    return bad(`Send between 1 and ${MAX_LINES} cart lines.`);
  }

  const lines: ResolvedLine[] = [];
  for (const raw of rawItems as unknown[]) {
    const { productId, variantId, quantity } = (raw ?? {}) as Record<string, unknown>;
    if (typeof productId !== "string") return bad("Each line needs a productId.");
    if (variantId !== undefined && variantId !== null && typeof variantId !== "string") {
      return bad("variantId must be a string.");
    }
    if (!isValidQuantity(quantity)) return bad("Quantity must be a whole number from 1 to 10.");
    const item: CartItem = { productId, variantId: variantId ?? undefined, quantity };
    // Prices, names and images come from the server-side catalog only.
    const line = resolveLine(item);
    if (!line) return bad(`Unknown product or option: ${productId}${variantId ? ` / ${variantId}` : ""}.`);
    lines.push(line);
  }

  const base = baseUrl(req);
  // Stripe can only show images it can download, so skip them on localhost.
  const publicImages = base.startsWith("https://");
  const subtotal = lines.reduce((n, l) => n + l.unitPrice * l.quantity, 0);

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = lines.map((l) => ({
    quantity: l.quantity,
    price_data: {
      currency: "aud",
      unit_amount: cents(l.unitPrice),
      tax_behavior: "inclusive",
      product_data: {
        name: l.title,
        ...(publicImages ? { images: [`${base}${l.image}`] } : {}),
        metadata: { productId: l.product.id, variantId: l.variant?.id ?? "" },
      },
    },
  }));

  // Compact cart summary (Stripe metadata values max 500 chars).
  const summary = JSON.stringify(lines.map((l) => [l.product.id, l.variant?.id ?? "", l.quantity])).slice(0, 500);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      shipping_address_collection: { allowed_countries: ["AU"] },
      phone_number_collection: { enabled: true },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "Standard Shipping (Australia Post)",
            fixed_amount: { amount: cents(standardShippingFee(subtotal)), currency: "aud" },
            tax_behavior: "inclusive",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 8 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: "Express Shipping (Australia Post)",
            fixed_amount: { amount: cents(site.expressShippingFee), currency: "aud" },
            tax_behavior: "inclusive",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 1 },
              maximum: { unit: "business_day", value: 3 },
            },
          },
        },
      ],
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      success_url: `${base}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/cancel`,
      metadata: { cart: summary },
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    return Response.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return Response.json({ error: "We couldn't start checkout. Please try again." }, { status: 502 });
  }
}
