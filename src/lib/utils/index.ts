import type { AsphaltQuality, DifficultyLevel } from "@/lib/types";

/**
 * Formats a route distance with consistent units.
 * Values < 1 km are shown in metres.
 */
export function formatDistance(km: number): string {
  if (km < 1)  return `${Math.round(km * 1_000)} m`;
  if (km < 10) return `${km.toFixed(1)} km`;
  return `${Math.round(km)} km`;
}

/**
 * Converts minutes to a human-readable duration.
 * 90 → "1h 30min", 45 → "45 min", 120 → "2h"
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h   = Math.floor(minutes / 60);
  const min = minutes % 60;
  return min === 0 ? `${h}h` : `${h}h ${min}min`;
}

/**
 * Maps a DifficultyLevel to a Tailwind text-colour class.
 */
export function getDifficultyColour(level: DifficultyLevel): string {
  const map: Record<DifficultyLevel, string> = {
    beginner:     "text-green-400",
    intermediate: "text-amber-400",
    advanced:     "text-orange-400",
    extreme:      "text-red-400",
  };
  return map[level];
}

/**
 * Returns a short human-readable label for an asphalt quality value.
 */
export function getAsphaltQualityLabel(quality: AsphaltQuality): string {
  const labels: Record<AsphaltQuality, string> = {
    excellent: "Excellent surface",
    good:      "Good surface",
    fair:      "Fair — some wear",
    poor:      "Poor — caution",
    unpaved:   "Unpaved / gravel",
  };
  return labels[quality];
}

/**
 * Clamps a numeric value within [min, max].
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Returns a human-readable relative-time string for an ISO 8601 timestamp.
 * e.g. "Just now", "14m ago", "3h ago", "5d ago"
 */
export function timeAgo(isoString: string): string {
  const diff  = Date.now() - new Date(isoString).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);

  if (mins  < 2)  return "Just now";
  if (mins  < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

/**
 * Lightweight class-name merger — filters out falsy values.
 * Usage: cn("base", condition && "extra", undefined)
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
