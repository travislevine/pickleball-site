import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Pickleball Sales collects, uses and protects your personal information.",
};

export default function PrivacyPage() {
  const mail = <a href={`mailto:${site.email}`}>{site.email}</a>;
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <PageHeader eyebrow="Policies" title="Privacy Policy" intro={<p>Last updated {site.privacyUpdated}.</p>} />

      <div className="prose-store">
        <p>
          {site.name} (ABN {site.abn}) respects your privacy. This policy explains what personal information we
          collect, why we collect it, and how you can contact us about it. We handle personal information in line with
          the Australian Privacy Principles.
        </p>

        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Order details:</strong> your name, email address, phone number, shipping and billing address, and
            the items you buy.
          </li>
          <li>
            <strong>Messages:</strong> anything you send us by email or through our contact form.
          </li>
          <li>
            <strong>Payment details:</strong> card and wallet payments are processed by Stripe. We never see or store
            your full card number.
          </li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To process, source, dispatch and deliver your order.</li>
          <li>To contact you about your order, a return or a warranty claim.</li>
          <li>To answer your questions.</li>
          <li>To meet our legal obligations, such as keeping business and tax records.</li>
        </ul>
        <p>We do not sell your personal information, and we do not send marketing emails without your consent.</p>

        <h2>Who we share it with</h2>
        <p>We only share what is needed to run the store:</p>
        <ul>
          <li>
            <strong>Stripe</strong>, to process payments.
          </li>
          <li>
            <strong>Australia Post</strong>, to deliver your order.
          </li>
          <li>
            <strong>Vercel</strong>, which hosts this website.
          </li>
          <li>
            <strong>Luzz Pickleball</strong>, only if you make a manufacturer warranty claim.
          </li>
        </ul>
        <p>
          Some of these providers store information outside Australia, including in the United States. They are
          required to protect it under their own privacy and security obligations.
        </p>

        <h2>Cookies and your cart</h2>
        <p>
          Your shopping cart is saved in your own browser so it is still there when you come back. We do not use
          advertising or tracking cookies. Stripe uses cookies on its checkout page to process payments securely and
          prevent fraud.
        </p>

        <h2>Keeping it secure</h2>
        <p>
          Payments are handled by Stripe, and the website is served over an encrypted (HTTPS) connection. We keep
          order records only as long as we need them for the purposes above or as required by law.
        </p>

        <h2>Access, correction and complaints</h2>
        <p>
          You can ask to see or correct the personal information we hold about you, or raise a privacy concern, by
          emailing {mail}. We will respond within 30 days. If you are not satisfied with our response, you can contact
          the Office of the Australian Information Commissioner at{" "}
          <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer">
            oaic.gov.au
          </a>
          .
        </p>

        <h2>Changes to this policy</h2>
        <p>If we update this policy, we will change the date at the top of this page.</p>
      </div>
    </div>
  );
}
