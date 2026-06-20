"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import type { BikerSpot } from "@/lib/types";
import { SPOT_CATEGORY_META } from "@/lib/constants";

interface SpotMarkerProps {
  spot: BikerSpot;
}

function createSpotIcon(emoji: string, color: string): L.DivIcon {
  const html = renderToStaticMarkup(
    <div
      style={{
        width:           "34px",
        height:          "34px",
        borderRadius:    "50%",
        backgroundColor: "var(--color-surface-card, #1e2433)",
        border:          `2px solid ${color}`,
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        fontSize:        "15px",
        boxShadow:       `0 0 0 3px ${color}30, 0 4px 12px rgba(0,0,0,0.5)`,
      }}
    >
      {emoji}
    </div>
  );

  return L.divIcon({
    html,
    className:   "",
    iconSize:    [34, 34],
    iconAnchor:  [17, 17],
    popupAnchor: [0, -20],
  });
}

export function SpotMarker({ spot }: SpotMarkerProps): React.ReactElement {
  const meta = SPOT_CATEGORY_META[spot.category];
  const icon = createSpotIcon(meta.icon, meta.color);

  const ratingStars = "★".repeat(Math.round(spot.rating)) + "☆".repeat(5 - Math.round(spot.rating));

  return (
    <Marker
      position={[spot.location.lat, spot.location.lng]}
      icon={icon}
    >
      <Popup>
        <article className="min-w-[200px] max-w-[260px]">
          <header className="flex items-start gap-2 mb-2">
            <span className="text-2xl" aria-hidden="true">{meta.icon}</span>
            <div>
              <h3 className="text-sm font-bold text-zinc-100 leading-tight">{spot.name}</h3>
              <p className="text-[11px]" style={{ color: meta.color }}>{meta.label}</p>
            </div>
          </header>

          <p className="text-xs text-zinc-400 leading-relaxed mb-3">
            {spot.description}
          </p>

          <div className="flex items-center justify-between mb-2">
            <span className="text-amber-400 text-xs tracking-widest" aria-label={`${spot.rating} out of 5`}>
              {ratingStars}
            </span>
            <span className="text-[11px] text-zinc-600">{spot.reviewCount} reviews</span>
          </div>

          {spot.openHours && (
            <p className="text-[11px] text-zinc-500">
              <span className="text-zinc-600">Hours: </span>
              {spot.openHours}
            </p>
          )}

          {spot.address && (
            <p className="text-[11px] text-zinc-600 mt-1 truncate">{spot.address}</p>
          )}
        </article>
      </Popup>
    </Marker>
  );
}
