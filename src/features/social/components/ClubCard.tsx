"use client";

import { useState } from "react";
import { BadgeCheck, Users } from "lucide-react";
import type { BikerClub } from "@/lib/types";
import { KA } from "@/lib/i18n/ka";
import { cn } from "@/lib/utils";

// ─── Club logo ─────────────────────────────────────────────────────────────────

function ClubLogo({
  name,
  color,
}: {
  name:  string;
  color: string;
}): React.ReactElement {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");

  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-zinc-900"
      style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

// ─── Component ─────────────────────────────────────────────────────────────────

interface ClubCardProps {
  club: BikerClub;
}

export function ClubCard({ club }: ClubCardProps): React.ReactElement {
  const [joined, setJoined] = useState(false);

  return (
    <article
      className={cn(
        "rounded-2xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-md p-4",
        "transition-all duration-200 hover:border-zinc-700/60"
      )}
    >
      {/* ── Header ── */}
      <div className="flex items-start gap-3 mb-3">
        <ClubLogo name={club.name} color={club.logoColor} />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="text-sm font-bold text-zinc-100 leading-tight">
              {club.name}
            </h3>
            {club.isVerified && (
              <BadgeCheck size={13} className="text-amber-400 shrink-0" />
            )}
          </div>
          <p className="text-[11px] text-zinc-500 mt-0.5">{club.location}</p>
        </div>

        {/* Member count */}
        <div className="flex items-center gap-1 text-[11px] text-zinc-500 shrink-0">
          <Users size={11} aria-hidden="true" />
          <span>{club.memberCount}</span>
        </div>
      </div>

      {/* ── Description (clamped) ── */}
      <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-3">
        {club.description}
      </p>

      {/* ── Tags ── */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {club.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-zinc-800/70 border border-zinc-700/50 px-2 py-0.5 text-[10px] font-medium text-zinc-400"
          >
            {tag}
          </span>
        ))}
        <span className="ml-auto text-[10px] text-zinc-600">
          {KA.clubFounded} {club.foundedYear}
        </span>
      </div>

      {/* ── Join button ── */}
      <button
        type="button"
        onClick={() => setJoined((v) => !v)}
        className={cn(
          "w-full h-8 rounded-xl text-xs font-semibold transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40",
          joined
            ? "bg-amber-500/15 border border-amber-500/30 text-amber-400"
            : "border border-zinc-700/60 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
        )}
      >
        {joined ? `✓ ${KA.joinedClub}` : KA.joinClub}
      </button>
    </article>
  );
}
