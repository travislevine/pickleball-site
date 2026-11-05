import { freeShippingLine } from "@/lib/shipping";
import { BadgeCheck, Lock, ShieldCheck, Truck } from "lucide-react";

const items = [
  { icon: BadgeCheck, text: "Genuine Luzz paddles" },
  { icon: Truck, text: freeShippingLine },
  { icon: Lock, text: "Secure checkout by Stripe" },
  { icon: ShieldCheck, text: "USAP & UPA certified models" },
];

export function TrustBar() {
  return (
    <section aria-label="Why shop with us" className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 sm:px-6">
      <ul className="card grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 text-sm">
            <Icon className="size-5 shrink-0 text-frozen" aria-hidden="true" />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
