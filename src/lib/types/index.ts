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

export type DifficultyLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "extreme";

export type AsphaltQuality =
  | "excellent"
  | "good"
  | "fair"
  | "poor"
  | "unpaved";

export interface Route {
  id:             string;
  name:           string;
  description:    string;
  difficulty:     DifficultyLevel;
  asphaltQuality: AsphaltQuality;
  coordinates:    Coordinate[];
  distanceKm:     number;
  durationMin:    number;
  elevationGain:  number;
  region:         string;
  tags:           string[];
  likeCount:      number;
  rideCount:      number;
}

// ─── Road alert ───────────────────────────────────────────────────────────────

export type AlertType     = "gravel" | "camera" | "work" | "danger";
export type AlertSeverity = "low" | "medium" | "high";

export interface RoadAlert {
  id:          string;
  type:        AlertType;
  lat:         number;
  lng:         number;
  description: string;
  severity:    AlertSeverity;
  radius:      number;
  verified:    boolean;
  reportedAt:  string;
  expiresAt:   string | null;
}

// ─── Biker spot ───────────────────────────────────────────────────────────────

export type SpotType =
  | "cafe" | "fuel" | "viewpoint" | "rest_area" | "mechanic" | "hotel";

export interface BikerSpot {
  id:       string;
  name:     string;
  type:     SpotType;
  lat:      number;
  lng:      number;
  address?: string;
  phone?:   string;
  rating?:  number;
  verified: boolean;
}

// ─── Filter state ─────────────────────────────────────────────────────────────

export interface FilterState {
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

// ─── Social — Biker user ──────────────────────────────────────────────────────

/**
 * Public-facing profile of a biker in the social hub.
 * `avatarColor` is a CSS colour string used to generate the letter-avatar.
 */
export interface BikerUser {
  id:              string;
  name:            string;
  username:        string;
  motorcycleModel: string;
  avatarColor:     string;
  isVerified:      boolean;
  followersCount:  number;
  rideCount:       number;
}

// ─── Social — Post ────────────────────────────────────────────────────────────

export interface BikerPost {
  id:           string;
  author:       BikerUser;
  content:      string;
  /** Optional reference to a Route id — shows "მარშრუტის ნახვა" button. */
  routeRef?:    string;
  likeCount:    number;
  commentCount: number;
  createdAt:    string;
  isLiked:      boolean;
  tags:         string[];
}

// ─── Social — Group ride ──────────────────────────────────────────────────────

export type RidePace = "slow" | "medium" | "fast";

export interface GroupRide {
  id:              string;
  name:            string;
  destination:     string;
  gatheringPoint:  string;
  gatheringTime:   string; // ISO 8601
  pace:            RidePace;
  description:     string;
  organizer:       BikerUser;
  joinedRiders:    BikerUser[];
  maxRiders:       number;
  routeRef?:       string;
}

// ─── Profile — Motorcycle garage ─────────────────────────────────────────────

export interface GarageMotorcycle {
  id:            string;
  brand:         string;
  model:         string;
  year:          number;
  modifications: string[];
  stats: {
    totalKm:          number;
    routesCompleted:  number;
    alertsSubmitted:  number;
  };
}
