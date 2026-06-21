import type { ButtonHTMLAttributes, ReactElement } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon:     ReactElement;
  label:    string;
  active?:  boolean;
  badge?:   number;
  size?:    "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-8 w-8 text-sm",
  md: "h-9 w-9 text-base",
  lg: "h-11 w-11 text-lg",
};

export function IconButton({
  icon,
  label,
  active = false,
  badge,
  size = "md",
  className,
  ...rest
}: IconButtonProps): ReactElement {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60",
        sizeMap[size],
        active
          ? "bg-amber-500/20 text-amber-400 shadow-[inset_0_0_0_1px_rgba(245,158,11,0.3)]"
          : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200",
        className
      )}
      {...rest}
    >
      {icon}
      {badge !== undefined && badge > 0 && (
        <span
          aria-label={`${badge} active filters`}
          className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-zinc-900"
        >
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </button>
  );
}
