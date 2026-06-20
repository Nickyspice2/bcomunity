"use client";

import { useState, useCallback } from "react";
import type { RoadAlert } from "@/lib/types";

export interface UseUserAlertsReturn {
  userAlerts:  RoadAlert[];
  addUserAlert: (alert: RoadAlert) => void;
}

/**
 * Manages road alerts created by the current user via the map-click flow.
 * Stored in local React state — survives re-renders but not page reloads.
 */
export function useUserAlerts(): UseUserAlertsReturn {
  const [userAlerts, setUserAlerts] = useState<RoadAlert[]>([]);

  const addUserAlert = useCallback((alert: RoadAlert) => {
    setUserAlerts((prev) => [alert, ...prev]);
  }, []);

  return { userAlerts, addUserAlert };
}
