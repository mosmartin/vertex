import { Icon } from "@/components/ui/Icon";

export function Breadcrumbs({ items }: Readonly<{ items: string[] }>) {
  return (
    <nav className="flex items-center gap-2 text-sm text-neutral-500">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item} className="flex items-center gap-2">
            <span className={isLast ? "text-neutral-900 font-medium" : ""}>{item}</span>
            {!isLast && <Icon name="chevron-right" size={14} />}
          </span>
        );
      })}
    </nav>
  );
}
