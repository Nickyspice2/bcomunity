/**
 * Returns a Georgian relative-time string for an ISO 8601 timestamp.
 * e.g. "ახლახანს", "14 წ. წინ", "3 სთ. წინ", "5 დ. წინ"
 */
export function timeAgo(isoString: string): string {
  const diff  = Date.now() - new Date(isoString).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);

  if (mins  < 2)  return "ახლახანს";
  if (mins  < 60) return `${mins} წ. წინ`;
  if (hours < 24) return `${hours} სთ. წინ`;
  return `${days} დ. წინ`;
}

/**
 * Formats a distance in km.
 * Values under 1 km are shown in metres.
 */
export function formatDistance(km: number): string {
  if (km < 1)  return `${Math.round(km * 1_000)} მ`;
  if (km < 10) return `${km.toFixed(1)} კმ`;
  return `${Math.round(km)} კმ`;
}

/**
 * Formats a duration in minutes to a Georgian readable string.
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} წთ`;
  const h = Math.floor(minutes / 60), m = minutes % 60;
  return m === 0 ? `${h} სთ` : `${h} სთ ${m} წთ`;
}

/**
 * Clamps a numeric value within [min, max].
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Lightweight className merger — filters out falsy values.
 * Usage: cn("base", condition && "extra", undefined)
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
