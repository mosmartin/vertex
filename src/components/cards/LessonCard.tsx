import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function LessonVideoCard({
  title,
  description,
  meta,
  cta,
}: {
  title: string;
  description: string;
  meta: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <Badge variant="video">Video</Badge>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
      <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
        <span className="text-xs text-neutral-500">{meta}</span>
        <Button variant="text" icon="play" iconPosition="leading">
          {cta}
        </Button>
      </div>
    </div>
  );
}

export function LessonCard({
  title,
  description,
  meta,
  cta,
}: {
  title: string;
  description: string;
  meta: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm">
      <Badge variant="lesson">Lesson</Badge>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
        <p className="text-sm text-neutral-500">{description}</p>
      </div>
      <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
        <span className="text-xs text-neutral-500">{meta}</span>
        <Button variant="tertiary" icon="external-link">
          {cta}
        </Button>
      </div>
    </div>
  );
}
