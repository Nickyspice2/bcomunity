"use client";

import { useState, useCallback } from "react";
import type { LeafletEvent } from "leaflet";
import type { BoundingBox } from "@/lib/types";

interface UseMapBoundsReturn {
  bounds:        BoundingBox | null;
  onBoundsChange: (event: LeafletEvent) => void;
}

/**
 * Tracks the current visible bounding box of the Leaflet map.
 * Used downstream to lazy-load or filter markers within the viewport.
 */
export function useMapBounds(): UseMapBoundsReturn {
  const [bounds, setBounds] = useState<BoundingBox | null>(null);

  const onBoundsChange = useCallback((event: LeafletEvent) => {
    // `event.target` is the Leaflet Map instance
    const leafletBounds = (event.target as { getBounds: () => { getNorth: () => number; getSouth: () => number; getEast: () => number; getWest: () => number } }).getBounds();
    setBounds({
      north: leafletBounds.getNorth(),
      south: leafletBounds.getSouth(),
      east:  leafletBounds.getEast(),
      west:  leafletBounds.getWest(),
    });
  }, []);

  return { bounds, onBoundsChange };
}
