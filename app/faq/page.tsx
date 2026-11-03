import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { PageHeader } from "@/components/PageHeader";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about choosing a Luzz paddle, certification, AUD pricing, shipping, payment and returns.",
};

const todo = (text: string) => <span className="todo">[TODO: {text}]</span>;

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
            {p.specs.certification ? `${p.specs.certification} certified.` : todo("certification not listed, confirm")}
          </li>
        ))}
      </ul>
    ),
  },
  {
    q: "Are prices in AUD, and do they include GST?",
    a: <p>Yes. All prices are in Australian dollars and include GST. There is nothing extra to pay at checkout apart from shipping, if any.</p>,
  },
  {
    q: "How much is shipping and how long does it take?",
    a: (
      <p>
        Standard shipping via Australia Post is free on orders of {formatPrice(site.freeShippingThreshold)} or more, which
        covers every paddle we sell. Express shipping is a flat {formatPrice(site.expressShippingFee)}. Orders are
        dispatched within {todo("dispatch time, e.g. 1–2 business days")}. See{" "}
        <Link href="/shipping-returns">Shipping &amp; Returns</Link> for details.
      </p>
    ),
  },
  {
    q: "What payment methods do you accept?",
    a: (
      <p>
        Checkout is handled securely by Stripe. You can pay by card, plus Apple Pay or Google Pay on supported devices.{" "}
        {todo("list any extra methods enabled in Stripe, e.g. Afterpay or Zip")}
      </p>
    ),
  },
  {
    q: "What is your returns policy?",
    a: (
      <p>
        Your rights under the Australian Consumer Law always apply. Change-of-mind returns are accepted{" "}
        {todo("e.g. within 30 days, unused, in original packaging")}. Full details are on our{" "}
        <Link href="/shipping-returns">Shipping &amp; Returns</Link> page. Warranty claims are handled{" "}
        {todo("confirm how warranty claims are handled")}.
      </p>
    ),
  },
  {
    q: "Are these genuine Luzz paddles?",
    a: (
      <p>
        Yes. We only sell genuine Luzz Pickleball products. {site.disclaimer}
      </p>
    ),
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
