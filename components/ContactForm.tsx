"use client";

import { site } from "@/lib/site";

// TODO owner: connect a form service (e.g. Resend or Formspree) so messages arrive
// without the customer's email app. Until then, submitting opens a prefilled email.
export function ContactForm() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const order = String(data.get("order") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = `Enquiry from ${name}${order ? ` (order ${order})` : ""}`;
    const body = `${message}\n\nName: ${name}\nEmail: ${email}${order ? `\nOrder: ${order}` : ""}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const field =
    "mt-2 w-full rounded-xl border border-line bg-obsidian px-4 py-3 text-text placeholder:text-muted/60 focus:border-frozen focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block text-sm font-medium">
          Email
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block text-sm font-medium">
        Order number <span className="text-muted">(optional)</span>
        <input name="order" className={field} />
      </label>
      <label className="block text-sm font-medium">
        Message
        <textarea name="message" required rows={6} className={field} />
      </label>
      <button type="submit" className="btn btn-primary">
        Send message
      </button>
      <p className="text-xs text-muted">This opens your email app with your message ready to send.</p>
    </form>
  );
}
