import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  /** "right" → (→) primary action, "diag" → (↗) exploratory link — matches the approved copy arrows */
  arrow?: "right" | "diag";
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function Pill({ href, children, variant = "primary", size = "md", arrow = "right", className = "", ...rest }: Props) {
  const Icon = arrow === "diag" ? ArrowUpRight : ArrowRight;
  return (
    <Link
      href={href}
      className={`pill pill-${variant} ${size === "sm" ? "pill-sm" : ""} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      <span className="pill-icon">
        <Icon size={size === "sm" ? 15 : 17} strokeWidth={1.6} className={arrow === "diag" ? "diag" : ""} aria-hidden />
      </span>
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
  arrow = "diag",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  arrow?: "right" | "diag";
  className?: string;
}) {
  const Icon = arrow === "diag" ? ArrowUpRight : ArrowRight;
  return (
    <Link href={href} className={`link-arrow ${className}`}>
      {children}
      <Icon size={16} strokeWidth={1.6} aria-hidden />
    </Link>
  );
}
