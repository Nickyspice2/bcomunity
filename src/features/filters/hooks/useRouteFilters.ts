"use client";

import { useState, useCallback, useMemo } from "react";
import type { AlertType, DifficultyLevel, FilterState, SpotType } from "@/lib/types";
import { DEFAULT_FILTERS } from "@/lib/constants";

export interface UseRouteFiltersReturn {
  filters:            FilterState;
  toggleAlertType:    (type: AlertType)        => void;
  toggleDifficulty:   (level: DifficultyLevel) => void;
  toggleSpotType:     (type: SpotType)         => void;
  toggleShowRoutes:   () => void;
  toggleShowAlerts:   () => void;
  toggleShowSpots:    () => void;
  setSearchQuery:     (query: string)          => void;
  resetFilters:       () => void;
  /** Number of filter groups deviating from default — drives the badge on the filter button. */
  activeFilterCount:  number;
}

function toggleItem<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

export function useRouteFilters(): UseRouteFiltersReturn {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const toggleAlertType = useCallback((type: AlertType) => {
    setFilters((prev) => ({
      ...prev,
      alertTypes: toggleItem(prev.alertTypes, type),
    }));
  }, []);

  const toggleDifficulty = useCallback((level: DifficultyLevel) => {
    setFilters((prev) => ({
      ...prev,
      difficulties: toggleItem(prev.difficulties, level),
    }));
  }, []);

  const toggleSpotType = useCallback((type: SpotType) => {
    setFilters((prev) => ({
      ...prev,
      spotTypes: toggleItem(prev.spotTypes, type),
    }));
  }, []);

  const toggleShowRoutes = useCallback(() => {
    setFilters((prev) => ({ ...prev, showRoutes: !prev.showRoutes }));
  }, []);

  const toggleShowAlerts = useCallback(() => {
    setFilters((prev) => ({ ...prev, showAlerts: !prev.showAlerts }));
  }, []);

  const toggleShowSpots = useCallback(() => {
    setFilters((prev) => ({ ...prev, showSpots: !prev.showSpots }));
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const activeFilterCount = useMemo<number>(() => {
    let count = 0;
    if (!filters.showRoutes) count++;
    if (!filters.showAlerts) count++;
    if (!filters.showSpots)  count++;
    if (filters.alertTypes.length   !== DEFAULT_FILTERS.alertTypes.length)   count++;
    if (filters.difficulties.length !== DEFAULT_FILTERS.difficulties.length) count++;
    if (filters.spotTypes.length    !== DEFAULT_FILTERS.spotTypes.length)    count++;
    if (filters.searchQuery.trim()) count++;
    return count;
  }, [filters]);

  return {
    filters,
    toggleAlertType,
    toggleDifficulty,
    toggleSpotType,
    toggleShowRoutes,
    toggleShowAlerts,
    toggleShowSpots,
    setSearchQuery,
    resetFilters,
    activeFilterCount,
  };
}
