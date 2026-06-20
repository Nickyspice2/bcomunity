import { BikerFeed }      from "@/features/social/components/BikerFeed";
import { GroupRideCard }  from "@/features/social/components/GroupRideCard";
import { MOCK_POSTS, MOCK_GROUP_RIDES } from "@/store/mockData";
import { KA } from "@/lib/i18n/ka";

/**
 * Social Hub — the home page of GeoMotoRoutes.
 * Two-column layout: biker feed (center) + upcoming group rides (sticky sidebar).
 */
export default function HomePage(): React.ReactElement {
  return (
    <div className="flex h-[calc(100vh-64px)] pt-16 overflow-hidden">

      {/* ── Center: scrollable biker feed ── */}
      <main
        className="flex-1 overflow-y-auto"
        aria-label={KA.feedTitle}
      >
        <div className="max-w-2xl mx-auto px-4 py-8">
          <BikerFeed posts={MOCK_POSTS} />
        </div>
      </main>

      {/* ── Right: sticky group rides sidebar ── */}
      <aside
        className="hidden lg:flex flex-col w-80 shrink-0 overflow-y-auto border-l border-[var(--color-surface-border)]"
        aria-label={KA.groupRidesTitle}
      >
        <div className="px-4 py-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-zinc-100">
              {KA.groupRidesTitle}
            </h2>
            <span className="text-[11px] text-zinc-600">
              {MOCK_GROUP_RIDES.length} გასვლა
            </span>
          </div>

          {MOCK_GROUP_RIDES.length === 0 ? (
            <p className="text-xs text-zinc-600 py-6 text-center">
              {KA.noRidesYet}
            </p>
          ) : (
            MOCK_GROUP_RIDES.map((ride) => (
              <GroupRideCard key={ride.id} ride={ride} />
            ))
          )}
        </div>
      </aside>
    </div>
  );
}
