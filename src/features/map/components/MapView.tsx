"use client";

import dynamic from "next/dynamic";
import { Suspense, useCallback, useState } from "react";
import type { Map as LeafletMapInstance, LeafletEvent } from "leaflet";
import type { FilterState, RoadAlert } from "@/lib/types";
import { useAuth }         from "@/features/auth/context/AuthContext";
import { useUserAlerts }   from "@/features/map/hooks/useUserAlerts";
import { AddAlertDialog }  from "./AddAlertDialog";
import { MapSkeleton }     from "./MapSkeleton";
import { MapOverlayStats } from "./MapOverlayStats";
import { KA }              from "@/lib/i18n/ka";
import { MOCK_ALERTS, MOCK_ROUTES, MOCK_SPOTS } from "@/store/mockData";

/**
 * Leaflet accesses `window` at import time — ssr:false ensures it never runs
 * during server-side rendering.
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
  onBoundsChange: (event: LeafletEvent)     => void;
  onResetView:    () => void;
  isMapReady:     boolean;
}

interface PendingCoords {
  lat: number;
  lng: number;
}

/**
 * Inline auth prompt — shown briefly when an unauthenticated user clicks the map.
 */
function AuthPromptToast({
  onLogin,
  onDismiss,
}: {
  onLogin:   () => void;
  onDismiss: () => void;
}): React.ReactElement {
  return (
    <div
      className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[450] animate-fade-up"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] px-4 py-3 shadow-2xl">
        <p className="text-xs text-zinc-400">{KA.addAlertLoginRequired}</p>
        <button
          type="button"
          onClick={onLogin}
          className="shrink-0 rounded-lg bg-amber-500/20 px-3 py-1.5 text-xs font-semibold text-amber-400 hover:bg-amber-500/30 transition-colors"
        >
          {KA.login}
        </button>
        <button
          type="button"
          onClick={onDismiss}
          aria-label={KA.close}
          className="shrink-0 text-zinc-600 hover:text-zinc-400 text-lg leading-none transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export function MapView({
  filters,
  onMapReady,
  onBoundsChange,
  onResetView,
  isMapReady,
}: MapViewProps): React.ReactElement {
  const { isAuthenticated, openModal } = useAuth();
  const { userAlerts, addUserAlert }   = useUserAlerts();

  const [pendingCoords, setPendingCoords] = useState<PendingCoords | null>(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  /**
   * Handles a raw map click.
   * - Authenticated users: opens the AddAlertDialog at the clicked coords.
   * - Unauthenticated users: shows an inline prompt to log in.
   */
  const handleMapClick = useCallback((lat: number, lng: number) => {
    if (isAuthenticated) {
      setPendingCoords({ lat, lng });
      setShowAuthPrompt(false);
    } else {
      setShowAuthPrompt(true);
    }
  }, [isAuthenticated]);

  const handleAlertSubmit = useCallback((alert: RoadAlert) => {
    addUserAlert(alert);
    setPendingCoords(null);
  }, [addUserAlert]);

  const handleDialogClose = useCallback(() => {
    setPendingCoords(null);
  }, []);

  const handleAuthPromptLogin = useCallback(() => {
    setShowAuthPrompt(false);
    openModal("login");
  }, [openModal]);

  // Visible entity counts for the stats overlay
  const visibleRouteCount = filters.showRoutes
    ? MOCK_ROUTES.filter((r) => filters.difficulties.includes(r.difficulty)).length
    : 0;
  const visibleAlertCount = filters.showAlerts
    ? MOCK_ALERTS.filter((a) => filters.alertTypes.includes(a.type)).length + userAlerts.length
    : userAlerts.length;
  const visibleSpotCount = filters.showSpots
    ? MOCK_SPOTS.filter((s) => filters.spotTypes.includes(s.type)).length
    : 0;

  return (
    <main
      className="relative flex-1 overflow-hidden"
      aria-label={KA.mapAriaLabel}
    >
      <Suspense fallback={<MapSkeleton />}>
        <LeafletMap
          filters={filters}
          userAlerts={userAlerts}
          onMapReady={onMapReady}
          onBoundsChange={onBoundsChange}
          onResetView={onResetView}
          onMapClick={handleMapClick}
        />
      </Suspense>

      {isMapReady && (
        <MapOverlayStats
          routeCount={visibleRouteCount}
          alertCount={visibleAlertCount}
          spotCount={visibleSpotCount}
        />
      )}

      {/* Add alert dialog */}
      {pendingCoords !== null && (
        <AddAlertDialog
          lat={pendingCoords.lat}
          lng={pendingCoords.lng}
          onSubmit={handleAlertSubmit}
          onClose={handleDialogClose}
        />
      )}

      {/* Unauthenticated user prompt */}
      {showAuthPrompt && (
        <AuthPromptToast
          onLogin={handleAuthPromptLogin}
          onDismiss={() => setShowAuthPrompt(false)}
        />
      )}
    </main>
  );
}
