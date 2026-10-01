import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "lime" | "outline" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-[#0a49e8]",
  lime: "bg-lime text-ink hover:bg-lime-soft",
  outline: "border border-line bg-white text-ink hover:border-ink",
  ghost: "text-ink hover:bg-surface",
  onDark: "border border-white/25 text-on-dark hover:bg-white/10",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-[46px] px-5 text-[15px] sm:h-[52px] sm:px-7 sm:text-base",
};

function classes(variant: Variant, size: Size, className?: string) {
  return [
    "press inline-flex items-center justify-center gap-2 rounded-full",
    "font-medium whitespace-nowrap select-none",
    VARIANTS[variant],
    SIZES[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

/** Renders an <a> when `href` is set, otherwise a <button>. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...rest
}: CommonProps & { href?: string } & Omit<ComponentProps<"button">, "className">) {
  const cls = classes(variant, size, className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
