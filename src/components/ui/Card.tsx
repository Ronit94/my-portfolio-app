import { cn } from "../../lib/utils";
import { type ReactNode } from "react";

// ─── Card Component ───────────────────────────────────────────────────────────

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50",
        hover && "cursor-pointer transition-all duration-200 hover:border-zinc-300 hover:shadow-sm dark:hover:border-zinc-700",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

// ─── Section divider / label ──────────────────────────────────────────────────
interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500",
        className
      )}
    >
      {children}
    </span>
  );
}
