// ─── Geographic primitives ────────────────────────────────────────────────────

export interface LatLng {
  lat: number;
  lng: number;
}

export interface BoundingBox {
  north: number;
  south: number;
  east: number;
  west: number;
}

// ─── Route domain ─────────────────────────────────────────────────────────────

export type RoadSurfaceType = "asphalt_new" | "asphalt_old" | "gravel" | "dirt" | "cobblestone";
export type DifficultyLevel  = "beginner" | "intermediate" | "advanced" | "extreme";
export type RouteStatus      = "verified" | "unverified" | "reported" | "closed";

export interface Route {
  id:           string;
  name:         string;
  description:  string;
  difficulty:   DifficultyLevel;
  surface:      RoadSurfaceType;
  status:       RouteStatus;
  distanceKm:   number;
  durationMin:  number;
  elevationGain: number;
  waypoints:    LatLng[];
  startPoint:   LatLng;
  endPoint:     LatLng;
  tags:         string[];
  region:       string;
  createdAt:    string;
  updatedAt:    string;
  likeCount:    number;
  rideCount:    number;
}

// ─── Road condition alerts ────────────────────────────────────────────────────

export type AlertSeverity = "low" | "medium" | "high" | "critical";
export type AlertCategory =
  | "new_asphalt"
  | "gravel_hazard"
  | "speed_camera"
  | "roadworks"
  | "accident"
  | "fuel_station"
  | "biker_cafe";

export interface RoadAlert {
  id:          string;
  category:    AlertCategory;
  severity:    AlertSeverity;
  title:       string;
  description: string;
  location:    LatLng;
  radius:      number;   // metres — display area of effect on map
  reportedAt:  string;
  expiresAt:   string | null;
  upvotes:     number;
  verified:    boolean;
}

// ─── Biker-friendly spots ─────────────────────────────────────────────────────

export type SpotCategory = "cafe" | "fuel" | "rest_area" | "viewpoint" | "mechanic" | "hotel";

export interface BikerSpot {
  id:          string;
  name:        string;
  category:    SpotCategory;
  description: string;
  location:    LatLng;
  address:     string;
  phone:       string | null;
  website:     string | null;
  openHours:   string | null;
  rating:      number;
  reviewCount: number;
  amenities:   string[];
  verified:    boolean;
}

// ─── Filter state ─────────────────────────────────────────────────────────────

export interface FilterState {
  alertCategories: AlertCategory[];
  difficulties:    DifficultyLevel[];
  surfaces:        RoadSurfaceType[];
  spotCategories:  SpotCategory[];
  showRoutes:      boolean;
  showAlerts:      boolean;
  showSpots:       boolean;
  searchQuery:     string;
}

// ─── Map view state ───────────────────────────────────────────────────────────

export interface MapViewState {
  center:   LatLng;
  zoom:     number;
  bounds:   BoundingBox | null;
  isReady:  boolean;
}
