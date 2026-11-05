import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { formatPrice } from "@/lib/format";
import { freeShippingFrom } from "@/lib/shipping";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: `Australia-wide shipping via Australia Post, free standard shipping on orders ${freeShippingFrom}, and our returns policy.`,
};

export default function ShippingReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <PageHeader eyebrow="Policies" title="Shipping & Returns" />

      <div className="prose-store">
        <h2>Shipping</h2>
        <ul>
          <li>We ship within Australia only.</li>
          <li>
            <strong>Standard shipping (Australia Post):</strong> free on orders of{" "}
            {formatPrice(site.freeShippingThreshold)} or more, otherwise {formatPrice(site.standardShippingFee)}.
          </li>
        </ul>

        <h3>Processing and dispatch</h3>
        <p>
          All paddles are sourced to order directly from Luzz. Please allow up to {site.sourcingDays} business days for
          your order to be prepared and dispatched. Orders are processed Monday to Friday, excluding public holidays,
          and dispatched from {site.location}.
        </p>

        <h3>Delivery</h3>
        <p>
          Once dispatched, Australia Post standard delivery takes up to {site.deliveryDays} business days. In total,
          please allow up to {site.sourcingDays + site.deliveryDays} business days from order to delivery.
        </p>

        <h2>Returns</h2>
        <h3>Your rights under the Australian Consumer Law</h3>
        <p>
          Our goods come with guarantees that cannot be excluded under the Australian Consumer Law. If there is a{" "}
          <strong>major failure</strong>, you can choose a refund or a replacement. If the failure is{" "}
          <strong>not major</strong>, we may choose to repair, replace or refund. Nothing in this policy limits those
          rights.
        </p>

        <h3>Change of mind</h3>
        <p>
          We accept change-of-mind returns within {site.returnsDays} days of delivery, provided the paddle is unused and
          in its original packaging. Return postage is at your cost. Once we have received and checked the paddle, we
          will refund the item price to your original payment method.
        </p>

        <h3>Faulty or damaged paddles</h3>
        <p>
          If your paddle is faulty, contact us first. Your rights under the Australian Consumer Law apply, and we will
          cover the reasonable cost of returning a faulty item. Manufacturer warranty claims are processed through Luzz
          in California, and we will help you arrange this.
        </p>

        <h3>How to start a return</h3>
        <p>
          Email <a href={`mailto:${site.email}`}>{site.email}</a> with your order reference and the reason for the
          return. We will reply with the return address and next steps. Please don&apos;t send items back without
          contacting us first.
        </p>
      </div>
    </div>
  );
}
