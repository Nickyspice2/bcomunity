"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Map, LogIn, UserCircle, LogOut, ChevronRight,
  Bike, ShoppingBag,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { KA } from "@/lib/i18n/ka";
import { cn } from "@/lib/utils";

// ─── Navigation tab definition ────────────────────────────────────────────────

interface NavTab {
  href:  string;
  label: string;
  icon?: React.ReactNode;
  exact?: boolean;
}

const NAV_TABS: NavTab[] = [
  { href: "/",            label: KA.navHome,        exact: true },
  { href: "/map",         label: KA.navMap,         icon: <Map size={13} /> },
  { href: "/marketplace", label: KA.navMarketplace, icon: <ShoppingBag size={13} /> },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function TopBar(): React.ReactElement {
  const pathname  = usePathname();
  const { user, isAuthenticated, openModal, logout } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, []);

  const isActive = (tab: NavTab): boolean =>
    tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16",
        "flex items-center justify-between px-4 md:px-6",
        "backdrop-blur-md bg-zinc-900/70 border-b border-zinc-800/60",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
      )}
    >
      {/* ── Left: Logo ── */}
      <Link
        href="/"
        className="flex shrink-0 items-center gap-2.5 group"
        aria-label="GeoMotoRoutes მთავარი"
      >
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            "bg-gradient-to-br from-amber-500 to-orange-500",
            "shadow-[0_0_14px_rgba(245,158,11,0.35)]",
            "group-hover:shadow-[0_0_22px_rgba(245,158,11,0.55)]",
            "transition-shadow duration-200"
          )}
          aria-hidden="true"
        >
          <Map size={16} className="text-zinc-900" strokeWidth={2.5} />
        </span>
        <span className="hidden sm:flex flex-col leading-none">
          <span className="text-sm font-bold tracking-tight text-zinc-100">
            GeoMoto<span className="text-amber-400">Routes</span>
          </span>
          <span className="text-[10px] font-medium tracking-widest text-zinc-600 uppercase">
            {KA.appSubtitle}
          </span>
        </span>
      </Link>

      {/* ── Centre: Navigation tabs ── */}
      <nav
        className="absolute left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-0.5 rounded-xl border border-zinc-800/60 bg-zinc-900/60 backdrop-blur-sm p-1"
        aria-label="მთავარი ნავიგაცია"
      >
        {NAV_TABS.map((tab) => {
          const active = isActive(tab);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium",
                "transition-all duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50",
                active
                  ? "bg-white/[0.08] text-zinc-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04]"
              )}
              aria-current={active ? "page" : undefined}
            >
              {tab.icon && (
                <span
                  className={active ? "text-amber-400" : "text-zinc-600"}
                  aria-hidden="true"
                >
                  {tab.icon}
                </span>
              )}
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {/* ── Right: Profile / Login ── */}
      <div className="flex items-center gap-2">
        {isAuthenticated && user ? (
          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((v) => !v)}
              aria-label={KA.myProfile}
              className={cn(
                "flex items-center gap-2 rounded-xl h-9 pl-2 pr-3",
                "border transition-all duration-150",
                profileOpen
                  ? "bg-amber-500/12 border-amber-500/30 text-amber-400"
                  : "border-zinc-800/60 text-zinc-300 hover:bg-white/[0.04] hover:text-zinc-100 hover:border-zinc-700/60"
              )}
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-zinc-900"
                style={{ background: `linear-gradient(135deg, ${user.avatarColor}, ${user.avatarColor}bb)` }}
                aria-hidden="true"
              >
                {user.name.charAt(0).toUpperCase()}
              </span>
              <span className="hidden md:block text-xs font-medium max-w-[80px] truncate">
                {user.name}
              </span>
              <ChevronRight
                size={12}
                className={cn("text-zinc-600 transition-transform duration-150", profileOpen && "rotate-90")}
              />
            </button>

            {profileOpen && (
              <div
                className={cn(
                  "absolute right-0 top-full mt-2 w-56 z-50 animate-fade-up",
                  "rounded-2xl border border-zinc-800/60",
                  "bg-zinc-900/90 backdrop-blur-xl",
                  "shadow-[0_20px_60px_rgba(0,0,0,0.7)]",
                  "overflow-hidden"
                )}
              >
                <div className="px-4 py-3 border-b border-zinc-800/60">
                  <p className="text-sm font-semibold text-zinc-100 truncate">{user.name}</p>
                  <p className="text-[11px] text-zinc-500 truncate mt-0.5">{user.email}</p>
                  {user.motorcycleModel && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Bike size={11} className="text-amber-500/70" />
                      <span className="text-[11px] text-amber-500/80 truncate">
                        {user.motorcycleModel}
                      </span>
                    </div>
                  )}
                </div>

                <Link
                  href="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200 transition-colors"
                >
                  <UserCircle size={15} />
                  {KA.navProfile}
                </Link>

                <div className="border-t border-zinc-800/60">
                  <button
                    type="button"
                    onClick={() => { logout(); setProfileOpen(false); }}
                    className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-500 hover:bg-white/[0.04] hover:text-red-400 transition-colors"
                  >
                    <LogOut size={15} />
                    {KA.logout}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => openModal("login")}
            className={cn(
              "flex items-center gap-1.5 rounded-xl h-9 px-4",
              "bg-amber-500/12 border border-amber-500/22 text-amber-400",
              "hover:bg-amber-500/22 hover:border-amber-500/38",
              "text-sm font-semibold transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
            )}
          >
            <LogIn size={15} strokeWidth={2.5} />
            <span className="hidden sm:inline">{KA.login}</span>
          </button>
        )}
      </div>
    </header>
  );
}
