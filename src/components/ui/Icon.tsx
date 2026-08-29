import type { SVGProps } from "react";

export type IconName =
  | "bell"
  | "search"
  | "play"
  | "file"
  | "bookmark"
  | "bar-chart"
  | "clock"
  | "user"
  | "chevron-right"
  | "chevron-left"
  | "chevron-down"
  | "external-link"
  | "check-circle"
  | "circle-dot"
  | "lock"
  | "eye"
  | "grid"
  | "target"
  | "accessibility"
  | "logo-mark";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
  filled?: boolean;
};

const paths: Record<IconName, React.ReactNode> = {
  bell: (
    <path d="M12 3a5 5 0 0 0-5 5v3.2c0 .5-.2 1-.5 1.4L5 14.5c-.7.8-.1 2 .9 2h12.2c1 0 1.6-1.2.9-2l-1.5-2A2 2 0 0 1 17 11.2V8a5 5 0 0 0-5-5Zm0 18a2.5 2.5 0 0 0 2.4-1.8h-4.8A2.5 2.5 0 0 0 12 21Z" />
  ),
  search: (
    <path d="M11 4a7 7 0 1 0 4.4 12.5l4.55 4.55 1.4-1.4-4.55-4.55A7 7 0 0 0 11 4Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z" />
  ),
  play: (
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-2 5.7 6 4.3-6 4.3v-8.6Z" />
  ),
  file: (
    <path d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm8 1.5V8h4.5L14 3.5ZM8 13h8v1.6H8V13Zm0 3.4h8V18H8v-1.6Z" />
  ),
  bookmark: (
    <path d="M6 2h12a1 1 0 0 1 1 1v19l-7-4.2L5 22V3a1 1 0 0 1 1-1Z" />
  ),
  "bar-chart": (
    <path d="M4 20V10h3v10H4Zm6.5 0V4h3v16h-3ZM17 20v-7h3v7h-3Z" />
  ),
  clock: (
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-1 2v6.4l4.6 2.7 1-1.6-3.8-2.3V6h-1.8Z" />
  ),
  user: (
    <path d="M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 12c5 0 9 2.5 9 6v2H3v-2c0-3.5 4-6 9-6Z" />
  ),
  "chevron-right": (
    <path d="m9 4 8 8-8 8-1.4-1.4L14.2 12 7.6 5.4 9 4Z" />
  ),
  "chevron-left": (
    <path d="m15 4-8 8 8 8 1.4-1.4L9.8 12l6.6-6.6L15 4Z" />
  ),
  "chevron-down": (
    <path d="M4 9h16l-8 8-8-8Z" />
  ),
  "external-link": (
    <path d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3ZM5 5h6v2H5v12h12v-6h2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
  ),
  "check-circle": (
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1.1 14.6-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7Z" />
  ),
  "circle-dot": (
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 6a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
  ),
  lock: (
    <path d="M12 2a4.5 4.5 0 0 0-4.5 4.5V10H6a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1h-1.5V6.5A4.5 4.5 0 0 0 12 2Zm0 2a2.5 2.5 0 0 1 2.5 2.5V10h-5V6.5A2.5 2.5 0 0 1 12 4Z" />
  ),
  eye: (
    <path d="M12 5c-6 0-9.5 5.5-9.9 6.2a1 1 0 0 0 0 .9C2.5 13 6 18.5 12 18.5s9.5-5.5 9.9-6.4a1 1 0 0 0 0-.9C21.5 10.5 18 5 12 5Zm0 11a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
  ),
  grid: (
    <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" />
  ),
  target: (
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 3a7 7 0 1 1 0 14 7 7 0 0 1 0-14Zm0 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
  ),
  accessibility: (
    <path d="M12 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM5 8.5 11 7v3.2L6.4 11.6l-.7 2 4.4-1.1L9 22h2.2l1.3-6h1l1.3 6H17l-1.1-9.5 4.4 1.1-.7-2L15 10.2V7l6 1.5.5-2L12 4l-9.5 2.5.5 2Z" />
  ),
  "logo-mark": (
    <path d="M3 4h4.2L12 14.5 16.8 4H21l-9 17L3 4Z" />
  ),
};

export function Icon({ name, size = 20, filled = false, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={filled ? 0 : 1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {filled ? (
        paths[name]
      ) : (
        <g fill="none" stroke="currentColor">
          {paths[name]}
        </g>
      )}
    </svg>
  );
}
