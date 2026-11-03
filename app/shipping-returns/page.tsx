import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Australia-wide shipping via Australia Post, free standard shipping on orders $150+, and our returns policy.",
};

const todo = (text: string) => <span className="todo">[TODO: {text}]</span>;

export default function ShippingReturnsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <PageHeader eyebrow="Policies" title="Shipping & Returns" />

      <p className="mb-10 rounded-xl border border-inferno/40 bg-inferno/10 p-4 text-sm">
        <strong>Draft policy.</strong> The store owner must review this page, fill in every [TODO] and check it against
        their obligations before launch.
      </p>

      <div className="prose-store">
        <h2>Shipping</h2>
        <ul>
          <li>We ship within Australia only.</li>
          <li>
            <strong>Standard shipping (Australia Post):</strong> free on orders of{" "}
            {formatPrice(site.freeShippingThreshold)} or more, which covers every paddle we sell. Below that,{" "}
            {formatPrice(site.standardShippingFee)}. Estimated delivery {todo("e.g. 3–8 business days")}.
          </li>
          <li>
            <strong>Express shipping (Australia Post):</strong> flat {formatPrice(site.expressShippingFee)}. Estimated
            delivery {todo("e.g. 1–3 business days")}.
          </li>
          <li>Orders are dispatched from {todo("city")}.</li>
          <li>You&apos;ll choose your shipping option at checkout.</li>
        </ul>

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
          We accept change-of-mind returns {todo("e.g. within 30 days of delivery, unused, in original packaging")}.{" "}
          {todo("who pays return postage")}
        </p>
        <h3>How to start a return</h3>
        <p>
          Email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a> with your order reference and the reason for the return.{" "}
          {todo("return address and process")}
        </p>
      </div>
    </div>
  );
}
