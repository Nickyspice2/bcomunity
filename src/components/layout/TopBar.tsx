"use client";

import {
  Search, Bell, Layers, Map, ChevronDown,
  Wifi, WifiOff, LogIn, UserCircle, LogOut, ChevronRight,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { IconButton } from "@/components/ui/IconButton";
import { KA } from "@/lib/i18n/ka";
import { cn } from "@/lib/utils";

interface TopBarProps {
  searchQuery:      string;
  onSearchChange:   (value: string) => void;
  activeAlertCount: number;
  onSidebarToggle?: () => void;
  sidebarOpen:      boolean;
}

export function TopBar({
  searchQuery,
  onSearchChange,
  activeAlertCount,
  onSidebarToggle,
  sidebarOpen,
}: TopBarProps): React.ReactElement {
  const { user, isAuthenticated, openModal, logout } = useAuth();

  const [searchFocused,  setSearchFocused]  = useState(false);
  const [notifOpen,      setNotifOpen]      = useState(false);
  const [profileOpen,    setProfileOpen]    = useState(false);
  const [isOnline,       setIsOnline]       = useState(true);

  const notifRef   = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Track network status — critical for bikers in mountain areas
  useEffect(() => {
    const handleOnline  = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online",  handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online",  handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-14",
        "flex items-center gap-3 px-4 md:px-6",
        "backdrop-blur-xl backdrop-saturate-150",
        "bg-[var(--glass-bg)] border-b border-[var(--glass-border)]",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
      )}
    >
      {/* ── Logo / Brand ── */}
      <button
        type="button"
        onClick={onSidebarToggle}
        className="flex shrink-0 items-center gap-2.5 group"
        aria-label={KA.toggleSidebar}
      >
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            "bg-gradient-to-br from-amber-500 to-orange-500",
            "shadow-[0_0_16px_rgba(245,158,11,0.4)] group-hover:shadow-[0_0_20px_rgba(245,158,11,0.6)]",
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
          <span className="text-[10px] font-medium tracking-widest text-zinc-500 uppercase">
            {KA.appSubtitle}
          </span>
        </span>

        <ChevronDown
          size={14}
          className={cn(
            "hidden md:block text-zinc-500 transition-transform duration-200",
            sidebarOpen ? "rotate-0" : "-rotate-90"
          )}
        />
      </button>

      {/* ── Search bar ── */}
      <div
        className={cn(
          "relative flex flex-1 max-w-sm items-center",
          "rounded-xl border transition-all duration-200",
          searchFocused
            ? "border-amber-500/50 shadow-[0_0_0_3px_rgba(245,158,11,0.12)]"
            : "border-[var(--glass-border)] hover:border-zinc-600/60"
        )}
      >
        <Search
          size={15}
          className={cn(
            "absolute left-3 shrink-0 transition-colors duration-150",
            searchFocused ? "text-amber-400" : "text-zinc-500"
          )}
        />
        <input
          type="search"
          placeholder={KA.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() =>  setSearchFocused(false)}
          className={cn(
            "h-9 w-full rounded-xl pl-9 pr-4",
            "bg-white/[0.04] text-sm text-zinc-200 placeholder:text-zinc-600",
            "focus:outline-none",
          )}
        />
        {searchQuery && (
          <button
            type="button"
            aria-label={KA.clearSearch}
            onClick={() => onSearchChange("")}
            className="absolute right-3 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ×
          </button>
        )}
      </div>

      {/* ── Right actions ── */}
      <div className="ml-auto flex items-center gap-1">

        {/* Network indicator */}
        <div
          className="hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
          style={{
            backgroundColor: isOnline ? "rgba(34,197,94,0.1)"  : "rgba(239,68,68,0.1)",
            color:           isOnline ? "#22c55e"               : "#ef4444",
            border:          `1px solid ${isOnline ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}`,
          }}
          title={isOnline ? KA.online : KA.offline}
        >
          {isOnline
            ? <Wifi    size={11} strokeWidth={2.5} />
            : <WifiOff size={11} strokeWidth={2.5} />
          }
          <span className="hidden lg:inline">{isOnline ? KA.online : KA.offline}</span>
        </div>

        <IconButton
          icon={<Layers size={16} />}
          label={KA.mapLayersLabel}
          size="md"
          className="ml-1"
        />

        {/* Notifications bell */}
        <div ref={notifRef} className="relative">
          <IconButton
            icon={<Bell size={16} />}
            label={KA.activeAlerts}
            badge={activeAlertCount}
            active={notifOpen}
            size="md"
            onClick={() => setNotifOpen((v) => !v)}
          />

          {notifOpen && (
            <div
              className={cn(
                "absolute right-0 top-full mt-2 w-72 z-50 animate-fade-up",
                "rounded-2xl border border-[var(--color-surface-border)]",
                "bg-[var(--color-surface-card)] shadow-[0_16px_48px_rgba(0,0,0,0.6)]",
                "overflow-hidden"
              )}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-surface-border)]">
                <span className="text-sm font-semibold text-zinc-200">{KA.activeAlerts}</span>
                <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-400">
                  {activeAlertCount}
                </span>
              </div>
              <ul className="max-h-64 overflow-y-auto divide-y divide-[var(--color-surface-border)]">
                {activeAlertCount === 0 ? (
                  <li className="px-4 py-6 text-center text-sm text-zinc-500">
                    {KA.noAlerts}
                  </li>
                ) : (
                  <li className="px-4 py-3">
                    <p className="text-xs font-medium text-amber-400">ხრეში — ჯვრის უღელტეხილი</p>
                    <p className="mt-0.5 text-xs text-zinc-400">სიჩქარე შეამცირეთ 35 კმ/სთ-მდე</p>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* ── Profile / Login button ── */}
        {isAuthenticated && user ? (
          <div ref={profileRef} className="relative ml-1">
            <button
              type="button"
              onClick={() => setProfileOpen((v) => !v)}
              aria-label={KA.myProfile}
              className={cn(
                "flex items-center gap-2 rounded-xl h-9 pl-2 pr-3",
                "border transition-all duration-150",
                profileOpen
                  ? "bg-amber-500/15 border-amber-500/30 text-amber-400"
                  : "border-[var(--color-surface-border)] text-zinc-300 hover:bg-white/[0.04] hover:text-zinc-100"
              )}
            >
              {/* Avatar circle — initials */}
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-zinc-900"
                style={{ background: "linear-gradient(135deg, #f59e0b, #fb923c)" }}
                aria-hidden="true"
              >
                {user.name.charAt(0).toUpperCase()}
              </span>
              <span className="hidden md:block text-xs font-medium max-w-[80px] truncate">
                {user.name}
              </span>
              <ChevronRight
                size={12}
                className={cn(
                  "text-zinc-600 transition-transform duration-150",
                  profileOpen ? "rotate-90" : "rotate-0"
                )}
              />
            </button>

            {profileOpen && (
              <div
                className={cn(
                  "absolute right-0 top-full mt-2 w-52 z-50 animate-fade-up",
                  "rounded-2xl border border-[var(--color-surface-border)]",
                  "bg-[var(--color-surface-card)] shadow-[0_16px_48px_rgba(0,0,0,0.6)]",
                  "overflow-hidden"
                )}
              >
                {/* User info header */}
                <div className="px-4 py-3 border-b border-[var(--color-surface-border)]">
                  <p className="text-sm font-semibold text-zinc-100 truncate">{user.name}</p>
                  <p className="text-[11px] text-zinc-500 truncate mt-0.5">{user.email}</p>
                  {user.motorcycleModel && (
                    <p className="text-[11px] text-amber-500/80 mt-0.5 truncate">
                      🏍 {user.motorcycleModel}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => { logout(); setProfileOpen(false); }}
                  className="flex w-full items-center gap-2.5 px-4 py-3 text-sm text-zinc-400 hover:bg-white/[0.04] hover:text-red-400 transition-colors"
                >
                  <LogOut size={15} />
                  {KA.logout}
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => openModal("login")}
            className={cn(
              "ml-1 flex items-center gap-1.5 rounded-xl h-9 px-3",
              "bg-amber-500/15 border border-amber-500/25 text-amber-400",
              "hover:bg-amber-500/25 hover:border-amber-500/40",
              "text-xs font-semibold transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50"
            )}
          >
            <LogIn size={14} strokeWidth={2.5} />
            <span className="hidden sm:inline">{KA.login}</span>
          </button>
        )}

        {/* Profile icon fallback — visible on very small screens */}
        {!isAuthenticated && (
          <IconButton
            icon={<UserCircle size={18} />}
            label={KA.login}
            size="md"
            className="sm:hidden"
            onClick={() => openModal("login")}
          />
        )}
      </div>
    </header>
  );
}
