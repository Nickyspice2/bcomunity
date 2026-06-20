"use client";

import { useState, useCallback } from "react";
import { SlidersHorizontal } from "lucide-react";
import { TopBar }   from "./TopBar";
import { Sidebar }  from "@/features/filters/components/Sidebar";
import { MapView }  from "@/features/map/components/MapView";
import { useRouteFilters } from "@/features/filters/hooks/useRouteFilters";
import { useMapState }     from "@/features/map/hooks/useMapState";
import { useMapBounds }    from "@/features/map/hooks/useMapBounds";
import { IconButton }      from "@/components/ui/IconButton";
import { ErrorBoundary }   from "@/components/ui/ErrorBoundary";
import { cn } from "@/lib/utils";
import { MOCK_ALERTS } from "@/store/mockData";

export function DashboardLayout(): React.ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const {
    filters,
    toggleAlertCategory,
    toggleDifficulty,
    toggleSpotCategory,
    toggleShowRoutes,
    toggleShowAlerts,
    toggleShowSpots,
    setSearchQuery,
    resetFilters,
    activeFilterCount,
  } = useRouteFilters();

  const { mapState, onMapReady, resetView } = useMapState();
  const { onBoundsChange } = useMapBounds();

  const toggleSidebar  = useCallback(() => setSidebarOpen((v) => !v), []);
  const closeSidebar   = useCallback(() => setSidebarOpen(false),     []);

  // Active alert count for the topbar notification badge
  const activeAlertCount = filters.showAlerts
    ? MOCK_ALERTS.filter((a) => filters.alertCategories.includes(a.category)).length
    : 0;

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-[var(--color-surface-base)]">

      {/* ── Top navigation bar ── */}
      <TopBar
        searchQuery={filters.searchQuery}
        onSearchChange={setSearchQuery}
        activeAlertCount={activeAlertCount}
        onSidebarToggle={toggleSidebar}
        sidebarOpen={sidebarOpen}
      />

      {/* ── Body: sidebar + map ── */}
      <div className="relative flex flex-1 overflow-hidden pt-14">

        {/* Filter sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          filters={filters}
          activeFilterCount={activeFilterCount}
          onClose={closeSidebar}
          onToggleAlertCat={toggleAlertCategory}
          onToggleDifficulty={toggleDifficulty}
          onToggleSpotCat={toggleSpotCategory}
          onToggleRoutes={toggleShowRoutes}
          onToggleAlerts={toggleShowAlerts}
          onToggleSpots={toggleShowSpots}
          onResetFilters={resetFilters}
        />

        {/* Map view — offset by sidebar width on larger viewports */}
        <div
          className={cn(
            "flex-1 transition-[margin] duration-300 ease-in-out",
            // On md+ screens the sidebar pushes the map; on mobile it overlays
            sidebarOpen ? "md:ml-80" : "ml-0"
          )}
        >
          <ErrorBoundary context="map">
            <MapView
              filters={filters}
              onMapReady={onMapReady}
              onBoundsChange={onBoundsChange}
              onResetView={resetView}
              isMapReady={mapState.isReady}
            />
          </ErrorBoundary>
        </div>

        {/* Mobile-only floating filter FAB */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[450] md:hidden">
          <button
            type="button"
            onClick={toggleSidebar}
            className={cn(
              "flex items-center gap-2 rounded-full px-5 py-2.5",
              "bg-amber-500 text-zinc-900 font-semibold text-sm shadow-xl",
              "hover:bg-amber-400 active:scale-95 transition-all duration-150",
              "shadow-[0_0_24px_rgba(245,158,11,0.45)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
            )}
          >
            <SlidersHorizontal size={16} strokeWidth={2.5} />
            Filters
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-zinc-900/40 px-1.5 py-0.5 text-[10px] font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Desktop sidebar toggle — visible when sidebar is closed */}
        {!sidebarOpen && (
          <div className="absolute left-3 top-3 z-[450] hidden md:block animate-fade-up">
            <IconButton
              icon={<SlidersHorizontal size={16} />}
              label="Open filters"
              badge={activeFilterCount}
              active={false}
              onClick={toggleSidebar}
              className="bg-[var(--color-surface-card)] border border-[var(--color-surface-border)] shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
