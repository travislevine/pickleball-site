export function PageHeader({ eyebrow, title, intro }: { eyebrow?: string; title: string; intro?: React.ReactNode }) {
  return (
    <header className="mb-12">
      {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-frozen">{eyebrow}</p>}
      <h1 className="display text-4xl sm:text-6xl">{title}</h1>
      <div className="gradient-rule mt-6 w-24" />
      {intro && <div className="mt-6 max-w-2xl text-lg text-muted">{intro}</div>}
    </header>
  );
}
