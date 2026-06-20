"use client";

import { useState } from "react";
import { Calendar, MapPin, Gauge, Users } from "lucide-react";
import type { GroupRide, RidePace } from "@/lib/types";
import { KA } from "@/lib/i18n/ka";
import { cn } from "@/lib/utils";

// ─── Pace badge ───────────────────────────────────────────────────────────────

const PACE_CONFIG: Record<RidePace, { label: string; color: string; bg: string }> = {
  slow:   { label: KA.paceSlow,   color: "text-green-400",  bg: "bg-green-400/10 border-green-400/20"  },
  medium: { label: KA.paceMedium, color: "text-amber-400",  bg: "bg-amber-400/10 border-amber-400/20"  },
  fast:   { label: KA.paceFast,   color: "text-red-400",    bg: "bg-red-400/10   border-red-400/20"    },
};

function PaceBadge({ pace }: { pace: RidePace }): React.ReactElement {
  const cfg = PACE_CONFIG[pace];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold",
        cfg.color, cfg.bg
      )}
    >
      <Gauge size={10} aria-hidden="true" />
      {cfg.label}
    </span>
  );
}

// ─── Rider avatar stack ───────────────────────────────────────────────────────

function RiderStack({
  riders,
  max = 4,
}: {
  riders: GroupRide["joinedRiders"];
  max?:   number;
}): React.ReactElement {
  const shown = riders.slice(0, max);
  const extra = riders.length - max;

  return (
    <div className="flex items-center -space-x-1.5">
      {shown.map((rider) => (
        <span
          key={rider.id}
          title={rider.name}
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-surface-card)] text-[10px] font-bold text-zinc-900"
          style={{ background: `linear-gradient(135deg, ${rider.avatarColor}, ${rider.avatarColor}88)` }}
          aria-hidden="true"
        >
          {rider.name.charAt(0).toUpperCase()}
        </span>
      ))}
      {extra > 0 && (
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-surface-card)] bg-[var(--color-surface-muted)] text-[10px] font-bold text-zinc-300">
          +{extra}
        </span>
      )}
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

interface GroupRideCardProps {
  ride: GroupRide;
}

export function GroupRideCard({ ride }: GroupRideCardProps): React.ReactElement {
  const [joined, setJoined] = useState(false);

  const gatherDate = new Date(ride.gatheringTime);
  const dateLabel  = gatherDate.toLocaleDateString("ka-GE", {
    weekday: "short",
    day:     "numeric",
    month:   "short",
  });
  const timeLabel  = gatherDate.toLocaleTimeString("ka-GE", {
    hour:   "2-digit",
    minute: "2-digit",
  });

  const spotsLeft = ride.maxRiders - ride.joinedRiders.length;

  return (
    <article
      className={cn(
        "rounded-2xl border border-[var(--color-surface-border)]",
        "bg-[var(--color-surface-card)] p-4",
        "transition-all duration-200 hover:border-zinc-700/60"
      )}
    >
      {/* Title + destination */}
      <div className="mb-3">
        <h3 className="text-sm font-bold text-zinc-100 leading-snug">
          {ride.name}
        </h3>
        <p className="text-xs text-zinc-500 mt-0.5">{ride.destination}</p>
      </div>

      {/* Meta rows */}
      <div className="flex flex-col gap-1.5 mb-3">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Calendar size={11} className="text-zinc-600 shrink-0" aria-hidden="true" />
          <span>{dateLabel} — {timeLabel}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <MapPin size={11} className="text-zinc-600 shrink-0" aria-hidden="true" />
          <span className="truncate">{ride.gatheringPoint}</span>
        </div>
      </div>

      {/* Pace + spot count */}
      <div className="flex items-center justify-between mb-3">
        <PaceBadge pace={ride.pace} />
        <span className="flex items-center gap-1 text-[11px] text-zinc-500">
          <Users size={10} aria-hidden="true" />
          {ride.joinedRiders.length}/{ride.maxRiders} {KA.ridersCount}
        </span>
      </div>

      {/* Rider avatars */}
      <div className="flex items-center justify-between mb-3">
        <RiderStack riders={ride.joinedRiders} />
        {spotsLeft > 0 && (
          <span className="text-[11px] text-zinc-600">
            {spotsLeft} ადგილი დარჩა
          </span>
        )}
      </div>

      {/* Join button */}
      <button
        type="button"
        onClick={() => setJoined((v) => !v)}
        disabled={spotsLeft === 0 && !joined}
        className={cn(
          "w-full h-8 rounded-xl text-xs font-semibold transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40",
          joined
            ? "bg-amber-500/15 border border-amber-500/30 text-amber-400 hover:bg-amber-500/25"
            : spotsLeft === 0
            ? "bg-zinc-800 border border-zinc-700 text-zinc-600 cursor-not-allowed"
            : "border border-amber-500/25 text-amber-400 hover:bg-amber-500/12 hover:border-amber-500/40"
        )}
      >
        {joined ? `✓ ${KA.joinedLabel}` : KA.joinRideAction}
      </button>
    </article>
  );
}
