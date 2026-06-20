import type { DifficultyLevel, RoadSurfaceType } from "@/lib/types";

/**
 * Formats a route distance with consistent units.
 * Values < 1 km are shown in metres.
 */
export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m`;
  if (km < 10) return `${km.toFixed(1)} km`;
  return `${Math.round(km)} km`;
}

/**
 * Converts minutes into a human-readable duration string.
 * e.g. 90 → "1h 30min"
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h   = Math.floor(minutes / 60);
  const min = minutes % 60;
  return min === 0 ? `${h}h` : `${h}h ${min}min`;
}

/**
 * Maps a DifficultyLevel to its Tailwind CSS text colour utility class.
 * Returns a safe fallback if the level is unknown.
 */
export function getDifficultyColour(level: DifficultyLevel): string {
  const map: Record<DifficultyLevel, string> = {
    beginner:     "text-green-400",
    intermediate: "text-amber-400",
    advanced:     "text-orange-400",
    extreme:      "text-red-400",
  };
  return map[level] ?? "text-zinc-400";
}

/**
 * Returns a concise human-readable label for a road surface type.
 */
export function getSurfaceLabel(surface: RoadSurfaceType): string {
  const labels: Record<RoadSurfaceType, string> = {
    asphalt_new:  "New Asphalt",
    asphalt_old:  "Asphalt",
    gravel:       "Gravel",
    dirt:         "Dirt Road",
    cobblestone:  "Cobblestone",
  };
  return labels[surface] ?? surface;
}

/**
 * Clamps a numeric value between min and max bounds.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Returns a time-relative string for alert freshness.
 * e.g. "2h ago", "Just now", "3d ago"
 */
export function timeAgo(isoString: string): string {
  const diff  = Date.now() - new Date(isoString).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);

  if (mins < 2)  return "Just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

/**
 * Merges class names, filtering out falsy values.
 * Lightweight alternative to `clsx` without the extra dep.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
