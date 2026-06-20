"use client";

import { useState, useCallback, useRef } from "react";
import type { Map as LeafletMapInstance } from "leaflet";
import type { Coordinate, MapViewState } from "@/lib/types";
import { GEORGIA_CENTER, GEORGIA_DEFAULT_ZOOM } from "@/lib/constants";

export interface UseMapStateReturn {
  mapState:   MapViewState;
  mapRef:     React.MutableRefObject<LeafletMapInstance | null>;
  onMapReady: (map: LeafletMapInstance) => void;
  flyTo:      (center: Coordinate, zoom?: number) => void;
  resetView:  () => void;
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
   * Smooth animated pan + zoom.
   * Falls back to a React state update when the Leaflet instance is not yet
   * available (during SSR or before the dynamic import resolves).
   */
  const flyTo = useCallback((center: Coordinate, zoom: number = GEORGIA_DEFAULT_ZOOM) => {
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
