import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { PageHeader } from "@/components/PageHeader";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about choosing a Luzz paddle, certification, shipping times, payment and returns.",
};

const items = [
  {
    q: "Which paddle should I choose?",
    a: (
      <p>
        It depends on whether you want power, control or a blend. Our <Link href="/technology">Which paddle is for me?</Link>{" "}
        guide matches each paddle to a playing style, and the comparison table on the <Link href="/#shop">shop page</Link>{" "}
        lists the specs side by side.
      </p>
    ),
  },
  {
    q: "What's the difference between honeycomb and MPP foam?",
    a: (
      <>
        <p>
          <strong>Gen 3 thermoformed honeycomb</strong> (Cannon, Candy Cannon, Glider 2026) uses an 8mm PP honeycomb core
          with thermoformed carbon faces for a crisp feel, power and spin.
        </p>
        <p>
          <strong>MPP foam</strong> (Pro-4 Inferno, Inferno-Frozen, ProBladz 2 Long Yuan) uses a microporous polymer foam
          core that resists crushing, spreads the sweet spot across the face and absorbs shock.{" "}
          <Link href="/technology">Read more</Link>.
        </p>
      </>
    ),
  },
  {
    q: "Are these paddles tournament approved?",
    a: (
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <strong>{p.name}:</strong>{" "}
            {p.specs.certification ? `${p.specs.certification} certified.` : "Certification not listed by Luzz."}
          </li>
        ))}
      </ul>
    ),
  },
  {
    q: "How much is shipping and how long does it take?",
    a: (
      <>
        <p>
          Standard shipping via Australia Post is free on orders of {formatPrice(site.freeShippingThreshold)} or more,
          otherwise {formatPrice(site.standardShippingFee)}.
        </p>
        <p>
          All paddles are sourced to order directly from Luzz, so please allow up to {site.sourcingDays} business days
          for your order to be dispatched (Monday to Friday, from {site.location}). Delivery then takes up to{" "}
          {site.deliveryDays} business days. See <Link href="/shipping-returns">Shipping &amp; Returns</Link> for details.
        </p>
      </>
    ),
  },
  {
    q: "What payment methods do you accept?",
    a: (
      <p>
        Checkout is handled securely by Stripe. You can pay by Visa, Mastercard or American Express, Apple Pay, Google
        Pay or Link, or spread the cost with Klarna or Zip. Options shown at checkout can depend on your device and
        order total. All prices are in Australian dollars.
      </p>
    ),
  },
  {
    q: "What is your returns policy?",
    a: (
      <p>
        Your rights under the Australian Consumer Law always apply. We accept change-of-mind returns within{" "}
        {site.returnsDays} days of delivery if the paddle is unused and in its original packaging, with return postage
        at your cost. For a faulty paddle, contact us first. Manufacturer warranty claims are processed through Luzz in
        California, and we will help you arrange this. Full details are on our{" "}
        <Link href="/shipping-returns">Shipping &amp; Returns</Link> page.
      </p>
    ),
  },
  {
    q: "Are these genuine Luzz paddles?",
    a: <p>Yes. We only sell genuine Luzz Pickleball products. {site.disclaimer}</p>,
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <PageHeader eyebrow="Help" title="FAQ" />
      <Accordion items={items} />
      <p className="mt-10 text-muted">
        Still have a question?{" "}
        <Link href="/contact" className="link">
          Get in touch
        </Link>
        .
      </p>
    </div>
  );
}
