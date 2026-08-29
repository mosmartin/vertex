import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "text";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: IconName;
  iconPosition?: "leading" | "trailing";
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-md text-sm font-medium transition-colors disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-400 disabled:bg-primary-200 disabled:text-white/70",
  secondary:
    "bg-white text-primary-500 border border-primary-500 hover:bg-primary-100 disabled:border-neutral-200 disabled:text-neutral-300 disabled:bg-white",
  tertiary:
    "bg-transparent text-primary-500 hover:bg-primary-100 px-2 disabled:text-neutral-300",
  text: "bg-transparent text-primary-500 hover:text-primary-400 h-auto px-0 disabled:text-neutral-300",
};

export function Button({
  variant = "primary",
  icon,
  iconPosition = "trailing",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={[base, variants[variant], className].filter(Boolean).join(" ")}
      {...props}
    >
      {icon && iconPosition === "leading" && <Icon name={icon} size={16} />}
      {children}
      {icon && iconPosition === "trailing" && <Icon name={icon} size={16} />}
    </button>
  );
}
