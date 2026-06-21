"use client";

import { useState, useMemo } from "react";
import { Search, Plus } from "lucide-react";
import type { MarketplaceCategory } from "@/lib/types";
import { MOCK_LISTINGS } from "@/store/mockData";
import { ListingCard }   from "./ListingCard";
import { KA }            from "@/lib/i18n/ka";
import { cn }            from "@/lib/utils";

// ─── Category tab ─────────────────────────────────────────────────────────────

type CategoryFilter = MarketplaceCategory | "all";

interface CategoryTabProps {
  value:    CategoryFilter;
  label:    string;
  count:    number;
  active:   boolean;
  onSelect: () => void;
}

function CategoryTab({
  label, count, active, onSelect,
}: CategoryTabProps): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium",
        "transition-all duration-150 whitespace-nowrap",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40",
        active
          ? "bg-amber-500/15 border border-amber-500/25 text-amber-400"
          : "border border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
      )}
    >
      {label}
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
          active ? "bg-amber-500/25 text-amber-300" : "bg-zinc-800 text-zinc-500"
        )}
      >
        {count}
      </span>
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function MarketplaceContent(): React.ReactElement {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery,    setSearchQuery]    = useState("");

  const categoryCounts = useMemo(() => ({
    all:   MOCK_LISTINGS.length,
    bikes: MOCK_LISTINGS.filter((l) => l.category === "bikes").length,
    gear:  MOCK_LISTINGS.filter((l) => l.category === "gear").length,
    parts: MOCK_LISTINGS.filter((l) => l.category === "parts").length,
  }), []);

  const filtered = useMemo(() => {
    let list = MOCK_LISTINGS;
    if (activeCategory !== "all") {
      list = list.filter((l) => l.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  const tabs: { value: CategoryFilter; label: string }[] = [
    { value: "all",   label: KA.catAll   },
    { value: "bikes", label: KA.catBikes },
    { value: "gear",  label: KA.catGear  },
    { value: "parts", label: KA.catParts },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-4 md:px-6 py-5 border-b border-zinc-800/60">
        <div>
          <h1 className="text-lg font-bold text-zinc-100">{KA.marketplaceTitle}</h1>
          <p className="text-xs text-zinc-500 mt-0.5">{KA.marketplaceSubtitle}</p>
        </div>

        {/* Search */}
        <div className="relative flex w-full sm:max-w-xs items-center sm:ml-auto">
          <Search
            size={14}
            className="absolute left-3 text-zinc-600"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder={KA.searchListings}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "h-9 w-full rounded-xl bg-zinc-900/60 border border-zinc-800/60",
              "pl-8 pr-4 text-sm text-zinc-200 placeholder:text-zinc-600",
              "focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/15",
              "transition-all duration-150 backdrop-blur-sm"
            )}
          />
        </div>

        {/* Post listing button */}
        <button
          type="button"
          className={cn(
            "flex shrink-0 items-center gap-1.5 rounded-xl h-9 px-4",
            "bg-amber-500 text-zinc-900 text-sm font-semibold",
            "hover:bg-amber-400 active:scale-[0.98] transition-all duration-150",
            "shadow-[0_0_16px_rgba(245,158,11,0.3)] hover:shadow-[0_0_22px_rgba(245,158,11,0.45)]"
          )}
        >
          <Plus size={15} strokeWidth={2.5} />
          {KA.postListing}
        </button>
      </div>

      {/* ── Category tabs ── */}
      <div className="flex items-center gap-2 px-4 md:px-6 py-3 border-b border-zinc-800/60 overflow-x-auto">
        {tabs.map((tab) => (
          <CategoryTab
            key={tab.value}
            value={tab.value}
            label={tab.label}
            count={categoryCounts[tab.value]}
            active={activeCategory === tab.value}
            onSelect={() => setActiveCategory(tab.value)}
          />
        ))}

        {/* Results count */}
        <span className="ml-auto shrink-0 text-xs text-zinc-600">
          {filtered.length} {KA.listingsCount}
        </span>
      </div>

      {/* ── Listing grid ── */}
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-zinc-600">
            <span className="text-4xl mb-3" aria-hidden="true">🔍</span>
            <p className="text-sm">{KA.noListings}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
