"use client";

import { useState } from "react";
import { SlidersHorizontal, X, RotateCcw } from "lucide-react";
import type { AlertType, FilterState } from "@/lib/types";
import { ALERT_TYPE_META } from "@/lib/constants";
import { KA } from "@/lib/i18n/ka";
import { cn } from "@/lib/utils";

interface MapFloatingFilterProps {
  filters:           FilterState;
  toggleAlertType:   (t: AlertType) => void;
  toggleShowRoutes:  () => void;
  toggleShowAlerts:  () => void;
  toggleShowSpots:   () => void;
  resetFilters:      () => void;
  activeFilterCount: number;
}

// ─── Layer toggle row (defined outside component to avoid recreation on render)

interface LayerToggleProps {
  label:    string;
  active:   boolean;
  onToggle: () => void;
  color:    string;
}

function LayerToggle({ label, active, onToggle, color }: LayerToggleProps): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium w-full",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40",
        active ? "text-zinc-200" : "text-zinc-500 hover:text-zinc-300"
      )}
    >
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
        {label}
      </span>
      <span
        className={cn(
          "relative inline-flex h-4 w-7 shrink-0 rounded-full transition-colors duration-200",
          active ? "bg-amber-500" : "bg-zinc-700"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-3 w-3 rounded-full bg-white shadow transition-transform duration-200",
            active ? "translate-x-3.5" : "translate-x-0.5"
          )}
        />
      </span>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function MapFloatingFilter({
  filters,
  toggleAlertType,
  toggleShowRoutes,
  toggleShowAlerts,
  toggleShowSpots,
  resetFilters,
  activeFilterCount,
}: MapFloatingFilterProps): React.ReactElement {
  const [open, setOpen] = useState(false);

  const alertTypes = Object.keys(ALERT_TYPE_META) as AlertType[];

  return (
    <div className="absolute top-4 left-4 z-[400]">
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={KA.filters}
        aria-expanded={open}
        className={cn(
          "flex items-center gap-2 h-9 px-3.5 rounded-xl text-sm font-medium",
          "border transition-all duration-150 shadow-lg",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50",
          open || activeFilterCount > 0
            ? "bg-amber-500/15 border-amber-500/30 text-amber-400"
            : "bg-[var(--color-surface-card)]/90 border-[var(--color-surface-border)] text-zinc-300 hover:text-zinc-100 backdrop-blur-sm"
        )}
      >
        <SlidersHorizontal size={14} />
        {KA.filters}
        {activeFilterCount > 0 && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-zinc-900">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Popover */}
      {open && (
        <div
          className={cn(
            "absolute top-full mt-2 left-0 w-60 z-10 animate-fade-up",
            "rounded-2xl border border-[var(--color-surface-border)]",
            "bg-[var(--color-surface-card)]/95 backdrop-blur-xl",
            "shadow-[0_16px_48px_rgba(0,0,0,0.6)]",
            "overflow-hidden"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-surface-border)]">
            <span className="text-xs font-semibold text-zinc-300">{KA.filters}</span>
            <div className="flex items-center gap-1">
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  title={KA.resetFilters}
                  className="rounded-lg p-1 text-zinc-500 hover:text-amber-400 transition-colors"
                >
                  <RotateCcw size={12} />
                </button>
              )}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={KA.close}
                className="rounded-lg p-1 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Layer toggles */}
          <div className="px-2 py-2 border-b border-[var(--color-surface-border)]">
            <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
              {KA.mapLayers}
            </p>
            <LayerToggle label={KA.routes}     active={filters.showRoutes} onToggle={toggleShowRoutes} color="#f59e0b" />
            <LayerToggle label={KA.roadAlerts} active={filters.showAlerts} onToggle={toggleShowAlerts} color="#ef4444" />
            <LayerToggle label={KA.bikerSpots} active={filters.showSpots}  onToggle={toggleShowSpots}  color="#fb923c" />
          </div>

          {/* Alert type chips */}
          <div className="px-4 py-3">
            <p className="pb-2 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
              {KA.roadAlertsSection}
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {alertTypes.map((type) => {
                const meta   = ALERT_TYPE_META[type];
                const active = filters.alertTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleAlertType(type)}
                    aria-pressed={active}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium",
                      "border transition-all duration-150",
                      active
                        ? "text-zinc-100 border-current"
                        : "text-zinc-600 border-transparent hover:text-zinc-400 hover:border-zinc-700/50"
                    )}
                    style={active ? { backgroundColor: meta.bgColor, color: meta.color, borderColor: `${meta.color}40` } : {}}
                  >
                    <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: meta.color }} aria-hidden="true" />
                    {meta.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
