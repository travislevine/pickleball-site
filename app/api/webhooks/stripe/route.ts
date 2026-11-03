import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return Response.json({ error: "webhooks_not_configured" }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  const payload = await req.text(); // raw body, needed for signature verification

  let event: Stripe.Event;
  try {
    if (!signature) throw new Error("Missing stripe-signature header");
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (err) {
    console.error("Stripe webhook signature check failed:", err instanceof Error ? err.message : err);
    return Response.json({ error: "invalid_signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    try {
      const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
        expand: ["line_items", "shipping_cost.shipping_rate"],
      });
      const shippingRate = session.shipping_cost?.shipping_rate;
      console.log("New order", {
        id: session.id,
        email: session.customer_details?.email,
        name: session.collected_information?.shipping_details?.name,
        address: session.collected_information?.shipping_details?.address,
        shipping: typeof shippingRate === "object" && shippingRate ? shippingRate.display_name : shippingRate,
        items: session.line_items?.data.map((li) => `${li.quantity} × ${li.description}`),
        total: session.amount_total != null ? (session.amount_total / 100).toFixed(2) : null,
        currency: session.currency,
      });
      // TODO owner: fulfilment, e.g. send an order email to yourself and the customer
      // (Resend, Postmark) or create the order in your shipping tool.
    } catch (err) {
      console.error("Failed to load completed checkout session:", err);
    }
  }

  return Response.json({ received: true });
}
