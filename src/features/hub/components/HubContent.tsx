"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import type { ServiceCategory } from "@/lib/types";
import { MOCK_SERVICES, MOCK_CITY_CHATS } from "@/store/mockData";
import { MechanicCard }  from "./MechanicCard";
import { CityChatRoom }  from "./CityChatRoom";
import { KA }            from "@/lib/i18n/ka";
import { cn }            from "@/lib/utils";

// ─── Service category tab ─────────────────────────────────────────────────────

type CategoryFilter = ServiceCategory | "all";

interface ServiceTabProps {
  value:    CategoryFilter;
  label:    string;
  count:    number;
  active:   boolean;
  onSelect: () => void;
}

function ServiceTab({ label, count, active, onSelect }: ServiceTabProps): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium whitespace-nowrap",
        "transition-all duration-150",
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

// ─── Section separator ────────────────────────────────────────────────────────

function SectionHeader({
  title,
  subtitle,
  action,
}: {
  title:     string;
  subtitle?: string;
  action?:   React.ReactNode;
}): React.ReactElement {
  return (
    <div className="flex items-start justify-between gap-4 mb-5">
      <div>
        <h2 className="text-base font-bold text-zinc-100">{title}</h2>
        {subtitle && (
          <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function HubContent(): React.ReactElement {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const categoryCounts = useMemo(() => ({
    all:         MOCK_SERVICES.length,
    mechanic:    MOCK_SERVICES.filter((s) => s.category === "mechanic").length,
    tires:       MOCK_SERVICES.filter((s) => s.category === "tires").length,
    towing:      MOCK_SERVICES.filter((s) => s.category === "towing").length,
    parts_store: MOCK_SERVICES.filter((s) => s.category === "parts_store").length,
    wash:        MOCK_SERVICES.filter((s) => s.category === "wash").length,
  }), []);

  const filteredServices = useMemo(
    () =>
      activeCategory === "all"
        ? MOCK_SERVICES
        : MOCK_SERVICES.filter((s) => s.category === activeCategory),
    [activeCategory]
  );

  const tabs: { value: CategoryFilter; label: string }[] = [
    { value: "all",         label: KA.catAllServices  },
    { value: "mechanic",    label: KA.catMechanic     },
    { value: "tires",       label: KA.catTires        },
    { value: "towing",      label: KA.catTowing       },
    { value: "parts_store", label: KA.catPartsStore   },
    { value: "wash",        label: KA.catWash         },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      {/* ── Page header ── */}
      <div className="px-4 md:px-8 py-6 border-b border-zinc-800/60">
        <h1 className="text-xl font-bold text-zinc-100">{KA.hubTitle}</h1>
        <p className="text-sm text-zinc-500 mt-1">{KA.hubSubtitle}</p>
      </div>

      <div className="px-4 md:px-8 py-6 space-y-12">

        {/* ══ Section A: Service Directory ══════════════════════════════════ */}
        <section aria-label={KA.directoryTitle}>
          <SectionHeader
            title={KA.directoryTitle}
            subtitle={KA.directorySubtitle}
            action={
              <button
                type="button"
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-xl h-9 px-4",
                  "bg-amber-500 text-zinc-900 text-sm font-semibold",
                  "hover:bg-amber-400 active:scale-[0.98] transition-all duration-150",
                  "shadow-[0_0_14px_rgba(245,158,11,0.25)]"
                )}
              >
                <Plus size={14} strokeWidth={2.5} />
                {KA.addServiceListing}
              </button>
            }
          />

          {/* Category tabs */}
          <div className="flex items-center gap-1.5 mb-5 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <ServiceTab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                count={categoryCounts[tab.value]}
                active={activeCategory === tab.value}
                onSelect={() => setActiveCategory(tab.value)}
              />
            ))}
          </div>

          {/* Grid */}
          {filteredServices.length === 0 ? (
            <p className="py-10 text-center text-sm text-zinc-600">{KA.noServicesFound}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredServices.map((provider) => (
                <MechanicCard key={provider.id} provider={provider} />
              ))}
            </div>
          )}
        </section>

        {/* ══ Section B: City Chat Rooms ════════════════════════════════════ */}
        <section aria-label={KA.cityChatsTitle}>
          <SectionHeader
            title={KA.cityChatsTitle}
            subtitle={KA.cityChatsSubtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOCK_CITY_CHATS.map((room) => (
              <CityChatRoom key={room.id} room={room} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
