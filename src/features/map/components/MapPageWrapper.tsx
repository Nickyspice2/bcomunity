"use client";

import dynamic from "next/dynamic";
import { Suspense, useCallback, useState } from "react";
import type { RoadAlert } from "@/lib/types";
import { useAuth }             from "@/features/auth/context/AuthContext";
import { useRouteFilters }     from "@/features/filters/hooks/useRouteFilters";
import { useUserAlerts }       from "@/features/map/hooks/useUserAlerts";
import { useMapState }         from "@/features/map/hooks/useMapState";
import { useMapBounds }        from "@/features/map/hooks/useMapBounds";
import { AddAlertDialog }      from "./AddAlertDialog";
import { MapFloatingFilter }   from "./MapFloatingFilter";
import { MapSkeleton }         from "./MapSkeleton";
import { MapOverlayStats }     from "./MapOverlayStats";
import { KA }                  from "@/lib/i18n/ka";
import { cn }                  from "@/lib/utils";
import { MOCK_ALERTS, MOCK_ROUTES, MOCK_SPOTS } from "@/store/mockData";

const LeafletMap = dynamic(
  () => import("./LeafletMap").then((m) => ({ default: m.LeafletMap })),
  { ssr: false, loading: () => <MapSkeleton /> }
);

/** Brief inline prompt shown when an unauthenticated user clicks the map. */
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
      <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)]/90 px-4 py-3 shadow-2xl backdrop-blur-sm">
        <p className="text-xs text-zinc-400">{KA.addAlertLoginRequired}</p>
        <button
          type="button"
          onClick={onLogin}
          className="shrink-0 rounded-lg bg-amber-500/18 px-3 py-1.5 text-xs font-semibold text-amber-400 hover:bg-amber-500/30 transition-colors"
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

/**
 * Full-screen map page wrapper.
 * Owns all map-specific state: alerts, filter, add-alert flow.
 */
export function MapPageWrapper(): React.ReactElement {
  const { isAuthenticated, openModal } = useAuth();

  const {
    filters,
    toggleAlertType,
    toggleShowRoutes,
    toggleShowAlerts,
    toggleShowSpots,
    resetFilters,
    activeFilterCount,
  } = useRouteFilters();

  const { userAlerts, addUserAlert } = useUserAlerts();
  const { mapState, onMapReady, resetView } = useMapState();
  const { onBoundsChange } = useMapBounds();

  const [pendingCoords, setPendingCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const handleMapClick = useCallback(
    (lat: number, lng: number) => {
      if (isAuthenticated) {
        setPendingCoords({ lat, lng });
        setShowAuthPrompt(false);
      } else {
        setShowAuthPrompt(true);
      }
    },
    [isAuthenticated]
  );

  const handleAlertSubmit = useCallback(
    (alert: RoadAlert) => {
      addUserAlert(alert);
      setPendingCoords(null);
    },
    [addUserAlert]
  );

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
    <div
      className="relative h-[calc(100vh-64px)] w-full overflow-hidden"
      aria-label={KA.mapAriaLabel}
    >
      <Suspense fallback={<MapSkeleton />}>
        <LeafletMap
          filters={filters}
          userAlerts={userAlerts}
          onMapReady={onMapReady}
          onBoundsChange={onBoundsChange}
          onResetView={resetView}
          onMapClick={handleMapClick}
        />
      </Suspense>

      {/* Floating filter panel */}
      <MapFloatingFilter
        filters={filters}
        toggleAlertType={toggleAlertType}
        toggleShowRoutes={toggleShowRoutes}
        toggleShowAlerts={toggleShowAlerts}
        toggleShowSpots={toggleShowSpots}
        resetFilters={resetFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* Hint label when map is ready */}
      {mapState.isReady && !isAuthenticated && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[400]">
          <div className={cn(
            "flex items-center gap-2 rounded-full border border-[var(--color-surface-border)]",
            "bg-[var(--color-surface-card)]/80 backdrop-blur-sm px-4 py-2 text-xs text-zinc-500 shadow-lg"
          )}>
            <span>შედით სისტემაში საფრთხის დასამატებლად</span>
          </div>
        </div>
      )}

      {/* Entity count overlay */}
      {mapState.isReady && (
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
          onClose={() => setPendingCoords(null)}
        />
      )}

      {/* Auth prompt toast */}
      {showAuthPrompt && (
        <AuthPromptToast
          onLogin={() => { setShowAuthPrompt(false); openModal("login"); }}
          onDismiss={() => setShowAuthPrompt(false)}
        />
      )}
    </div>
  );
}
