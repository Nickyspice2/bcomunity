import type { AlertCategory, DifficultyLevel, FilterState, LatLng, SpotCategory } from "@/lib/types";

// Georgia (Europe) geographic center — Tbilisi area
export const GEORGIA_CENTER: LatLng = { lat: 41.6938, lng: 44.8015 };
export const GEORGIA_DEFAULT_ZOOM = 9;
export const GEORGIA_MIN_ZOOM     = 7;
export const GEORGIA_MAX_ZOOM     = 18;

// Map tile provider — CartoDB Dark Matter (no API key required)
export const MAP_TILE_URL    = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
export const MAP_TILE_ATTR   = '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>';
export const MAP_TILE_SUBDOM = "abcd";

// ─── Alert category metadata ──────────────────────────────────────────────────

export const ALERT_CATEGORY_META: Record<
  AlertCategory,
  { label: string; color: string; bgColor: string; borderColor: string; description: string }
> = {
  new_asphalt:   { label: "New Asphalt",       color: "#22c55e", bgColor: "rgba(34,197,94,0.12)",   borderColor: "rgba(34,197,94,0.3)",   description: "Freshly laid asphalt — excellent grip" },
  gravel_hazard: { label: "Gravel Hazard",      color: "#a78bfa", bgColor: "rgba(167,139,250,0.12)", borderColor: "rgba(167,139,250,0.3)", description: "Loose gravel — reduce speed" },
  speed_camera:  { label: "Speed Camera",       color: "#3b82f6", bgColor: "rgba(59,130,246,0.12)",  borderColor: "rgba(59,130,246,0.3)",  description: "Fixed speed enforcement camera" },
  roadworks:     { label: "Roadworks",          color: "#f59e0b", bgColor: "rgba(245,158,11,0.12)",  borderColor: "rgba(245,158,11,0.3)",  description: "Active road construction" },
  accident:      { label: "Accident Report",   color: "#ef4444", bgColor: "rgba(239,68,68,0.12)",   borderColor: "rgba(239,68,68,0.3)",   description: "Recent accident — proceed carefully" },
  fuel_station:  { label: "Fuel Station",       color: "#ec4899", bgColor: "rgba(236,72,153,0.12)",  borderColor: "rgba(236,72,153,0.3)",  description: "Fuel available" },
  biker_cafe:    { label: "Biker Café",         color: "#fb923c", bgColor: "rgba(251,146,60,0.12)",  borderColor: "rgba(251,146,60,0.3)",  description: "Biker-friendly café / rest stop" },
};

export const DIFFICULTY_META: Record<
  DifficultyLevel,
  { label: string; color: string; bgColor: string }
> = {
  beginner:     { label: "Beginner",     color: "#22c55e", bgColor: "rgba(34,197,94,0.12)"   },
  intermediate: { label: "Intermediate", color: "#f59e0b", bgColor: "rgba(245,158,11,0.12)"  },
  advanced:     { label: "Advanced",     color: "#fb923c", bgColor: "rgba(251,146,60,0.12)"  },
  extreme:      { label: "Extreme",      color: "#ef4444", bgColor: "rgba(239,68,68,0.12)"   },
};

export const SPOT_CATEGORY_META: Record<
  SpotCategory,
  { label: string; icon: string; color: string }
> = {
  cafe:       { label: "Café",        icon: "☕", color: "#fb923c" },
  fuel:       { label: "Fuel",        icon: "⛽", color: "#ec4899" },
  rest_area:  { label: "Rest Area",   icon: "🅿️", color: "#3b82f6" },
  viewpoint:  { label: "Viewpoint",   icon: "🏔️", color: "#22c55e" },
  mechanic:   { label: "Mechanic",    icon: "🔧", color: "#a78bfa" },
  hotel:      { label: "Hotel",       icon: "🏨", color: "#f59e0b" },
};

// ─── Default filter state ─────────────────────────────────────────────────────

export const DEFAULT_FILTERS: FilterState = {
  alertCategories: ["new_asphalt", "gravel_hazard", "speed_camera", "roadworks", "biker_cafe", "fuel_station"],
  difficulties:    ["beginner", "intermediate", "advanced", "extreme"],
  surfaces:        ["asphalt_new", "asphalt_old", "gravel", "dirt"],
  spotCategories:  ["cafe", "fuel", "rest_area", "viewpoint", "mechanic", "hotel"],
  showRoutes:      true,
  showAlerts:      true,
  showSpots:       true,
  searchQuery:     "",
};

// ─── Sidebar sections ─────────────────────────────────────────────────────────

export const SIDEBAR_WIDTH_OPEN   = 320; // px
export const SIDEBAR_WIDTH_CLOSED = 0;   // px (fully collapsed on mobile)
