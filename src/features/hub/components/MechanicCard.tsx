import { BadgeCheck, Phone, Clock, Wrench, MessageCircle } from "lucide-react";
import type { ServiceCategory, ServiceProvider } from "@/lib/types";
import { KA } from "@/lib/i18n/ka";
import { cn } from "@/lib/utils";

// ─── Category config ──────────────────────────────────────────────────────────

interface CategoryConfig {
  color:  string;
  bg:     string;
  emoji:  string;
}

const CATEGORY_CONFIG: Record<ServiceCategory, CategoryConfig> = {
  mechanic:    { color: "text-amber-400",  bg: "bg-amber-400/12  border-amber-400/25",  emoji: "🔧" },
  tires:       { color: "text-blue-400",   bg: "bg-blue-400/12   border-blue-400/25",   emoji: "🔄" },
  towing:      { color: "text-red-400",    bg: "bg-red-400/12    border-red-400/25",    emoji: "🚐" },
  parts_store: { color: "text-violet-400", bg: "bg-violet-400/12 border-violet-400/25", emoji: "📦" },
  wash:        { color: "text-cyan-400",   bg: "bg-cyan-400/12   border-cyan-400/25",   emoji: "💧" },
};

// ─── Star rating row ──────────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }): React.ReactElement {
  const full  = Math.floor(rating);
  const frac  = rating - full >= 0.5;
  const empty = 5 - full - (frac ? 1 : 0);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5 text-amber-400 text-xs" aria-hidden="true">
        {"★".repeat(full)}
        {frac ? "½" : ""}
        <span className="text-zinc-700">{"★".repeat(empty)}</span>
      </div>
      <span className="text-xs font-semibold text-zinc-300">{rating.toFixed(1)}</span>
      <span className="text-[11px] text-zinc-600">({count})</span>
    </div>
  );
}

// ─── Component ─────────────────────────────────────────────────────────────────

interface MechanicCardProps {
  provider: ServiceProvider;
}

export function MechanicCard({ provider }: MechanicCardProps): React.ReactElement {
  const cfg = CATEGORY_CONFIG[provider.category];

  return (
    <article
      className={cn(
        "rounded-2xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-md p-5",
        "transition-all duration-200 hover:border-zinc-700/60"
      )}
    >
      {/* ── Header ── */}
      <div className="flex items-start gap-3 mb-4">
        {/* Logo */}
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl select-none"
          style={{
            background: `linear-gradient(135deg, ${cfg.color.replace("text-", "")}22, ${cfg.color.replace("text-", "")}08)`,
            border: `1px solid ${cfg.color.replace("text-", "")}30`,
          }}
          aria-hidden="true"
        >
          {cfg.emoji}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-1.5 flex-wrap">
            <h3 className="text-sm font-bold text-zinc-100 leading-tight">
              {provider.name}
            </h3>
            {provider.isVerified && (
              <BadgeCheck size={14} className="text-amber-400 shrink-0 mt-0.5" />
            )}
          </div>

          {/* Category badge */}
          <span
            className={cn(
              "inline-flex items-center gap-1 mt-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
              cfg.color, cfg.bg
            )}
          >
            {cfg.emoji}
            {provider.specializations.slice(0, 2).join(" · ")}
            {provider.specializations.length > 2 && ` +${provider.specializations.length - 2}`}
          </span>
        </div>
      </div>

      {/* ── Rating ── */}
      <div className="mb-3">
        <StarRating rating={provider.rating} count={provider.reviewCount} />
      </div>

      {/* ── Services ── */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {provider.services.map((svc) => (
          <span
            key={svc}
            className="rounded-full bg-zinc-800/70 border border-zinc-700/50 px-2 py-0.5 text-[10px] font-medium text-zinc-400"
          >
            {svc}
          </span>
        ))}
      </div>

      {/* ── Meta ── */}
      <div className="flex flex-col gap-1.5 mb-4 text-[11px] text-zinc-500">
        <div className="flex items-center gap-1.5">
          <Wrench size={10} className="text-zinc-600" aria-hidden="true" />
          <span className="truncate">{provider.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={10} className="text-zinc-600" aria-hidden="true" />
          <span>{provider.workingHours}</span>
        </div>
        {provider.phone && (
          <div className="flex items-center gap-1.5">
            <Phone size={10} className="text-zinc-600" aria-hidden="true" />
            <span className="font-medium text-zinc-400">{provider.phone}</span>
          </div>
        )}
      </div>

      {/* ── Action ── */}
      <button
        type="button"
        className={cn(
          "w-full flex items-center justify-center gap-1.5 h-9 rounded-xl",
          "text-xs font-semibold transition-all duration-150",
          "bg-amber-500/12 border border-amber-500/22 text-amber-400",
          "hover:bg-amber-500/22 hover:border-amber-500/38",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40"
        )}
      >
        <MessageCircle size={13} />
        {KA.contactProvider}
      </button>
    </article>
  );
}
