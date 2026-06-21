// ─── Social — Biker user ──────────────────────────────────────────────────────

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
  likeCount:    number;
  commentCount: number;
  createdAt:    string;
  isLiked:      boolean;
  tags:         string[];
}

// ─── Social — Group ride ──────────────────────────────────────────────────────

export type RidePace = "slow" | "medium" | "fast";

export interface GroupRide {
  id:             string;
  name:           string;
  destination:    string;
  gatheringPoint: string;
  gatheringTime:  string;
  pace:           RidePace;
  description:    string;
  organizer:      BikerUser;
  joinedRiders:   BikerUser[];
  maxRiders:      number;
}

// ─── Social — Biker club ──────────────────────────────────────────────────────

export interface BikerClub {
  id:          string;
  name:        string;
  location:    string;
  memberCount: number;
  isVerified:  boolean;
  description: string;
  tags:        string[];
  logoColor:   string;
  foundedYear: number;
}

// ─── Marketplace ──────────────────────────────────────────────────────────────

export type MarketplaceCategory = "bikes" | "gear" | "parts";
export type ItemCondition       = "new" | "like_new" | "good" | "fair";
export type PriceCurrency       = "GEL" | "USD";

export interface MarketplaceListing {
  id:           string;
  title:        string;
  description:  string;
  price:        number;
  currency:     PriceCurrency;
  category:     MarketplaceCategory;
  condition:    ItemCondition;
  seller:       BikerUser;
  location:     string;
  createdAt:    string;
  isNegotiable: boolean;
  views:        number;
}

// ─── Hub — Service directory ──────────────────────────────────────────────────

export type ServiceCategory =
  | "mechanic"
  | "tires"
  | "towing"
  | "parts_store"
  | "wash";

export interface ServiceProvider {
  id:              string;
  name:            string;
  category:        ServiceCategory;
  /** Brand / bike-type specialisations (e.g. "Yamaha", "ADV") */
  specializations: string[];
  /** Full text address — no coordinates */
  location:        string;
  city:            string;
  phone?:          string;
  /** 1–5 star rating */
  rating:          number;
  reviewCount:     number;
  isVerified:      boolean;
  /** List of offered services in Georgian */
  services:        string[];
  workingHours:    string;
}

// ─── Hub — City chat ──────────────────────────────────────────────────────────

export interface ChatMessage {
  id:        string;
  author:    BikerUser;
  content:   string;
  createdAt: string;
}

export interface CityRoom {
  id:       string;
  city:     string;
  messages: ChatMessage[];
}

// ─── Profile — Garage ────────────────────────────────────────────────────────

export interface GarageMotorcycle {
  id:            string;
  brand:         string;
  model:         string;
  year:          number;
  modifications: string[];
  stats: {
    totalKm:         number;
    routesCompleted: number;
    alertsSubmitted: number;
  };
}
