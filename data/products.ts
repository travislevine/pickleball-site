// Product catalog for the storefront.
//
// Descriptions and specs are taken from the official Luzz store
// (luzzpickleball.com, Shopify catalog). Images live in public/images/products/.
//
// Prices are in AUD. Edit `price` / `compareAtPrice` freely.
// The checkout API must look prices up here by product + variant id and never
// trust a price sent from the browser.

export type CoreType = "mpp-foam" | "thermoformed-honeycomb";

export type ProductCategory = "foam-core" | "power" | "hybrid-control";

export interface ProductSpecs {
  core: string;
  thickness: string;
  shape: string;
  face?: string;
  length?: string;
  width?: string;
  weight?: string;
  gripLength?: string;
  gripCircumference?: string;
  swingWeight?: string;
  twistWeight?: string;
  certification?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  /** Overrides the product price when set (AUD). */
  price?: number;
  compareAtPrice?: number;
  images: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  coreType: CoreType;
  skillLevel: string;
  /** AUD. */
  price: number;
  /** Optional "was" price, shown struck through. AUD. */
  compareAtPrice?: number;
  /** Label for the variant picker, e.g. "Edition" or "Colourway". Only used when variants exist. */
  variantLabel?: string;
  variants?: ProductVariant[];
  /** Used when the product has no variants. */
  images: string[];
  description: string;
  features: { title: string; body: string }[];
  specs: ProductSpecs;
  sourceUrl: string;
}

const img = (dir: string, prefix: string, count: number) =>
  Array.from(
    { length: count },
    (_, i) => `/images/products/${dir}/${prefix}-${String(i + 1).padStart(2, "0")}.jpg`,
  );

export const CATEGORIES: { id: ProductCategory | "all"; label: string }[] = [
  { id: "all", label: "All Paddles" },
  { id: "foam-core", label: "MPP Foam Core" },
  { id: "power", label: "Gen 3 Power" },
  { id: "hybrid-control", label: "Hybrid Control" },
];

export const products: Product[] = [
  {
    id: "probladz-2-long-yuan",
    slug: "probladz-2-long-yuan",
    name: "Luzz ProBladz 2 Long Yuan",
    tagline: "14mm all-court balance with a foam core that feels like Gen 3.",
    category: "foam-core",
    coreType: "mpp-foam",
    skillLevel: "Advanced / Pro",
    price: 275,
    images: img("probladz-2-long-yuan", "main", 8),
    description:
      "Built for advanced and professional players who want better results in training and competition. ProBladz 2 is a 14mm all-court balance paddle with a foam core construction, tuned to feel closer to the solid, connected response players expect from Gen 3 paddles.",
    features: [
      {
        title: "Enhanced MPP Foam Core",
        body: "Tuned for consistent control in dinks, drops, rolls and fast rallies. Soft and controlled at the net, solid and stable on drives and counterattacks.",
      },
      {
        title: "T700 Carbon Fibre Face",
        body: "Upgraded T700 carbon face for efficient energy transfer, so you return pace with less effort and keep shots deep and stable in high-speed exchanges.",
      },
      {
        title: "Customisable Weighting",
        body: "Adjustable edge-guard weights let you fine-tune balance. Add weight to expand the sweet spot, or run it stock for quicker hands.",
      },
      {
        title: "Controlled Spin & Precision",
        body: "From topspin attacks at the kitchen line to defensive chops and slices, shots stay predictable and on target.",
      },
    ],
    specs: {
      core: "Enhanced MPP foam",
      thickness: "14 mm",
      shape: "All-court balance",
      face: "T700 carbon fibre",
    },
    sourceUrl: "https://luzzpickleball.com/products/luzz-pro-blade2-long-yuan-paddle",
  },
  {
    id: "cannon",
    slug: "cannon",
    // Luzz sells this as "Luzz Cannon Paddle" (there is no product named "Pro Cannon").
    name: "Luzz Cannon",
    tagline: "Gen 3 thermoformed power. Smashes that land like cannonballs.",
    category: "power",
    coreType: "thermoformed-honeycomb",
    skillLevel: "Intermediate to Pro",
    price: 169,
    images: img("cannon", "main", 8),
    description:
      "A U-shaped carbon fibre matrix inside the core layers kinetic energy progressively, giving the Cannon explosive power with minimal energy loss. Raw carbon fabric, an 8mm PP honeycomb core with an enlarged foam perimeter and a directional spin texture make it a true power paddle with real bite.",
    features: [
      { title: "RAW Carbon Fabric", body: "Keeps the paddle stable and structurally strong." },
      { title: "8mm PP Honeycomb Core", body: "Improves core strength and elasticity for more power." },
      { title: "Enlarged Foam Core", body: "Increases reactivity and speeds up energy transfer." },
      { title: "3K Carbon Protection Block", body: "Protects the EVA from stress-induced dents." },
      { title: "Directional Spin Texture", body: "More friction and more ball bite for heavier spin." },
      {
        title: "Anti-Slip Grip",
        body: "Anti-slip layer with 3D micro-porous cooling channels and shock-absorbing gel for a dry, secure grip.",
      },
    ],
    specs: {
      core: "8mm PP honeycomb + enlarged foam (thermoformed)",
      thickness: "16 mm",
      shape: "Elongated",
      face: "RAW carbon",
      length: "16.54 in",
      width: "7.48 in",
      weight: "7.93 oz (avg)",
      gripLength: "5.52 in",
      gripCircumference: "4.13 in",
      swingWeight: "121 ± 3",
      twistWeight: "6.2 ± 0.1",
      certification: "UPA-A & USAP",
    },
    sourceUrl:
      "https://luzzpickleball.com/products/luzzpickleball-cannon-paddle-t700-carbon-friction-surface-thermoformed",
  },
  {
    id: "glider-2026",
    slug: "glider-2026-hybrid",
    name: "Luzz Glider 2026 Hybrid Paddle",
    tagline: "Hybrid shape, soft honeycomb core, aerospace-grade grit.",
    category: "hybrid-control",
    coreType: "thermoformed-honeycomb",
    skillLevel: "Beginner to Pro",
    price: 185,
    compareAtPrice: 199,
    variantLabel: "Edition",
    variants: [
      { id: "standard", name: "Glider 2026", images: img("glider-2026", "standard", 8) },
      {
        id: "chris-haworth",
        name: "Chris Haworth Glider 2026",
        price: 199,
        images: img("glider-2026", "chris-haworth", 8),
      },
      {
        id: "gabbys-dollhouse",
        name: "Gabby's Dollhouse Glider 2026",
        price: 199,
        images: img("glider-2026", "gabbys-dollhouse", 5),
      },
    ],
    images: img("glider-2026", "standard", 8),
    description:
      "Designed for beginner to pro players who value control and consistency. Glider 2026 upgrades the Glider 2024, keeping its hybrid shape and 8mm PP honeycomb core for a beginner-friendly Gen 3 experience, while the face moves to aerospace-grade 984-Aero™ grit for better durability and a longer lifespan.",
    features: [
      {
        title: "984-Aero™ Face Grit",
        body: "Ultra-uniform surface friction for consistent ball contact, with much better wear resistance.",
      },
      {
        title: "8mm PP Honeycomb Core",
        body: "Soft, controlled response that makes dinks, drops and placement easier.",
      },
      {
        title: "Deep Reinforced Structure",
        body: "Stronger bonding between the carbon face and core keeps performance consistent over time.",
      },
      {
        title: "Expanded Sweet Spot & Dwell Time",
        body: "More forgiveness on off-centre hits and more time on the face for shot shaping.",
      },
    ],
    specs: {
      core: "8mm PP honeycomb (thermoformed)",
      thickness: "16 mm",
      shape: "Hybrid",
      face: "Carbon with 984-Aero™ grit",
      length: "16.34 in",
      width: "7.48 in",
      weight: "7.94 oz (avg)",
      gripLength: "5.31 in",
      gripCircumference: "4.13 in",
      swingWeight: "111 ± 3",
      twistWeight: "6.4 ± 0.1",
      certification: "UPA & USAP",
    },
    sourceUrl: "https://luzzpickleball.com/products/luzz-glider-2026",
  },
  {
    id: "inferno-frozen",
    slug: "inferno-frozen",
    name: "Luzz Inferno-Frozen",
    tagline: "Less explosive. More precise.",
    category: "foam-core",
    coreType: "mpp-foam",
    skillLevel: "Intermediate to Pro",
    price: 339,
    compareAtPrice: 385,
    images: img("inferno-frozen", "main", 8),
    description:
      "For players who love the Inferno but want to tame excess pop and power. Inferno-Frozen dials down the pop and replaces it with a more controlled response, longer dwell time, rock-solid stability and a more connected, all-court feel.",
    features: [
      {
        title: "MPP-Z Core",
        body: "Specially treated and aging-tested core that stays responsive and consistent after months of heavy play.",
      },
      {
        title: "EP-12™ Surface",
        body: "Multi-component epoxy matte finish that plays the same on wet or dry courts, with much better wear resistance.",
      },
      {
        title: "All-Weather Performance",
        body: "Structural insulation keeps pop and touch consistent from cold mornings to hot summer afternoons.",
      },
      {
        title: "Easy on Your Arm",
        body: "TPE perimeter fill absorbs shock so your elbow and wrist take less punishment on hard-hit balls.",
      },
    ],
    specs: {
      core: "MPP-Z foam",
      thickness: "16 mm",
      shape: "Elongated",
      face: "EP-12™ epoxy matte",
      length: "16.54 in",
      width: "7.48 in",
      weight: "7.94 oz (avg)",
      gripLength: "5.52 in",
      gripCircumference: "4.17 in",
      swingWeight: "119 ± 3",
      twistWeight: "6.1 ± 0.1",
      certification: "USAP & UPA",
    },
    sourceUrl: "https://luzzpickleball.com/products/luzz-pro-4-frozen-inferno",
  },
  {
    id: "pro-4-inferno",
    slug: "pro-4-inferno",
    name: "Luzz Pro-4 Inferno",
    tagline: "MPP foam power. Blazing speed with a full-face sweet spot.",
    category: "foam-core",
    coreType: "mpp-foam",
    skillLevel: "Intermediate to Pro",
    price: 289,
    compareAtPrice: 369,
    variantLabel: "Colourway",
    variants: [
      // "Original" is the pink-to-blue paddle shown in the homepage hero video.
      { id: "original", name: "Inferno (Original)", images: img("pro-4-inferno", "original", 8) },
      { id: "darkness", name: "Darkness Inferno", images: img("pro-4-inferno", "darkness", 8) },
      { id: "blue-blaze", name: "Blue Blaze Inferno", images: img("pro-4-inferno", "blue-blaze", 8) },
    ],
    images: img("pro-4-inferno", "original", 8),
    description:
      "Built with MPP (microporous polymer) foam and advanced foaming technology, the Pro-4 Inferno delivers blazing speed, pinpoint control and lasting durability. Thousands of microporous cells boost ball speed, while full-area filling expands the sweet spot across the face.",
    features: [
      {
        title: "Revolutionary MPP Material",
        body: "Thousands of microporous foam cells boost ball speed and control accuracy.",
      },
      {
        title: "No More Collapsing Cores",
        body: "A lightweight, durable core (65–70 kg/m³, 1.2 MPa) that resists crushing for lasting performance.",
      },
      {
        title: "Expanded Sweet Spot",
        body: "Full-area filling enlarges the effective hitting area for consistent off-centre shots.",
      },
      {
        title: "Efficient Shock Absorption",
        body: "Microporous foam absorbs over 90% of impact, reducing arm vibration, fatigue and joint stress.",
      },
    ],
    specs: {
      core: "MPP foam",
      thickness: "16 mm",
      shape: "Elongated",
      length: "16.54 in",
      width: "7.48 in",
      weight: "7.93 oz (avg)",
      gripLength: "5.52 in",
      gripCircumference: "4.13 in",
      swingWeight: "119 ± 3",
      twistWeight: "6.2 ± 0.1",
      certification: "UPA-A & USAP",
    },
    sourceUrl:
      "https://luzzpickleball.com/products/luzzpickleball-pro-4-inferno-mpp-pickleball-paddle-large-sweet-spot-durable-core",
  },
  {
    id: "candy-cannon",
    slug: "candy-cannon",
    name: "Luzz Candy Cannon",
    tagline: "Special edition Cannon power with a sweet candy finish.",
    category: "power",
    coreType: "thermoformed-honeycomb",
    skillLevel: "Intermediate to Pro",
    price: 175,
    images: img("candy-cannon", "main", 8),
    description:
      "The special-edition Candy Cannon has the same U-shaped carbon fibre matrix core as the Cannon, layering kinetic energy for explosive power with minimal energy loss, plus a candy-themed design with colourful edges.",
    features: [
      { title: "RAW Carbon Fabric", body: "Keeps the paddle stable and structurally strong." },
      { title: "8mm PP Honeycomb Core", body: "Improves core strength and elasticity for more power." },
      { title: "Enlarged Foam Core", body: "Increases reactivity and speeds up energy transfer." },
      { title: "Directional Spin Texture", body: "More friction and more ball bite for heavier spin." },
      {
        title: "Anti-Slip Grip",
        body: "Anti-slip layer with 3D micro-porous cooling channels and shock-absorbing gel.",
      },
      { title: "Candy Edition Design", body: "Sugar-coated bullet artwork, Cannon logo and colourful edges." },
    ],
    specs: {
      core: "8mm PP honeycomb + enlarged foam (thermoformed)",
      thickness: "16 mm",
      shape: "Elongated",
      face: "RAW carbon",
      length: "16.54 in",
      width: "7.48 in",
      weight: "7.93 oz (avg)",
      gripLength: "5.52 in",
      gripCircumference: "4.13 in",
      swingWeight: "121 ± 3",
      twistWeight: "6.2 ± 0.1",
      certification: "UPA-A & USAP",
    },
    sourceUrl:
      "https://luzzpickleball.com/products/luzzpickleball-candy-cannon-paddle-t700-carbon-friction-surface-thermoformed",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id || p.slug === id);
}

export function getVariant(product: Product, variantId?: string): ProductVariant | undefined {
  if (!product.variants?.length) return undefined;
  return product.variants.find((v) => v.id === variantId) ?? product.variants[0];
}

/** Price for a product/variant pair, in AUD dollars. */
export function getPrice(product: Product, variantId?: string): number {
  return getVariant(product, variantId)?.price ?? product.price;
}

/** "Was" price for a product/variant pair. A variant with its own price only uses its own compareAtPrice. */
export function getCompareAtPrice(product: Product, variantId?: string): number | undefined {
  const v = getVariant(product, variantId);
  if (v && v.price !== undefined) return v.compareAtPrice;
  return v?.compareAtPrice ?? product.compareAtPrice;
}

export function getImages(product: Product, variantId?: string): string[] {
  return getVariant(product, variantId)?.images ?? product.images;
}
