import { ArrowRight, Flame, Hexagon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { getProduct, type Product } from "@/data/products";

export const metadata: Metadata = {
  title: "About & Technology",
  description: "Gen 3 thermoformed honeycomb vs MPP foam core: how Luzz paddles are built, and which one suits your game.",
};

function p(id: string): Product {
  const product = getProduct(id);
  if (!product) throw new Error(`Missing product ${id}`);
  return product;
}

const honeycomb = {
  title: "Gen 3 thermoformed honeycomb",
  icon: Hexagon,
  accent: "text-inferno",
  border: "border-inferno/40",
  paddles: [p("cannon"), p("candy-cannon"), p("glider-2026")],
  points: [
    "8mm PP honeycomb core for strength and elasticity.",
    "Cannon and Candy Cannon add an enlarged foam perimeter for reactivity and faster energy transfer.",
    "Thermoformed carbon faces (RAW carbon on the Cannons) for a crisp, stable feel.",
    "Directional spin texture on the Cannons for more ball bite; Glider 2026 uses 984-Aero™ grit for consistent friction.",
  ],
};

const foam = {
  title: "MPP foam core",
  icon: Flame,
  accent: "text-frozen",
  border: "border-frozen/40",
  paddles: [p("pro-4-inferno"), p("inferno-frozen"), p("probladz-2-long-yuan")],
  points: [
    "MPP (microporous polymer) foam: thousands of microporous cells instead of a honeycomb.",
    "Crush resistant. The Pro-4 Inferno core is rated 65–70 kg/m³, 1.2 MPa.",
    "Full-area filling for an expanded sweet spot across the face.",
    "Shock absorption: the Pro-4 Inferno's foam absorbs over 90% of impact.",
  ],
};

const guide = [
  {
    need: "I want maximum power and spin",
    picks: ["cannon", "candy-cannon"],
    why: "Gen 3 thermoformed honeycomb with an enlarged foam perimeter and directional spin texture.",
  },
  {
    need: "I'm newer to the game, or I play a soft, placement game",
    picks: ["glider-2026"],
    why: "Hybrid shape and a soft 8mm honeycomb core for easier dinks, drops and placement. Rated beginner to pro.",
  },
  {
    need: "I want speed with a big sweet spot and less arm shock",
    picks: ["pro-4-inferno"],
    why: "MPP foam with full-area filling and shock absorption.",
  },
  {
    need: "I love foam but want more control and less pop",
    picks: ["inferno-frozen"],
    why: "MPP-Z core tuned for longer dwell time and a more controlled, connected feel.",
  },
  {
    need: "I'm an advanced player after an all-court foam paddle",
    picks: ["probladz-2-long-yuan"],
    why: "14mm enhanced MPP foam with a T700 carbon face and customisable edge weighting.",
  },
];

export default function TechnologyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <PageHeader
        eyebrow="About & Technology"
        title="Built for Australian courts"
        intro={
          <p>
            Luzz Pickleball Australia is an independent Australian storefront for genuine Luzz paddles. We stock two
            constructions, and each plays very differently. Here&apos;s how they compare.
          </p>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {[honeycomb, foam].map((c) => (
          <section key={c.title} aria-labelledby={`h-${c.title}`} className={`card border-t-2 p-7 ${c.border}`}>
            <c.icon className={`mb-4 size-8 ${c.accent}`} aria-hidden="true" />
            <h2 id={`h-${c.title}`} className="display mb-5 text-2xl">
              {c.title}
            </h2>
            <ul className="mb-6 space-y-3 text-muted">
              {c.points.map((pt) => (
                <li key={pt} className="flex gap-3">
                  <span className={`mt-2 size-1.5 shrink-0 rounded-full bg-current ${c.accent}`} aria-hidden="true" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">Paddles</p>
            <ul className="flex flex-wrap gap-2">
              {c.paddles.map((pd) => (
                <li key={pd.id}>
                  <Link href={`/paddles/${pd.slug}`} className="btn btn-secondary px-3 py-1.5 text-xs">
                    {pd.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section aria-labelledby="which-title" className="mt-20">
        <h2 id="which-title" className="display mb-8 text-3xl sm:text-4xl">
          Which paddle is for me?
        </h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {guide.map((g) => (
            <li key={g.need} className="card flex flex-col gap-3 p-6">
              <h3 className="text-lg font-semibold">{g.need}</h3>
              <p className="text-sm text-muted">{g.why}</p>
              <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2">
                {g.picks.map((id) => {
                  const pd = p(id);
                  return (
                    <Link key={id} href={`/paddles/${pd.slug}`} className="link inline-flex items-center gap-1 text-sm font-semibold">
                      {pd.name} <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
