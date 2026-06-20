"use client";

import { useState, useCallback } from "react";
import type { LeafletEvent } from "leaflet";
import type { BoundingBox } from "@/lib/types";

export interface UseMapBoundsReturn {
  bounds:         BoundingBox | null;
  onBoundsChange: (event: LeafletEvent) => void;
}

/**
 * Tracks the current visible bounding box of the Leaflet map.
 * Downstream consumers use this to lazy-load or spatially filter markers
 * to only those within the current viewport.
 */
export function useMapBounds(): UseMapBoundsReturn {
  const [bounds, setBounds] = useState<BoundingBox | null>(null);

  const onBoundsChange = useCallback((event: LeafletEvent) => {
    type BoundsInstance = {
      getNorth: () => number;
      getSouth: () => number;
      getEast:  () => number;
      getWest:  () => number;
    };
    const b = (event.target as { getBounds: () => BoundsInstance }).getBounds();
    setBounds({
      north: b.getNorth(),
      south: b.getSouth(),
      east:  b.getEast(),
      west:  b.getWest(),
    });
  }, []);

  return { bounds, onBoundsChange };
}
