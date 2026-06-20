"use client";

import { Polyline, Popup } from "react-leaflet";
import type { Route } from "@/lib/types";
import { DIFFICULTY_META } from "@/lib/constants";
import { formatDistance, formatDuration } from "@/lib/utils";

interface RoutePolylineProps {
  route: Route;
}

/** Converts our domain colour to a slightly more opaque version for the route line */
function toRouteColor(hexColor: string): string {
  return hexColor;
}

export function RoutePolyline({ route }: RoutePolylineProps): React.ReactElement {
  const diffMeta  = DIFFICULTY_META[route.difficulty];
  const positions = route.waypoints.map(
    (wp) => [wp.lat, wp.lng] as [number, number]
  );

  if (positions.length < 2) return <></>;

  return (
    <Polyline
      positions={positions}
      pathOptions={{
        color:   toRouteColor(diffMeta.color),
        weight:  5,
        opacity: 0.85,
        // Glow effect via multiple overlapping lines would require a custom layer
        // Here we use a clean single-line with good contrast
        lineCap:  "round",
        lineJoin: "round",
      }}
    >
      <Popup>
        <article className="min-w-[220px] max-w-[280px]">
          <h3 className="text-sm font-bold text-zinc-100 leading-tight mb-1">
            {route.name}
          </h3>

          <p className="text-xs text-zinc-400 leading-relaxed mb-3 line-clamp-2">
            {route.description}
          </p>

          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: "Distance", value: formatDistance(route.distanceKm) },
              { label: "Duration", value: formatDuration(route.durationMin) },
              { label: "Climb",    value: `${route.elevationGain}m` },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-lg py-2 px-1"
                style={{ backgroundColor: "var(--color-surface-raised)" }}
              >
                <span className="text-xs font-semibold text-zinc-200">{value}</span>
                <span className="text-[10px] text-zinc-600 mt-0.5">{label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span
              className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
              style={{ backgroundColor: diffMeta.bgColor, color: diffMeta.color }}
            >
              {diffMeta.label}
            </span>
            <span className="text-[11px] text-zinc-600">{route.region}</span>
          </div>
        </article>
      </Popup>
    </Polyline>
  );
}
