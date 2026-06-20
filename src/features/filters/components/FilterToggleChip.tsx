"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterToggleChipProps {
  label:    string;
  active:   boolean;
  color:    string;
  bgColor:  string;
  onClick:  () => void;
  icon?:    string;
}

export function FilterToggleChip({
  label,
  active,
  color,
  bgColor,
  onClick,
  icon,
}: FilterToggleChipProps): React.ReactElement {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium",
        "w-full text-left transition-all duration-150",
        "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50",
        active
          ? "text-zinc-100 shadow-sm"
          : "text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-white/[0.03]"
      )}
      style={
        active
          ? {
              backgroundColor: bgColor,
              borderColor:     `${color}40`,
              color:           color,
            }
          : { backgroundColor: "transparent" }
      }
    >
      {/* Colour indicator dot */}
      <span
        className="shrink-0 h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />

      {icon && <span aria-hidden="true">{icon}</span>}

      <span className="flex-1">{label}</span>

      {active && (
        <Check size={12} strokeWidth={3} className="shrink-0" aria-hidden="true" />
      )}
    </button>
  );
}
