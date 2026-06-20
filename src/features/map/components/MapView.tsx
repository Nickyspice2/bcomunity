"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { Map as LeafletMapInstance, LeafletEvent } from "leaflet";
import type { FilterState } from "@/lib/types";
import { MapSkeleton } from "./MapSkeleton";
import { MapOverlayStats } from "./MapOverlayStats";
import { MOCK_ALERTS, MOCK_ROUTES, MOCK_SPOTS } from "@/store/mockData";

/**
 * Dynamic import with ssr:false ensures Leaflet never runs during server-side
 * rendering — Leaflet directly accesses `window` and `document` at import time.
 */
const LeafletMap = dynamic(
  () => import("./LeafletMap").then((mod) => ({ default: mod.LeafletMap })),
  {
    ssr:     false,
    loading: () => <MapSkeleton />,
  }
);

interface MapViewProps {
  filters:        FilterState;
  onMapReady:     (map: LeafletMapInstance) => void;
  onBoundsChange: (event: LeafletEvent) => void;
  onResetView:    () => void;
  isMapReady:     boolean;
}

export function MapView({
  filters,
  onMapReady,
  onBoundsChange,
  onResetView,
  isMapReady,
}: MapViewProps): React.ReactElement {
  // Count visible entities for the stats overlay
  const visibleRouteCount = filters.showRoutes
    ? MOCK_ROUTES.filter((r) => filters.difficulties.includes(r.difficulty)).length
    : 0;
  const visibleAlertCount = filters.showAlerts
    ? MOCK_ALERTS.filter((a) => filters.alertCategories.includes(a.category)).length
    : 0;
  const visibleSpotCount  = filters.showSpots
    ? MOCK_SPOTS.filter((s) => filters.spotCategories.includes(s.category)).length
    : 0;

  return (
    <main
      className="relative flex-1 overflow-hidden"
      aria-label="Interactive map of Georgian motorcycle routes"
    >
      <Suspense fallback={<MapSkeleton />}>
        <LeafletMap
          filters={filters}
          onMapReady={onMapReady}
          onBoundsChange={onBoundsChange}
          onResetView={onResetView}
        />
      </Suspense>

      {/* Stats overlay — bottom-left, above Leaflet controls */}
      {isMapReady && (
        <MapOverlayStats
          routeCount={visibleRouteCount}
          alertCount={visibleAlertCount}
          spotCount={visibleSpotCount}
        />
      )}
    </main>
  );
}
