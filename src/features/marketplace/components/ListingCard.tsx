"use client";

import { useState } from "react";
import { MapPin, Eye, Heart, MessageCircle, BadgeCheck } from "lucide-react";
import type { MarketplaceListing, ItemCondition, MarketplaceCategory } from "@/lib/types";
import { KA } from "@/lib/i18n/ka";
import { timeAgo, cn } from "@/lib/utils";

// ─── Condition badge ───────────────────────────────────────────────────────────

const CONDITION_CONFIG: Record<
  ItemCondition,
  { label: string; color: string; bg: string }
> = {
  new:      { label: KA.condNew,     color: "text-green-400",  bg: "bg-green-400/15 border-green-400/25"  },
  like_new: { label: KA.condLikeNew, color: "text-sky-400",    bg: "bg-sky-400/15   border-sky-400/25"    },
  good:     { label: KA.condGood,    color: "text-amber-400",  bg: "bg-amber-400/15 border-amber-400/25"  },
  fair:     { label: KA.condFair,    color: "text-zinc-400",   bg: "bg-zinc-700/60  border-zinc-600/40"   },
};

// ─── Category colours ─────────────────────────────────────────────────────────

const CATEGORY_COLOR: Record<MarketplaceCategory, string> = {
  bikes: "#f59e0b",
  gear:  "#3b82f6",
  parts: "#a78bfa",
};

const CATEGORY_LABEL: Record<MarketplaceCategory, string> = {
  bikes: KA.catBikes,
  gear:  KA.catGear,
  parts: KA.catParts,
};

// ─── Image placeholder — category-aware gradient ─────────────────────────────

function ListingImagePlaceholder({
  category,
}: {
  category: MarketplaceCategory;
}): React.ReactElement {
  const color = CATEGORY_COLOR[category];
  return (
    <div
      className="w-full aspect-[4/3] flex items-center justify-center text-4xl select-none"
      style={{
        background: `linear-gradient(135deg, ${color}18, ${color}06, #09090b)`,
        borderBottom: "1px solid var(--color-surface-border)",
      }}
      aria-hidden="true"
    >
      {category === "bikes" ? "🏍" : category === "gear" ? "🪖" : "🔧"}
    </div>
  );
}

// ─── Seller avatar (inline — avoids importing a separate component) ───────────

function MiniAvatar({
  name,
  color,
}: {
  name:  string;
  color: string;
}): React.ReactElement {
  return (
    <span
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-zinc-900"
      style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
      aria-hidden="true"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────

interface ListingCardProps {
  listing: MarketplaceListing;
}

export function ListingCard({ listing }: ListingCardProps): React.ReactElement {
  const [saved,      setSaved]      = useState(false);
  const condCfg   = CONDITION_CONFIG[listing.condition];
  const catColor  = CATEGORY_COLOR[listing.category];
  const catLabel  = CATEGORY_LABEL[listing.category];
  const currSymbol = listing.currency === "GEL" ? KA.priceGEL : KA.priceUSD;

  return (
    <article
      className={cn(
        "rounded-2xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-md overflow-hidden",
        "transition-all duration-200 hover:border-zinc-700/60 group"
      )}
    >
      {/* ── Image ── */}
      <div className="relative">
        <ListingImagePlaceholder category={listing.category} />

        {/* Condition badge */}
        <span
          className={cn(
            "absolute top-2 left-2 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
            condCfg.color, condCfg.bg
          )}
        >
          {condCfg.label}
        </span>

        {/* Category badge */}
        <span
          className="absolute top-2 right-2 rounded-full border px-2 py-0.5 text-[10px] font-semibold"
          style={{
            color:           catColor,
            backgroundColor: `${catColor}18`,
            borderColor:     `${catColor}35`,
          }}
        >
          {catLabel}
        </span>

        {/* Save (heart) */}
        <button
          type="button"
          onClick={() => setSaved((v) => !v)}
          aria-label={KA.addToFavorites}
          className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900/70 backdrop-blur-sm border border-zinc-700/50 text-zinc-400 hover:text-red-400 transition-colors"
        >
          <Heart
            size={13}
            fill={saved ? "currentColor" : "none"}
            className={saved ? "text-red-400" : ""}
          />
        </button>
      </div>

      {/* ── Content ── */}
      <div className="p-4">
        {/* Price */}
        <div className="flex items-baseline gap-1 mb-1.5">
          <span className="text-xl font-bold text-amber-400">
            {listing.price.toLocaleString("ka-GE")}
          </span>
          <span className="text-sm font-semibold text-amber-400/70">{currSymbol}</span>
          {listing.isNegotiable && (
            <span className="text-[11px] text-zinc-500">{KA.negotiable}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-zinc-100 leading-snug mb-1 line-clamp-1">
          {listing.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-3">
          {listing.description}
        </p>

        {/* Location + views */}
        <div className="flex items-center gap-3 text-[11px] text-zinc-600 mb-3">
          <span className="flex items-center gap-1">
            <MapPin size={10} aria-hidden="true" />
            {listing.location}
          </span>
          <span className="flex items-center gap-1 ml-auto">
            <Eye size={10} aria-hidden="true" />
            {listing.views}
          </span>
          <span>{timeAgo(listing.createdAt)}</span>
        </div>

        {/* Seller + contact */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-800/50">
          <div className="flex items-center gap-2">
            <MiniAvatar name={listing.seller.name} color={listing.seller.avatarColor} />
            <span className="text-[11px] text-zinc-400 max-w-[80px] truncate">
              {listing.seller.name}
            </span>
            {listing.seller.isVerified && (
              <BadgeCheck size={11} className="text-amber-400 shrink-0" />
            )}
          </div>

          <button
            type="button"
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold",
              "bg-amber-500/12 border border-amber-500/22 text-amber-400",
              "hover:bg-amber-500/22 hover:border-amber-500/38 transition-all duration-150"
            )}
          >
            <MessageCircle size={11} />
            {KA.contactSeller}
          </button>
        </div>
      </div>
    </article>
  );
}
