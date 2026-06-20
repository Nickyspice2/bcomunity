import { cn } from "@/lib/utils";

interface BadgeProps {
  label:     string;
  color?:    string;
  bgColor?:  string;
  className?: string;
}

export function Badge({ label, color, bgColor, className }: BadgeProps): React.ReactElement {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide",
        className
      )}
      style={{
        color:           color    ?? "var(--color-text-secondary)",
        backgroundColor: bgColor  ?? "var(--color-surface-raised)",
        border:          `1px solid ${color ? `${color}40` : "var(--color-surface-border)"}`,
      }}
    >
      {label}
    </span>
  );
}
