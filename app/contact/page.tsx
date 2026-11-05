import { Mail } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about a paddle or an order? Get in touch with Pickleball Sales.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <PageHeader
        eyebrow="Get in touch"
        title="Contact"
        intro={<p>Questions about a paddle, an order or a return? Send us a message.</p>}
      />
      <a href={`mailto:${site.email}`} className="link mb-8 inline-flex items-center gap-2 text-lg font-semibold">
        <Mail className="size-5" aria-hidden="true" /> {site.email}
      </a>
      <ContactForm />
    </div>
  );
}
