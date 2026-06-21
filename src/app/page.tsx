import { DashboardLayout }   from "@/components/layout/DashboardLayout";
import { BikerFeed }         from "@/features/social/components/BikerFeed";
import { GroupRideCard }     from "@/features/social/components/GroupRideCard";
import { ClubCard }          from "@/features/social/components/ClubCard";
import { KA }                from "@/lib/i18n/ka";
import { MOCK_POSTS, MOCK_GROUP_RIDES, MOCK_CLUBS } from "@/store/mockData";

/**
 * Social Hub — GeoMotoRoutes home page.
 *
 * Desktop (xl): 3 columns — Clubs | Feed | Group Rides
 * Tablet  (lg): 2 columns — Feed | Group Rides
 * Mobile       : Stacked — Feed → Clubs → Group Rides
 */
export default function HomePage(): React.ReactElement {
  return (
    <DashboardLayout>
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left column: Moto Clubs (xl+) ── */}
        <aside
          className="hidden xl:flex flex-col w-64 shrink-0 overflow-y-auto border-r border-zinc-800/60"
          aria-label={KA.clubsTitle}
        >
          <div className="px-4 py-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-zinc-100">{KA.clubsTitle}</h2>
              <span className="text-[11px] text-zinc-600">
                {MOCK_CLUBS.length} კლუბი
              </span>
            </div>

            {MOCK_CLUBS.length === 0 ? (
              <p className="text-xs text-zinc-600 py-4 text-center">{KA.noClubsYet}</p>
            ) : (
              MOCK_CLUBS.map((club) => (
                <ClubCard key={club.id} club={club} />
              ))
            )}
          </div>
        </aside>

        {/* ── Center column: Biker Feed ── */}
        <main
          className="flex-1 overflow-y-auto"
          aria-label={KA.feedTitle}
        >
          {/* Mobile: clubs section above the feed */}
          <div className="xl:hidden px-4 pt-5 pb-2">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-zinc-100">{KA.clubsTitle}</h2>
              <span className="text-[11px] text-zinc-600">
                {MOCK_CLUBS.length} კლუბი
              </span>
            </div>
            {/* Horizontal scroll on small screens */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {MOCK_CLUBS.map((club) => (
                <div key={club.id} className="min-w-[240px]">
                  <ClubCard club={club} />
                </div>
              ))}
            </div>
          </div>

          {/* Feed */}
          <div className="max-w-2xl mx-auto px-4 py-5">
            <BikerFeed posts={MOCK_POSTS} />
          </div>

          {/* Mobile: group rides below feed */}
          <div className="lg:hidden px-4 pb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-zinc-100">{KA.groupRidesTitle}</h2>
              <span className="text-[11px] text-zinc-600">
                {MOCK_GROUP_RIDES.length} გასვლა
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {MOCK_GROUP_RIDES.map((ride) => (
                <GroupRideCard key={ride.id} ride={ride} />
              ))}
            </div>
          </div>
        </main>

        {/* ── Right column: Group Rides (lg+) ── */}
        <aside
          className="hidden lg:flex flex-col w-80 shrink-0 overflow-y-auto border-l border-zinc-800/60"
          aria-label={KA.groupRidesTitle}
        >
          <div className="px-4 py-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-zinc-100">{KA.groupRidesTitle}</h2>
              <span className="text-[11px] text-zinc-600">
                {MOCK_GROUP_RIDES.length} გასვლა
              </span>
            </div>

            {MOCK_GROUP_RIDES.length === 0 ? (
              <p className="text-xs text-zinc-600 py-4 text-center">{KA.noRidesYet}</p>
            ) : (
              MOCK_GROUP_RIDES.map((ride) => (
                <GroupRideCard key={ride.id} ride={ride} />
              ))
            )}
          </div>
        </aside>

      </div>
    </DashboardLayout>
  );
}
