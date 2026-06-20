"use client";

import { useState, useCallback, useRef } from "react";
import type { Map as LeafletMapInstance } from "leaflet";
import type { MapViewState, LatLng } from "@/lib/types";
import { GEORGIA_CENTER, GEORGIA_DEFAULT_ZOOM } from "@/lib/constants";

interface UseMapStateReturn {
  mapState:    MapViewState;
  mapRef:      React.MutableRefObject<LeafletMapInstance | null>;
  onMapReady:  (map: LeafletMapInstance) => void;
  flyTo:       (center: LatLng, zoom?: number) => void;
  resetView:   () => void;
}

export function useMapState(): UseMapStateReturn {
  const mapRef = useRef<LeafletMapInstance | null>(null);

  const [mapState, setMapState] = useState<MapViewState>({
    center:  GEORGIA_CENTER,
    zoom:    GEORGIA_DEFAULT_ZOOM,
    bounds:  null,
    isReady: false,
  });

  const onMapReady = useCallback((map: LeafletMapInstance) => {
    mapRef.current = map;
    setMapState((prev) => ({ ...prev, isReady: true }));
  }, []);

  /**
   * Smoothly animates the map viewport to a new center.
   * Falls back to a state update when the Leaflet instance is unavailable (SSR).
   */
  const flyTo = useCallback((center: LatLng, zoom: number = GEORGIA_DEFAULT_ZOOM) => {
    if (mapRef.current) {
      mapRef.current.flyTo([center.lat, center.lng], zoom, {
        animate:  true,
        duration: 1.2,
      });
    }
    setMapState((prev) => ({ ...prev, center, zoom }));
  }, []);

  const resetView = useCallback(() => {
    flyTo(GEORGIA_CENTER, GEORGIA_DEFAULT_ZOOM);
  }, [flyTo]);

  return { mapState, mapRef, onMapReady, flyTo, resetView };
}
