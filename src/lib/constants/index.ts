import type {
  AlertSeverity,
  AlertType,
  AsphaltQuality,
  Coordinate,
  DifficultyLevel,
  FilterState,
  SpotType,
} from "@/lib/types";
import { KA } from "@/lib/i18n/ka";

// ─── Georgia geography ────────────────────────────────────────────────────────

export const GEORGIA_CENTER: Coordinate = { lat: 41.9, lng: 43.9 };
export const GEORGIA_DEFAULT_ZOOM = 8;
export const GEORGIA_MIN_ZOOM     = 6;
export const GEORGIA_MAX_ZOOM     = 18;

export const GEORGIA_BOUNDS = {
  north: 43.6, south: 41.0, east: 46.7, west: 39.9,
} as const;

// ─── Map tiles ────────────────────────────────────────────────────────────────

/** CartoDB Dark Matter — free, no API key required. */
export const MAP_TILE_URL    = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
export const MAP_TILE_ATTR   = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>';
export const MAP_TILE_SUBDOM = "abcd";

// ─── Alert type metadata ──────────────────────────────────────────────────────

export interface AlertMeta {
  label:       string;
  color:       string;
  bgColor:     string;
  borderColor: string;
  description: string;
}

export const ALERT_TYPE_META: Record<AlertType, AlertMeta> = {
  gravel: {
    label:       KA.alertGravel,
    /** Neon orange — high-visibility on dark map */
    color:       "#ff6b35",
    bgColor:     "rgba(255,107,53,0.12)",
    borderColor: "rgba(255,107,53,0.30)",
    description: KA.alertGravelDesc,
  },
  camera: {
    label:       KA.alertCamera,
    /** Neon red — instantly recognisable speed cameras */
    color:       "#ff2d55",
    bgColor:     "rgba(255,45,85,0.12)",
    borderColor: "rgba(255,45,85,0.30)",
    description: KA.alertCameraDesc,
  },
  work: {
    label:       KA.alertWork,
    color:       "#0ea5e9",
    bgColor:     "rgba(14,165,233,0.12)",
    borderColor: "rgba(14,165,233,0.30)",
    description: KA.alertWorkDesc,
  },
  danger: {
    label:       KA.alertDanger,
    /** Neon amber — general hazard */
    color:       "#ffd60a",
    bgColor:     "rgba(255,214,10,0.12)",
    borderColor: "rgba(255,214,10,0.30)",
    description: KA.alertDangerDesc,
  },
};

// ─── Difficulty metadata ──────────────────────────────────────────────────────

export interface DifficultyMeta { label: string; color: string; bgColor: string; }

export const DIFFICULTY_META: Record<DifficultyLevel, DifficultyMeta> = {
  beginner:     { label: KA.difficultyBeginner,     color: "#22c55e", bgColor: "rgba(34,197,94,0.12)"   },
  intermediate: { label: KA.difficultyIntermediate, color: "#f59e0b", bgColor: "rgba(245,158,11,0.12)"  },
  advanced:     { label: KA.difficultyAdvanced,     color: "#fb923c", bgColor: "rgba(251,146,60,0.12)"  },
  extreme:      { label: KA.difficultyExtreme,      color: "#ef4444", bgColor: "rgba(239,68,68,0.12)"   },
};

// ─── Asphalt quality metadata ─────────────────────────────────────────────────

export interface AsphaltQualityMeta { label: string; color: string; bgColor: string; }

export const ASPHALT_QUALITY_META: Record<AsphaltQuality, AsphaltQualityMeta> = {
  excellent: { label: KA.qualityExcellent, color: "#22c55e", bgColor: "rgba(34,197,94,0.12)"   },
  good:      { label: KA.qualityGood,      color: "#84cc16", bgColor: "rgba(132,204,22,0.12)"  },
  fair:      { label: KA.qualityFair,      color: "#f59e0b", bgColor: "rgba(245,158,11,0.12)"  },
  poor:      { label: KA.qualityPoor,      color: "#fb923c", bgColor: "rgba(251,146,60,0.12)"  },
  unpaved:   { label: KA.qualityUnpaved,   color: "#a78bfa", bgColor: "rgba(167,139,250,0.12)" },
};

// ─── Spot type metadata ───────────────────────────────────────────────────────

export interface SpotMeta { label: string; icon: string; color: string; }

export const SPOT_TYPE_META: Record<SpotType, SpotMeta> = {
  cafe:      { label: KA.spotCafe,      icon: "☕", color: "#fb923c" },
  fuel:      { label: KA.spotFuel,      icon: "⛽", color: "#ec4899" },
  viewpoint: { label: KA.spotViewpoint, icon: "🏔️", color: "#22c55e" },
  rest_area: { label: KA.spotRestArea,  icon: "🅿️", color: "#3b82f6" },
  mechanic:  { label: KA.spotMechanic,  icon: "🔧", color: "#a78bfa" },
  hotel:     { label: KA.spotHotel,     icon: "🏨", color: "#f59e0b" },
};

// ─── Alert severity metadata ──────────────────────────────────────────────────

export const ALERT_SEVERITY_META: Record<AlertSeverity, { label: string; color: string }> = {
  low:    { label: KA.severityLow,    color: "#22c55e" },
  medium: { label: KA.severityMedium, color: "#f59e0b" },
  high:   { label: KA.severityHigh,   color: "#ef4444" },
};

// ─── Default filter state ─────────────────────────────────────────────────────

export const DEFAULT_FILTERS: FilterState = {
  alertTypes:   ["gravel", "camera", "work", "danger"],
  difficulties: ["beginner", "intermediate", "advanced", "extreme"],
  spotTypes:    ["cafe", "fuel", "viewpoint", "rest_area", "mechanic", "hotel"],
  showRoutes:   true,
  showAlerts:   true,
  showSpots:    true,
  searchQuery:  "",
};
