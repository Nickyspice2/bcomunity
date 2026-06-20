"use client";

import {
  Route,
  TriangleAlert,
  Coffee,
  Mountain,
  Map,
  X,
  RotateCcw,
  Navigation,
} from "lucide-react";
import type { ReactElement } from "react";
import type { FilterState, AlertCategory, DifficultyLevel, SpotCategory } from "@/lib/types";
import { ALERT_CATEGORY_META, DIFFICULTY_META, SPOT_CATEGORY_META } from "@/lib/constants";
import { SidebarSection }    from "./SidebarSection";
import { FilterToggleChip }  from "./FilterToggleChip";
import { LayerToggleRow }    from "./LayerToggleRow";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen:              boolean;
  filters:             FilterState;
  activeFilterCount:   number;
  onClose:             () => void;
  onToggleAlertCat:    (c: AlertCategory)  => void;
  onToggleDifficulty:  (d: DifficultyLevel) => void;
  onToggleSpotCat:     (c: SpotCategory)   => void;
  onToggleRoutes:      () => void;
  onToggleAlerts:      () => void;
  onToggleSpots:       () => void;
  onResetFilters:      () => void;
}

export function Sidebar({
  isOpen,
  filters,
  activeFilterCount,
  onClose,
  onToggleAlertCat,
  onToggleDifficulty,
  onToggleSpotCat,
  onToggleRoutes,
  onToggleAlerts,
  onToggleSpots,
  onResetFilters,
}: SidebarProps): ReactElement {
  const alertCategories = Object.keys(ALERT_CATEGORY_META) as AlertCategory[];
  const difficulties    = Object.keys(DIFFICULTY_META)     as DifficultyLevel[];
  const spotCategories  = Object.keys(SPOT_CATEGORY_META)  as SpotCategory[];

  return (
    <>
      {/* Backdrop — mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        role="complementary"
        aria-label="Route and map filters"
        className={cn(
          "fixed left-0 top-14 z-40 h-[calc(100dvh-3.5rem)]",
          "w-80 flex flex-col",
          // Surface
          "bg-[var(--color-surface-overlay)]",
          "border-r border-[var(--color-surface-border)]",
          // Slide animation
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0 animate-slide-in-left" : "-translate-x-full"
        )}
      >
        {/* ── Header ── */}
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--color-surface-border)] px-4">
          <div className="flex items-center gap-2">
            <Map size={15} className="text-amber-400" />
            <span className="text-sm font-semibold text-zinc-200">Filters</span>
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                {activeFilterCount} active
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={onResetFilters}
                title="Reset all filters"
                className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-medium text-zinc-500 hover:bg-white/5 hover:text-amber-400 transition-colors"
              >
                <RotateCcw size={11} />
                Reset
              </button>
            )}
            <button
              type="button"
              aria-label="Close filters"
              onClick={onClose}
              className="rounded-lg p-1.5 text-zinc-500 hover:bg-white/5 hover:text-zinc-300 transition-colors md:hidden"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Scrollable content ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain">

          {/* Map Layer Toggles */}
          <SidebarSection
            title="Map Layers"
            icon={<Map size={14} />}
            defaultOpen={true}
          >
            <LayerToggleRow
              label="Routes"
              active={filters.showRoutes}
              icon={<Navigation size={16} />}
              color="#f59e0b"
              onToggle={onToggleRoutes}
            />
            <LayerToggleRow
              label="Road Alerts"
              active={filters.showAlerts}
              icon={<TriangleAlert size={16} />}
              color="#ef4444"
              onToggle={onToggleAlerts}
            />
            <LayerToggleRow
              label="Biker Spots"
              active={filters.showSpots}
              icon={<Coffee size={16} />}
              color="#fb923c"
              onToggle={onToggleSpots}
            />
          </SidebarSection>

          {/* Road Condition Alerts */}
          <SidebarSection
            title="Road Alerts"
            icon={<TriangleAlert size={14} />}
            defaultOpen={true}
            badge={filters.alertCategories.length}
          >
            {alertCategories.map((cat) => {
              const meta   = ALERT_CATEGORY_META[cat];
              const active = filters.alertCategories.includes(cat);
              return (
                <FilterToggleChip
                  key={cat}
                  label={meta.label}
                  active={active}
                  color={meta.color}
                  bgColor={meta.bgColor}
                  onClick={() => onToggleAlertCat(cat)}
                />
              );
            })}
          </SidebarSection>

          {/* Route Difficulty */}
          <SidebarSection
            title="Difficulty"
            icon={<Mountain size={14} />}
            defaultOpen={false}
            badge={filters.difficulties.length}
          >
            {difficulties.map((level) => {
              const meta   = DIFFICULTY_META[level];
              const active = filters.difficulties.includes(level);
              return (
                <FilterToggleChip
                  key={level}
                  label={meta.label}
                  active={active}
                  color={meta.color}
                  bgColor={meta.bgColor}
                  onClick={() => onToggleDifficulty(level)}
                />
              );
            })}
          </SidebarSection>

          {/* Biker Spots */}
          <SidebarSection
            title="Spots & Services"
            icon={<Coffee size={14} />}
            defaultOpen={false}
            badge={filters.spotCategories.length}
          >
            {spotCategories.map((cat) => {
              const meta   = SPOT_CATEGORY_META[cat];
              const active = filters.spotCategories.includes(cat);
              return (
                <FilterToggleChip
                  key={cat}
                  label={meta.label}
                  active={active}
                  color={meta.color}
                  bgColor="rgba(255,255,255,0.06)"
                  icon={meta.icon}
                  onClick={() => onToggleSpotCat(cat)}
                />
              );
            })}
          </SidebarSection>

          {/* Route quick-access */}
          <SidebarSection
            title="Featured Routes"
            icon={<Route size={14} />}
            defaultOpen={true}
          >
            {[
              { name: "Military Highway",   region: "Mtskheta-Mtianeti", km: 148, diff: "Advanced"  },
              { name: "Kakheti Wine Road",  region: "Kakheti",           km: 93,  diff: "Beginner"  },
              { name: "Svaneti Challenge",  region: "Svaneti",           km: 214, diff: "Extreme"   },
              { name: "Adjara Coast Sweep", region: "Adjara",            km: 76,  diff: "Intermed." },
            ].map((route) => (
              <button
                type="button"
                key={route.name}
                className="w-full flex items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04] group"
              >
                <span
                  className="mt-0.5 shrink-0 h-6 w-6 rounded-md flex items-center justify-center bg-amber-500/10"
                  aria-hidden="true"
                >
                  <Navigation size={13} className="text-amber-400" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-medium text-zinc-200 group-hover:text-zinc-100 truncate">
                    {route.name}
                  </span>
                  <span className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-zinc-600">{route.region}</span>
                    <span className="text-[11px] text-zinc-700">·</span>
                    <span className="text-[11px] text-zinc-600">{route.km} km</span>
                  </span>
                </span>
                <span className="shrink-0 text-[10px] font-medium text-amber-500/70 pt-0.5">
                  {route.diff}
                </span>
              </button>
            ))}
          </SidebarSection>
        </div>

        {/* ── Footer — Georgia region info ── */}
        <div className="shrink-0 border-t border-[var(--color-surface-border)] px-4 py-3">
          <p className="text-[11px] text-zinc-600 leading-relaxed">
            Data covers{" "}
            <span className="text-zinc-500 font-medium">all 9 regions</span> of Georgia.
            Community-verified road conditions updated in real time.
          </p>
        </div>
      </aside>
    </>
  );
}
