"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LayerToggleRowProps {
  label:    string;
  active:   boolean;
  icon:     ReactNode;
  color:    string;
  onToggle: () => void;
  count?:   number;
}

export function LayerToggleRow({
  label,
  active,
  icon,
  color,
  onToggle,
  count,
}: LayerToggleRowProps): React.ReactElement {
  return (
    <div className="flex items-center gap-3 px-1 py-2">
      <span className="shrink-0" style={{ color }} aria-hidden="true">
        {icon}
      </span>

      <span className="flex-1 text-sm text-zinc-300">{label}</span>

      {count !== undefined && (
        <span className="text-xs text-zinc-600">{count}</span>
      )}

      {/* Toggle switch */}
      <button
        type="button"
        role="switch"
        aria-checked={active}
        aria-label={`Toggle ${label} layer`}
        onClick={onToggle}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full",
          "border-2 border-transparent transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50",
          active ? "bg-amber-500" : "bg-zinc-700"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow",
            "transform transition-transform duration-200",
            active ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}
