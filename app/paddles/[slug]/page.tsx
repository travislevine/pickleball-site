import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductView, ProductViewFromUrl } from "@/components/ProductView";
import { SpecTable } from "@/components/SpecTable";
import { getImages, getPrice, getProduct, products } from "@/data/products";
import { site, siteUrl } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/paddles/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const image = getImages(product)[0];
  return {
    title: product.name,
    description: `${product.tagline} ${product.description}`.slice(0, 300),
    alternates: { canonical: `/paddles/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [{ url: image, width: 1080, height: 1080, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/paddles/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || product.slug !== slug) notFound();

  const base = siteUrl();
  const offers = (product.variants?.length ? product.variants : [undefined]).map((v) => ({
    "@type": "Offer",
    ...(v ? { name: v.name, sku: `${product.id}-${v.id}` } : { sku: product.id }),
    price: getPrice(product, v?.id).toFixed(2),
    priceCurrency: "AUD",
    availability: "https://schema.org/InStock",
    url: `${base}/paddles/${product.slug}${v ? `?variant=${v.id}` : ""}`,
    seller: { "@type": "Organization", name: site.name },
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: "Luzz" },
    image: getImages(product).slice(0, 4).map((src) => `${base}${src}`),
    sku: product.id,
    offers: offers.length === 1 ? offers[0] : offers,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <ol className="flex flex-wrap gap-2">
          <li>
            <Link href="/" className="hover:text-text">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/#shop" className="hover:text-text">
              Paddles
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-text">
            {product.name}
          </li>
        </ol>
      </nav>

      <Suspense fallback={<ProductView product={product} variantId={product.variants?.[0]?.id} />}>
        <ProductViewFromUrl product={product} />
      </Suspense>

      <section aria-labelledby="about-title" className="mt-20 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 id="about-title" className="display mb-5 text-3xl">
            About this paddle
          </h2>
          <p className="leading-relaxed text-muted">{product.description}</p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f.title} className="card p-5">
                <h3 className="mb-1 font-semibold">{f.title}</h3>
                <p className="text-sm text-muted">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="display mb-5 text-3xl">Specifications</h2>
          <SpecTable specs={product.specs} />
        </div>
      </section>
    </div>
  );
}
