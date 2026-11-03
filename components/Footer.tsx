import { Lock } from "lucide-react";
import Link from "next/link";
import { navLinks, site } from "@/lib/site";
import { CopyrightYear } from "./CopyrightYear";
import { Wordmark } from "./Wordmark";

// TODO owner: only list payment methods you have switched on in the Stripe dashboard.
const paymentMethods = ["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay"];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-obsidian">
      <div className="gradient-rule opacity-60" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Wordmark />
          <p className="max-w-sm text-sm text-muted">
            Genuine Luzz pickleball paddles, shipped Australia-wide. Prices in AUD, GST included.
          </p>
          <a href={`mailto:${site.email}`} className="link text-sm">
            {site.email}
          </a>
        </div>

        <nav aria-label="Footer">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">Store</h2>
          <ul className="space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-frozen">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">Secure checkout</h2>
          <p className="mb-3 flex items-center gap-2 text-sm">
            <Lock className="size-4 text-frozen" aria-hidden="true" /> Payments secured by Stripe
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Accepted payment methods">
            {paymentMethods.map((m) => (
              <li
                key={m}
                className="rounded-md border border-line bg-carbon px-2 py-1 text-[0.7rem] font-semibold text-muted"
              >
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-7xl space-y-2 px-4 py-6 text-xs text-muted sm:px-6">
          <p>{site.disclaimer}</p>
          <p>
            © <CopyrightYear /> {site.name}
            {site.abn && <> · ABN {site.abn}</>}
          </p>
        </div>
      </div>
    </footer>
  );
}
