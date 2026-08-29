import { Icon } from "@/components/ui/Icon";

export function ResourceCard({
  title,
  description,
  meta,
}: {
  title: string;
  description: string;
  meta: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-primary-100 text-primary-500">
        <Icon name="file" size={20} />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
      <div className="flex items-center justify-between border-t border-neutral-100 pt-4 text-xs text-neutral-500">
        <span>{meta}</span>
        <Icon name="external-link" size={16} className="text-neutral-500" />
      </div>
    </div>
  );
}
