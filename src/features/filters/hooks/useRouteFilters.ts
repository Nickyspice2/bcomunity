"use client";

import { useState, useCallback, useMemo } from "react";
import type { FilterState, AlertCategory, DifficultyLevel, SpotCategory } from "@/lib/types";
import { DEFAULT_FILTERS } from "@/lib/constants";

interface UseRouteFiltersReturn {
  filters:              FilterState;
  toggleAlertCategory:  (category: AlertCategory) => void;
  toggleDifficulty:     (level: DifficultyLevel)   => void;
  toggleSpotCategory:   (category: SpotCategory)   => void;
  toggleShowRoutes:     () => void;
  toggleShowAlerts:     () => void;
  toggleShowSpots:      () => void;
  setSearchQuery:       (query: string) => void;
  resetFilters:         () => void;
  activeFilterCount:    number;
}

function toggleItem<T>(list: T[], item: T): T[] {
  return list.includes(item)
    ? list.filter((x) => x !== item)
    : [...list, item];
}

export function useRouteFilters(): UseRouteFiltersReturn {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const toggleAlertCategory = useCallback((category: AlertCategory) => {
    setFilters((prev) => ({
      ...prev,
      alertCategories: toggleItem(prev.alertCategories, category),
    }));
  }, []);

  const toggleDifficulty = useCallback((level: DifficultyLevel) => {
    setFilters((prev) => ({
      ...prev,
      difficulties: toggleItem(prev.difficulties, level),
    }));
  }, []);

  const toggleSpotCategory = useCallback((category: SpotCategory) => {
    setFilters((prev) => ({
      ...prev,
      spotCategories: toggleItem(prev.spotCategories, category),
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

  /**
   * Counts how many filter groups deviate from their defaults.
   * Used to show a "badge" on the filter toggle button.
   */
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (!filters.showRoutes) count++;
    if (!filters.showAlerts) count++;
    if (!filters.showSpots)  count++;
    if (filters.alertCategories.length !== DEFAULT_FILTERS.alertCategories.length) count++;
    if (filters.difficulties.length    !== DEFAULT_FILTERS.difficulties.length)    count++;
    if (filters.spotCategories.length  !== DEFAULT_FILTERS.spotCategories.length)  count++;
    if (filters.searchQuery.trim())  count++;
    return count;
  }, [filters]);

  return {
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
  };
}
