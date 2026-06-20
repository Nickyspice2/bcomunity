"use client";

import { Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import type { RoadAlert } from "@/lib/types";
import { ALERT_CATEGORY_META } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";

interface AlertMarkerProps {
  alert: RoadAlert;
}

/**
 * Creates a custom SVG div-icon for Leaflet from our design-system colours.
 * We use `renderToStaticMarkup` so we get a proper SVG string without
 * needing a separate asset file.
 */
function createAlertIcon(color: string, bgColor: string): L.DivIcon {
  const svgString = renderToStaticMarkup(
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="36" viewBox="0 0 32 36">
      {/* Drop-shadow filter */}
      <defs>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.5)" />
        </filter>
      </defs>
      {/* Pin shape */}
      <path
        d="M16 2 C9.4 2 4 7.4 4 14 C4 22 16 34 16 34 C16 34 28 22 28 14 C28 7.4 22.6 2 16 2 Z"
        fill={bgColor.replace("0.12", "0.9")}
        stroke={color}
        strokeWidth="1.5"
        filter="url(#shadow)"
      />
      {/* Centre dot */}
      <circle cx="16" cy="14" r="5" fill={color} opacity="0.9" />
    </svg>
  );

  return L.divIcon({
    html:        svgString,
    className:   "",
    iconSize:    [32, 36],
    iconAnchor:  [16, 36],
    popupAnchor: [0, -38],
  });
}

export function AlertMarker({ alert }: AlertMarkerProps): React.ReactElement {
  const meta = ALERT_CATEGORY_META[alert.category];
  const icon = createAlertIcon(meta.color, meta.bgColor);

  return (
    <>
      {/* Area of effect circle */}
      {alert.radius > 0 && (
        <Circle
          center={[alert.location.lat, alert.location.lng]}
          radius={alert.radius}
          pathOptions={{
            color:       meta.color,
            fillColor:   meta.color,
            fillOpacity: 0.06,
            weight:      1,
            dashArray:   "4 4",
          }}
        />
      )}

      <Marker
        position={[alert.location.lat, alert.location.lng]}
        icon={icon}
      >
        <Popup>
          <article className="min-w-[200px] max-w-[260px]">
            <header className="flex items-center gap-2 mb-2">
              <span
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px]"
                style={{ backgroundColor: meta.bgColor.replace("0.12", "0.25"), color: meta.color }}
              >
                ●
              </span>
              <span
                className="text-[11px] font-semibold uppercase tracking-wide"
                style={{ color: meta.color }}
              >
                {meta.label}
              </span>
            </header>

            <h3 className="text-sm font-semibold text-zinc-100 leading-tight mb-1">
              {alert.title}
            </h3>

            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              {alert.description}
            </p>

            <footer className="flex items-center justify-between">
              <span className="text-[11px] text-zinc-600">
                {timeAgo(alert.reportedAt)}
              </span>
              {alert.verified && (
                <span className="text-[11px] font-medium text-green-400">✓ Verified</span>
              )}
            </footer>
          </article>
        </Popup>
      </Marker>
    </>
  );
}
