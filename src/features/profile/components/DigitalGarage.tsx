"use client";

import { Bike, TrendingUp, Route, TriangleAlert, Users, Calendar, Wrench, BadgeCheck } from "lucide-react";
import type { AuthUser } from "@/features/auth/types";
import type { GarageMotorcycle } from "@/lib/types";
import { KA } from "@/lib/i18n/ka";

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  icon,
  value,
  label,
  color = "#f59e0b",
}: {
  icon:   React.ReactNode;
  value:  number | string;
  label:  string;
  color?: string;
}): React.ReactElement {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-raised)] px-4 py-5">
      <span style={{ color }} aria-hidden="true">{icon}</span>
      <span className="text-xl font-bold text-zinc-100">
        {typeof value === "number" ? value.toLocaleString("ka-GE") : value}
      </span>
      <span className="text-[11px] text-zinc-500 text-center">{label}</span>
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────

function SectionHeader({ title, icon }: { title: string; icon: React.ReactNode }): React.ReactElement {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-amber-400" aria-hidden="true">{icon}</span>
      <h2 className="text-sm font-bold text-zinc-100 uppercase tracking-widest">{title}</h2>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface DigitalGarageProps {
  user:    AuthUser;
  garage:  GarageMotorcycle;
}

export function DigitalGarage({ user, garage }: DigitalGarageProps): React.ReactElement {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fade-in">

      {/* ── Profile header card ── */}
      <section
        className="rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] overflow-hidden"
        aria-label="პროფილი"
      >
        {/* Gradient banner */}
        <div
          className="h-24 w-full"
          style={{
            background: `linear-gradient(135deg, ${user.avatarColor}30, ${user.avatarColor}10, transparent)`,
            borderBottom: "1px solid var(--color-surface-border)",
          }}
          aria-hidden="true"
        />

        <div className="px-6 pb-6 -mt-8">
          {/* Avatar */}
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-zinc-900 border-4 border-[var(--color-surface-card)] shadow-xl mb-3"
            style={{ background: `linear-gradient(135deg, ${user.avatarColor}, ${user.avatarColor}99)` }}
            aria-hidden="true"
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-zinc-100">{user.name}</h1>
                <BadgeCheck size={18} className="text-amber-400" />
              </div>
              <p className="text-sm text-zinc-500 mt-0.5">{user.email}</p>

              {/* Motorcycle badge */}
              {user.motorcycleModel && (
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/22 px-3 py-1 text-xs font-semibold text-amber-400">
                    🏍 {user.motorcycleModel}
                  </span>
                </div>
              )}
            </div>

            <button
              type="button"
              className="rounded-xl border border-[var(--color-surface-border)] px-4 py-2 text-xs font-medium text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200 transition-colors"
            >
              {KA.editProfile}
            </button>
          </div>

          {/* Quick stats row */}
          <div className="flex items-center gap-6 mt-5 pt-4 border-t border-[var(--color-surface-border)]">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <Users size={13} className="text-zinc-600" />
              <span className="font-semibold text-zinc-300">0</span>
              <span>{KA.garageFollowers}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <Calendar size={13} className="text-zinc-600" />
              <span className="font-semibold text-zinc-300">
                {new Date(user.joinedAt).toLocaleDateString("ka-GE", { year: "numeric", month: "short" })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ride stats ── */}
      <section aria-label={KA.garageStats}>
        <SectionHeader title={KA.garageStats} icon={<TrendingUp size={16} />} />
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            icon={<Route size={20} />}
            value={garage.stats.totalKm}
            label={KA.statTotalKm}
            color="#f59e0b"
          />
          <StatCard
            icon={<TrendingUp size={20} />}
            value={garage.stats.routesCompleted}
            label={KA.statRoutesDone}
            color="#22c55e"
          />
          <StatCard
            icon={<TriangleAlert size={20} />}
            value={garage.stats.alertsSubmitted}
            label={KA.statAlertsDone}
            color="#ef4444"
          />
        </div>
      </section>

      {/* ── Motorcycle card ── */}
      <section
        className="rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] p-6"
        aria-label={KA.garageMyBike}
      >
        <SectionHeader title={KA.garageMyBike} icon={<Bike size={16} />} />

        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
            <Bike size={24} className="text-amber-400" />
          </div>
          <div>
            <p className="text-base font-bold text-zinc-100">
              {garage.brand} {garage.model}
            </p>
            <p className="text-sm text-zinc-500">{garage.year}</p>
          </div>
        </div>

        {/* Modifications */}
        {garage.modifications.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Wrench size={13} className="text-zinc-600" />
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-600">
                {KA.garageMods}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {garage.modifications.map((mod) => (
                <span
                  key={mod}
                  className="rounded-full border border-[var(--color-surface-border)] bg-[var(--color-surface-raised)] px-3 py-1 text-xs text-zinc-400"
                >
                  {mod}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
