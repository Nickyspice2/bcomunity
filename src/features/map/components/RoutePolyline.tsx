"use client";

import { Polyline, Popup } from "react-leaflet";
import type { Route } from "@/lib/types";
import { DIFFICULTY_META, ASPHALT_QUALITY_META } from "@/lib/constants";
import { KA } from "@/lib/i18n/ka";
import { formatDistance, formatDuration } from "@/lib/utils";

interface RoutePolylineProps {
  route: Route;
}

export function RoutePolyline({ route }: RoutePolylineProps): React.ReactElement {
  const diffMeta    = DIFFICULTY_META[route.difficulty];
  const qualityMeta = ASPHALT_QUALITY_META[route.asphaltQuality];

  // Route needs at least two waypoints to form a valid polyline
  if (route.coordinates.length < 2) return <></>;

  const positions = route.coordinates.map(
    (c) => [c.lat, c.lng] as [number, number]
  );

  return (
    <Polyline
      positions={positions}
      pathOptions={{
        color:    diffMeta.color,
        weight:   5,
        opacity:  0.85,
        lineCap:  "round",
        lineJoin: "round",
      }}
    >
      <Popup>
        <article className="min-w-[230px] max-w-[290px]">
          <header className="mb-2">
            <h3 className="text-sm font-bold leading-tight text-zinc-100">
              {route.name}
            </h3>
            <p className="text-[11px] mt-0.5" style={{ color: qualityMeta.color }}>
              {qualityMeta.label} — {KA.surface}
            </p>
          </header>

          <p className="text-xs leading-relaxed text-zinc-400 mb-3 line-clamp-3">
            {route.description}
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {[
              { label: KA.distance, value: formatDistance(route.distanceKm)   },
              { label: KA.duration, value: formatDuration(route.durationMin)  },
              { label: KA.climb,    value: `${route.elevationGain} მ`         },
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
