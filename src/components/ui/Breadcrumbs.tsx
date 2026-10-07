import { Link } from "@/i18n/navigation";

export function Breadcrumbs({ items, label = "Breadcrumb" }: { items: { label: string; href?: string }[]; label?: string }) {
  return (
    <nav aria-label={label} className="text-[0.68rem] uppercase tracking-[0.25em] text-stone">
      <ol className="flex flex-wrap items-center gap-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-3">
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-gold">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-ivory/80">
                {item.label}
              </span>
            )}
            {i < items.length - 1 && <span className="h-px w-4 bg-line" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
