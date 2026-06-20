import type { AsphaltQuality, DifficultyLevel } from "@/lib/types";

export function formatDistance(km: number): string {
  if (km < 1)  return `${Math.round(km * 1_000)} მ`;
  if (km < 10) return `${km.toFixed(1)} კმ`;
  return `${Math.round(km)} კმ`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} წთ`;
  const h = Math.floor(minutes / 60), m = minutes % 60;
  return m === 0 ? `${h} სთ` : `${h} სთ ${m} წთ`;
}

export function getDifficultyColour(level: DifficultyLevel): string {
  const map: Record<DifficultyLevel, string> = {
    beginner:     "text-green-400",
    intermediate: "text-amber-400",
    advanced:     "text-orange-400",
    extreme:      "text-red-400",
  };
  return map[level];
}

export function getAsphaltQualityLabel(quality: AsphaltQuality): string {
  const labels: Record<AsphaltQuality, string> = {
    excellent: "შესანიშნავი ზედაპირი",
    good:      "კარგი ზედაპირი",
    fair:      "დამაკმაყოფილებელი",
    poor:      "ცუდი — სიფრთხილე",
    unpaved:   "ასფალტის გარეშე",
  };
  return labels[quality];
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Returns a Georgian relative-time string.
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
 * Lightweight className merger.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
