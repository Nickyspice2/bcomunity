"use client";

import { ZoomIn, ZoomOut, Compass } from "lucide-react";
import { useMap } from "react-leaflet";

interface MapControlsProps {
  onResetView: () => void;
}

/**
 * Custom map control buttons positioned in the bottom-right of the map.
 * Replaces the default Leaflet zoom control for full styling control.
 */
export function MapControls({ onResetView }: MapControlsProps): React.ReactElement {
  const map = useMap();

  const handleZoomIn  = () => map.zoomIn();
  const handleZoomOut = () => map.zoomOut();

  return (
    // Leaflet's default z-index is 1000 for controls; we position manually
    <div
      className="absolute bottom-6 right-4 z-[400] flex flex-col gap-1.5"
      style={{ pointerEvents: "auto" }}
    >
      <button
        type="button"
        aria-label="Zoom in"
        onClick={handleZoomIn}
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-surface-card)] text-zinc-300 shadow-lg border border-[var(--color-surface-border)] hover:text-amber-400 hover:border-amber-500/30 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
      >
        <ZoomIn size={16} />
      </button>

      <button
        type="button"
        aria-label="Zoom out"
        onClick={handleZoomOut}
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-surface-card)] text-zinc-300 shadow-lg border border-[var(--color-surface-border)] hover:text-amber-400 hover:border-amber-500/30 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
      >
        <ZoomOut size={16} />
      </button>

      <div className="h-px bg-[var(--color-surface-border)] mx-1" aria-hidden="true" />

      <button
        type="button"
        aria-label="Reset map view to Georgia"
        onClick={onResetView}
        title="Reset to Georgia overview"
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-surface-card)] text-zinc-400 shadow-lg border border-[var(--color-surface-border)] hover:text-amber-400 hover:border-amber-500/30 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
      >
        <Compass size={16} />
      </button>
    </div>
  );
}
