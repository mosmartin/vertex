import type { InputHTMLAttributes } from "react";
import { Icon } from "./Icon";

type SearchInputProps = InputHTMLAttributes<HTMLInputElement> & {
  shortcut?: string;
};

export function SearchInput({ shortcut = "⌘ K", className, ...props }: SearchInputProps) {
  return (
    <div
      className={[
        "flex h-11 items-center gap-2 rounded-md border border-neutral-200 bg-white px-4 text-sm text-neutral-900 focus-within:border-primary-400",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Icon name="search" size={16} className="text-neutral-500 shrink-0" />
      <input
        className="flex-1 bg-transparent outline-none placeholder:text-neutral-500"
        {...props}
      />
      {shortcut && (
        <span className="shrink-0 rounded-xs border border-neutral-200 px-1.5 py-0.5 text-xs text-neutral-500">
          {shortcut}
        </span>
      )}
    </div>
  );
}

export function Select({
  options,
  ...props
}: {
  options: string[];
} & InputHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className="h-11 w-full appearance-none rounded-md border border-neutral-200 bg-white pl-4 pr-10 text-sm text-neutral-900 focus:border-primary-400 focus:outline-none"
        {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Icon
        name="chevron-down"
        size={16}
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
      />
    </div>
  );
}
