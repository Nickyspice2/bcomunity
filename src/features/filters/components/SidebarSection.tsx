"use client";

import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SidebarSectionProps {
  title:       string;
  icon:        ReactNode;
  children:    ReactNode;
  defaultOpen?: boolean;
  badge?:      number;
}

export function SidebarSection({
  title,
  icon,
  children,
  defaultOpen = true,
  badge,
}: SidebarSectionProps): React.ReactElement {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[var(--color-surface-border)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center gap-2.5 px-4 py-3",
          "text-left transition-colors duration-150",
          "hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-inset",
          "focus-visible:ring-1 focus-visible:ring-amber-400/40"
        )}
        aria-expanded={open}
      >
        <span className="text-zinc-500" aria-hidden="true">{icon}</span>

        <span className="flex-1 text-xs font-semibold uppercase tracking-widest text-zinc-400">
          {title}
        </span>

        {badge !== undefined && badge > 0 && (
          <span
            className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-400"
            aria-label={`${badge} active`}
          >
            {badge}
          </span>
        )}

        <ChevronDown
          size={14}
          className={cn(
            "shrink-0 text-zinc-600 transition-transform duration-200",
            open ? "rotate-180" : "rotate-0"
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="px-3 pb-3 space-y-0.5 animate-fade-up">
          {children}
        </div>
      )}
    </div>
  );
}
