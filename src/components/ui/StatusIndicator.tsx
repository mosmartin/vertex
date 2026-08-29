import { Icon, type IconName } from "./Icon";

type Status = "in-progress" | "completed" | "now-playing" | "locked";

const config: Record<Status, { icon: IconName; label: string; className: string; filled: boolean }> = {
  "in-progress": {
    icon: "circle-dot",
    label: "In Progress",
    className: "text-primary-500",
    filled: false,
  },
  completed: {
    icon: "check-circle",
    label: "Completed",
    className: "text-success-500",
    filled: true,
  },
  "now-playing": {
    icon: "play",
    label: "Now Playing",
    className: "text-primary-500",
    filled: true,
  },
  locked: {
    icon: "lock",
    label: "Locked",
    className: "text-neutral-500",
    filled: false,
  },
};

export function StatusIndicator({ status }: Readonly<{ status: Status }>) {
  const { icon, label, className, filled } = config[status];
  return (
    <span className={["inline-flex items-center gap-1.5 text-sm font-medium", className].join(" ")}>
      <Icon name={icon} size={16} filled={filled} />
      {label}
    </span>
  );
}
