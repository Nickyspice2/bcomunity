"use client";

import { Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import type { RoadAlert } from "@/lib/types";
import { ALERT_TYPE_META, ALERT_SEVERITY_META } from "@/lib/constants";
import { KA } from "@/lib/i18n/ka";
import { timeAgo } from "@/lib/utils";

interface AlertMarkerProps {
  alert: RoadAlert;
}

/**
 * Builds a custom SVG DivIcon from design-system colour tokens.
 * High-severity alerts receive a CSS pulse-glow animation.
 */
function createAlertIcon(
  color:    string,
  bgColor:  string,
  severity: RoadAlert["severity"]
): L.DivIcon {
  const isPulsing = severity === "high";

  const svgMarkup = renderToStaticMarkup(
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="38" viewBox="0 0 32 38">
      <defs>
        <filter id="ds" x="-40%" y="-30%" width="180%" height="180%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.55)" />
        </filter>
      </defs>
      {/* Teardrop pin */}
      <path
        d="M16 2C9.4 2 4 7.4 4 14c0 8.5 12 24 12 24s12-15.5 12-24C28 7.4 22.6 2 16 2z"
        fill={bgColor.replace("0.12", "0.88")}
        stroke={color}
        strokeWidth="1.5"
        filter="url(#ds)"
      />
      {/* Inner dot */}
      <circle cx="16" cy="14" r="5.5" fill={color} opacity="0.95" />
    </svg>
  );

  return L.divIcon({
    html:        `<div ${isPulsing ? 'class="animate-pulse-glow"' : ""}>${svgMarkup}</div>`,
    className:   "",
    iconSize:    [32, 38],
    iconAnchor:  [16, 38],
    popupAnchor: [0, -40],
  });
}

export function AlertMarker({ alert }: AlertMarkerProps): React.ReactElement {
  const typeMeta     = ALERT_TYPE_META[alert.type];
  const severityMeta = ALERT_SEVERITY_META[alert.severity];
  const icon         = createAlertIcon(typeMeta.color, typeMeta.bgColor, alert.severity);

  return (
    <>
      {alert.radius > 0 && (
        <Circle
          center={[alert.lat, alert.lng]}
          radius={alert.radius}
          pathOptions={{
            color:       typeMeta.color,
            fillColor:   typeMeta.color,
            fillOpacity: 0.06,
            weight:      1,
            dashArray:   "5 5",
          }}
        />
      )}

      <Marker position={[alert.lat, alert.lng]} icon={icon}>
        <Popup>
          <article className="min-w-[210px] max-w-[270px]">
            <header className="flex items-center gap-2 mb-2.5">
              <span
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: typeMeta.bgColor.replace("0.12", "0.22"),
                  color:           typeMeta.color,
                }}
                aria-hidden="true"
              >
                ●
              </span>
              <span
                className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: typeMeta.color }}
              >
                {typeMeta.label}
              </span>
              <span
                className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold"
                style={{
                  backgroundColor: `${severityMeta.color}20`,
                  color:           severityMeta.color,
                }}
              >
                {severityMeta.label}
              </span>
            </header>

            <p className="text-xs leading-relaxed text-zinc-300 mb-3">
              {alert.description}
            </p>

            <footer className="flex items-center justify-between border-t border-zinc-700/50 pt-2">
              <span className="text-[11px] text-zinc-600">{timeAgo(alert.reportedAt)}</span>
              {alert.verified
                ? <span className="text-[11px] font-medium text-green-400">{KA.verified}</span>
                : <span className="text-[11px] text-zinc-600">{KA.communityReport}</span>
              }
            </footer>
          </article>
        </Popup>
      </Marker>
    </>
  );
}
