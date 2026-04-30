import { cn } from "../../lib/utils";
import { type ReactNode } from "react";

// ─── Badge Component ──────────────────────────────────────────────────────────

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "outline" | "mono";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium transition-colors",
        variant === "default" &&
          "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
        variant === "outline" &&
          "border border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400",
        variant === "mono" &&
          "font-mono bg-zinc-100 text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400",
        className
      )}
    >
      {children}
    </span>
  );
}
