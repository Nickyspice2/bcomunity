// ─── Geographic primitives ────────────────────────────────────────────────────

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface BoundingBox {
  north: number;
  south: number;
  east:  number;
  west:  number;
}

// ─── Route ────────────────────────────────────────────────────────────────────

/**
 * Rider-perceived difficulty of the road — based on surface quality,
 * elevation change, and technical sections, not vehicle type.
 */
export type DifficultyLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "extreme";

/**
 * Physical condition of the riding surface at time of last verification.
 * Determines icon styling and filter chip colour on the map.
 */
export type AsphaltQuality =
  | "excellent"   // newly paved, smooth, full lane markings
  | "good"        // maintained, minor cracks, grippy
  | "fair"        // visible wear, patched sections, caution advised
  | "poor"        // significant damage, potholes, reduced speed required
  | "unpaved";    // gravel/dirt surface — off-road capable bike recommended

export interface Route {
  id:             string;
  name:           string;
  description:    string;
  difficulty:     DifficultyLevel;
  asphaltQuality: AsphaltQuality;
  /** Ordered array of waypoints defining the polyline on the map. */
  coordinates:    Coordinate[];
  distanceKm:     number;
  durationMin:    number;
  /** Total elevation gain in metres over the full route. */
  elevationGain:  number;
  region:         string;
  tags:           string[];
  likeCount:      number;
  rideCount:      number;
}

// ─── Road alert ───────────────────────────────────────────────────────────────

/**
 * Four alert categories surfaced to riders on the map.
 * Kept intentionally narrow — covers the highest-impact hazards for motorcyclists.
 */
export type AlertType =
  | "gravel"    // loose gravel spread across lane(s)
  | "camera"    // fixed speed enforcement camera
  | "work"      // active road construction / lane closures
  | "danger";   // general high-risk section (hairpins, unstable surface, landslide)

export type AlertSeverity = "low" | "medium" | "high";

export interface RoadAlert {
  id:          string;
  type:        AlertType;
  /** WGS-84 decimal latitude of the alert point. */
  lat:         number;
  /** WGS-84 decimal longitude of the alert point. */
  lng:         number;
  description: string;
  severity:    AlertSeverity;
  /** Radius in metres for the area-of-effect circle rendered on the map. */
  radius:      number;
  verified:    boolean;
  reportedAt:  string;   // ISO 8601
  expiresAt:   string | null;
}

// ─── Biker spot ───────────────────────────────────────────────────────────────

export type SpotType =
  | "cafe"
  | "fuel"
  | "viewpoint"
  | "rest_area"
  | "mechanic"
  | "hotel";

export interface BikerSpot {
  id:       string;
  name:     string;
  type:     SpotType;
  /** WGS-84 decimal latitude. */
  lat:      number;
  /** WGS-84 decimal longitude. */
  lng:      number;
  address?: string;
  phone?:   string;
  /** Average rating 1–5. */
  rating?:  number;
  verified: boolean;
}

// ─── Active filter state ──────────────────────────────────────────────────────

export interface FilterState {
  /** Which alert types are currently visible on the map. */
  alertTypes:   AlertType[];
  difficulties: DifficultyLevel[];
  spotTypes:    SpotType[];
  showRoutes:   boolean;
  showAlerts:   boolean;
  showSpots:    boolean;
  searchQuery:  string;
}

// ─── Map viewport state ───────────────────────────────────────────────────────

export interface MapViewState {
  center:  Coordinate;
  zoom:    number;
  bounds:  BoundingBox | null;
  isReady: boolean;
}
