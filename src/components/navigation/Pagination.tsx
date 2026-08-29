import { Icon } from "@/components/ui/Icon";

export function Pagination({
  current,
  total,
}: Readonly<{
  current: number;
  total: number;
}>) {
  const pages = [1, 2, 3];

  return (
    <nav className="flex items-center gap-1.5">
      <button
        className="flex h-9 w-9 items-center justify-center rounded-sm text-neutral-500 hover:bg-neutral-100 disabled:opacity-40"
        disabled={current === 1}
        aria-label="Previous page"
      >
        <Icon name="chevron-left" size={16} />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={[
            "flex h-9 w-9 items-center justify-center rounded-sm text-sm font-medium",
            page === current
              ? "border border-primary-500 text-primary-500"
              : "text-neutral-700 hover:bg-neutral-100",
          ].join(" ")}
        >
          {page}
        </button>
      ))}
      <span className="flex h-9 w-9 items-center justify-center text-sm text-neutral-500">
        …
      </span>
      <button className="flex h-9 w-9 items-center justify-center rounded-sm text-sm font-medium text-neutral-700 hover:bg-neutral-100">
        {total}
      </button>
      <button
        className="flex h-9 w-9 items-center justify-center rounded-sm text-neutral-500 hover:bg-neutral-100 disabled:opacity-40"
        disabled={current === total}
        aria-label="Next page"
      >
        <Icon name="chevron-right" size={16} />
      </button>
    </nav>
  );
}
