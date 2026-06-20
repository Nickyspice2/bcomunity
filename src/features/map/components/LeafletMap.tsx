"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import type { Map as LeafletMapInstance, LeafletEvent, LeafletMouseEvent } from "leaflet";
import type { FilterState, RoadAlert } from "@/lib/types";
import {
  GEORGIA_CENTER,
  GEORGIA_DEFAULT_ZOOM,
  GEORGIA_MIN_ZOOM,
  GEORGIA_MAX_ZOOM,
  MAP_TILE_URL,
  MAP_TILE_ATTR,
  MAP_TILE_SUBDOM,
} from "@/lib/constants";
import { MOCK_ALERTS, MOCK_ROUTES, MOCK_SPOTS } from "@/store/mockData";
import { AlertMarker }   from "./AlertMarker";
import { RoutePolyline } from "./RoutePolyline";
import { SpotMarker }    from "./SpotMarker";
import { MapControls }   from "./MapControls";

// ─── Internal Leaflet event bridge ────────────────────────────────────────────

interface MapEventBridgeProps {
  onReady:        (map: LeafletMapInstance) => void;
  onBoundsChange: (event: LeafletEvent)     => void;
  onMapClick:     (lat: number, lng: number) => void;
}

/**
 * Must be rendered inside <MapContainer> to access the Leaflet map context.
 * Bridges Leaflet instance events to our React hook callbacks.
 *
 * Click coordinates are only forwarded when the user left-clicks the base map,
 * not when they interact with a marker or popup (those events bubble-stop
 * at the marker layer so this handler fires correctly on empty areas).
 */
function MapEventBridge({ onReady, onBoundsChange, onMapClick }: MapEventBridgeProps): null {
  const map = useMap() as LeafletMapInstance;

  useEffect(() => {
    onReady(map);
  }, [map, onReady]);

  useMapEvents({
    moveend: onBoundsChange,
    zoomend: onBoundsChange,
    click: (e: LeafletMouseEvent) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}

// ─── Component ───────────────────────────────────────────────────────────────

interface LeafletMapProps {
  filters:        FilterState;
  userAlerts:     RoadAlert[];
  onMapReady:     (map: LeafletMapInstance) => void;
  onBoundsChange: (event: LeafletEvent)     => void;
  onResetView:    () => void;
  /** Called when the user clicks an empty area on the map. */
  onMapClick:     (lat: number, lng: number) => void;
}

export function LeafletMap({
  filters,
  userAlerts,
  onMapReady,
  onBoundsChange,
  onResetView,
  onMapClick,
}: LeafletMapProps): React.ReactElement {
  const visibleRoutes = filters.showRoutes
    ? MOCK_ROUTES.filter((r) => filters.difficulties.includes(r.difficulty))
    : [];

  const visibleAlerts = filters.showAlerts
    ? MOCK_ALERTS.filter((a) => filters.alertTypes.includes(a.type))
    : [];

  const visibleSpots = filters.showSpots
    ? MOCK_SPOTS.filter((s) => filters.spotTypes.includes(s.type))
    : [];

  // User-created alerts are always visible regardless of current filter state,
  // giving instant visual confirmation that the report was received.
  const allAlerts = [...visibleAlerts, ...userAlerts];

  return (
    <MapContainer
      center={[GEORGIA_CENTER.lat, GEORGIA_CENTER.lng]}
      zoom={GEORGIA_DEFAULT_ZOOM}
      minZoom={GEORGIA_MIN_ZOOM}
      maxZoom={GEORGIA_MAX_ZOOM}
      zoomControl={false}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
      className="z-0"
    >
      <TileLayer
        url={MAP_TILE_URL}
        attribution={MAP_TILE_ATTR}
        subdomains={MAP_TILE_SUBDOM}
        maxZoom={GEORGIA_MAX_ZOOM}
      />

      <MapEventBridge
        onReady={onMapReady}
        onBoundsChange={onBoundsChange}
        onMapClick={onMapClick}
      />

      <MapControls onResetView={onResetView} />

      {visibleRoutes.map((route) => (
        <RoutePolyline key={route.id} route={route} />
      ))}

      {allAlerts.map((alert) => (
        <AlertMarker key={alert.id} alert={alert} />
      ))}

      {visibleSpots.map((spot) => (
        <SpotMarker key={spot.id} spot={spot} />
      ))}
    </MapContainer>
  );
}
