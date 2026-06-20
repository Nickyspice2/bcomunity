#!/usr/bin/env python3
"""
GeoMotoRoutes — Project Generator
==================================
Run this script once to scaffold the entire GeoMotoRoutes Next.js project on
your local machine.

Usage
-----
  python create_geomotoroutes.py                  # creates ./geomotoroutes/
  python create_geomotoroutes.py my-folder-name   # creates ./my-folder-name/

After it finishes:
  cd geomotoroutes
  npm install
  npm run dev

Requirements: Python 3.8+  (no external packages needed)
"""

import os
import sys
import textwrap

# ─── Destination ─────────────────────────────────────────────────────────────

ROOT = sys.argv[1] if len(sys.argv) > 1 else "geomotoroutes"

# ─── File registry ────────────────────────────────────────────────────────────
# Keys are relative paths; values are the exact file contents.

FILES: dict[str, str] = {}


# ── package.json ──────────────────────────────────────────────────────────────

FILES["package.json"] = """\
{
  "name": "geomotoroutes",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@types/leaflet": "^1.9.21",
    "leaflet": "^1.9.4",
    "lucide-react": "^0.468.0",
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-leaflet": "^5.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "^15.1.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
"""


# ── tsconfig.json ─────────────────────────────────────────────────────────────

FILES["tsconfig.json"] = """\
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
"""


# ── next.config.ts ────────────────────────────────────────────────────────────

FILES["next.config.ts"] = """\
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
"""


# ── postcss.config.mjs ───────────────────────────────────────────────────────

FILES["postcss.config.mjs"] = """\
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
"""


# ── eslint.config.mjs ────────────────────────────────────────────────────────

FILES["eslint.config.mjs"] = """\
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
"""


# ── .gitignore ────────────────────────────────────────────────────────────────

FILES[".gitignore"] = """\
# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
"""


# ── src/app/globals.css ───────────────────────────────────────────────────────

FILES["src/app/globals.css"] = """\
@import "tailwindcss";

/* ─────────────────────────────────────────────
   GeoMotoRoutes — Design Tokens
   Premium biker-centric dark theme
   ───────────────────────────────────────────── */
@theme inline {
  /* Surface palette — slate/zinc dark family */
  --color-surface-base:    #0b0d11;
  --color-surface-overlay: #13161d;
  --color-surface-raised:  #1a1f2b;
  --color-surface-card:    #1e2433;
  --color-surface-border:  #2a3045;
  --color-surface-muted:   #3a4155;

  /* Text hierarchy */
  --color-text-primary:   #f0f2f7;
  --color-text-secondary: #9aa3b8;
  --color-text-muted:     #5a6278;

  /* Accent — neon amber/orange (high-visibility on dark) */
  --color-accent-primary:   #f59e0b;
  --color-accent-secondary: #fb923c;
  --color-accent-glow:      rgba(245, 158, 11, 0.25);

  /* Semantic status colours */
  --color-status-danger:  #ef4444;
  --color-status-warning: #f59e0b;
  --color-status-success: #22c55e;
  --color-status-info:    #3b82f6;

  /* Glassmorphism tokens */
  --glass-bg:     rgba(19, 22, 29, 0.72);
  --glass-border: rgba(255, 255, 255, 0.06);

  /* Typography */
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

/* ─── Base resets ────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; }

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
  font-family: var(--font-sans), system-ui, sans-serif;
  overflow: hidden;
}

/* ─── Scrollbar ──────────────────────────────── */
::-webkit-scrollbar        { width: 5px; height: 5px; }
::-webkit-scrollbar-track  { background: var(--color-surface-overlay); }
::-webkit-scrollbar-thumb  { background: var(--color-surface-muted); border-radius: 9999px; }
::-webkit-scrollbar-thumb:hover { background: var(--color-accent-primary); }

/* ─── Leaflet overrides ──────────────────────── */
.leaflet-container { background: #0b0d11 !important; font-family: inherit !important; }
.leaflet-control-zoom { border: none !important; box-shadow: 0 4px 24px rgba(0,0,0,.6) !important; }
.leaflet-control-zoom a {
  background: var(--color-surface-card) !important;
  color: var(--color-text-primary) !important;
  border: 1px solid var(--color-surface-border) !important;
  width: 36px !important; height: 36px !important; line-height: 36px !important;
  font-size: 18px !important;
}
.leaflet-control-zoom a:hover {
  background: var(--color-surface-muted) !important;
  color: var(--color-accent-primary) !important;
}
.leaflet-popup-content-wrapper {
  background: var(--color-surface-card) !important;
  color: var(--color-text-primary) !important;
  border: 1px solid var(--color-surface-border) !important;
  border-radius: 12px !important;
  box-shadow: 0 8px 32px rgba(0,0,0,.6) !important;
}
.leaflet-popup-tip { background: var(--color-surface-card) !important; }

/* ─── Utility animations ─────────────────────── */
@keyframes pulse-glow {
  0%,100% { box-shadow: 0 0 0 0   var(--color-accent-glow); }
  50%      { box-shadow: 0 0 0 8px transparent; }
}
@keyframes slide-in-left {
  from { transform: translateX(-100%); opacity: 0; }
  to   { transform: translateX(0);     opacity: 1; }
}
@keyframes fade-up {
  from { transform: translateY(8px); opacity: 0; }
  to   { transform: translateY(0);   opacity: 1; }
}
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}

.animate-pulse-glow    { animation: pulse-glow    2s ease-in-out infinite; }
.animate-slide-in-left { animation: slide-in-left 0.3s ease-out both; }
.animate-fade-up       { animation: fade-up       0.25s ease-out both; }
.animate-shimmer {
  background: linear-gradient(
    90deg,
    var(--color-surface-card) 25%,
    var(--color-surface-raised) 50%,
    var(--color-surface-card) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
"""


# ── src/app/layout.tsx ────────────────────────────────────────────────────────

FILES["src/app/layout.tsx"] = """\
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets:  ["latin"],
  display:  "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets:  ["latin"],
  display:  "swap",
});

export const metadata: Metadata = {
  title:       "GeoMotoRoutes \\u2014 Georgian Motorcycle Route Planner",
  description: "Discover premium motorcycle routes across Georgia. Real-time road conditions, gravel warnings, biker-friendly spots, and community-verified alerts.",
  keywords:    ["motorcycle routes Georgia", "biker Georgia", "Georgian roads", "road conditions Georgia"],
  authors:     [{ name: "GeoMotoRoutes" }],
  openGraph: {
    title:       "GeoMotoRoutes",
    description: "Premium motorcycle route platform for Georgia (Caucasus)",
    type:        "website",
  },
};

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor:   "#0b0d11",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): React.ReactElement {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
"""


# ── src/app/page.tsx ──────────────────────────────────────────────────────────

FILES["src/app/page.tsx"] = """\
import { DashboardLayout } from "@/components/layout/DashboardLayout";

/**
 * Root page \\u2014 renders the full-viewport map dashboard.
 * All interactivity lives inside DashboardLayout (client boundary).
 */
export default function HomePage(): React.ReactElement {
  return <DashboardLayout />;
}
"""


# ── src/lib/types/index.ts ────────────────────────────────────────────────────

FILES["src/lib/types/index.ts"] = """\
// \\u2500\\u2500\\u2500 Geographic primitives \\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500

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

// \\u2500\\u2500\\u2500 Route \\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500

/**
 * Rider-perceived difficulty of the road \\u2014 based on surface quality,
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
  | "unpaved";    // gravel/dirt surface \\u2014 off-road capable bike recommended

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

// \\u2500\\u2500\\u2500 Road alert \\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500

/**
 * Four alert categories surfaced to riders on the map.
 * Kept intentionally narrow \\u2014 covers the highest-impact hazards for motorcyclists.
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

// \\u2500\\u2500\\u2500 Biker spot \\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500

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
  /** Average rating 1\\u20135. */
  rating?:  number;
  verified: boolean;
}

// \\u2500\\u2500\\u2500 Active filter state \\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500

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

// \\u2500\\u2500\\u2500 Map viewport state \\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500

export interface MapViewState {
  center:  Coordinate;
  zoom:    number;
  bounds:  BoundingBox | null;
  isReady: boolean;
}
"""


# ── src/lib/constants/index.ts ────────────────────────────────────────────────

FILES["src/lib/constants/index.ts"] = """\
import type {
  AlertType,
  AlertSeverity,
  AsphaltQuality,
  Coordinate,
  DifficultyLevel,
  FilterState,
  SpotType,
} from "@/lib/types";

// \\u2500\\u2500\\u2500 Georgia (Europe) geography \\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500

/**
 * Geographic centroid of Georgia \\u2014 anchors the map on initial load.
 * Gives balanced coverage across all regions including the Caucasus range.
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

// \\u2500\\u2500\\u2500 Map tile provider \\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500

/** CartoDB Dark Matter \\u2014 free, no API key, purpose-built for dark UI overlays. */
export const MAP_TILE_URL    = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
export const MAP_TILE_ATTR   = '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/">CARTO</a>';
export const MAP_TILE_SUBDOM = "abcd";

// \\u2500\\u2500\\u2500 Alert type display metadata \\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500

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
    description: "Loose gravel across lane \\u2014 reduce speed below 50 km/h",
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
    description: "Active road construction \\u2014 lane closures possible",
  },
  danger: {
    label:       "Danger Zone",
    color:       "#ef4444",
    bgColor:     "rgba(239,68,68,0.12)",
    borderColor: "rgba(239,68,68,0.30)",
    description: "High-risk section \\u2014 hairpins, unstable surface, or landslide risk",
  },
};

// \\u2500\\u2500\\u2500 Difficulty display metadata \\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500

export interface DifficultyMeta {
  label:   string;
  color:   string;
  bgColor: string;
}

export const DIFFICULTY_META: Record<DifficultyLevel, DifficultyMeta> = {
  beginner:     { label: "Beginner",     color: "#22c55e", bgColor: "rgba(34,197,94,0.12)"   },
  intermediate: { label: "Intermediate", color: "#f59e0b", bgColor: "rgba(245,158,11,0.12)"  },
  advanced:     { label: "Advanced",     color: "#fb923c", bgColor: "rgba(251,146,60,0.12)"  },
  extreme:      { label: "Extreme",      color: "#ef4444", bgColor: "rgba(239,68,68,0.12)"   },
};

// \\u2500\\u2500\\u2500 Asphalt quality display metadata \\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500

export interface AsphaltQualityMeta {
  label:   string;
  color:   string;
  bgColor: string;
}

export const ASPHALT_QUALITY_META: Record<AsphaltQuality, AsphaltQualityMeta> = {
  excellent: { label: "Excellent", color: "#22c55e", bgColor: "rgba(34,197,94,0.12)"   },
  good:      { label: "Good",      color: "#84cc16", bgColor: "rgba(132,204,22,0.12)"  },
  fair:      { label: "Fair",      color: "#f59e0b", bgColor: "rgba(245,158,11,0.12)"  },
  poor:      { label: "Poor",      color: "#fb923c", bgColor: "rgba(251,146,60,0.12)"  },
  unpaved:   { label: "Unpaved",   color: "#a78bfa", bgColor: "rgba(167,139,250,0.12)" },
};

// \\u2500\\u2500\\u2500 Biker spot display metadata \\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500

export interface SpotMeta {
  label: string;
  icon:  string;
  color: string;
}

export const SPOT_TYPE_META: Record<SpotType, SpotMeta> = {
  cafe:      { label: "Biker Caf\\u00e9", icon: "\\u2615", color: "#fb923c" },
  fuel:      { label: "Fuel",            icon: "\\u26fd", color: "#ec4899" },
  viewpoint: { label: "Viewpoint",       icon: "\\U0001f3d4\\ufe0f", color: "#22c55e" },
  rest_area: { label: "Rest Area",       icon: "\\U0001f17f\\ufe0f", color: "#3b82f6" },
  mechanic:  { label: "Mechanic",        icon: "\\U0001f527", color: "#a78bfa" },
  hotel:     { label: "Hotel",           icon: "\\U0001f3e8", color: "#f59e0b" },
};

// \\u2500\\u2500\\u2500 Alert severity metadata \\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500

export const ALERT_SEVERITY_META: Record<AlertSeverity, { label: string; color: string }> = {
  low:    { label: "Low",    color: "#22c55e" },
  medium: { label: "Medium", color: "#f59e0b" },
  high:   { label: "High",   color: "#ef4444" },
};

// \\u2500\\u2500\\u2500 Default filter state \\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500

export const DEFAULT_FILTERS: FilterState = {
  alertTypes:   ["gravel", "camera", "work", "danger"],
  difficulties: ["beginner", "intermediate", "advanced", "extreme"],
  spotTypes:    ["cafe", "fuel", "viewpoint", "rest_area", "mechanic", "hotel"],
  showRoutes:   true,
  showAlerts:   true,
  showSpots:    true,
  searchQuery:  "",
};

// \\u2500\\u2500\\u2500 UI layout \\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500

export const SIDEBAR_WIDTH_PX = 320;
"""


# ── src/lib/utils/index.ts ────────────────────────────────────────────────────

FILES["src/lib/utils/index.ts"] = """\
import type { AsphaltQuality, DifficultyLevel } from "@/lib/types";

/**
 * Formats a route distance with consistent units.
 * Values < 1 km are shown in metres.
 */
export function formatDistance(km: number): string {
  if (km < 1)  return `${Math.round(km * 1_000)} m`;
  if (km < 10) return `${km.toFixed(1)} km`;
  return `${Math.round(km)} km`;
}

/**
 * Converts minutes to a human-readable duration.
 * 90 \\u2192 "1h 30min",  45 \\u2192 "45 min",  120 \\u2192 "2h"
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h   = Math.floor(minutes / 60);
  const min = minutes % 60;
  return min === 0 ? `${h}h` : `${h}h ${min}min`;
}

/**
 * Maps a DifficultyLevel to a Tailwind text-colour class.
 */
export function getDifficultyColour(level: DifficultyLevel): string {
  const map: Record<DifficultyLevel, string> = {
    beginner:     "text-green-400",
    intermediate: "text-amber-400",
    advanced:     "text-orange-400",
    extreme:      "text-red-400",
  };
  return map[level];
}

/**
 * Returns a short human-readable label for an asphalt quality value.
 */
export function getAsphaltQualityLabel(quality: AsphaltQuality): string {
  const labels: Record<AsphaltQuality, string> = {
    excellent: "Excellent surface",
    good:      "Good surface",
    fair:      "Fair \\u2014 some wear",
    poor:      "Poor \\u2014 caution",
    unpaved:   "Unpaved / gravel",
  };
  return labels[quality];
}

/**
 * Clamps a numeric value within [min, max].
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Returns a human-readable relative-time string for an ISO 8601 timestamp.
 * e.g. "Just now", "14m ago", "3h ago", "5d ago"
 */
export function timeAgo(isoString: string): string {
  const diff  = Date.now() - new Date(isoString).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);

  if (mins  < 2)  return "Just now";
  if (mins  < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

/**
 * Lightweight class-name merger \\u2014 filters out falsy values.
 * Usage: cn("base", condition && "extra", undefined)
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
"""


# ── src/store/mockData.ts ─────────────────────────────────────────────────────

FILES["src/store/mockData.ts"] = """\
import type { BikerSpot, RoadAlert, Route } from "@/lib/types";

// \\u2500\\u2500\\u2500 Routes \\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500
// All coordinates are WGS-84 decimal degrees, verified against OSM.
// Elevation data sourced from SRTM 30m dataset.

export const MOCK_ROUTES: Route[] = [
  {
    id:             "r-001",
    name:           "Georgian Military Highway",
    description:
      "The most iconic motorcycle road in the Caucasus. The S3 national highway climbs " +
      "from Tbilisi\\u2019s suburbs to the 2,379\\u202fm Jvari Pass, passing Ananuri\\u2019s medieval fortress perched above " +
      "the Jinvali reservoir, the ski resort town of Gudauri, and culminating at Stepantsminda " +
      "(Kazbegi) with the Gergeti Trinity Church framed against Mount Kazbek (5,047\\u202fm).",
    difficulty:     "advanced",
    asphaltQuality: "excellent",
    coordinates: [
      { lat: 41.693, lng: 44.801 },
      { lat: 41.844, lng: 44.720 },
      { lat: 42.003, lng: 44.700 },
      { lat: 42.178, lng: 44.671 },
      { lat: 42.336, lng: 44.569 },
      { lat: 42.473, lng: 44.487 },
      { lat: 42.536, lng: 44.471 },
      { lat: 42.597, lng: 44.531 },
      { lat: 42.659, lng: 44.658 },
    ],
    distanceKm:    148,
    durationMin:   210,
    elevationGain: 2379,
    region:        "Mtskheta-Mtianeti",
    tags:          ["mountain", "panoramic", "switchbacks", "historic", "unesco"],
    likeCount:     1247,
    rideCount:     5830,
  },
  {
    id:             "r-002",
    name:           "Gombori Pass \\u2014 Kakheti Wine Road",
    description:
      "The back-road gateway to Georgia\\u2019s wine heartland. The Gombori range (1,620\\u202fm pass) " +
      "separates Kartli from the Alazani valley \\u2014 a contrast of dense beech forests on the ascent " +
      "and vast vineyard plains on the descent into Kakheti.",
    difficulty:     "intermediate",
    asphaltQuality: "good",
    coordinates: [
      { lat: 41.740, lng: 44.975 },
      { lat: 41.753, lng: 45.098 },
      { lat: 41.789, lng: 45.212 },
      { lat: 41.801, lng: 45.280 },
      { lat: 41.835, lng: 45.361 },
      { lat: 41.924, lng: 45.481 },
      { lat: 41.841, lng: 45.716 },
      { lat: 41.612, lng: 45.571 },
    ],
    distanceKm:    102,
    durationMin:   145,
    elevationGain: 1621,
    region:        "Kakheti",
    tags:          ["mountain", "wine-country", "beech-forest", "panoramic", "weekend-ride"],
    likeCount:     893,
    rideCount:     3210,
  },
  {
    id:             "r-003",
    name:           "Svaneti Road \\u2014 Enguri Gorge",
    description:
      "Georgia\\u2019s most dramatic and demanding route. The road to Mestia follows the Enguri River " +
      "through an increasingly narrow gorge before climbing into Svaneti \\u2014 a region of medieval " +
      "defensive towers and glaciated 4,000+\\u202fm peaks.",
    difficulty:     "extreme",
    asphaltQuality: "poor",
    coordinates: [
      { lat: 42.508, lng: 41.871 },
      { lat: 42.574, lng: 42.045 },
      { lat: 42.645, lng: 42.197 },
      { lat: 42.706, lng: 42.396 },
      { lat: 42.798, lng: 42.515 },
      { lat: 42.878, lng: 42.594 },
      { lat: 42.957, lng: 42.661 },
      { lat: 43.031, lng: 42.732 },
    ],
    distanceKm:    132,
    durationMin:   300,
    elevationGain: 1890,
    region:        "Samegrelo-Zemo Svaneti",
    tags:          ["extreme", "gravel", "gorge", "alpine", "unesco", "adventure"],
    likeCount:     2104,
    rideCount:     1520,
  },
  {
    id:             "r-004",
    name:           "Adjara Black Sea Coastal Loop",
    description:
      "Georgia\\u2019s most relaxed ride \\u2014 freshly paved coastal highway from Batumi heading north " +
      "along the Black Sea. Subtropical vegetation, black-sand beaches, and palm-lined promenades.",
    difficulty:     "beginner",
    asphaltQuality: "excellent",
    coordinates: [
      { lat: 41.641, lng: 41.636 },
      { lat: 41.668, lng: 41.672 },
      { lat: 41.819, lng: 41.777 },
      { lat: 41.896, lng: 41.813 },
      { lat: 41.974, lng: 41.797 },
      { lat: 42.090, lng: 41.712 },
      { lat: 42.148, lng: 41.673 },
    ],
    distanceKm:    68,
    durationMin:   85,
    elevationGain: 95,
    region:        "Adjara / Guria",
    tags:          ["coastal", "sea", "easy", "flat", "subtropical", "scenic"],
    likeCount:     671,
    rideCount:     2890,
  },
  {
    id:             "r-005",
    name:           "Borjomi Gorge \\u2014 Bakuriani Alpine",
    description:
      "The Borjomi gorge section is silky smooth asphalt through a narrow river canyon lined " +
      "with mineral springs (Borjomi-Kharagauli National Park). After Borjomi town the road " +
      "climbs steeply to Bakuriani ski resort on partially patched asphalt.",
    difficulty:     "intermediate",
    asphaltQuality: "fair",
    coordinates: [
      { lat: 41.983, lng: 44.112 },
      { lat: 41.921, lng: 44.026 },
      { lat: 41.840, lng: 43.537 },
      { lat: 41.839, lng: 43.399 },
      { lat: 41.855, lng: 43.333 },
      { lat: 41.750, lng: 43.523 },
      { lat: 41.749, lng: 43.523 },
    ],
    distanceKm:    88,
    durationMin:   120,
    elevationGain: 1340,
    region:        "Samtskhe-Javakheti / Shida Kartli",
    tags:          ["gorge", "spa", "alpine", "mineral-springs", "national-park"],
    likeCount:     445,
    rideCount:     1760,
  },
];

// \\u2500\\u2500\\u2500 Road alerts \\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500

export const MOCK_ALERTS: RoadAlert[] = [
  {
    id:          "a-001",
    type:        "gravel",
    lat:         42.503,
    lng:         44.469,
    description:
      "Landslide debris across both lanes approx. 300\\u202fm below the Jvari Pass summit. " +
      "Loose schist chips and gravel \\u2014 cornering grip severely reduced. Max 35 km/h.",
    severity:    "high",
    radius:      400,
    verified:    true,
    reportedAt:  new Date(Date.now() - 4  * 3_600_000).toISOString(),
    expiresAt:   new Date(Date.now() + 72 * 3_600_000).toISOString(),
  },
  {
    id:          "a-002",
    type:        "camera",
    lat:         41.786,
    lng:         45.103,
    description:
      "Fixed radar camera on the Tbilisi\\u2013Kakheti highway (E60) at the Sagarejo bypass. " +
      "Limit strictly enforced at 90 km/h. Camera active 24/7.",
    severity:    "low",
    radius:      150,
    verified:    true,
    reportedAt:  new Date(Date.now() - 30 * 86_400_000).toISOString(),
    expiresAt:   null,
  },
  {
    id:          "a-003",
    type:        "work",
    lat:         42.706,
    lng:         42.395,
    description:
      "Bridge reinforcement works at the Enguri Dam access road. Single-lane alternating " +
      "traffic controlled by flag operators. Expect 20\\u201340 min delays weekdays 08:00\\u201318:00.",
    severity:    "medium",
    radius:      1_200,
    verified:    true,
    reportedAt:  new Date(Date.now() - 5 * 86_400_000).toISOString(),
    expiresAt:   new Date(Date.now() + 45 * 86_400_000).toISOString(),
  },
  {
    id:          "a-004",
    type:        "danger",
    lat:         42.536,
    lng:         44.471,
    description:
      "Jvari Pass summit \\u2014 extreme caution in wet/icy conditions. " +
      "Series of blind hairpin bends at 2,379\\u202fm. Sheer drops on the north face with no armco barriers.",
    severity:    "high",
    radius:      800,
    verified:    true,
    reportedAt:  new Date(Date.now() - 60 * 86_400_000).toISOString(),
    expiresAt:   null,
  },
  {
    id:          "a-005",
    type:        "gravel",
    lat:         41.755,
    lng:         43.530,
    description:
      "Gravel spread on the Borjomi\\u2013Bakuriani road between km 14\\u201318. " +
      "Road maintenance trucks actively working \\u2014 expect loose stones thrown by vehicle traffic.",
    severity:    "medium",
    radius:      2_500,
    verified:    false,
    reportedAt:  new Date(Date.now() - 90 * 60_000).toISOString(),
    expiresAt:   new Date(Date.now() + 48 * 3_600_000).toISOString(),
  },
  {
    id:          "a-006",
    type:        "work",
    lat:         41.693,
    lng:         44.880,
    description:
      "Tbilisi ring road resurfacing project \\u2014 right-hand lane closed outbound. " +
      "Narrow contra-flow in operation. Standard car speed: 60 km/h.",
    severity:    "low",
    radius:      3_000,
    verified:    true,
    reportedAt:  new Date(Date.now() - 10 * 86_400_000).toISOString(),
    expiresAt:   new Date(Date.now() + 21 * 86_400_000).toISOString(),
  },
];

// \\u2500\\u2500\\u2500 Biker spots \\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500\\u2500

export const MOCK_SPOTS: BikerSpot[] = [
  { id: "s-001", name: "Iron Horse Tbilisi",         type: "cafe",      lat: 41.693, lng: 44.803, address: "14 Kostava St, Tbilisi 0108",                      phone: "+995 32 292 0014", rating: 4.9, verified: true  },
  { id: "s-002", name: "Ananuri Summit Viewpoint",    type: "viewpoint", lat: 42.178, lng: 44.671, address: "Georgian Military Highway, km 72",                  phone: undefined,          rating: 4.7, verified: true  },
  { id: "s-003", name: "Stepantsminda Riders Point",  type: "cafe",      lat: 42.657, lng: 44.654, address: "1 Kazbegi Central Sq., Stepantsminda",             phone: "+995 599 00 1234", rating: 4.8, verified: true  },
  { id: "s-004", name: "Zugdidi Last Stop \\u2014 Fuel & Rest", type: "fuel", lat: 42.509, lng: 41.876, address: "Svaneti Highway, Zugdidi outskirts",    phone: undefined,          rating: 4.2, verified: true  },
  { id: "s-005", name: "Signagi Panorama Terrace",    type: "viewpoint", lat: 41.612, lng: 45.571, address: "Old Town Signagi, Kakheti",                        phone: undefined,          rating: 4.9, verified: true  },
  { id: "s-006", name: "Batumi Riders Hub",           type: "cafe",      lat: 41.641, lng: 41.636, address: "8 Ninoshvili St, Batumi 6000",                     phone: "+995 422 271 500", rating: 4.6, verified: true  },
  { id: "s-007", name: "Gudauri Alpine Rest Area",    type: "rest_area", lat: 42.473, lng: 44.487, address: "Georgian Military Highway, km 133 (Gudauri)",      phone: undefined,          rating: 4.1, verified: true  },
  { id: "s-008", name: "Borjomi Mineral Springs Stop",type: "rest_area", lat: 41.839, lng: 43.399, address: "Borjomi Central Park, Borjomi",                    phone: undefined,          rating: 4.5, verified: true  },
];
"""


# ── src/features/filters/hooks/useRouteFilters.ts ─────────────────────────────

FILES["src/features/filters/hooks/useRouteFilters.ts"] = '''\
"use client";

import { useState, useCallback, useMemo } from "react";
import type { AlertType, DifficultyLevel, FilterState, SpotType } from "@/lib/types";
import { DEFAULT_FILTERS } from "@/lib/constants";

export interface UseRouteFiltersReturn {
  filters:            FilterState;
  toggleAlertType:    (type: AlertType)        => void;
  toggleDifficulty:   (level: DifficultyLevel) => void;
  toggleSpotType:     (type: SpotType)         => void;
  toggleShowRoutes:   () => void;
  toggleShowAlerts:   () => void;
  toggleShowSpots:    () => void;
  setSearchQuery:     (query: string)          => void;
  resetFilters:       () => void;
  activeFilterCount:  number;
}

function toggleItem<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

export function useRouteFilters(): UseRouteFiltersReturn {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);

  const toggleAlertType = useCallback((type: AlertType) => {
    setFilters((prev) => ({ ...prev, alertTypes: toggleItem(prev.alertTypes, type) }));
  }, []);

  const toggleDifficulty = useCallback((level: DifficultyLevel) => {
    setFilters((prev) => ({ ...prev, difficulties: toggleItem(prev.difficulties, level) }));
  }, []);

  const toggleSpotType = useCallback((type: SpotType) => {
    setFilters((prev) => ({ ...prev, spotTypes: toggleItem(prev.spotTypes, type) }));
  }, []);

  const toggleShowRoutes = useCallback(() => {
    setFilters((prev) => ({ ...prev, showRoutes: !prev.showRoutes }));
  }, []);

  const toggleShowAlerts = useCallback(() => {
    setFilters((prev) => ({ ...prev, showAlerts: !prev.showAlerts }));
  }, []);

  const toggleShowSpots = useCallback(() => {
    setFilters((prev) => ({ ...prev, showSpots: !prev.showSpots }));
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const resetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  const activeFilterCount = useMemo<number>(() => {
    let count = 0;
    if (!filters.showRoutes) count++;
    if (!filters.showAlerts) count++;
    if (!filters.showSpots)  count++;
    if (filters.alertTypes.length   !== DEFAULT_FILTERS.alertTypes.length)   count++;
    if (filters.difficulties.length !== DEFAULT_FILTERS.difficulties.length) count++;
    if (filters.spotTypes.length    !== DEFAULT_FILTERS.spotTypes.length)    count++;
    if (filters.searchQuery.trim()) count++;
    return count;
  }, [filters]);

  return {
    filters, toggleAlertType, toggleDifficulty, toggleSpotType,
    toggleShowRoutes, toggleShowAlerts, toggleShowSpots,
    setSearchQuery, resetFilters, activeFilterCount,
  };
}
'''


# ── src/features/map/hooks/useMapState.ts ────────────────────────────────────

FILES["src/features/map/hooks/useMapState.ts"] = '''\
"use client";

import { useState, useCallback, useRef } from "react";
import type { Map as LeafletMapInstance } from "leaflet";
import type { Coordinate, MapViewState } from "@/lib/types";
import { GEORGIA_CENTER, GEORGIA_DEFAULT_ZOOM } from "@/lib/constants";

export interface UseMapStateReturn {
  mapState:   MapViewState;
  mapRef:     React.MutableRefObject<LeafletMapInstance | null>;
  onMapReady: (map: LeafletMapInstance) => void;
  flyTo:      (center: Coordinate, zoom?: number) => void;
  resetView:  () => void;
}

export function useMapState(): UseMapStateReturn {
  const mapRef = useRef<LeafletMapInstance | null>(null);

  const [mapState, setMapState] = useState<MapViewState>({
    center:  GEORGIA_CENTER,
    zoom:    GEORGIA_DEFAULT_ZOOM,
    bounds:  null,
    isReady: false,
  });

  const onMapReady = useCallback((map: LeafletMapInstance) => {
    mapRef.current = map;
    setMapState((prev) => ({ ...prev, isReady: true }));
  }, []);

  const flyTo = useCallback((center: Coordinate, zoom: number = GEORGIA_DEFAULT_ZOOM) => {
    if (mapRef.current) {
      mapRef.current.flyTo([center.lat, center.lng], zoom, { animate: true, duration: 1.2 });
    }
    setMapState((prev) => ({ ...prev, center, zoom }));
  }, []);

  const resetView = useCallback(() => flyTo(GEORGIA_CENTER, GEORGIA_DEFAULT_ZOOM), [flyTo]);

  return { mapState, mapRef, onMapReady, flyTo, resetView };
}
'''


# ── src/features/map/hooks/useMapBounds.ts ───────────────────────────────────

FILES["src/features/map/hooks/useMapBounds.ts"] = '''\
"use client";

import { useState, useCallback } from "react";
import type { LeafletEvent } from "leaflet";
import type { BoundingBox } from "@/lib/types";

export interface UseMapBoundsReturn {
  bounds:         BoundingBox | null;
  onBoundsChange: (event: LeafletEvent) => void;
}

export function useMapBounds(): UseMapBoundsReturn {
  const [bounds, setBounds] = useState<BoundingBox | null>(null);

  const onBoundsChange = useCallback((event: LeafletEvent) => {
    type B = { getNorth: () => number; getSouth: () => number; getEast: () => number; getWest: () => number };
    const b = (event.target as { getBounds: () => B }).getBounds();
    setBounds({ north: b.getNorth(), south: b.getSouth(), east: b.getEast(), west: b.getWest() });
  }, []);

  return { bounds, onBoundsChange };
}
'''


# ── src/features/filters/components/FilterToggleChip.tsx ─────────────────────

FILES["src/features/filters/components/FilterToggleChip.tsx"] = '''\
"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterToggleChipProps {
  label:   string;
  active:  boolean;
  color:   string;
  bgColor: string;
  onClick: () => void;
  icon?:   string;
}

export function FilterToggleChip({ label, active, color, bgColor, onClick, icon }: FilterToggleChipProps): React.ReactElement {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium w-full text-left transition-all duration-150",
        "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50",
        active ? "text-zinc-100 shadow-sm" : "text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-white/[0.03]"
      )}
      style={active ? { backgroundColor: bgColor, borderColor: `${color}40`, color } : { backgroundColor: "transparent" }}
    >
      <span className="shrink-0 h-2 w-2 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />
      {icon && <span aria-hidden="true">{icon}</span>}
      <span className="flex-1">{label}</span>
      {active && <Check size={12} strokeWidth={3} className="shrink-0" aria-hidden="true" />}
    </button>
  );
}
'''


# ── src/features/filters/components/LayerToggleRow.tsx ───────────────────────

FILES["src/features/filters/components/LayerToggleRow.tsx"] = '''\
"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LayerToggleRowProps {
  label:    string;
  active:   boolean;
  icon:     ReactNode;
  color:    string;
  onToggle: () => void;
  count?:   number;
}

export function LayerToggleRow({ label, active, icon, color, onToggle, count }: LayerToggleRowProps): React.ReactElement {
  return (
    <div className="flex items-center gap-3 px-1 py-2">
      <span className="shrink-0" style={{ color }} aria-hidden="true">{icon}</span>
      <span className="flex-1 text-sm text-zinc-300">{label}</span>
      {count !== undefined && <span className="text-xs text-zinc-600">{count}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={active}
        aria-label={`Toggle ${label} layer`}
        onClick={onToggle}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50",
          active ? "bg-amber-500" : "bg-zinc-700"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200",
            active ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}
'''


# ── src/features/filters/components/SidebarSection.tsx ───────────────────────

FILES["src/features/filters/components/SidebarSection.tsx"] = '''\
"use client";

import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SidebarSectionProps {
  title:        string;
  icon:         ReactNode;
  children:     ReactNode;
  defaultOpen?: boolean;
  badge?:       number;
}

export function SidebarSection({ title, icon, children, defaultOpen = true, badge }: SidebarSectionProps): React.ReactElement {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-[var(--color-surface-border)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center gap-2.5 px-4 py-3 text-left transition-colors duration-150",
          "hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-amber-400/40"
        )}
        aria-expanded={open}
      >
        <span className="text-zinc-500" aria-hidden="true">{icon}</span>
        <span className="flex-1 text-xs font-semibold uppercase tracking-widest text-zinc-400">{title}</span>
        {badge !== undefined && badge > 0 && (
          <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-400" aria-label={`${badge} active`}>
            {badge}
          </span>
        )}
        <ChevronDown size={14} className={cn("shrink-0 text-zinc-600 transition-transform duration-200", open ? "rotate-180" : "rotate-0")} aria-hidden="true" />
      </button>
      {open && <div className="px-3 pb-3 space-y-0.5 animate-fade-up">{children}</div>}
    </div>
  );
}
'''


# ── src/features/filters/components/Sidebar.tsx ──────────────────────────────

FILES["src/features/filters/components/Sidebar.tsx"] = '''\
"use client";

import { Route, TriangleAlert, Coffee, Mountain, Map, X, RotateCcw, Navigation } from "lucide-react";
import type { ReactElement } from "react";
import type { AlertType, DifficultyLevel, FilterState, SpotType } from "@/lib/types";
import { ALERT_TYPE_META, DIFFICULTY_META, SPOT_TYPE_META } from "@/lib/constants";
import { SidebarSection }   from "./SidebarSection";
import { FilterToggleChip } from "./FilterToggleChip";
import { LayerToggleRow }   from "./LayerToggleRow";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen:             boolean;
  filters:            FilterState;
  activeFilterCount:  number;
  onClose:            () => void;
  onToggleAlertType:  (type: AlertType)        => void;
  onToggleDifficulty: (level: DifficultyLevel) => void;
  onToggleSpotType:   (type: SpotType)         => void;
  onToggleRoutes:     () => void;
  onToggleAlerts:     () => void;
  onToggleSpots:      () => void;
  onResetFilters:     () => void;
}

export function Sidebar({
  isOpen, filters, activeFilterCount, onClose,
  onToggleAlertType, onToggleDifficulty, onToggleSpotType,
  onToggleRoutes, onToggleAlerts, onToggleSpots, onResetFilters,
}: SidebarProps): ReactElement {
  const alertTypes   = Object.keys(ALERT_TYPE_META)  as AlertType[];
  const difficulties = Object.keys(DIFFICULTY_META)  as DifficultyLevel[];
  const spotTypes    = Object.keys(SPOT_TYPE_META)   as SpotType[];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden" aria-hidden="true" onClick={onClose} />
      )}

      <aside
        role="complementary"
        aria-label="Route and map filters"
        className={cn(
          "fixed left-0 top-14 z-40 h-[calc(100dvh-3.5rem)] w-80 flex flex-col",
          "bg-[var(--color-surface-overlay)] border-r border-[var(--color-surface-border)]",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0 animate-slide-in-left" : "-translate-x-full"
        )}
      >
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--color-surface-border)] px-4">
          <div className="flex items-center gap-2">
            <Map size={15} className="text-amber-400" />
            <span className="text-sm font-semibold text-zinc-200">Filters</span>
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400">
                {activeFilterCount} active
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {activeFilterCount > 0 && (
              <button type="button" onClick={onResetFilters} title="Reset all filters"
                className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-medium text-zinc-500 hover:bg-white/5 hover:text-amber-400 transition-colors">
                <RotateCcw size={11} /> Reset
              </button>
            )}
            <button type="button" aria-label="Close filters" onClick={onClose}
              className="rounded-lg p-1.5 text-zinc-500 hover:bg-white/5 hover:text-zinc-300 transition-colors md:hidden">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <SidebarSection title="Map Layers" icon={<Map size={14} />} defaultOpen={true}>
            <LayerToggleRow label="Routes"      active={filters.showRoutes} icon={<Navigation size={16} />}   color="#f59e0b" onToggle={onToggleRoutes} />
            <LayerToggleRow label="Road Alerts" active={filters.showAlerts} icon={<TriangleAlert size={16} />} color="#ef4444" onToggle={onToggleAlerts} />
            <LayerToggleRow label="Biker Spots" active={filters.showSpots}  icon={<Coffee size={16} />}        color="#fb923c" onToggle={onToggleSpots} />
          </SidebarSection>

          <SidebarSection title="Road Alerts" icon={<TriangleAlert size={14} />} defaultOpen={true} badge={filters.alertTypes.length}>
            {alertTypes.map((type) => (
              <FilterToggleChip key={type} label={ALERT_TYPE_META[type].label} active={filters.alertTypes.includes(type)}
                color={ALERT_TYPE_META[type].color} bgColor={ALERT_TYPE_META[type].bgColor} onClick={() => onToggleAlertType(type)} />
            ))}
          </SidebarSection>

          <SidebarSection title="Difficulty" icon={<Mountain size={14} />} defaultOpen={false} badge={filters.difficulties.length}>
            {difficulties.map((level) => (
              <FilterToggleChip key={level} label={DIFFICULTY_META[level].label} active={filters.difficulties.includes(level)}
                color={DIFFICULTY_META[level].color} bgColor={DIFFICULTY_META[level].bgColor} onClick={() => onToggleDifficulty(level)} />
            ))}
          </SidebarSection>

          <SidebarSection title="Spots & Services" icon={<Coffee size={14} />} defaultOpen={false} badge={filters.spotTypes.length}>
            {spotTypes.map((type) => (
              <FilterToggleChip key={type} label={SPOT_TYPE_META[type].label} active={filters.spotTypes.includes(type)}
                color={SPOT_TYPE_META[type].color} bgColor="rgba(255,255,255,0.05)" icon={SPOT_TYPE_META[type].icon} onClick={() => onToggleSpotType(type)} />
            ))}
          </SidebarSection>

          <SidebarSection title="Featured Routes" icon={<Route size={14} />} defaultOpen={true}>
            {[
              { id: "r-001", name: "Military Highway",    region: "Mtskheta-Mtianeti",    km: 148, diff: "Advanced"  },
              { id: "r-002", name: "Gombori Pass",         region: "Kakheti",              km: 102, diff: "Intermed." },
              { id: "r-003", name: "Svaneti Road",         region: "Svaneti",              km: 132, diff: "Extreme"   },
              { id: "r-004", name: "Adjara Coastal Loop",  region: "Adjara",               km: 68,  diff: "Beginner"  },
              { id: "r-005", name: "Borjomi Gorge",        region: "Samtskhe-Javakheti",   km: 88,  diff: "Intermed." },
            ].map((route) => (
              <button type="button" key={route.id}
                className="w-full flex items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04] group">
                <span className="mt-0.5 shrink-0 h-6 w-6 rounded-md flex items-center justify-center bg-amber-500/10" aria-hidden="true">
                  <Navigation size={13} className="text-amber-400" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-medium text-zinc-200 group-hover:text-zinc-100 truncate">{route.name}</span>
                  <span className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-zinc-600">{route.region}</span>
                    <span className="text-[11px] text-zinc-700" aria-hidden="true">\\u00b7</span>
                    <span className="text-[11px] text-zinc-600">{route.km} km</span>
                  </span>
                </span>
                <span className="shrink-0 text-[10px] font-medium text-amber-500/70 pt-0.5">{route.diff}</span>
              </button>
            ))}
          </SidebarSection>
        </div>

        <div className="shrink-0 border-t border-[var(--color-surface-border)] px-4 py-3">
          <p className="text-[11px] text-zinc-600 leading-relaxed">
            Covers <span className="text-zinc-500 font-medium">all 9 regions</span> of Georgia.
            Community-verified data updated in real time.
          </p>
        </div>
      </aside>
    </>
  );
}
'''


# ── src/features/map/components/MapSkeleton.tsx ───────────────────────────────

FILES["src/features/map/components/MapSkeleton.tsx"] = '''\
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";

export function MapSkeleton(): React.ReactElement {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--color-surface-base)" }}
      aria-label="Map loading" aria-busy="true">

      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`h-${i}`} className="absolute left-0 right-0 border-t border-zinc-800" style={{ top: `${(i + 1) * 12.5}%` }} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={`v-${i}`} className="absolute top-0 bottom-0 border-l border-zinc-800" style={{ left: `${(i + 1) * 12.5}%` }} />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-4 rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] px-10 py-8 shadow-2xl">
        <div className="flex gap-3">
          <SkeletonBlock className="h-3 w-24" />
          <SkeletonBlock className="h-3 w-16" />
        </div>
        <SkeletonBlock className="h-3 w-32" />
        <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
          <svg className="h-6 w-6 animate-spin text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-zinc-400">Initialising map\\u2026</p>
        <p className="text-xs text-zinc-600">Loading Georgian road network</p>
      </div>
    </div>
  );
}
'''


# ── src/features/map/components/MapControls.tsx ───────────────────────────────

FILES["src/features/map/components/MapControls.tsx"] = '''\
"use client";

import { ZoomIn, ZoomOut, Compass } from "lucide-react";
import { useMap } from "react-leaflet";

interface MapControlsProps {
  onResetView: () => void;
}

export function MapControls({ onResetView }: MapControlsProps): React.ReactElement {
  const map = useMap();

  return (
    <div className="absolute bottom-6 right-4 z-[400] flex flex-col gap-1.5" style={{ pointerEvents: "auto" }}>
      <button type="button" aria-label="Zoom in" onClick={() => map.zoomIn()}
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-surface-card)] text-zinc-300 shadow-lg border border-[var(--color-surface-border)] hover:text-amber-400 hover:border-amber-500/30 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">
        <ZoomIn size={16} />
      </button>
      <button type="button" aria-label="Zoom out" onClick={() => map.zoomOut()}
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-surface-card)] text-zinc-300 shadow-lg border border-[var(--color-surface-border)] hover:text-amber-400 hover:border-amber-500/30 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">
        <ZoomOut size={16} />
      </button>
      <div className="h-px bg-[var(--color-surface-border)] mx-1" aria-hidden="true" />
      <button type="button" aria-label="Reset map view to Georgia" onClick={onResetView} title="Reset to Georgia overview"
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-surface-card)] text-zinc-400 shadow-lg border border-[var(--color-surface-border)] hover:text-amber-400 hover:border-amber-500/30 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40">
        <Compass size={16} />
      </button>
    </div>
  );
}
'''


# ── src/features/map/components/MapOverlayStats.tsx ──────────────────────────

FILES["src/features/map/components/MapOverlayStats.tsx"] = '''\
"use client";

import { Navigation, TriangleAlert, Coffee } from "lucide-react";

interface MapOverlayStatsProps {
  routeCount: number;
  alertCount: number;
  spotCount:  number;
}

export function MapOverlayStats({ routeCount, alertCount, spotCount }: MapOverlayStatsProps): React.ReactElement {
  const items = [
    { icon: <Navigation size={12} />,    count: routeCount, label: "routes", color: "#f59e0b" },
    { icon: <TriangleAlert size={12} />, count: alertCount, label: "alerts", color: "#ef4444" },
    { icon: <Coffee size={12} />,        count: spotCount,  label: "spots",  color: "#fb923c" },
  ];

  return (
    <div className="absolute bottom-6 left-4 z-[400] flex items-center gap-1 rounded-full border border-[var(--color-surface-border)] bg-[var(--color-surface-card)]/90 px-3 py-1.5 backdrop-blur-sm shadow-lg"
      aria-live="polite" aria-label="Visible map entities">
      {items.map(({ icon, count, label, color }, idx) => (
        <span key={label} className="flex items-center gap-1.5">
          {idx > 0 && <span className="h-3 w-px bg-[var(--color-surface-border)]" aria-hidden="true" />}
          <span style={{ color }} aria-hidden="true">{icon}</span>
          <span className="text-[11px] font-semibold text-zinc-300">{count}</span>
          <span className="text-[11px] text-zinc-600 hidden sm:inline">{label}</span>
        </span>
      ))}
    </div>
  );
}
'''


# ── src/features/map/components/AlertMarker.tsx ───────────────────────────────

FILES["src/features/map/components/AlertMarker.tsx"] = '''\
"use client";

import { Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import type { RoadAlert } from "@/lib/types";
import { ALERT_TYPE_META, ALERT_SEVERITY_META } from "@/lib/constants";
import { timeAgo } from "@/lib/utils";

interface AlertMarkerProps {
  alert: RoadAlert;
}

function createAlertIcon(color: string, bgColor: string, severity: RoadAlert["severity"]): L.DivIcon {
  const isPulsing = severity === "high";
  const svgMarkup = renderToStaticMarkup(
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="38" viewBox="0 0 32 38">
      <defs>
        <filter id="ds" x="-40%" y="-30%" width="180%" height="180%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.55)" />
        </filter>
      </defs>
      <path d="M16 2C9.4 2 4 7.4 4 14c0 8.5 12 24 12 24s12-15.5 12-24C28 7.4 22.6 2 16 2z"
        fill={bgColor.replace("0.12", "0.88")} stroke={color} strokeWidth="1.5" filter="url(#ds)" />
      <circle cx="16" cy="14" r="5.5" fill={color} opacity="0.95" />
    </svg>
  );
  return L.divIcon({
    html:        `<div ${isPulsing ? \'class="animate-pulse-glow"\' : ""}>${svgMarkup}</div>`,
    className:   "",
    iconSize:    [32, 38],
    iconAnchor:  [16, 38],
    popupAnchor: [0, -40],
  });
}

export function AlertMarker({ alert }: AlertMarkerProps): React.ReactElement {
  const typeMeta     = ALERT_TYPE_META[alert.type];
  const severityMeta = ALERT_SEVERITY_META[alert.severity];
  const icon         = createAlertIcon(typeMeta.color, typeMeta.bgColor, alert.severity);

  return (
    <>
      {alert.radius > 0 && (
        <Circle center={[alert.lat, alert.lng]} radius={alert.radius}
          pathOptions={{ color: typeMeta.color, fillColor: typeMeta.color, fillOpacity: 0.06, weight: 1, dashArray: "5 5" }} />
      )}
      <Marker position={[alert.lat, alert.lng]} icon={icon}>
        <Popup>
          <article className="min-w-[210px] max-w-[270px]">
            <header className="flex items-center gap-2 mb-2.5">
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: typeMeta.bgColor.replace("0.12", "0.22"), color: typeMeta.color }} aria-hidden="true">\\u25cf</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: typeMeta.color }}>{typeMeta.label}</span>
              <span className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold"
                style={{ backgroundColor: `${severityMeta.color}20`, color: severityMeta.color }}>{severityMeta.label}</span>
            </header>
            <p className="text-xs leading-relaxed text-zinc-300 mb-3">{alert.description}</p>
            <footer className="flex items-center justify-between border-t border-zinc-700/50 pt-2">
              <span className="text-[11px] text-zinc-600">{timeAgo(alert.reportedAt)}</span>
              {alert.verified
                ? <span className="text-[11px] font-medium text-green-400">\\u2713 Verified</span>
                : <span className="text-[11px] text-zinc-600">Community report</span>
              }
            </footer>
          </article>
        </Popup>
      </Marker>
    </>
  );
}
'''


# ── src/features/map/components/RoutePolyline.tsx ────────────────────────────

FILES["src/features/map/components/RoutePolyline.tsx"] = '''\
"use client";

import { Polyline, Popup } from "react-leaflet";
import type { Route } from "@/lib/types";
import { DIFFICULTY_META, ASPHALT_QUALITY_META } from "@/lib/constants";
import { formatDistance, formatDuration } from "@/lib/utils";

interface RoutePolylineProps {
  route: Route;
}

export function RoutePolyline({ route }: RoutePolylineProps): React.ReactElement {
  const diffMeta    = DIFFICULTY_META[route.difficulty];
  const qualityMeta = ASPHALT_QUALITY_META[route.asphaltQuality];

  if (route.coordinates.length < 2) return <></>;

  const positions = route.coordinates.map((c) => [c.lat, c.lng] as [number, number]);

  return (
    <Polyline positions={positions} pathOptions={{ color: diffMeta.color, weight: 5, opacity: 0.85, lineCap: "round", lineJoin: "round" }}>
      <Popup>
        <article className="min-w-[230px] max-w-[290px]">
          <header className="mb-2">
            <h3 className="text-sm font-bold leading-tight text-zinc-100">{route.name}</h3>
            <p className="text-[11px] mt-0.5" style={{ color: qualityMeta.color }}>{qualityMeta.label} surface</p>
          </header>
          <p className="text-xs leading-relaxed text-zinc-400 mb-3 line-clamp-3">{route.description}</p>
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {[
              { label: "Distance", value: formatDistance(route.distanceKm)  },
              { label: "Duration", value: formatDuration(route.durationMin) },
              { label: "Climb",    value: `${route.elevationGain} m`        },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center rounded-lg py-2 px-1" style={{ backgroundColor: "var(--color-surface-raised)" }}>
                <span className="text-xs font-semibold text-zinc-200">{value}</span>
                <span className="text-[10px] text-zinc-600 mt-0.5">{label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ backgroundColor: diffMeta.bgColor, color: diffMeta.color }}>
              {diffMeta.label}
            </span>
            <span className="text-[11px] text-zinc-600">{route.region}</span>
          </div>
        </article>
      </Popup>
    </Polyline>
  );
}
'''


# ── src/features/map/components/SpotMarker.tsx ───────────────────────────────

FILES["src/features/map/components/SpotMarker.tsx"] = '''\
"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import type { BikerSpot } from "@/lib/types";
import { SPOT_TYPE_META } from "@/lib/constants";

interface SpotMarkerProps {
  spot: BikerSpot;
}

function createSpotIcon(emoji: string, color: string): L.DivIcon {
  const html = renderToStaticMarkup(
    <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#1e2433",
      border: `2.5px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: "16px", lineHeight: "1", boxShadow: `0 0 0 4px ${color}25, 0 4px 14px rgba(0,0,0,0.55)` }}>
      {emoji}
    </div>
  );
  return L.divIcon({ html, className: "", iconSize: [36, 36], iconAnchor: [18, 18], popupAnchor: [0, -22] });
}

function buildStarString(rating: number): string {
  const full = Math.round(rating);
  return "\\u2605".repeat(full) + "\\u2606".repeat(Math.max(0, 5 - full));
}

export function SpotMarker({ spot }: SpotMarkerProps): React.ReactElement {
  const meta = SPOT_TYPE_META[spot.type];
  const icon = createSpotIcon(meta.icon, meta.color);

  return (
    <Marker position={[spot.lat, spot.lng]} icon={icon}>
      <Popup>
        <article className="min-w-[200px] max-w-[260px]">
          <header className="flex items-start gap-2.5 mb-2">
            <span className="text-2xl leading-none" aria-hidden="true">{meta.icon}</span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold leading-tight text-zinc-100 truncate">{spot.name}</h3>
              <p className="text-[11px] mt-0.5" style={{ color: meta.color }}>{meta.label}</p>
            </div>
            {spot.verified && <span className="ml-auto shrink-0 text-[10px] font-medium text-green-400 mt-0.5" title="Community verified">\\u2713</span>}
          </header>
          {spot.rating !== undefined && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs tracking-widest" style={{ color: meta.color }} aria-label={`${spot.rating} out of 5`}>
                {buildStarString(spot.rating)}
              </span>
              <span className="text-[11px] text-zinc-500">{spot.rating.toFixed(1)}</span>
            </div>
          )}
          {spot.address && <p className="text-[11px] text-zinc-500 mb-1 truncate">{spot.address}</p>}
          {spot.phone   && <p className="text-[11px] text-zinc-500">{spot.phone}</p>}
        </article>
      </Popup>
    </Marker>
  );
}
'''


# ── src/features/map/components/LeafletMap.tsx ───────────────────────────────

FILES["src/features/map/components/LeafletMap.tsx"] = '''\
"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import type { Map as LeafletMapInstance, LeafletEvent } from "leaflet";
import type { FilterState } from "@/lib/types";
import { GEORGIA_CENTER, GEORGIA_DEFAULT_ZOOM, GEORGIA_MIN_ZOOM, GEORGIA_MAX_ZOOM, MAP_TILE_URL, MAP_TILE_ATTR, MAP_TILE_SUBDOM } from "@/lib/constants";
import { MOCK_ALERTS, MOCK_ROUTES, MOCK_SPOTS } from "@/store/mockData";
import { AlertMarker }   from "./AlertMarker";
import { RoutePolyline } from "./RoutePolyline";
import { SpotMarker }    from "./SpotMarker";
import { MapControls }   from "./MapControls";

interface MapEventBridgeProps {
  onReady:        (map: LeafletMapInstance) => void;
  onBoundsChange: (event: LeafletEvent)     => void;
}

function MapEventBridge({ onReady, onBoundsChange }: MapEventBridgeProps): null {
  const map = useMap() as LeafletMapInstance;
  useEffect(() => { onReady(map); }, [map, onReady]);
  useMapEvents({ moveend: onBoundsChange, zoomend: onBoundsChange });
  return null;
}

interface LeafletMapProps {
  filters:        FilterState;
  onMapReady:     (map: LeafletMapInstance) => void;
  onBoundsChange: (event: LeafletEvent)     => void;
  onResetView:    () => void;
}

export function LeafletMap({ filters, onMapReady, onBoundsChange, onResetView }: LeafletMapProps): React.ReactElement {
  const visibleRoutes = filters.showRoutes ? MOCK_ROUTES.filter((r) => filters.difficulties.includes(r.difficulty)) : [];
  const visibleAlerts = filters.showAlerts ? MOCK_ALERTS.filter((a) => filters.alertTypes.includes(a.type))        : [];
  const visibleSpots  = filters.showSpots  ? MOCK_SPOTS.filter((s)  => filters.spotTypes.includes(s.type))         : [];

  return (
    <MapContainer center={[GEORGIA_CENTER.lat, GEORGIA_CENTER.lng]} zoom={GEORGIA_DEFAULT_ZOOM}
      minZoom={GEORGIA_MIN_ZOOM} maxZoom={GEORGIA_MAX_ZOOM} zoomControl={false} scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }} className="z-0">
      <TileLayer url={MAP_TILE_URL} attribution={MAP_TILE_ATTR} subdomains={MAP_TILE_SUBDOM} maxZoom={GEORGIA_MAX_ZOOM} />
      <MapEventBridge onReady={onMapReady} onBoundsChange={onBoundsChange} />
      <MapControls onResetView={onResetView} />
      {visibleRoutes.map((route) => <RoutePolyline key={route.id} route={route} />)}
      {visibleAlerts.map((alert) => <AlertMarker   key={alert.id} alert={alert} />)}
      {visibleSpots.map((spot)   => <SpotMarker    key={spot.id}  spot={spot}  />)}
    </MapContainer>
  );
}
'''


# ── src/features/map/components/MapView.tsx ──────────────────────────────────

FILES["src/features/map/components/MapView.tsx"] = '''\
"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { Map as LeafletMapInstance, LeafletEvent } from "leaflet";
import type { FilterState } from "@/lib/types";
import { MapSkeleton }     from "./MapSkeleton";
import { MapOverlayStats } from "./MapOverlayStats";
import { MOCK_ALERTS, MOCK_ROUTES, MOCK_SPOTS } from "@/store/mockData";

const LeafletMap = dynamic(
  () => import("./LeafletMap").then((mod) => ({ default: mod.LeafletMap })),
  { ssr: false, loading: () => <MapSkeleton /> }
);

interface MapViewProps {
  filters:        FilterState;
  onMapReady:     (map: LeafletMapInstance) => void;
  onBoundsChange: (event: LeafletEvent)     => void;
  onResetView:    () => void;
  isMapReady:     boolean;
}

export function MapView({ filters, onMapReady, onBoundsChange, onResetView, isMapReady }: MapViewProps): React.ReactElement {
  const visibleRouteCount = filters.showRoutes ? MOCK_ROUTES.filter((r) => filters.difficulties.includes(r.difficulty)).length : 0;
  const visibleAlertCount = filters.showAlerts ? MOCK_ALERTS.filter((a) => filters.alertTypes.includes(a.type)).length         : 0;
  const visibleSpotCount  = filters.showSpots  ? MOCK_SPOTS.filter((s)  => filters.spotTypes.includes(s.type)).length          : 0;

  return (
    <main className="relative flex-1 overflow-hidden" aria-label="Interactive map of Georgian motorcycle routes">
      <Suspense fallback={<MapSkeleton />}>
        <LeafletMap filters={filters} onMapReady={onMapReady} onBoundsChange={onBoundsChange} onResetView={onResetView} />
      </Suspense>
      {isMapReady && <MapOverlayStats routeCount={visibleRouteCount} alertCount={visibleAlertCount} spotCount={visibleSpotCount} />}
    </main>
  );
}
'''


# ── src/components/ui/Badge.tsx ───────────────────────────────────────────────

FILES["src/components/ui/Badge.tsx"] = '''\
import { cn } from "@/lib/utils";

interface BadgeProps {
  label:      string;
  color?:     string;
  bgColor?:   string;
  className?: string;
}

export function Badge({ label, color, bgColor, className }: BadgeProps): React.ReactElement {
  return (
    <span
      className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide", className)}
      style={{
        color:           color   ?? "var(--color-text-secondary)",
        backgroundColor: bgColor ?? "var(--color-surface-raised)",
        border:          `1px solid ${color ? `${color}40` : "var(--color-surface-border)"}`,
      }}
    >
      {label}
    </span>
  );
}
'''


# ── src/components/ui/SkeletonBlock.tsx ───────────────────────────────────────

FILES["src/components/ui/SkeletonBlock.tsx"] = '''\
import { cn } from "@/lib/utils";

interface SkeletonBlockProps {
  className?: string;
  rounded?:   "sm" | "md" | "lg" | "full";
}

const radiusMap = { sm: "rounded", md: "rounded-md", lg: "rounded-xl", full: "rounded-full" };

export function SkeletonBlock({ className, rounded = "md" }: SkeletonBlockProps): React.ReactElement {
  return <div className={cn("animate-shimmer", radiusMap[rounded], className)} aria-hidden="true" />;
}
'''


# ── src/components/ui/IconButton.tsx ─────────────────────────────────────────

FILES["src/components/ui/IconButton.tsx"] = '''\
import type { ButtonHTMLAttributes, ReactElement } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon:    ReactElement;
  label:   string;
  active?: boolean;
  badge?:  number;
  size?:   "sm" | "md" | "lg";
}

const sizeMap = { sm: "h-8 w-8 text-sm", md: "h-9 w-9 text-base", lg: "h-11 w-11 text-lg" };

export function IconButton({ icon, label, active = false, badge, size = "md", className, ...rest }: IconButtonProps): ReactElement {
  return (
    <button type="button" aria-label={label} title={label}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg transition-all duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60",
        sizeMap[size],
        active ? "bg-amber-500/20 text-amber-400 shadow-[inset_0_0_0_1px_rgba(245,158,11,0.3)]"
               : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200",
        className
      )}
      {...rest}
    >
      {icon}
      {badge !== undefined && badge > 0 && (
        <span aria-label={`${badge} active filters`}
          className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-zinc-900">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </button>
  );
}
'''


# ── src/components/ui/ErrorBoundary.tsx ───────────────────────────────────────

FILES["src/components/ui/ErrorBoundary.tsx"] = '''\
"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props  { children: ReactNode; fallback?: ReactNode; context?: string; }
interface State  { hasError: boolean; errorMessage: string; }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error(`[ErrorBoundary] ${this.props.context ?? "unknown"}:`, error, info);
  }

  private handleReset = (): void => this.setState({ hasError: false, errorMessage: "" });

  override render(): ReactNode {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback)  return this.props.fallback;

    return (
      <div role="alert" className="flex h-full w-full flex-col items-center justify-center gap-4 p-8"
        style={{ backgroundColor: "var(--color-surface-base)" }}>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
          <AlertTriangle size={24} className="text-red-400" />
        </div>
        <div className="text-center">
          <h2 className="text-base font-semibold text-zinc-200">Something went wrong</h2>
          <p className="mt-1 text-sm text-zinc-500">
            {this.props.context ? `The ${this.props.context} failed to load.` : "An unexpected error occurred."}
          </p>
          {this.state.errorMessage && (
            <p className="mt-2 rounded-lg bg-red-900/20 px-3 py-1.5 font-mono text-xs text-red-400">
              {this.state.errorMessage}
            </p>
          )}
        </div>
        <button type="button" onClick={this.handleReset}
          className="flex items-center gap-2 rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 transition-colors">
          <RefreshCw size={14} /> Try again
        </button>
      </div>
    );
  }
}
'''


# ── src/components/layout/TopBar.tsx ─────────────────────────────────────────

FILES["src/components/layout/TopBar.tsx"] = '''\
"use client";

import { Search, Bell, Layers, Map, ChevronDown, Wifi, WifiOff } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";

interface TopBarProps {
  searchQuery:      string;
  onSearchChange:   (value: string) => void;
  activeAlertCount: number;
  onSidebarToggle?: () => void;
  sidebarOpen:      boolean;
}

export function TopBar({ searchQuery, onSearchChange, activeAlertCount, onSidebarToggle, sidebarOpen }: TopBarProps): React.ReactElement {
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifOpen,     setNotifOpen]     = useState(false);
  const [isOnline,      setIsOnline]      = useState(true);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on  = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener("online",  on);
    window.addEventListener("offline", off);
    return () => { window.removeEventListener("online", on); window.removeEventListener("offline", off); };
  }, []);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    if (notifOpen) document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [notifOpen]);

  return (
    <header className={cn(
      "fixed inset-x-0 top-0 z-50 h-14 flex items-center gap-3 px-4 md:px-6",
      "backdrop-blur-xl backdrop-saturate-150 bg-[var(--glass-bg)] border-b border-[var(--glass-border)]",
      "shadow-[0_1px_0_0_rgba(255,255,255,0.04)]"
    )}>
      <button type="button" onClick={onSidebarToggle} className="flex shrink-0 items-center gap-2.5 group" aria-label="Toggle sidebar">
        <span className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500",
          "shadow-[0_0_16px_rgba(245,158,11,0.4)] group-hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] transition-shadow duration-200"
        )} aria-hidden="true">
          <Map size={16} className="text-zinc-900" strokeWidth={2.5} />
        </span>
        <span className="hidden sm:flex flex-col leading-none">
          <span className="text-sm font-bold tracking-tight text-zinc-100">GeoMoto<span className="text-amber-400">Routes</span></span>
          <span className="text-[10px] font-medium tracking-widest text-zinc-500 uppercase">Georgia</span>
        </span>
        <ChevronDown size={14} className={cn("hidden md:block text-zinc-500 transition-transform duration-200", sidebarOpen ? "rotate-0" : "-rotate-90")} />
      </button>

      <div className={cn("relative flex flex-1 max-w-sm items-center rounded-xl border transition-all duration-200",
        searchFocused ? "border-amber-500/50 shadow-[0_0_0_3px_rgba(245,158,11,0.12)]" : "border-[var(--glass-border)] hover:border-zinc-600/60")}>
        <Search size={15} className={cn("absolute left-3 shrink-0 transition-colors duration-150", searchFocused ? "text-amber-400" : "text-zinc-500")} />
        <input type="search" placeholder="Search routes, regions, spots\\u2026" value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
          className="h-9 w-full rounded-xl pl-9 pr-4 bg-white/[0.04] text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none" />
        {searchQuery && (
          <button type="button" aria-label="Clear search" onClick={() => onSearchChange("")}
            className="absolute right-3 text-zinc-500 hover:text-zinc-300 transition-colors">\\u00d7</button>
        )}
      </div>

      <div className="ml-auto flex items-center gap-1">
        <div className="hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
          style={{ backgroundColor: isOnline ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                   color:           isOnline ? "#22c55e"             : "#ef4444",
                   border:          `1px solid ${isOnline ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}` }}
          title={isOnline ? "Connected" : "Offline \\u2014 map cached"}>
          {isOnline ? <Wifi size={11} strokeWidth={2.5} /> : <WifiOff size={11} strokeWidth={2.5} />}
          <span className="hidden lg:inline">{isOnline ? "Live" : "Offline"}</span>
        </div>

        <IconButton icon={<Layers size={16} />} label="Map layers" size="md" className="ml-1" />

        <div ref={notifRef} className="relative">
          <IconButton icon={<Bell size={16} />} label="Active road alerts" badge={activeAlertCount}
            active={notifOpen} size="md" onClick={() => setNotifOpen((v) => !v)} />
          {notifOpen && (
            <div className={cn("absolute right-0 top-full mt-2 w-72 z-50 animate-fade-up",
              "rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)]",
              "shadow-[0_16px_48px_rgba(0,0,0,0.6)] overflow-hidden")}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-surface-border)]">
                <span className="text-sm font-semibold text-zinc-200">Active Alerts</span>
                <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-400">{activeAlertCount}</span>
              </div>
              <ul className="max-h-64 overflow-y-auto divide-y divide-[var(--color-surface-border)]">
                {activeAlertCount === 0
                  ? <li className="px-4 py-6 text-center text-sm text-zinc-500">No active alerts on your route</li>
                  : <li className="px-4 py-3">
                      <p className="text-xs font-medium text-amber-400">Gravel Hazard</p>
                      <p className="mt-0.5 text-xs text-zinc-400">Jvari Pass \\u2014 Reduce speed</p>
                    </li>
                }
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
'''


# ── src/components/layout/DashboardLayout.tsx ────────────────────────────────

FILES["src/components/layout/DashboardLayout.tsx"] = '''\
"use client";

import { useState, useCallback } from "react";
import { SlidersHorizontal } from "lucide-react";
import { TopBar }          from "./TopBar";
import { Sidebar }         from "@/features/filters/components/Sidebar";
import { MapView }         from "@/features/map/components/MapView";
import { useRouteFilters } from "@/features/filters/hooks/useRouteFilters";
import { useMapState }     from "@/features/map/hooks/useMapState";
import { useMapBounds }    from "@/features/map/hooks/useMapBounds";
import { IconButton }      from "@/components/ui/IconButton";
import { ErrorBoundary }   from "@/components/ui/ErrorBoundary";
import { cn } from "@/lib/utils";
import { MOCK_ALERTS } from "@/store/mockData";

export function DashboardLayout(): React.ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const {
    filters, toggleAlertType, toggleDifficulty, toggleSpotType,
    toggleShowRoutes, toggleShowAlerts, toggleShowSpots,
    setSearchQuery, resetFilters, activeFilterCount,
  } = useRouteFilters();

  const { mapState, onMapReady, resetView } = useMapState();
  const { onBoundsChange } = useMapBounds();

  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);
  const closeSidebar  = useCallback(() => setSidebarOpen(false),     []);

  const activeAlertCount = filters.showAlerts
    ? MOCK_ALERTS.filter((a) => filters.alertTypes.includes(a.type)).length
    : 0;

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-[var(--color-surface-base)]">
      <TopBar searchQuery={filters.searchQuery} onSearchChange={setSearchQuery}
        activeAlertCount={activeAlertCount} onSidebarToggle={toggleSidebar} sidebarOpen={sidebarOpen} />

      <div className="relative flex flex-1 overflow-hidden pt-14">
        <Sidebar
          isOpen={sidebarOpen} filters={filters} activeFilterCount={activeFilterCount}
          onClose={closeSidebar} onToggleAlertType={toggleAlertType}
          onToggleDifficulty={toggleDifficulty} onToggleSpotType={toggleSpotType}
          onToggleRoutes={toggleShowRoutes} onToggleAlerts={toggleShowAlerts}
          onToggleSpots={toggleShowSpots} onResetFilters={resetFilters}
        />

        <div className={cn("flex-1 transition-[margin] duration-300 ease-in-out", sidebarOpen ? "md:ml-80" : "ml-0")}>
          <ErrorBoundary context="map">
            <MapView filters={filters} onMapReady={onMapReady} onBoundsChange={onBoundsChange}
              onResetView={resetView} isMapReady={mapState.isReady} />
          </ErrorBoundary>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[450] md:hidden">
          <button type="button" onClick={toggleSidebar}
            className={cn(
              "flex items-center gap-2 rounded-full px-5 py-2.5",
              "bg-amber-500 text-zinc-900 font-semibold text-sm shadow-xl",
              "hover:bg-amber-400 active:scale-95 transition-all duration-150",
              "shadow-[0_0_24px_rgba(245,158,11,0.45)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
            )}>
            <SlidersHorizontal size={16} strokeWidth={2.5} />
            Filters
            {activeFilterCount > 0 && (
              <span className="rounded-full bg-zinc-900/40 px-1.5 py-0.5 text-[10px] font-bold">{activeFilterCount}</span>
            )}
          </button>
        </div>

        {!sidebarOpen && (
          <div className="absolute left-3 top-3 z-[450] hidden md:block animate-fade-up">
            <IconButton icon={<SlidersHorizontal size={16} />} label="Open filters" badge={activeFilterCount}
              active={false} onClick={toggleSidebar}
              className="bg-[var(--color-surface-card)] border border-[var(--color-surface-border)] shadow-lg" />
          </div>
        )}
      </div>
    </div>
  );
}
'''


# ─── Writer ───────────────────────────────────────────────────────────────────

def write_files() -> None:
    created_dirs:  list[str] = []
    created_files: list[str] = []
    skipped_files: list[str] = []

    for rel_path, content in FILES.items():
        full_path = os.path.join(ROOT, rel_path)
        dir_path  = os.path.dirname(full_path)

        if dir_path and not os.path.isdir(dir_path):
            os.makedirs(dir_path, exist_ok=True)
            created_dirs.append(dir_path)

        if os.path.exists(full_path):
            skipped_files.append(rel_path)
            continue

        with open(full_path, "w", encoding="utf-8") as fh:
            fh.write(content)
        created_files.append(rel_path)

    # ── Summary ───────────────────────────────────────────────────────────────
    width = 60
    print()
    print("=" * width)
    print("  GeoMotoRoutes — project scaffold complete")
    print("=" * width)
    print(f"\n  Root      : {os.path.abspath(ROOT)}")
    print(f"  Dirs      : {len(created_dirs)} created")
    print(f"  Files     : {len(created_files)} written")
    if skipped_files:
        print(f"  Skipped   : {len(skipped_files)} (already exist)")
        for f in skipped_files:
            print(f"    - {f}")

    print(textwrap.dedent(f"""
  ─────────────────────────────────────────────────────────
  Next steps:

    cd {ROOT}
    npm install
    npm run dev

  Then open  http://localhost:3000
  ─────────────────────────────────────────────────────────
"""))


if __name__ == "__main__":
    write_files()
