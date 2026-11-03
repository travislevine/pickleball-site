import "server-only";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

/** Null when STRIPE_SECRET_KEY is not set, so the site still runs without Stripe. */
export const stripe: Stripe | null = key ? new Stripe(key) : null;
