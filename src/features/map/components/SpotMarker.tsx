"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import type { BikerSpot } from "@/lib/types";
import { SPOT_TYPE_META } from "@/lib/constants";
import { KA } from "@/lib/i18n/ka";

interface SpotMarkerProps {
  spot: BikerSpot;
}

function createSpotIcon(emoji: string, color: string): L.DivIcon {
  const html = renderToStaticMarkup(
    <div
      style={{
        width:           "36px",
        height:          "36px",
        borderRadius:    "50%",
        backgroundColor: "#1e2433",
        border:          `2.5px solid ${color}`,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        fontSize:        "16px",
        lineHeight:      "1",
        boxShadow:       `0 0 0 4px ${color}25, 0 4px 14px rgba(0,0,0,0.55)`,
      }}
    >
      {emoji}
    </div>
  );

  return L.divIcon({
    html,
    className:   "",
    iconSize:    [36, 36],
    iconAnchor:  [18, 18],
    popupAnchor: [0, -22],
  });
}

/** Star string approximated to nearest whole star (e.g. 4.7 → ★★★★★). */
function buildStarString(rating: number): string {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(Math.max(0, 5 - full));
}

export function SpotMarker({ spot }: SpotMarkerProps): React.ReactElement {
  const meta = SPOT_TYPE_META[spot.type];
  const icon = createSpotIcon(meta.icon, meta.color);

  return (
    <Marker position={[spot.lat, spot.lng]} icon={icon}>
      <Popup>
        <article className="min-w-[200px] max-w-[260px]">
          <header className="flex items-start gap-2.5 mb-2">
            <span className="text-2xl leading-none" aria-hidden="true">{meta.icon}</span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold leading-tight text-zinc-100 truncate">
                {spot.name}
              </h3>
              <p className="text-[11px] mt-0.5" style={{ color: meta.color }}>
                {meta.label}
              </p>
            </div>
            {spot.verified && (
              <span
                className="ml-auto shrink-0 text-[10px] font-medium text-green-400 mt-0.5"
                title={KA.verified}
              >
                ✓
              </span>
            )}
          </header>

          {spot.rating !== undefined && (
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-xs tracking-widest"
                style={{ color: meta.color }}
                aria-label={`${spot.rating} — 5-დან`}
              >
                {buildStarString(spot.rating)}
              </span>
              <span className="text-[11px] text-zinc-500">{spot.rating.toFixed(1)}</span>
            </div>
          )}

          {spot.address && (
            <p className="text-[11px] text-zinc-500 mb-1 truncate">{spot.address}</p>
          )}

          {spot.phone && (
            <p className="text-[11px] text-zinc-500">{spot.phone}</p>
          )}
        </article>
      </Popup>
    </Marker>
  );
}
