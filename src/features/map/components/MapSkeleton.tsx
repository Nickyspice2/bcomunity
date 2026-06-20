import { SkeletonBlock } from "@/components/ui/SkeletonBlock";

/**
 * Shown while the Leaflet map bundle is loading (dynamic import).
 * Preserves layout and prevents cumulative layout shift.
 */
export function MapSkeleton(): React.ReactElement {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--color-surface-base)" }}
      aria-label="Map loading"
      aria-busy="true"
    >
      {/* Simulated map grid lines */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 right-0 border-t border-zinc-800"
            style={{ top: `${(i + 1) * 12.5}%` }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 border-l border-zinc-800"
            style={{ left: `${(i + 1) * 12.5}%` }}
          />
        ))}
      </div>

      {/* Centre loading indicator */}
      <div className="relative flex flex-col items-center gap-4 rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] px-10 py-8 shadow-2xl">
        <div className="flex gap-3">
          <SkeletonBlock className="h-3 w-24" />
          <SkeletonBlock className="h-3 w-16" />
        </div>
        <SkeletonBlock className="h-3 w-32" />

        <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
          <svg
            className="h-6 w-6 animate-spin text-amber-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>

        <p className="text-sm font-medium text-zinc-400">Initialising map…</p>
        <p className="text-xs text-zinc-600">Loading Georgian road network</p>
      </div>
    </div>
  );
}
