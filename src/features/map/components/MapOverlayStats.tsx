"use client";

import { Navigation, TriangleAlert, Coffee } from "lucide-react";
import { KA } from "@/lib/i18n/ka";

interface MapOverlayStatsProps {
  routeCount: number;
  alertCount: number;
  spotCount:  number;
}

/**
 * Floating pill in the bottom-left corner of the map showing how many
 * entities are currently visible given the active filters.
 */
export function MapOverlayStats({
  routeCount,
  alertCount,
  spotCount,
}: MapOverlayStatsProps): React.ReactElement {
  const items = [
    { icon: <Navigation    size={12} />, count: routeCount, label: KA.statRoutes, color: "#f59e0b" },
    { icon: <TriangleAlert size={12} />, count: alertCount, label: KA.statAlerts, color: "#ef4444" },
    { icon: <Coffee        size={12} />, count: spotCount,  label: KA.statSpots,  color: "#fb923c" },
  ];

  return (
    <div
      className="absolute bottom-6 left-4 z-[400] flex items-center gap-1 rounded-full border border-[var(--color-surface-border)] bg-[var(--color-surface-card)]/90 px-3 py-1.5 backdrop-blur-sm shadow-lg"
      aria-live="polite"
      aria-label="ხილული რუკის ობიექტები"
    >
      {items.map(({ icon, count, label, color }, idx) => (
        <span key={label} className="flex items-center gap-1.5">
          {idx > 0 && (
            <span className="h-3 w-px bg-[var(--color-surface-border)]" aria-hidden="true" />
          )}
          <span style={{ color }} aria-hidden="true">{icon}</span>
          <span className="text-[11px] font-semibold text-zinc-300">{count}</span>
          <span className="text-[11px] text-zinc-600 hidden sm:inline">{label}</span>
        </span>
      ))}
    </div>
  );
}
