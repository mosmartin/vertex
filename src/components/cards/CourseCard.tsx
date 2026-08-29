import { Icon } from "@/components/ui/Icon";

export function CourseCard({
  initial,
  title,
  description,
  level,
  duration,
  modules,
}: {
  initial: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  modules: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-sm bg-neutral-900 font-display text-lg font-bold text-white">
        {initial}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
      <div className="flex items-center gap-4 border-t border-neutral-100 pt-4 text-xs text-neutral-500">
        <span className="flex items-center gap-1.5">
          <Icon name="bar-chart" size={14} />
          {level}
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="clock" size={14} />
          {duration}
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="bookmark" size={14} />
          {modules}
        </span>
      </div>
    </div>
  );
}
