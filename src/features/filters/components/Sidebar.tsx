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
import type { AlertType, DifficultyLevel, FilterState, SpotType } from "@/lib/types";
import { ALERT_TYPE_META, DIFFICULTY_META, SPOT_TYPE_META } from "@/lib/constants";
import { KA } from "@/lib/i18n/ka";
import { SidebarSection }   from "./SidebarSection";
import { FilterToggleChip } from "./FilterToggleChip";
import { LayerToggleRow }   from "./LayerToggleRow";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen:             boolean;
  filters:            FilterState;
  activeFilterCount:  number;
  onClose:            () => void;
  onToggleAlertType:  (type: AlertType)        => void;
  onToggleDifficulty: (level: DifficultyLevel) => void;
  onToggleSpotType:   (type: SpotType)         => void;
  onToggleRoutes:     () => void;
  onToggleAlerts:     () => void;
  onToggleSpots:      () => void;
  onResetFilters:     () => void;
}

export function Sidebar({
  isOpen,
  filters,
  activeFilterCount,
  onClose,
  onToggleAlertType,
  onToggleDifficulty,
  onToggleSpotType,
  onToggleRoutes,
  onToggleAlerts,
  onToggleSpots,
  onResetFilters,
}: SidebarProps): ReactElement {
  const alertTypes   = Object.keys(ALERT_TYPE_META)  as AlertType[];
  const difficulties = Object.keys(DIFFICULTY_META)  as DifficultyLevel[];
  const spotTypes    = Object.keys(SPOT_TYPE_META)   as SpotType[];

  // Static featured route list — kept in Sidebar since it's presentational
  const featuredRoutes = [
    { id: "r-001", name: "სამხედრო გზა",       region: "მცხეთა-მთიანეთი",  km: 148, diff: "რთული"      },
    { id: "r-002", name: "გომბორის უღელტეხილი", region: "კახეთი",           km: 102, diff: "საშუალო"    },
    { id: "r-003", name: "სვანეთის გზა",         region: "სვანეთი",          km: 132, diff: "ექსტრემ."   },
    { id: "r-004", name: "აჭარის სანაპირო",      region: "აჭარა",            km: 68,  diff: "მარტივი"    },
    { id: "r-005", name: "ბორჯომის ხეობა",       region: "სამცხე-ჯავახეთი", km: 88,  diff: "საშუალო"    },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      <aside
        role="complementary"
        aria-label={KA.filters}
        className={cn(
          "fixed left-0 top-14 z-40 h-[calc(100dvh-3.5rem)]",
          "w-80 flex flex-col",
          "bg-[var(--color-surface-overlay)]",
          "border-r border-[var(--color-surface-border)]",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0 animate-slide-in-left" : "-translate-x-full"
        )}
      >
        {/* ── Header ── */}
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--color-surface-border)] px-4">
          <div className="flex items-center gap-2">
            <Map size={15} className="text-amber-400" />
            <span className="text-sm font-semibold text-zinc-200">{KA.filters}</span>
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                {activeFilterCount} {KA.activeCount}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={onResetFilters}
                title={KA.resetFilters}
                className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-medium text-zinc-500 hover:bg-white/5 hover:text-amber-400 transition-colors"
              >
                <RotateCcw size={11} />
                {KA.resetFilters}
              </button>
            )}
            <button
              type="button"
              aria-label={KA.close}
              onClick={onClose}
              className="rounded-lg p-1.5 text-zinc-500 hover:bg-white/5 hover:text-zinc-300 transition-colors md:hidden"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto overscroll-contain">

          {/* Layer visibility toggles */}
          <SidebarSection title={KA.mapLayers} icon={<Map size={14} />} defaultOpen={true}>
            <LayerToggleRow
              label={KA.routes}
              active={filters.showRoutes}
              icon={<Navigation size={16} />}
              color="#f59e0b"
              onToggle={onToggleRoutes}
            />
            <LayerToggleRow
              label={KA.roadAlerts}
              active={filters.showAlerts}
              icon={<TriangleAlert size={16} />}
              color="#ef4444"
              onToggle={onToggleAlerts}
            />
            <LayerToggleRow
              label={KA.bikerSpots}
              active={filters.showSpots}
              icon={<Coffee size={16} />}
              color="#fb923c"
              onToggle={onToggleSpots}
            />
          </SidebarSection>

          {/* Road alert type filters */}
          <SidebarSection
            title={KA.roadAlertsSection}
            icon={<TriangleAlert size={14} />}
            defaultOpen={true}
            badge={filters.alertTypes.length}
          >
            {alertTypes.map((type) => {
              const meta   = ALERT_TYPE_META[type];
              const active = filters.alertTypes.includes(type);
              return (
                <FilterToggleChip
                  key={type}
                  label={meta.label}
                  active={active}
                  color={meta.color}
                  bgColor={meta.bgColor}
                  onClick={() => onToggleAlertType(type)}
                />
              );
            })}
          </SidebarSection>

          {/* Route difficulty filters */}
          <SidebarSection
            title={KA.difficulty}
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

          {/* Biker spot type filters */}
          <SidebarSection
            title={KA.spotsServices}
            icon={<Coffee size={14} />}
            defaultOpen={false}
            badge={filters.spotTypes.length}
          >
            {spotTypes.map((type) => {
              const meta   = SPOT_TYPE_META[type];
              const active = filters.spotTypes.includes(type);
              return (
                <FilterToggleChip
                  key={type}
                  label={meta.label}
                  active={active}
                  color={meta.color}
                  bgColor="rgba(255,255,255,0.05)"
                  icon={meta.icon}
                  onClick={() => onToggleSpotType(type)}
                />
              );
            })}
          </SidebarSection>

          {/* Featured routes quick list */}
          <SidebarSection
            title={KA.featuredRoutes}
            icon={<Route size={14} />}
            defaultOpen={true}
          >
            {featuredRoutes.map((route) => (
              <button
                type="button"
                key={route.id}
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
                    <span className="text-[11px] text-zinc-700" aria-hidden="true">·</span>
                    <span className="text-[11px] text-zinc-600">{route.km} {KA.kmSuffix}</span>
                  </span>
                </span>
                <span className="shrink-0 text-[10px] font-medium text-amber-500/70 pt-0.5">
                  {route.diff}
                </span>
              </button>
            ))}
          </SidebarSection>
        </div>

        {/* ── Footer ── */}
        <div className="shrink-0 border-t border-[var(--color-surface-border)] px-4 py-3">
          <p className="text-[11px] text-zinc-600 leading-relaxed">
            {KA.sidebarFooter}{" "}
            <span className="text-zinc-500 font-medium">{KA.allNineRegions}</span>.{" "}
            {KA.communityVerified}
          </p>
        </div>
      </aside>
    </>
  );
}
