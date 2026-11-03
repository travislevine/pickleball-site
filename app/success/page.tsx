import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import type Stripe from "stripe";
import { ClearCart } from "@/components/ClearCart";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Order confirmed",
  robots: { index: false },
};

async function OrderDetails({ searchParams }: { searchParams: PageProps<"/success">["searchParams"] }) {
  const { session_id } = await searchParams;
  const sessionId = typeof session_id === "string" ? session_id : undefined;

  if (!sessionId || !stripe) {
    return (
      <p className="text-muted">
        We couldn&apos;t load your order details here, but if your payment went through you&apos;ll receive a
        confirmation email from Stripe shortly.
      </p>
    );
  }

  let session: Stripe.Checkout.Session | null = null;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["line_items"] });
  } catch {
    session = null;
  }

  if (!session) {
    return (
      <p className="text-muted">
        We couldn&apos;t find that order. If you were charged, please contact{" "}
        <a href={`mailto:${site.email}`} className="link">
          {site.email}
        </a>
        .
      </p>
    );
  }

  if (session.payment_status === "unpaid" && session.status !== "complete") {
    return <p className="text-muted">This order hasn&apos;t been paid yet.</p>;
  }

  const total = session.amount_total != null ? session.amount_total / 100 : null;
  return (
    <div className="card space-y-4 p-6 text-left">
      <ClearCart />
      <div className="flex flex-wrap justify-between gap-2 text-sm">
        <span className="text-muted">Order reference</span>
        <span className="font-mono font-semibold">{session.id.slice(-8).toUpperCase()}</span>
      </div>
      {session.customer_details?.email && (
        <div className="flex flex-wrap justify-between gap-2 text-sm">
          <span className="text-muted">Confirmation sent to</span>
          <span className="font-semibold">{session.customer_details.email}</span>
        </div>
      )}
      <ul className="divide-y divide-line border-y border-line">
        {session.line_items?.data.map((li) => (
          <li key={li.id} className="flex justify-between gap-4 py-3 text-sm">
            <span>
              {li.quantity} × {li.description}
            </span>
            <span className="tabular-nums">{formatPrice(li.amount_total / 100)}</span>
          </li>
        ))}
      </ul>
      {total !== null && (
        <div className="flex justify-between font-bold">
          <span>Total paid (incl. shipping, GST included)</span>
          <span className="tabular-nums">{formatPrice(total)}</span>
        </div>
      )}
    </div>
  );
}

export default function SuccessPage({ searchParams }: PageProps<"/success">) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
      <CheckCircle2 className="mx-auto mb-6 size-14 text-frozen" aria-hidden="true" />
      <h1 className="display mb-4 text-4xl sm:text-5xl">Thanks for your order</h1>
      <p className="mb-10 text-lg text-muted">Your paddle is on its way to being packed.</p>
      <Suspense fallback={<p className="text-muted">Loading your order…</p>}>
        <OrderDetails searchParams={searchParams} />
      </Suspense>
      <Link href="/#shop" className="btn btn-secondary mt-10">
        Back to the shop
      </Link>
    </div>
  );
}
