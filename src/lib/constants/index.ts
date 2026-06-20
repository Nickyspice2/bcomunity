import type {
  AlertType,
  AlertSeverity,
  AsphaltQuality,
  Coordinate,
  DifficultyLevel,
  FilterState,
  SpotType,
} from "@/lib/types";

// ─── Georgia (Europe) geography ───────────────────────────────────────────────

/**
 * Geographic centroid of Georgia — anchors the map on initial load.
 * Places Tbilisi slightly south-west of centre to give breathing room
 * towards the Caucasus range in the north.
 */
export const GEORGIA_CENTER: Coordinate = { lat: 41.9, lng: 43.9 };

export const GEORGIA_DEFAULT_ZOOM = 8;
export const GEORGIA_MIN_ZOOM     = 6;
export const GEORGIA_MAX_ZOOM     = 18;

export const GEORGIA_BOUNDS = {
  north:  43.6,
  south:  41.0,
  east:   46.7,
  west:   39.9,
} as const;

// ─── Map tile provider ────────────────────────────────────────────────────────

/** CartoDB Dark Matter — free, no API key, purpose-built for dark UI overlays. */
export const MAP_TILE_URL    = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
export const MAP_TILE_ATTR   = '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>';
export const MAP_TILE_SUBDOM = "abcd";

// ─── Alert type display metadata ─────────────────────────────────────────────

export interface AlertMeta {
  label:       string;
  color:       string;
  bgColor:     string;
  borderColor: string;
  description: string;
}

export const ALERT_TYPE_META: Record<AlertType, AlertMeta> = {
  gravel: {
    label:       "Gravel Hazard",
    color:       "#a78bfa",
    bgColor:     "rgba(167,139,250,0.12)",
    borderColor: "rgba(167,139,250,0.30)",
    description: "Loose gravel across lane — reduce speed below 50 km/h",
  },
  camera: {
    label:       "Speed Camera",
    color:       "#3b82f6",
    bgColor:     "rgba(59,130,246,0.12)",
    borderColor: "rgba(59,130,246,0.30)",
    description: "Fixed speed enforcement camera",
  },
  work: {
    label:       "Roadworks",
    color:       "#f59e0b",
    bgColor:     "rgba(245,158,11,0.12)",
    borderColor: "rgba(245,158,11,0.30)",
    description: "Active road construction — lane closures possible",
  },
  danger: {
    label:       "Danger Zone",
    color:       "#ef4444",
    bgColor:     "rgba(239,68,68,0.12)",
    borderColor: "rgba(239,68,68,0.30)",
    description: "High-risk section — hairpins, unstable surface, or landslide risk",
  },
};

// ─── Difficulty display metadata ──────────────────────────────────────────────

export interface DifficultyMeta {
  label:   string;
  color:   string;
  bgColor: string;
}

export const DIFFICULTY_META: Record<DifficultyLevel, DifficultyMeta> = {
  beginner: {
    label:   "Beginner",
    color:   "#22c55e",
    bgColor: "rgba(34,197,94,0.12)",
  },
  intermediate: {
    label:   "Intermediate",
    color:   "#f59e0b",
    bgColor: "rgba(245,158,11,0.12)",
  },
  advanced: {
    label:   "Advanced",
    color:   "#fb923c",
    bgColor: "rgba(251,146,60,0.12)",
  },
  extreme: {
    label:   "Extreme",
    color:   "#ef4444",
    bgColor: "rgba(239,68,68,0.12)",
  },
};

// ─── Asphalt quality display metadata ────────────────────────────────────────

export interface AsphaltQualityMeta {
  label:   string;
  color:   string;
  bgColor: string;
}

export const ASPHALT_QUALITY_META: Record<AsphaltQuality, AsphaltQualityMeta> = {
  excellent: { label: "Excellent",  color: "#22c55e", bgColor: "rgba(34,197,94,0.12)"   },
  good:      { label: "Good",       color: "#84cc16", bgColor: "rgba(132,204,22,0.12)"  },
  fair:      { label: "Fair",       color: "#f59e0b", bgColor: "rgba(245,158,11,0.12)"  },
  poor:      { label: "Poor",       color: "#fb923c", bgColor: "rgba(251,146,60,0.12)"  },
  unpaved:   { label: "Unpaved",    color: "#a78bfa", bgColor: "rgba(167,139,250,0.12)" },
};

// ─── Biker spot display metadata ─────────────────────────────────────────────

export interface SpotMeta {
  label: string;
  icon:  string;
  color: string;
}

export const SPOT_TYPE_META: Record<SpotType, SpotMeta> = {
  cafe:      { label: "Biker Café",  icon: "☕", color: "#fb923c" },
  fuel:      { label: "Fuel",        icon: "⛽", color: "#ec4899" },
  viewpoint: { label: "Viewpoint",   icon: "🏔️", color: "#22c55e" },
  rest_area: { label: "Rest Area",   icon: "🅿️", color: "#3b82f6" },
  mechanic:  { label: "Mechanic",    icon: "🔧", color: "#a78bfa" },
  hotel:     { label: "Hotel",       icon: "🏨", color: "#f59e0b" },
};

// ─── Alert severity metadata ──────────────────────────────────────────────────

export const ALERT_SEVERITY_META: Record<AlertSeverity, { label: string; color: string }> = {
  low:    { label: "Low",    color: "#22c55e" },
  medium: { label: "Medium", color: "#f59e0b" },
  high:   { label: "High",   color: "#ef4444" },
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

// ─── UI layout ────────────────────────────────────────────────────────────────

export const SIDEBAR_WIDTH_PX = 320;
