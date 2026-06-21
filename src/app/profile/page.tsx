"use client";

import { useAuth }        from "@/features/auth/context/AuthContext";
import { DigitalGarage }  from "@/features/profile/components/DigitalGarage";
import { MOCK_GARAGE }    from "@/store/mockData";
import { KA }             from "@/lib/i18n/ka";

export default function ProfilePage(): React.ReactElement {
  const { user, isAuthenticated, openModal } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <div className="flex h-screen items-center justify-center pt-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="text-5xl" aria-hidden="true">🏍</span>
          <p className="text-sm text-zinc-500">{KA.noGarageData}</p>
          <button
            type="button"
            onClick={() => openModal("login")}
            className="mt-2 rounded-xl bg-amber-500/15 border border-amber-500/25 px-5 py-2 text-sm font-semibold text-amber-400 hover:bg-amber-500/25 transition-colors"
          >
            {KA.login}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen overflow-y-auto">
      <DigitalGarage user={user} garage={MOCK_GARAGE} />
    </div>
  );
}
