"use client";

import {
  useState,
  useEffect,
  useRef,
  type FormEvent,
} from "react";
import { X, TriangleAlert, Camera, Construction, Flame, MapPin } from "lucide-react";
import type { AlertType, RoadAlert } from "@/lib/types";
import { ALERT_TYPE_META } from "@/lib/constants";
import { KA } from "@/lib/i18n/ka";
import { cn } from "@/lib/utils";

// ─── Alert-type selector chip ─────────────────────────────────────────────────

const TYPE_ICONS: Record<AlertType, React.ReactNode> = {
  gravel: <TriangleAlert size={16} />,
  camera: <Camera       size={16} />,
  work:   <Construction size={16} />,
  danger: <Flame        size={16} />,
};

const TYPE_LABELS: Record<AlertType, string> = {
  gravel: KA.alertGravel,
  camera: KA.alertCamera,
  work:   KA.alertWork,
  danger: KA.alertDanger,
};

interface TypeChipProps {
  alertType: AlertType;
  selected:  boolean;
  onSelect:  () => void;
}

function TypeChip({ alertType, selected, onSelect }: TypeChipProps): React.ReactElement {
  const meta = ALERT_TYPE_META[alertType];
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex flex-col items-center gap-1.5 rounded-xl px-3 py-2.5",
        "border text-xs font-medium transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50",
        selected
          ? "border-current shadow-sm"
          : "border-[var(--color-surface-border)] text-zinc-500 hover:text-zinc-300 hover:border-zinc-600"
      )}
      style={
        selected
          ? { backgroundColor: meta.bgColor, color: meta.color, borderColor: `${meta.color}50` }
          : {}
      }
      aria-pressed={selected}
    >
      <span aria-hidden="true">{TYPE_ICONS[alertType]}</span>
      <span className="text-[10px] leading-tight text-center">
        {TYPE_LABELS[alertType]}
      </span>
    </button>
  );
}

// ─── Main dialog ──────────────────────────────────────────────────────────────

interface AddAlertDialogProps {
  lat:      number;
  lng:      number;
  onSubmit: (alert: RoadAlert) => void;
  onClose:  () => void;
}

export function AddAlertDialog({
  lat,
  lng,
  onSubmit,
  onClose,
}: AddAlertDialogProps): React.ReactElement {
  const [selectedType,  setSelectedType]  = useState<AlertType>("gravel");
  const [description,   setDescription]   = useState("");
  const backdropRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus the description when the dialog opens
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newAlert: RoadAlert = {
      id:          `user-${Date.now()}`,
      type:        selectedType,
      lat,
      lng,
      description: description.trim(),
      severity:    "medium",
      radius:      300,
      verified:    false,
      reportedAt:  new Date().toISOString(),
      expiresAt:   null,
    };

    onSubmit(newAlert);
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[55] flex items-end justify-center sm:items-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
      onPointerDown={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={KA.addAlertTitle}
    >
      <div
        className={cn(
          "w-full max-w-sm rounded-2xl overflow-hidden",
          "bg-[var(--color-surface-card)] border border-[var(--color-surface-border)]",
          "shadow-[0_24px_64px_rgba(0,0,0,0.7)]",
          "animate-fade-up"
        )}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[var(--color-surface-border)]">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ backgroundColor: "rgba(239,68,68,0.15)", color: "#ef4444" }}
              aria-hidden="true"
            >
              <TriangleAlert size={16} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-100">
                {KA.addAlertTitle}
              </h2>
              {/* Coordinates badge */}
              <div className="flex items-center gap-1 mt-0.5">
                <MapPin size={10} className="text-zinc-600" aria-hidden="true" />
                <span className="text-[10px] font-mono text-zinc-600">
                  {lat.toFixed(4)}, {lng.toFixed(4)}
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            aria-label={KA.close}
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-500 hover:bg-white/5 hover:text-zinc-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 flex flex-col gap-5">
          {/* ── Type selector ── */}
          <div>
            <p className="text-xs font-semibold text-zinc-400 mb-2.5">
              {KA.addAlertTypeLabel}
            </p>
            <div className="grid grid-cols-4 gap-2">
              {(["gravel", "camera", "work", "danger"] as AlertType[]).map((type) => (
                <TypeChip
                  key={type}
                  alertType={type}
                  selected={selectedType === type}
                  onSelect={() => setSelectedType(type)}
                />
              ))}
            </div>
          </div>

          {/* ── Description ── */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="alert-description"
              className="text-xs font-semibold text-zinc-400"
            >
              {KA.addAlertDescLabel}
            </label>
            <textarea
              id="alert-description"
              ref={textareaRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={KA.addAlertDescPlaceholder}
              rows={3}
              required
              className={cn(
                "w-full rounded-xl bg-zinc-800/70 border border-zinc-700",
                "px-3 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 resize-none",
                "focus:outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20",
                "transition-all duration-150"
              )}
            />
          </div>

          {/* ── Actions ── */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className={cn(
                "flex-1 h-10 rounded-xl text-sm font-medium",
                "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200",
                "border border-[var(--color-surface-border)]",
                "transition-colors duration-150"
              )}
            >
              {KA.addAlertCancel}
            </button>
            <button
              type="submit"
              disabled={!description.trim()}
              className={cn(
                "flex-[2] h-10 rounded-xl text-sm font-semibold text-zinc-900",
                "bg-gradient-to-r from-amber-500 to-orange-500",
                "hover:from-amber-400 hover:to-orange-400",
                "shadow-[0_0_12px_rgba(245,158,11,0.3)]",
                "transition-all duration-150 active:scale-[0.98]",
                "disabled:opacity-40 disabled:cursor-not-allowed"
              )}
            >
              {KA.addAlertSubmit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
