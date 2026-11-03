import Link from "next/link";

/** Text wordmark for the store (no logo file). */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-baseline gap-1.5 ${className}`}>
      <span className="text-lg font-black uppercase tracking-tight">Luzz</span>
      <span className="gradient-text text-lg font-black uppercase tracking-tight">AU</span>
      <span className="hidden text-[0.65rem] font-medium uppercase tracking-[0.2em] text-muted sm:inline">
        Pickleball Australia
      </span>
    </Link>
  );
}
