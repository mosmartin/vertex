import type { ReactNode } from "react";

type BadgeVariant = "video" | "lesson" | "popular" | "neutral";

const variants: Record<BadgeVariant, string> = {
  video: "bg-neutral-900 text-white",
  lesson: "bg-info-500 text-white",
  popular: "bg-primary-100 text-primary-500",
  neutral: "bg-neutral-100 text-neutral-700",
};

export function Badge({
  variant = "neutral",
  children,
}: {
  variant?: BadgeVariant;
  children: ReactNode;
}) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-xs px-2 py-1 text-xs font-semibold uppercase tracking-wide",
        variants[variant],
      ].join(" ")}
    >
      {children}
    </span>
  );
}
