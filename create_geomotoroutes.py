#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GeoMotoRoutes — Full Project Generator (Phases 1–3)
=====================================================
Scaffolds the entire GeoMotoRoutes Next.js project on your local machine,
including Georgian localisation, authentication UI, and crowdsourced alerts.

Requirements: Python 3.8+  (no external packages)

Usage
-----
  python create_geomotoroutes.py                 # creates ./geomotoroutes/
  python create_geomotoroutes.py my-folder       # creates ./my-folder/

After scaffold
--------------
  cd geomotoroutes
  npm install
  npm run dev
  # → http://localhost:3000
"""

import os
import sys
import textwrap

ROOT = sys.argv[1] if len(sys.argv) > 1 else "geomotoroutes"

# ─── File registry ────────────────────────────────────────────────────────────

FILES: dict[str, str] = {}

# ══════════════════════════════════════════════════════════════════════════════
#  CONFIG FILES
# ══════════════════════════════════════════════════════════════════════════════

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
    "next-env.d.ts", "**/*.ts", "**/*.tsx",
    ".next/types/**/*.ts", ".next/dev/types/**/*.ts", "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
"""

FILES["next.config.ts"] = """\
import type { NextConfig } from "next";
const nextConfig: NextConfig = {};
export default nextConfig;
"""

FILES["postcss.config.mjs"] = """\
const config = { plugins: { "@tailwindcss/postcss": {} } };
export default config;
"""

FILES["eslint.config.mjs"] = """\
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
export default eslintConfig;
"""

FILES[".gitignore"] = """\
/node_modules
/.pnp
.pnp.*
/coverage
/.next/
/out/
/build
.DS_Store
*.pem
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.env*
.vercel
*.tsbuildinfo
next-env.d.ts
"""

# ══════════════════════════════════════════════════════════════════════════════
#  APP
# ══════════════════════════════════════════════════════════════════════════════

FILES["src/app/globals.css"] = """\
@import "tailwindcss";

@theme inline {
  --color-surface-base:    #0b0d11;
  --color-surface-overlay: #13161d;
  --color-surface-raised:  #1a1f2b;
  --color-surface-card:    #1e2433;
  --color-surface-border:  #2a3045;
  --color-surface-muted:   #3a4155;
  --color-text-primary:    #f0f2f7;
  --color-text-secondary:  #9aa3b8;
  --color-text-muted:      #5a6278;
  --color-accent-primary:  #f59e0b;
  --color-accent-secondary:#fb923c;
  --color-accent-glow:     rgba(245,158,11,0.25);
  --color-status-danger:   #ef4444;
  --color-status-warning:  #f59e0b;
  --color-status-success:  #22c55e;
  --color-status-info:     #3b82f6;
  --glass-bg:     rgba(19,22,29,0.72);
  --glass-border: rgba(255,255,255,0.06);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

*,*::before,*::after { box-sizing: border-box; }
html { font-size:16px; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }
body { background-color:var(--color-surface-base); color:var(--color-text-primary); font-family:var(--font-sans),system-ui,sans-serif; overflow:hidden; }

::-webkit-scrollbar        { width:5px; height:5px; }
::-webkit-scrollbar-track  { background:var(--color-surface-overlay); }
::-webkit-scrollbar-thumb  { background:var(--color-surface-muted); border-radius:9999px; }
::-webkit-scrollbar-thumb:hover { background:var(--color-accent-primary); }

.leaflet-container { background:#0b0d11!important; font-family:inherit!important; }
.leaflet-control-zoom { border:none!important; box-shadow:0 4px 24px rgba(0,0,0,.6)!important; }
.leaflet-control-zoom a { background:var(--color-surface-card)!important; color:var(--color-text-primary)!important; border:1px solid var(--color-surface-border)!important; width:36px!important; height:36px!important; line-height:36px!important; font-size:18px!important; }
.leaflet-control-zoom a:hover { background:var(--color-surface-muted)!important; color:var(--color-accent-primary)!important; }
.leaflet-popup-content-wrapper { background:var(--color-surface-card)!important; color:var(--color-text-primary)!important; border:1px solid var(--color-surface-border)!important; border-radius:12px!important; box-shadow:0 8px 32px rgba(0,0,0,.6)!important; }
.leaflet-popup-tip { background:var(--color-surface-card)!important; }

@keyframes pulse-glow { 0%,100%{box-shadow:0 0 0 0 var(--color-accent-glow);} 50%{box-shadow:0 0 0 8px transparent;} }
@keyframes slide-in-left { from{transform:translateX(-100%);opacity:0;} to{transform:translateX(0);opacity:1;} }
@keyframes fade-up { from{transform:translateY(8px);opacity:0;} to{transform:translateY(0);opacity:1;} }
@keyframes shimmer { 0%{background-position:-200% 0;} 100%{background-position:200% 0;} }

.animate-pulse-glow    { animation:pulse-glow    2s ease-in-out infinite; }
.animate-slide-in-left { animation:slide-in-left 0.3s ease-out both; }
.animate-fade-up       { animation:fade-up       0.25s ease-out both; }
.animate-shimmer { background:linear-gradient(90deg,var(--color-surface-card) 25%,var(--color-surface-raised) 50%,var(--color-surface-card) 75%); background-size:200% 100%; animation:shimmer 1.5s ease-in-out infinite; }
"""

FILES["src/app/layout.tsx"] = """\
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable:"--font-geist-sans", subsets:["latin"], display:"swap" });
const geistMono = Geist_Mono({ variable:"--font-geist-mono", subsets:["latin"], display:"swap" });

export const metadata: Metadata = {
  title:       "GeoMotoRoutes \u2014 Georgian Motorcycle Route Planner",
  description: "Discover premium motorcycle routes across Georgia. Real-time road conditions, gravel warnings, biker-friendly spots, and community-verified alerts.",
  authors:     [{ name: "GeoMotoRoutes" }],
};

export const viewport: Viewport = {
  width:"device-width", initialScale:1, maximumScale:1, themeColor:"#0b0d11",
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="ka" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
"""

FILES["src/app/page.tsx"] = """\
import { DashboardLayout } from "@/components/layout/DashboardLayout";
export default function HomePage(): React.ReactElement {
  return <DashboardLayout />;
}
"""

# ══════════════════════════════════════════════════════════════════════════════
#  LIB / TYPES
# ══════════════════════════════════════════════════════════════════════════════

FILES["src/lib/types/index.ts"] = """\
export interface Coordinate { lat: number; lng: number; }
export interface BoundingBox { north:number; south:number; east:number; west:number; }

export type DifficultyLevel = "beginner"|"intermediate"|"advanced"|"extreme";
export type AsphaltQuality  = "excellent"|"good"|"fair"|"poor"|"unpaved";

export interface Route {
  id:string; name:string; description:string;
  difficulty:DifficultyLevel; asphaltQuality:AsphaltQuality;
  coordinates:Coordinate[];
  distanceKm:number; durationMin:number; elevationGain:number;
  region:string; tags:string[]; likeCount:number; rideCount:number;
}

export type AlertType     = "gravel"|"camera"|"work"|"danger";
export type AlertSeverity = "low"|"medium"|"high";

export interface RoadAlert {
  id:string; type:AlertType;
  lat:number; lng:number;
  description:string; severity:AlertSeverity;
  radius:number; verified:boolean;
  reportedAt:string; expiresAt:string|null;
}

export type SpotType = "cafe"|"fuel"|"viewpoint"|"rest_area"|"mechanic"|"hotel";

export interface BikerSpot {
  id:string; name:string; type:SpotType;
  lat:number; lng:number;
  address?:string; phone?:string; rating?:number; verified:boolean;
}

export interface FilterState {
  alertTypes:AlertType[]; difficulties:DifficultyLevel[]; spotTypes:SpotType[];
  showRoutes:boolean; showAlerts:boolean; showSpots:boolean; searchQuery:string;
}

export interface MapViewState {
  center:Coordinate; zoom:number; bounds:BoundingBox|null; isReady:boolean;
}
"""

# ── i18n ──────────────────────────────────────────────────────────────────────

FILES["src/lib/i18n/ka.ts"] = """\
/**
 * Georgian (\u10e5\u10d0\u10e0\u10d7\u10e3\u10da\u10d8) UI string constants.
 * Single source of truth for all user-facing text in the application.
 */
export const KA = {
  appName:     "GeoMotoRoutes",
  appSubtitle: "\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd",

  searchPlaceholder: "\u10db\u10d0\u10e0\u10e8\u10e0\u10e3\u10e2\u10d4\u10d1\u10d8\u10e1, \u10e0\u10d4\u10d2\u10d8\u10dd\u10dc\u10d4\u10d1\u10d8\u10e1, \u10d0\u10d3\u10d2\u10d8\u10da\u10d4\u10d1\u10d8\u10e1 \u10eb\u10d8\u10d4\u10d1\u10d0\u2026",
  online:            "\u10dd\u10dc\u10da\u10d0\u10d8\u10dc",
  offline:           "\u10dd\u10e4\u10da\u10d0\u10d8\u10dc \u2014 \u10e5\u10d4\u10e8\u10d8\u10e0\u10d4\u10d1\u10e3\u10da\u10d8",
  mapLayersLabel:    "\u10e0\u10e3\u10d9\u10d8\u10e1 \u10e4\u10d4\u10dc\u10d4\u10d1\u10d8",
  activeAlerts:      "\u10d0\u10e5\u10e2\u10d8\u10e3\u10e0\u10d8 \u10d2\u10d0\u10e4\u10e0\u10d7\u10ee\u10d8\u10da\u10d4\u10d1\u10d4\u10d1\u10d8",
  noAlerts:          "\u10d2\u10d0\u10e4\u10e0\u10d7\u10ee\u10d8\u10da\u10d4\u10d1\u10d0 \u10d0\u10e0 \u10d0\u10e0\u10d8\u10e1",
  toggleSidebar:     "\u10d2\u10d5\u10d4\u10e0\u10d3\u10d8\u10d7\u10d8 \u10de\u10d0\u10dc\u10d4\u10da\u10d8",
  clearSearch:       "\u10d2\u10d0\u10e1\u10e3\u10e4\u10d7\u10d0\u10d5\u10d4\u10d1\u10d0",
  login:             "\u10e8\u10d4\u10e1\u10d5\u10da\u10d0",
  myProfile:         "\u10de\u10e0\u10dd\u10e4\u10d8\u10da\u10d8",
  logout:            "\u10d2\u10d0\u10e1\u10d5\u10da\u10d0",

  filters:           "\u10e4\u10d8\u10da\u10e2\u10e0\u10d4\u10d1\u10d8",
  activeCount:       "\u10d0\u10e5\u10e2\u10d8\u10e3\u10e0\u10d8",
  resetFilters:      "\u10d2\u10d0\u10e1\u10e3\u10e4\u10d7\u10d0\u10d5\u10d4\u10d1\u10d0",
  mapLayers:         "\u10e0\u10e3\u10d9\u10d8\u10e1 \u10e4\u10d4\u10dc\u10d4\u10d1\u10d8",
  routes:            "\u10db\u10d0\u10e0\u10e8\u10e0\u10e3\u10e2\u10d4\u10d1\u10d8",
  roadAlerts:        "\u10d2\u10d0\u10e4\u10e0\u10d7\u10ee\u10d8\u10da\u10d4\u10d1\u10d4\u10d1\u10d8",
  bikerSpots:        "\u10d1\u10d8\u10d9\u10d4\u10e0\u10d8\u10e1 \u10d0\u10d3\u10d2\u10d8\u10da\u10d4\u10d1\u10d8",
  roadAlertsSection: "\u10e1\u10d0\u10d2\u10d6\u10d0\u10dd \u10d2\u10d0\u10e4\u10e0\u10d7\u10ee\u10d8\u10da\u10d4\u10d1\u10d4\u10d1\u10d8",
  difficulty:        "\u10e1\u10d8\u10e0\u10d7\u10e3\u10da\u10d4",
  spotsServices:     "\u10d0\u10d3\u10d2\u10d8\u10da\u10d4\u10d1\u10d8 \u10d3\u10d0 \u10e1\u10d4\u10e0\u10d5\u10d8\u10e1\u10d8",
  featuredRoutes:    "\u10e0\u10d4\u10d9\u10dd\u10db\u10d4\u10dc\u10d3\u10d4\u10d1\u10e3\u10da\u10d8 \u10db\u10d0\u10e0\u10e8\u10e0\u10e3\u10e2\u10d4\u10d1\u10d8",
  kmSuffix:          "\u10d9\u10db",
  sidebarFooter:     "\u10db\u10dd\u10d8\u10ea\u10d0\u10d5\u10e1",
  allNineRegions:    "\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u10e1 \u10e7\u10d5\u10d4\u10da\u10d0 9 \u10e0\u10d4\u10d2\u10d8\u10dd\u10dc\u10e1",
  communityVerified: "\u10e1\u10d0\u10d6\u10dd\u10d2\u10d0\u10d3\u10dd\u10d4\u10d1\u10d8\u10e1 \u10db\u10d8\u10d4\u10e0 \u10d3\u10d0\u10db\u10dd\u10ec\u10db\u10d4\u10d1\u10e3\u10da\u10d8 \u10db\u10dd\u10dc\u10d0\u10ea\u10d4\u10db\u10d4\u10d1\u10d8.",

  difficultyBeginner:     "\u10db\u10d0\u10e0\u10e2\u10d8\u10d5\u10d8",
  difficultyIntermediate: "\u10e1\u10d0\u10e8\u10e3\u10d0\u10da\u10dd",
  difficultyAdvanced:     "\u10e0\u10d7\u10e3\u10da\u10d8",
  difficultyExtreme:      "\u10d4\u10e5\u10e1\u10e2\u10e0\u10d4\u10db\u10d0\u10da\u10e3\u10e0\u10d8",

  qualityExcellent: "\u10e8\u10d4\u10e1\u10d0\u10dc\u10d8\u10e8\u10dc\u10d0\u10d5\u10d8",
  qualityGood:      "\u10d9\u10d0\u10e0\u10d2\u10d8",
  qualityFair:      "\u10d3\u10d0\u10db\u10d0\u10d9\u10db\u10d0\u10e7\u10dd\u10e4\u10d8\u10da\u10d4\u10d1\u10d4\u10da\u10d8",
  qualityPoor:      "\u10ea\u10e3\u10d3\u10d8",
  qualityUnpaved:   "\u10d2\u10d6\u10d0 \u10d2\u10d0\u10e0\u10d4\u10e8\u10d4",

  alertGravel: "\u10ee\u10e0\u10d4\u10e8\u10d8",
  alertCamera: "\u10e1\u10d8\u10e9\u10e5\u10d0\u10e0\u10d8\u10e1 \u10d9\u10d0\u10db\u10d4\u10e0\u10d0",
  alertWork:   "\u10e1\u10d0\u10d2\u10d6\u10d0\u10dd \u10e1\u10d0\u10db\u10e3\u10e8\u10d0\u10dd\u10d4\u10d1\u10d8",
  alertDanger: "\u10e1\u10d0\u10e8\u10d8\u10e8\u10d8 \u10db\u10dd\u10dc\u10d0\u10d9\u10d5\u10d4\u10d7\u10d8",

  alertGravelDesc: "\u10d2\u10d6\u10d8\u10e1 \u10d6\u10dd\u10da(\u10d4\u10d1)\u10d6\u10d4 \u10ee\u10e0\u10d4\u10e8\u10d8 \u2014 \u10e1\u10d8\u10e9\u10e5\u10d0\u10e0\u10d4 50 \u10d9\u10db/\u10e1\u10d7-\u10d6\u10d4 \u10d3\u10d0\u10d1\u10da\u10d0",
  alertCameraDesc: "\u10e4\u10d8\u10e5\u10e1\u10d8\u10e0\u10d4\u10d1\u10e3\u10da\u10d8 \u10e1\u10d8\u10e9\u10e5\u10d0\u10e0\u10d8\u10e1 \u10e1\u10d0\u10d9\u10dd\u10dc\u10e2\u10e0\u10dd\u10da\u10dd \u10d9\u10d0\u10db\u10d4\u10e0\u10d0",
  alertWorkDesc:   "\u10db\u10d8\u10db\u10d3\u10d8\u10dc\u10d0\u10e0\u10d4 \u10e1\u10d0\u10db\u10e8\u10d4\u10dc\u10d4\u10d1\u10da\u10dd \u10e1\u10d0\u10db\u10e3\u10e8\u10d0\u10dd\u10d4\u10d1\u10d8 \u2014 \u10d6\u10dd\u10da\u10d8 \u10e8\u10d4\u10d8\u10eb\u10da\u10d4\u10d1\u10d0 \u10d3\u10d0\u10d9\u10d4\u10e2\u10d8\u10da\u10d8 \u10d8\u10e7\u10dd\u10e1",
  alertDangerDesc: "\u10e1\u10d0\u10ee\u10d8\u10e4\u10d0\u10d7\u10dd \u10db\u10dd\u10dc\u10d0\u10d9\u10d5\u10d4\u10d7\u10d8 \u2014 \u10d1\u10e0\u10db\u10d0 \u10db\u10dd\u10ee\u10d5\u10d4\u10d5\u10d4\u10d1\u10d8, \u10d0\u10e0\u10d0\u10e1\u10e2\u10d0\u10d1\u10d8\u10da\u10e3\u10e0\u10d8 \u10d6\u10d4\u10d3\u10d0\u10DE\u10d8\u10e0\u10d8",

  severityLow:    "\u10d3\u10d0\u10d1\u10d0\u10da\u10d8",
  severityMedium: "\u10e1\u10d0\u10e8\u10e3\u10d0\u10da\u10dd",
  severityHigh:   "\u10db\u10d0\u10e6\u10d0\u10da\u10d8",

  spotCafe:     "\u10db\u10dd\u10e2\u10dd-\u10d9\u10d0\u10e4\u10d4",
  spotFuel:     "\u10e1\u10d0\u10ec\u10d5\u10d0\u10d5\u10d8",
  spotViewpoint:"\u10de\u10d0\u10dc\u10dd\u10e0\u10d0\u10db\u10d0",
  spotRestArea: "\u10d3\u10d0\u10e1\u10d5\u10d4\u10dc\u10d4\u10d1\u10d8\u10e1 \u10d6\u10dd\u10dc\u10d0",
  spotMechanic: "\u10db\u10d4\u10e5\u10d0\u10dc\u10d8\u10d9\u10dd\u10e1\u10d8",
  spotHotel:    "\u10e1\u10d0\u10e1\u10e2\u10e3\u10db\u10e0\u10dd",

  mapAriaLabel: "\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u10e1 \u10db\u10dd\u10e2\u10dd\u10ea\u10d8\u10d9\u10da\u10d8\u10e1 \u10db\u10d0\u10e0\u10e8\u10e0\u10e3\u10e2\u10d4\u10d1\u10d8\u10e1 \u10d8\u10dc\u10e2\u10d4\u10e0\u10d0\u10e5\u10e2\u10d8\u10e3\u10da\u10d8 \u10e0\u10e3\u10d9\u10d0",
  openFilters:  "\u10e4\u10d8\u10da\u10e2\u10e0\u10d4\u10d1\u10d8\u10e1 \u10d2\u10d0\u10ee\u10e1\u10dc\u10d0",

  distance: "\u10db\u10d0\u10dc\u10eb\u10d8\u10da\u10d8",
  duration: "\u10ee\u10d0\u10dc\u10d2\u10e0\u10eb\u10da\u10d8\u10d5\u10dd\u10d1\u10d0",
  climb:    "\u10d0\u10e6\u10db\u10d0\u10e0\u10d7\u10d8",
  region:   "\u10e0\u10d4\u10d2\u10d8\u10dd\u10dc\u10d8",
  surface:  "\u10d6\u10d4\u10d3\u10d0\u10DE\u10d8\u10e0\u10d8",
  verified: "\u2713 \u10d3\u10d0\u10db\u10dd\u10ec\u10db\u10d4\u10d1\u10e3\u10da\u10d8",
  communityReport: "\u10e1\u10d0\u10d6\u10dd\u10d2\u10d0\u10d3\u10dd\u10d4\u10d1\u10d8\u10e1 \u10e0\u10d4\u10de\u10dd\u10e0\u10e2\u10d8",
  justNow:  "\u10d0\u10ee\u10da\u10d0\u10ee\u10d0\u10dc\u10e1",
  reviews:  "\u10e8\u10d4\u10e4\u10d0\u10e1\u10d4\u10d1\u10d0",
  hours:    "\u10e1\u10d0\u10db\u10e3\u10e8\u10d0\u10dd \u10e1\u10d0\u10d0\u10d7\u10d4\u10d1\u10d8",

  mapInitialising: "\u10e0\u10e3\u10d9\u10d0 \u10d8\u10e2\u10d5\u10d8\u10e0\u10d7\u10d4\u10d1\u10d0\u2026",
  mapLoadingNet:   "\u10e5\u10e1\u10d4\u10da\u10d8 \u10d8\u10e2\u10d5\u10d8\u10e0\u10d7\u10d4\u10d1\u10d0",

  statRoutes: "\u10db\u10d0\u10e0\u10e8\u10e0\u10e3\u10e2\u10d8",
  statAlerts: "\u10d2\u10d0\u10e4\u10e0\u10d7\u10ee\u10d8\u10da\u10d4\u10d1\u10d0",
  statSpots:  "\u10d0\u10d3\u10d2\u10d8\u10da\u10d8",

  addAlertTitle:          "\u10e1\u10d0\u10d2\u10d6\u10d0\u10dd \u10e0\u10d4\u10de\u10dd\u10e0\u10e2\u10d8\u10e1 \u10d3\u10d0\u10db\u10d0\u10e2\u10d4\u10d1\u10d0",
  addAlertCoords:         "\u10d9\u10dd\u10dd\u10e0\u10d3\u10d8\u10dc\u10d0\u10e2\u10d4\u10d1\u10d8",
  addAlertTypeLabel:      "\u10d2\u10d0\u10e4\u10e0\u10d7\u10ee\u10d8\u10da\u10d4\u10d1\u10d8\u10e1 \u10e2\u10d8\u10de\u10d8",
  addAlertDescLabel:      "\u10d0\u10e6\u10ec\u10d4\u10e0\u10d0",
  addAlertDescPlaceholder:"\u10dc\u10d0\u10ee\u10d4\u10d7, \u10e1\u10d0\u10d3 \u10d3\u10d0 \u10e0\u10d0 \u10e1\u10d0\u10ee\u10d8\u10e1 \u10de\u10e0\u10dd\u10d1\u10da\u10d4\u10db\u10d0\u10d0 \u2014 \u10d1\u10d8\u10d9\u10d4\u10e0\u10d4\u10d1\u10d8\u10e1 \u10d2\u10d0\u10d3\u10d0\u10e1\u10d0\u10e0\u10e9\u10d4\u10dc\u10d0\u10d3\u2026",
  addAlertSubmit:         "\u10d2\u10d0\u10d6\u10d8\u10d0\u10e0\u10d4\u10d1\u10d0",
  addAlertCancel:         "\u10d2\u10d0\u10e3\u10e5\u10db\u10d4\u10d1\u10d0",
  addAlertLoginRequired:  "\u10d2\u10d0\u10e4\u10e0\u10d7\u10ee\u10d8\u10da\u10d4\u10d1\u10d8\u10e1 \u10d3\u10d0\u10e1\u10d0\u10db\u10d0\u10e2\u10d4\u10d1\u10da\u10d0\u10d3 \u10d2\u10d7\u10ee\u10dd\u10d5\u10d7 \u10e8\u10d4\u10ee\u10d5\u10d8\u10d3\u10d4\u10d7 \u10e1\u10d8\u10e1\u10e2\u10d4\u10db\u10d0\u10e8\u10d8.",

  authTabLogin:         "\u10e8\u10d4\u10e1\u10d5\u10da\u10d0",
  authTabRegister:      "\u10e0\u10d4\u10d2\u10d8\u10e1\u10e2\u10e0\u10d0\u10ea\u10d8\u10d0",
  authEmailLabel:       "\u10d4\u10da-\u10e4\u10dd\u10e1\u10e2\u10d0",
  authEmailPlaceholder: "\u10d7\u10e5\u10d5\u10d4\u10dc\u10d8@\u10d4\u10da-\u10e4\u10dd\u10e1\u10e2\u10d0.ge",
  authPasswordLabel:    "\u10de\u10d0\u10e0\u10dd\u10da\u10d8",
  authPasswordPlaceholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
  authNameLabel:        "\u10e1\u10d0\u10ee\u10d4\u10da\u10d8",
  authNamePlaceholder:  "\u10d7\u10e5\u10d5\u10d4\u10dc\u10d8 \u10e1\u10d0\u10ee\u10d4\u10da\u10d8",
  authMotoLabel:        "\u10db\u10dd\u10e2\u10dd\u10ea\u10d8\u10d9\u10da\u10d8\u10e1 \u10db\u10dd\u10d3\u10d4\u10da\u10d8",
  authMotoPlaceholder:  "\u10db\u10d0\u10d2. Honda CB500X",
  authLoginCTA:         "\u10e8\u10d4\u10e1\u10d5\u10da\u10d0",
  authRegisterCTA:      "\u10d0\u10dc\u10d2\u10d0\u10e0\u10d8\u10e8\u10d8\u10e1 \u10e8\u10d4\u10e5\u10db\u10dc\u10d0",
  authForgotPassword:   "\u10de\u10d0\u10e0\u10dd\u10da\u10d8 \u10d3\u10d0\u10d2\u10d0\u10d5\u10d8\u10ec\u10e7\u10d3\u10d0\u10d7?",
  authSwitchToRegister: "\u10d0\u10dc\u10d2\u10d0\u10e0\u10d8\u10e8\u10d8 \u10d0\u10e0 \u10d2\u10d0\u10e5\u10d5\u10d7?",
  authSwitchToLogin:    "\u10e3\u10d9\u10d5\u10d4 \u10d2\u10d0\u10e5\u10d5\u10d7 \u10d0\u10dc\u10d2\u10d0\u10e0\u10d8\u10e8\u10d8?",
  authClose:            "\u10d3\u10d0\u10ee\u10e3\u10e0\u10d5\u10d0",
  authWelcomeBack:      "\u10d9\u10d4\u10d7\u10d8\u10da\u10d8 \u10d8\u10e7\u10dd\u10e1 \u10d7\u10e5\u10d5\u10d4\u10dc\u10d8 \u10d3\u10d0\u10d1\u10e0\u10e3\u10dc\u10d4\u10d1\u10d0",
  authJoinCommunity:    "\u10e8\u10d4\u10e3\u10d4\u10e0\u10d7\u10d3\u10d8\u10d7 \u10d1\u10d8\u10d9\u10d4\u10e0\u10d4\u10d1\u10d8\u10e1 \u10e1\u10d0\u10d6\u10dd\u10d2\u10d0\u10d3\u10dd\u10d4\u10d1\u10d0\u10e1",

  errorTitle:     "\u10e8\u10d4\u10ea\u10d3\u10dd\u10db\u10d0 \u10db\u10dd\u10ee\u10d3\u10d0",
  errorMapFailed: "\u10e0\u10e3\u10d9\u10d0 \u10d5\u10d4\u10e0 \u10e9\u10d0\u10d8\u10e2\u10d5\u10d8\u10e0\u10d7\u10d0.",
  errorGeneric:   "\u10db\u10dd\u10e3\u10da\u10dd\u10d3\u10dc\u10d4\u10da\u10d8 \u10e8\u10d4\u10ea\u10d3\u10dd\u10db\u10d0.",
  errorRetry:     "\u10d7\u10d0\u10d5\u10d8\u10d3\u10d0\u10dc \u10ea\u10d3\u10d0",

  close: "\u10d3\u10d0\u10ee\u10e3\u10e0\u10d5\u10d0",
} as const;

export type KaKey = keyof typeof KA;
"""

# ── constants ─────────────────────────────────────────────────────────────────

FILES["src/lib/constants/index.ts"] = """\
import type { AlertType, AlertSeverity, AsphaltQuality, Coordinate, DifficultyLevel, FilterState, SpotType } from "@/lib/types";
import { KA } from "@/lib/i18n/ka";

export const GEORGIA_CENTER: Coordinate = { lat: 41.9, lng: 43.9 };
export const GEORGIA_DEFAULT_ZOOM = 8;
export const GEORGIA_MIN_ZOOM     = 6;
export const GEORGIA_MAX_ZOOM     = 18;
export const GEORGIA_BOUNDS = { north:43.6, south:41.0, east:46.7, west:39.9 } as const;

export const MAP_TILE_URL    = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
export const MAP_TILE_ATTR   = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>';
export const MAP_TILE_SUBDOM = "abcd";

export interface AlertMeta { label:string; color:string; bgColor:string; borderColor:string; description:string; }

export const ALERT_TYPE_META: Record<AlertType, AlertMeta> = {
  gravel: { label:KA.alertGravel, color:"#a78bfa", bgColor:"rgba(167,139,250,0.12)", borderColor:"rgba(167,139,250,0.30)", description:KA.alertGravelDesc },
  camera: { label:KA.alertCamera, color:"#3b82f6", bgColor:"rgba(59,130,246,0.12)",  borderColor:"rgba(59,130,246,0.30)",  description:KA.alertCameraDesc },
  work:   { label:KA.alertWork,   color:"#f59e0b", bgColor:"rgba(245,158,11,0.12)",  borderColor:"rgba(245,158,11,0.30)",  description:KA.alertWorkDesc   },
  danger: { label:KA.alertDanger, color:"#ef4444", bgColor:"rgba(239,68,68,0.12)",   borderColor:"rgba(239,68,68,0.30)",   description:KA.alertDangerDesc },
};

export interface DifficultyMeta { label:string; color:string; bgColor:string; }
export const DIFFICULTY_META: Record<DifficultyLevel, DifficultyMeta> = {
  beginner:     { label:KA.difficultyBeginner,     color:"#22c55e", bgColor:"rgba(34,197,94,0.12)"   },
  intermediate: { label:KA.difficultyIntermediate, color:"#f59e0b", bgColor:"rgba(245,158,11,0.12)"  },
  advanced:     { label:KA.difficultyAdvanced,     color:"#fb923c", bgColor:"rgba(251,146,60,0.12)"  },
  extreme:      { label:KA.difficultyExtreme,      color:"#ef4444", bgColor:"rgba(239,68,68,0.12)"   },
};

export interface AsphaltQualityMeta { label:string; color:string; bgColor:string; }
export const ASPHALT_QUALITY_META: Record<AsphaltQuality, AsphaltQualityMeta> = {
  excellent: { label:KA.qualityExcellent, color:"#22c55e", bgColor:"rgba(34,197,94,0.12)"   },
  good:      { label:KA.qualityGood,      color:"#84cc16", bgColor:"rgba(132,204,22,0.12)"  },
  fair:      { label:KA.qualityFair,      color:"#f59e0b", bgColor:"rgba(245,158,11,0.12)"  },
  poor:      { label:KA.qualityPoor,      color:"#fb923c", bgColor:"rgba(251,146,60,0.12)"  },
  unpaved:   { label:KA.qualityUnpaved,   color:"#a78bfa", bgColor:"rgba(167,139,250,0.12)" },
};

export interface SpotMeta { label:string; icon:string; color:string; }
export const SPOT_TYPE_META: Record<SpotType, SpotMeta> = {
  cafe:      { label:KA.spotCafe,      icon:"\u2615",          color:"#fb923c" },
  fuel:      { label:KA.spotFuel,      icon:"\u26fd",          color:"#ec4899" },
  viewpoint: { label:KA.spotViewpoint, icon:"\U0001f3d4\ufe0f", color:"#22c55e" },
  rest_area: { label:KA.spotRestArea,  icon:"\U0001f17f\ufe0f", color:"#3b82f6" },
  mechanic:  { label:KA.spotMechanic,  icon:"\U0001f527",       color:"#a78bfa" },
  hotel:     { label:KA.spotHotel,     icon:"\U0001f3e8",       color:"#f59e0b" },
};

export const ALERT_SEVERITY_META: Record<AlertSeverity, { label:string; color:string }> = {
  low:    { label:KA.severityLow,    color:"#22c55e" },
  medium: { label:KA.severityMedium, color:"#f59e0b" },
  high:   { label:KA.severityHigh,   color:"#ef4444" },
};

export const DEFAULT_FILTERS: FilterState = {
  alertTypes:   ["gravel","camera","work","danger"],
  difficulties: ["beginner","intermediate","advanced","extreme"],
  spotTypes:    ["cafe","fuel","viewpoint","rest_area","mechanic","hotel"],
  showRoutes:true, showAlerts:true, showSpots:true, searchQuery:"",
};

export const SIDEBAR_WIDTH_PX = 320;
"""

# ── utils ─────────────────────────────────────────────────────────────────────

FILES["src/lib/utils/index.ts"] = """\
import type { AsphaltQuality, DifficultyLevel } from "@/lib/types";

export function formatDistance(km: number): string {
  if (km < 1)  return `${Math.round(km * 1_000)} \u10db`;
  if (km < 10) return `${km.toFixed(1)} \u10d9\u10db`;
  return `${Math.round(km)} \u10d9\u10db`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} \u10ec\u10e3\u10d7`;
  const h = Math.floor(minutes / 60), min = minutes % 60;
  return min === 0 ? `${h}\u10e1\u10d7` : `${h}\u10e1\u10d7 ${min}\u10ec\u10e3\u10d7`;
}

export function getDifficultyColour(level: DifficultyLevel): string {
  const map: Record<DifficultyLevel, string> = {
    beginner:"text-green-400", intermediate:"text-amber-400", advanced:"text-orange-400", extreme:"text-red-400",
  };
  return map[level];
}

export function getAsphaltQualityLabel(quality: AsphaltQuality): string {
  const labels: Record<AsphaltQuality, string> = {
    excellent:"\u10e8\u10d4\u10e1\u10d0\u10dc\u10d8\u10e8\u10dc\u10d0\u10d5\u10d8 \u10d6\u10d4\u10d3\u10d0\u10DE\u10d8\u10e0\u10d8",
    good:"\u10d9\u10d0\u10e0\u10d2\u10d8 \u10d6\u10d4\u10d3\u10d0\u10DE\u10d8\u10e0\u10d8",
    fair:"\u10d3\u10d0\u10db\u10d0\u10d9\u10db\u10d0\u10e7\u10dd\u10e4\u10d8\u10da\u10d4\u10d1\u10d4\u10da\u10d8",
    poor:"\u10ea\u10e3\u10d3\u10d8 \u2014 \u10e1\u10d8\u10e4\u10e0\u10d7\u10ee\u10d8\u10da\u10d4\u10d1\u10d0",
    unpaved:"\u10d0\u10e1\u10e4\u10d0\u10da\u10e2\u10d8\u10e1 \u10d2\u10d0\u10e0\u10d4\u10e8\u10d4",
  };
  return labels[quality];
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60_000), hours = Math.floor(diff / 3_600_000), days = Math.floor(diff / 86_400_000);
  if (mins  < 2)  return "\u10d0\u10ee\u10da\u10d0\u10ee\u10d0\u10dc\u10e1";
  if (mins  < 60) return `${mins}\u10ec \u10ec\u10d8\u10dc \u10ec\u10d8\u10dc";`;
  if (hours < 24) return `${hours}\u10e1\u10d7 \u10ec\u10d8\u10dc`;
  return `${days}\u10d3\u10d8\u10e6\u10d8\u10e1 \u10ec\u10d8\u10dc`;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
"""

# ══════════════════════════════════════════════════════════════════════════════
#  MOCK DATA (Georgian)
# ══════════════════════════════════════════════════════════════════════════════

FILES["src/store/mockData.ts"] = """\
import type { BikerSpot, RoadAlert, Route } from "@/lib/types";

export const MOCK_ROUTES: Route[] = [
  {
    id:"r-001", name:"\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u10e1 \u10e1\u10d0\u10db\u10ee\u10d4\u10564\u10e0\u10dd \u10d2\u10d6\u10d0",
    description:"\u10d9\u10d0\u10d5\u10d9\u10d0\u10e1\u10d8\u10d8\u10e1 \u10e7\u10d5\u10d4\u10da\u10d0\u10d6\u10d4 \u10d8\u10d9\u10dd\u10dc\u10e3\u10e0\u10d8 \u10e1\u10d0\u10d0\u10d5\u10e2\u10dd\u10db\u10dd\u10d1\u10d8\u10da\u10dd \u10d2\u10d6\u10d0. S3 \u10d4\u10e0\u10dd\u10d5\u10dc\u10e3\u10da\u10d8 \u10d2\u10d6\u10d0 \u10d0\u10d3\u10d8\u10e1 \u10d7\u10d1\u10d8\u10da\u10d8\u10e1\u10d8\u10e1 \u10d2\u10d0\u10e0\u10d4\u10e3\u10d1\u10dc\u10d4\u10d1\u10d8\u10d3\u10d0\u10dc 2 379 \u10db-\u10d8\u10d0\u10dc \u10ef\u10d5\u10e0\u10d8\u10e1 \u10e3\u10e6\u10d4\u10da\u10e2\u10d4\u10ee\u10d8\u10da\u10d0\u10db\u10d3\u10d4.",
    difficulty:"advanced", asphaltQuality:"excellent",
    coordinates:[
      {lat:41.693,lng:44.801},{lat:41.844,lng:44.720},{lat:42.003,lng:44.700},
      {lat:42.178,lng:44.671},{lat:42.336,lng:44.569},{lat:42.473,lng:44.487},
      {lat:42.536,lng:44.471},{lat:42.597,lng:44.531},{lat:42.659,lng:44.658},
    ],
    distanceKm:148, durationMin:210, elevationGain:2379,
    region:"\u10db\u10ea\u10ee\u10d4\u10d7\u10d0-\u10db\u10d7\u10d8\u10d0\u10dc\u10d4\u10d7\u10d8",
    tags:["\u10db\u10d7\u10d0","\u10de\u10d0\u10dc\u10dd\u10e0\u10d0\u10db\u10d0","\u10e1\u10d4\u10e0\u10de\u10d0\u10dc\u10e2\u10d8\u10dc\u10d8","\u10d8\u10e1\u10e2\u10dd\u10e0\u10d8\u10e3\u10da\u10d8","\u10d8\u10e3\u10dc\u10d4\u10e1\u10d9\u10dd"],
    likeCount:1247, rideCount:5830,
  },
  {
    id:"r-002", name:"\u10d2\u10dd\u10db\u10d1\u10dd\u10e0\u10d8\u10e1 \u10e3\u10e6\u10d4\u10da\u10e2\u10d4\u10ee\u10d8\u10da\u10d8 \u2014 \u10d9\u10d0\u10ee\u10d4\u10d7\u10d8\u10e1 \u10e6\u10d5\u10d8\u10dc\u10d8\u10e1 \u10d2\u10d6\u10d0",
    description:"\u10d9\u10d0\u10ee\u10d4\u10d7\u10d8\u10e1 \u10e6\u10d5\u10d8\u10dc\u10d8\u10e1 \u10e1\u10d0\u10db\u10d4\u10e4\u10dd\u10e8\u10d8 \u10e8\u10d4\u10e1\u10d0\u10e1\u10d5\u10da\u10d4\u10da\u10d8 \u10d2\u10d5\u10d4\u10e0\u10d3\u10d8\u10d7\u10d8 \u10d2\u10d6\u10d0. \u10d2\u10dd\u10db\u10d1\u10dd\u10e0\u10d8\u10e1 \u10e5\u10d4\u10564\u10d8 (1 620 \u10db) \u10d2\u10d0\u10db\u10dd\u10e7\u10dd\u10e4\u10e1 \u10e5\u10d0\u10e0\u10d7\u10da\u10e1 \u10d0\u10da\u10d0\u10d6\u10dc\u10d8\u10e1 \u10d5\u10d4\u10da\u10d8\u10d3\u10d0\u10dc.",
    difficulty:"intermediate", asphaltQuality:"good",
    coordinates:[
      {lat:41.740,lng:44.975},{lat:41.753,lng:45.098},{lat:41.789,lng:45.212},
      {lat:41.801,lng:45.280},{lat:41.835,lng:45.361},{lat:41.924,lng:45.481},
      {lat:41.841,lng:45.716},{lat:41.612,lng:45.571},
    ],
    distanceKm:102, durationMin:145, elevationGain:1621,
    region:"\u10d9\u10d0\u10ee\u10d4\u10d7\u10d8",
    tags:["\u10db\u10d7\u10d0","\u10e6\u10d5\u10d8\u10dc\u10dd","\u10e1\u10d0\u10e0\u10d7\u10e3\u10da\u10d0-\u10e2\u10e7\u10d4","\u10de\u10d0\u10dc\u10dd\u10e0\u10d0\u10db\u10d0"],
    likeCount:893, rideCount:3210,
  },
  {
    id:"r-003", name:"\u10e1\u10d5\u10d0\u10dc\u10d4\u10d7\u10d8\u10e1 \u10d2\u10d6\u10d0 \u2014 \u10d4\u10dc\u10d2\u10e3\u10e0\u10d8\u10e1 \u10ee\u10d4\u10dd\u10d1\u10d0",
    description:"\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u10e1 \u10e7\u10d5\u10d4\u10da\u10d0\u10d6\u10d4 \u10564\u10e0\u10d0\u10db\u10d0\u10e2\u10e3\u10da\u10d8 \u10d3\u10d0 \u10db\u10dd\u10db\u10d7\u10ee\u10dd\u10d5\u10dc\u10d8 \u10db\u10d0\u10e0\u10e8\u10e0\u10e3\u10e2\u10d8. \u10db\u10d4\u10e1\u10e2\u10d8\u10d8\u10e1\u10d0\u10d9\u10d4\u10dc \u10db\u10d8\u10db\u10d0\u10d5\u10d0\u10da\u10d8 \u10d2\u10d6\u10d0 \u10d4\u10dc\u10d2\u10e3\u10e0\u10d8\u10e1 \u10db\u10564\u10d8\u10dc\u10d0\u10e0\u10d8\u10e1 \u10d2\u10d0\u10e1\u10ec\u10d5\u10e0\u10d8\u10d5 \u10db\u10d8\u10d3\u10d8\u10e1 \u10e1\u10e3\u10da \u10e3\u10e4\u10e0\u10dd \u10d5\u10d8\u10ec\u10e0\u10dd \u10ee\u10d4\u10dd\u10d1\u10d0\u10e8\u10d8.",
    difficulty:"extreme", asphaltQuality:"poor",
    coordinates:[
      {lat:42.508,lng:41.871},{lat:42.574,lng:42.045},{lat:42.645,lng:42.197},
      {lat:42.706,lng:42.396},{lat:42.798,lng:42.515},{lat:42.878,lng:42.594},
      {lat:42.957,lng:42.661},{lat:43.031,lng:42.732},
    ],
    distanceKm:132, durationMin:300, elevationGain:1890,
    region:"\u10e1\u10d0\u10db\u10d4\u10d2\u10e0\u10d4\u10da\u10dd-\u10d6\u10d4\u10db\u10dd \u10e1\u10d5\u10d0\u10dc\u10d4\u10d7\u10d8",
    tags:["\u10d4\u10e5\u10e1\u10e2\u10e0\u10d4\u10db\u10d0\u10da\u10e3\u10e0\u10d8","\u10ee\u10e0\u10d4\u10e8\u10d8","\u10ee\u10d4\u10dd\u10d1\u10d0","\u10d0\u10da\u10de\u10e3\u10e0\u10d8","\u10d8\u10e3\u10dc\u10d4\u10e1\u10d9\u10dd"],
    likeCount:2104, rideCount:1520,
  },
  {
    id:"r-004", name:"\u10d0\u10ed\u10d0\u10e0\u10d8\u10e1 \u10e8\u10d0\u10d5\u10d8 \u10d6\u10e6\u10d5\u10d8\u10e1 \u10e1\u10d0\u10dc\u10d0\u10de\u10d8\u10e0\u10dd \u10db\u10d0\u10e0\u10e8\u10e0\u10e3\u10e2\u10d8",
    description:"\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u10e1 \u10e7\u10d5\u10d4\u10da\u10d0\u10d6\u10d4 \u10db\u10dd\u10564\u10e3\u10dc\u10d4\u10d1\u10e3\u10da\u10d8 \u10d2\u10d0\u10e1\u10d4\u10d8\u10e0\u10dc\u10d4\u10d1\u10d0 \u2014 \u10d0\u10ee\u10da\u10d0\u10564\u10d0\u10e1\u10e4\u10d0\u10da\u10e2\u10d4\u10d1\u10e3\u10da\u10d8 \u10e1\u10d0\u10dc\u10d0\u10de\u10d8\u10e0\u10dd \u10d2\u10d6\u10d0 \u10d1\u10d0\u10d7\u10e3\u10db\u10d8\u10d3\u10d0\u10dc \u10e9\u10e0\u10d3\u10d8\u10da\u10dd\u10d4\u10d7\u10d8\u10d7.",
    difficulty:"beginner", asphaltQuality:"excellent",
    coordinates:[
      {lat:41.641,lng:41.636},{lat:41.668,lng:41.672},{lat:41.819,lng:41.777},
      {lat:41.896,lng:41.813},{lat:41.974,lng:41.797},{lat:42.090,lng:41.712},
      {lat:42.148,lng:41.673},
    ],
    distanceKm:68, durationMin:85, elevationGain:95,
    region:"\u10d0\u10ed\u10d0\u10e0\u10d0 / \u10d2\u10e3\u10e0\u10d8\u10d0",
    tags:["\u10e1\u10d0\u10dc\u10d0\u10de\u10d8\u10e0\u10dd","\u10d6\u10e6\u10d5\u10d0","\u10db\u10d0\u10e0\u10e2\u10d8\u10d5\u10d8","\u10d5\u10d0\u10d9\u10d4"],
    likeCount:671, rideCount:2890,
  },
  {
    id:"r-005", name:"\u10d1\u10dd\u10e0\u10ef\u10dd\u10db\u10d8\u10e1 \u10ee\u10d4\u10dd\u10d1\u10d0 \u2014 \u10d1\u10d0\u10d9\u10e3\u10e0\u10d8\u10d0\u10dc\u10d8\u10e1 \u10d0\u10da\u10de\u10e3\u10e0\u10d8",
    description:"\u10dd\u10e0\u10d8 \u10d6\u10d4\u10d3\u10d0\u10DE\u10d8\u10e0\u10d8\u10e1 \u10d0\u10db\u10d1\u10d0\u10d5\u10d8: \u10d1\u10dd\u10e0\u10ef\u10dd\u10db\u10d8\u10e1 \u10ee\u10d4\u10dd\u10d1\u10d8\u10e1 \u10db\u10dd\u10dc\u10d0\u10d9\u10d5\u10d4\u10d7\u10d8 \u2014 \u10d5\u10d8\u10ec\u10e0\u10dd \u10d9\u10d0\u10dc\u10d8\u10dd\u10dc\u10d8 \u10db\u10d8\u10dc\u10d4\u10e0\u10d0\u10da\u10e3\u10e0\u10d8 \u10ec\u10e7\u10d0\u10e0\u10dd\u10d4\u10d1\u10d8\u10d7.",
    difficulty:"intermediate", asphaltQuality:"fair",
    coordinates:[
      {lat:41.983,lng:44.112},{lat:41.921,lng:44.026},{lat:41.840,lng:43.537},
      {lat:41.839,lng:43.399},{lat:41.855,lng:43.333},{lat:41.750,lng:43.523},
      {lat:41.749,lng:43.523},
    ],
    distanceKm:88, durationMin:120, elevationGain:1340,
    region:"\u10e1\u10d0\u10db\u10ea\u10ee\u10d4-\u10ef\u10d0\u10d5\u10d0\u10ee\u10d4\u10d7\u10d8 / \u10e8\u10d8\u10564\u10d0 \u10e5\u10d0\u10e0\u10d7\u10da\u10d8",
    tags:["\u10ee\u10d4\u10dd\u10d1\u10d0","\u10e1\u10de\u10d0","\u10d0\u10da\u10de\u10e3\u10e0\u10d8","\u10d4\u10e0\u10dd\u10d5\u10dc\u10e3\u10da\u10d8-\u10de\u10d0\u10e0\u10d9\u10d8"],
    likeCount:445, rideCount:1760,
  },
];

export const MOCK_ALERTS: RoadAlert[] = [
  { id:"a-001", type:"gravel", lat:42.503, lng:44.469,
    description:"\u10db\u10d4\u10ec\u10e7\u10e0\u10e3\u10da\u10d8 \u10dc\u10d0\u10e0\u10e9\u10d4\u10dc\u10d4\u10d1\u10d8 \u10dd\u10e0\u10d8\u10d5\u10d4 \u10d6\u10dd\u10da\u10e8\u10d8 \u10ef\u10d5\u10e0\u10d8\u10e1 \u10e3\u10e6\u10d4\u10da\u10e2\u10d4\u10ee\u10d8\u10da\u10d8\u10e1 \u10db\u10ec\u10d5\u10d4\u10e0\u10d5\u10d0\u10da\u10d8\u10d3\u10d0\u10dc \u10564\u10d0\u10ee\u10da\u10dd\u10d1\u10d8\u10d7 300 \u10db-\u10d6\u10d4. \u10db\u10d0\u10e5\u10e1. 35 \u10d9\u10db/\u10e1\u10d7.",
    severity:"high", radius:400, verified:true,
    reportedAt:new Date(Date.now()-4*3_600_000).toISOString(),
    expiresAt:new Date(Date.now()+72*3_600_000).toISOString() },
  { id:"a-002", type:"camera", lat:41.786, lng:45.103,
    description:"\u10e4\u10d8\u10e5\u10e1\u10d8\u10e0\u10d4\u10d1\u10e3\u10da\u10d8 \u10e1\u10d8\u10e9\u10e5\u10d0\u10e0\u10d8\u10e1 \u10d9\u10d0\u10db\u10d4\u10e0\u10d0 \u10d7\u10d1\u10d8\u10da\u10d8\u10e1\u10d8-\u10d9\u10d0\u10ee\u10d4\u10d7\u10d8\u10e1 \u10d2\u10d6\u10d0\u10d6\u10d4 (E60), \u10e1\u10d0\u10d2\u10d0\u10e0\u10d4\u10ef\u10dd\u10e1 \u10d2\u10d5\u10d4\u10e0\u10d3\u10d8\u10e1 \u10d0\u10d5\u10da\u10d8\u10e1 \u10e8\u10d4\u10e1\u10d0\u10ee\u10d5\u10d4\u10d5\u10d6\u10d4. 90 \u10d9\u10db/\u10e1\u10d7, 24/7.",
    severity:"low", radius:150, verified:true,
    reportedAt:new Date(Date.now()-30*86_400_000).toISOString(), expiresAt:null },
  { id:"a-003", type:"work", lat:42.706, lng:42.395,
    description:"\u10ee\u10d8\u10564\u10d8\u10e1 \u10d2\u10d0\u10db\u10d0\u10d2\u10e0\u10d4\u10d1\u10d8\u10e1 \u10e1\u10d0\u10db\u10e3\u10e8\u10d0\u10dd\u10d4\u10d1\u10d8 \u10d4\u10dc\u10d2\u10e3\u10e0\u10d8\u10e1 \u10d9\u10d0\u10e8\u10ee\u10d0\u10da\u10d8\u10e1 \u10d2\u10d6\u10d0\u10d6\u10d4. \u10d4\u10e0\u10d7\u10d8 \u10d6\u10dd\u10da\u10d8, 20\u201340 \u10ec\u10e3\u10d7\u10d8\u10e1 \u10564\u10d0\u10d2\u10d5\u10d8\u10d0\u10dc\u10d4\u10d1\u10d0.",
    severity:"medium", radius:1_200, verified:true,
    reportedAt:new Date(Date.now()-5*86_400_000).toISOString(),
    expiresAt:new Date(Date.now()+45*86_400_000).toISOString() },
  { id:"a-004", type:"danger", lat:42.536, lng:44.471,
    description:"\u10ef\u10d5\u10e0\u10d8\u10e1 \u10e3\u10e6\u10d4\u10da\u10e2\u10d4\u10ee\u10d8\u10da\u10d8 \u2014 \u10e3\u10d9\u10d8\u10564\u10e3\u10e0\u10d4\u10e1\u10d8 \u10e1\u10d8\u10e4\u10e0\u10d7\u10ee\u10d8\u10da\u10d4\u10d1\u10d0 \u10e1\u10d5\u10d4\u10da/\u10e7\u10d8\u10dc\u10d5\u10d8\u10d0\u10dc \u10de\u10d8\u10e0\u10dd\u10d1\u10d4\u10d1\u10e8\u10d8. \u10d1\u10e0\u10db\u10d0 \u10e1\u10d4\u10e0\u10de\u10d0\u10dc\u10e2\u10d8\u10dc\u10d4\u10d1\u10d8 2 379 \u10db \u10e1\u10d8\u10db\u10d0\u10e6\u10da\u10d4\u10d6\u10d4.",
    severity:"high", radius:800, verified:true,
    reportedAt:new Date(Date.now()-60*86_400_000).toISOString(), expiresAt:null },
  { id:"a-005", type:"gravel", lat:41.755, lng:43.530,
    description:"\u10ee\u10e0\u10d4\u10e8\u10d8 \u10d1\u10dd\u10e0\u10ef\u10dd\u10db\u10d8-\u10d1\u10d0\u10d9\u10e3\u10e0\u10d8\u10d0\u10dc\u10d8\u10e1 \u10d2\u10d6\u10d0\u10d6\u10d4, \u10d9\u10db 14\u201318 \u10e8\u10dd\u10e0\u10d8\u10e1. \u10e1\u10d0\u10e0\u10d4\u10db\u10dd\u10dc\u10e2\u10dd \u10e1\u10d0\u10e2\u10d5\u10d8\u10e0\u10d7\u10dd \u10d0\u10d5\u10e2\u10dd\u10db\u10dd\u10d1\u10d8\u10da\u10d4\u10d1\u10d8 \u10db\u10e3\u10e8\u10d0\u10dd\u10d1\u10d4\u10dc.",
    severity:"medium", radius:2_500, verified:false,
    reportedAt:new Date(Date.now()-90*60_000).toISOString(),
    expiresAt:new Date(Date.now()+48*3_600_000).toISOString() },
  { id:"a-006", type:"work", lat:41.693, lng:44.880,
    description:"\u10d7\u10d1\u10d8\u10da\u10d8\u10e1\u10d8\u10e1 \u10d2\u10d5\u10d4\u10e0\u10d3\u10d8\u10e1 \u10d0\u10d5\u10da\u10d8\u10e1 \u10d2\u10d6\u10d8\u10e1 \u10d0\u10e1\u10e4\u10d0\u10da\u10e2\u10d8\u10e1 \u10e1\u10d0\u10db\u10e3\u10e8\u10d0\u10dd\u10d4\u10d1\u10d8 \u2014 \u10db\u10d0\u10e0\u10ef\u10d5\u10d4\u10dc\u10d0 \u10d6\u10dd\u10da\u10d8 \u10d2\u10d0\u10564\u10d0\u10d9\u10d4\u10e2\u10d8\u10da\u10d8\u10d0.",
    severity:"low", radius:3_000, verified:true,
    reportedAt:new Date(Date.now()-10*86_400_000).toISOString(),
    expiresAt:new Date(Date.now()+21*86_400_000).toISOString() },
];

export const MOCK_SPOTS: BikerSpot[] = [
  { id:"s-001", name:"Iron Horse \u10d7\u10d1\u10d8\u10da\u10d8\u10e1\u10d8",   type:"cafe",      lat:41.693, lng:44.803, address:"\u10d9\u10dd\u10e1\u10e2\u10d0\u10d5\u10d0\u10e1 \u10e5. 14, \u10d7\u10d1\u10d8\u10da\u10d8\u10e1\u10d8 0108", phone:"+995 32 292 0014", rating:4.9, verified:true },
  { id:"s-002", name:"\u10d0\u10dc\u10d0\u10dc\u10e3\u10e0\u10d8\u10e1 \u10de\u10d0\u10dc\u10dd\u10e0\u10d0\u10db\u10d0",  type:"viewpoint", lat:42.178, lng:44.671, address:"\u10e1\u10d0\u10db\u10ee\u10d4\u10564\u10e0\u10dd \u10d2\u10d6\u10d0, \u10d9\u10db 72", phone:undefined, rating:4.7, verified:true },
  { id:"s-003", name:"\u10e1\u10e2\u10d4\u10e4\u10d0\u10dc\u10ec\u10db\u10d8\u10dc\u10564\u10d8\u10e1 \u10d1\u10d8\u10d9\u10d4\u10e0-\u10de\u10dd\u10d8\u10dc\u10e2\u10d8", type:"cafe",      lat:42.657, lng:44.654, address:"\u10e7\u10d0\u10d6\u10d1\u10d4\u10d2\u10d8\u10e1 \u10ea. \u10db\u10dd\u10d4\u10564\u10d0\u10dc\u10d8 1, \u10e1\u10e2\u10d4\u10e4\u10d0\u10dc\u10ec\u10db\u10d8\u10dc\u10564\u10d0", phone:"+995 599 00 1234", rating:4.8, verified:true },
  { id:"s-004", name:"\u10d6\u10e3\u10d2\u10564\u10d8\u10564\u10d8\u10e1 \u10d1\u10dd\u10da\u10dd \u10d2\u10d0\u10e9\u10d4\u10e0\u10d4\u10d1\u10d0", type:"fuel",      lat:42.509, lng:41.876, address:"\u10e1\u10d5\u10d0\u10dc\u10d4\u10d7\u10d8\u10e1 \u10d2\u10d6\u10d0, \u10d6\u10e3\u10d2\u10564\u10d8\u10564\u10d8\u10e1 \u10d2\u10d0\u10e0\u10d4\u10e3\u10d1\u10d0\u10dc\u10d8", phone:undefined, rating:4.2, verified:true },
  { id:"s-005", name:"\u10e1\u10d8\u10d6\u10dc\u10d0\u10e1 \u10de\u10d0\u10dc\u10dd\u10e0\u10d0\u10db\u10e3\u10da\u10d8 \u10d0\u10d8\u10d5\u10d0\u10dc\u10d8",  type:"viewpoint", lat:41.612, lng:45.571, address:"\u10eb\u10d5\u10d4\u10da\u10d8 \u10e1\u10d8\u10d6\u10dc\u10d0\u10d2\u10d8, \u10d9\u10d0\u10ee\u10d4\u10d7\u10d8",   phone:undefined, rating:4.9, verified:true },
  { id:"s-006", name:"\u10d1\u10d0\u10d7\u10e3\u10db\u10d8\u10e1 \u10d1\u10d8\u10d9\u10d4\u10e0-\u10f0\u10d0\u10d1\u10d8",   type:"cafe",      lat:41.641, lng:41.636, address:"\u10dc\u10d8\u10dc\u10dd\u10e8\u10d5\u10d8\u10da\u10d8\u10e1 \u10e5. 8, \u10d1\u10d0\u10d7\u10e3\u10db\u10d8 6000",   phone:"+995 422 271 500", rating:4.6, verified:true },
  { id:"s-007", name:"\u10d2\u10e3\u10564\u10d0\u10e3\u10e0\u10d8\u10e1 \u10d0\u10da\u10de\u10e3\u10e0\u10d8 \u10564\u10d0\u10e1\u10d5\u10d4\u10dc\u10d4\u10d1\u10d8\u10e1 \u10d6\u10dd\u10dc\u10d0", type:"rest_area", lat:42.473, lng:44.487, address:"\u10e1\u10d0\u10db\u10ee\u10d4\u10564\u10e0\u10dd \u10d2\u10d6\u10d0, \u10d9\u10db 133 (\u10d2\u10e3\u10564\u10d0\u10e3\u10e0\u10d8)", phone:undefined, rating:4.1, verified:true },
  { id:"s-008", name:"\u10d1\u10dd\u10e0\u10ef\u10dd\u10db\u10d8\u10e1 \u10db\u10d8\u10dc\u10d4\u10e0\u10d0\u10da\u10e3\u10e0\u10d8 \u10ec\u10e7\u10d0\u10e0\u10dd\u10d4\u10d1\u10d8\u10e1 \u10d2\u10d0\u10e9\u10d4\u10e0\u10d4\u10d1\u10d0", type:"rest_area", lat:41.839, lng:43.399, address:"\u10d1\u10dd\u10e0\u10ef\u10dd\u10db\u10d8\u10e1 \u10ea. \u10de\u10d0\u10e0\u10d9\u10d8, \u10d1\u10dd\u10e0\u10ef\u10dd\u10db\u10d8", phone:undefined, rating:4.5, verified:true },
];
"""

# ══════════════════════════════════════════════════════════════════════════════
#  AUTH FEATURE
# ══════════════════════════════════════════════════════════════════════════════

FILES["src/features/auth/types.ts"] = """\
export interface AuthUser {
  id:string; name:string; email:string; motorcycleModel:string; joinedAt:string;
}
export type AuthModalTab = "login"|"register";
export interface LoginCredentials    { email:string; password:string; }
export interface RegisterCredentials { name:string; email:string; motorcycleModel:string; password:string; }
export interface AuthContextValue {
  user:AuthUser|null; isAuthenticated:boolean;
  isModalOpen:boolean; modalTab:AuthModalTab;
  openModal:(tab?:AuthModalTab)=>void; closeModal:()=>void;
  login:(credentials:LoginCredentials)=>Promise<void>;
  register:(credentials:RegisterCredentials)=>Promise<void>;
  logout:()=>void;
}
"""

FILES["src/features/auth/context/AuthContext.tsx"] = '''\
"use client";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { AuthContextValue, AuthModalTab, AuthUser, LoginCredentials, RegisterCredentials } from "@/features/auth/types";

const AuthContext = createContext<AuthContextValue|null>(null);

export function AuthProvider({ children }: { children:ReactNode }): React.ReactElement {
  const [user,        setUser]        = useState<AuthUser|null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab,    setModalTab]    = useState<AuthModalTab>("login");

  const openModal  = useCallback((tab:AuthModalTab="login") => { setModalTab(tab); setIsModalOpen(true);  }, []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const login = useCallback(async ({ email }: LoginCredentials): Promise<void> => {
    setUser({ id:`u-${Date.now()}`, name:email.split("@")[0]??"Biker", email, motorcycleModel:"", joinedAt:new Date().toISOString() });
    setIsModalOpen(false);
  }, []);

  const register = useCallback(async (c: RegisterCredentials): Promise<void> => {
    setUser({ id:`u-${Date.now()}`, name:c.name, email:c.email, motorcycleModel:c.motorcycleModel, joinedAt:new Date().toISOString() });
    setIsModalOpen(false);
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated:user!==null, isModalOpen, modalTab, openModal, closeModal, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
'''

FILES["src/features/auth/components/AuthModal.tsx"] = '''\
"use client";
import { useState, useEffect, useRef, type FormEvent, type ChangeEvent } from "react";
import { X, Map, Mail, Lock, User, Bike, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { KA } from "@/lib/i18n/ka";
import { cn } from "@/lib/utils";

interface FieldProps {
  label:string; type?:string; value:string;
  onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
  placeholder:string; icon:React.ReactNode; autoComplete?:string;
}

function Field({ label, type="text", value, onChange, placeholder, icon, autoComplete }: FieldProps): React.ReactElement {
  const [showPwd, setShowPwd] = useState(false);
  const isPwd = type==="password";
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-zinc-400 tracking-wide">{label}</label>
      <div className="relative flex items-center">
        <span className="absolute left-3 text-zinc-500" aria-hidden="true">{icon}</span>
        <input type={isPwd&&showPwd?"text":type} value={value} onChange={onChange} placeholder={placeholder}
          autoComplete={autoComplete} required
          className={cn("h-10 w-full rounded-xl bg-zinc-800/70 pl-9 pr-4 text-sm text-zinc-200",
            "placeholder:text-zinc-600 border border-zinc-700",
            "focus:outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 transition-all duration-150",
            isPwd&&"pr-10")} />
        {isPwd && (
          <button type="button" aria-label="Toggle password" onClick={()=>setShowPwd(v=>!v)}
            className="absolute right-3 text-zinc-500 hover:text-zinc-300 transition-colors">
            {showPwd?<EyeOff size={15}/>:<Eye size={15}/>}
          </button>
        )}
      </div>
    </div>
  );
}

export function AuthModal(): React.ReactElement|null {
  const { isModalOpen, modalTab, openModal, closeModal, login, register } = useAuth();
  const tab = modalTab;
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [name,setName]=useState(""); const [moto,setMoto]=useState("");
  const [loading,setLoading]=useState(false); const [error,setError]=useState<string|null>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{ if(!isModalOpen)return; const f=(e:KeyboardEvent)=>{if(e.key==="Escape")closeModal();}; document.addEventListener("keydown",f); return()=>document.removeEventListener("keydown",f); },[isModalOpen,closeModal]);
  useEffect(()=>{ document.body.style.overflow=isModalOpen?"hidden":""; return()=>{document.body.style.overflow="";}; },[isModalOpen]);

  if(!isModalOpen) return null;

  const submit = (fn:()=>Promise<void>) => async (e:FormEvent)=>{ e.preventDefault(); setError(null); setLoading(true); try{await fn();}catch{setError("შეცდომა.");} finally{setLoading(false);} };

  return (
    <div ref={backdropRef} className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{backgroundColor:"rgba(0,0,0,0.72)",backdropFilter:"blur(6px)"}}
      onPointerDown={e=>{if(e.target===backdropRef.current)closeModal();}}
      role="dialog" aria-modal="true" aria-label={tab==="login"?KA.authWelcomeBack:KA.authJoinCommunity}>
      <div className={cn("relative w-full max-w-sm rounded-2xl overflow-hidden",
        "bg-[var(--color-surface-card)] border border-[var(--color-surface-border)]",
        "shadow-[0_24px_64px_rgba(0,0,0,0.7)] animate-fade-up")}>

        <div className="relative flex flex-col items-center gap-2 px-6 pt-8 pb-6 bg-gradient-to-b from-amber-500/10 to-transparent">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            <Map size={18} className="text-zinc-900" strokeWidth={2.5}/>
          </div>
          <h2 className="text-base font-bold text-zinc-100">GeoMoto<span className="text-amber-400">Routes</span></h2>
          <p className="text-xs text-zinc-500">{tab==="login"?KA.authWelcomeBack:KA.authJoinCommunity}</p>
          <button type="button" aria-label={KA.authClose} onClick={closeModal}
            className="absolute top-4 right-4 rounded-lg p-1.5 text-zinc-500 hover:bg-white/5 hover:text-zinc-300 transition-colors">
            <X size={16}/>
          </button>
        </div>

        <div className="flex mx-6 mb-5 rounded-xl overflow-hidden border border-[var(--color-surface-border)] bg-[var(--color-surface-overlay)]">
          {(["login","register"] as const).map(t=>(
            <button key={t} type="button" onClick={()=>{openModal(t);setError(null);}}
              className={cn("flex-1 py-2 text-xs font-semibold transition-all duration-150",
                tab===t?"bg-amber-500/20 text-amber-400 shadow-[inset_0_0_0_1px_rgba(245,158,11,0.25)]":"text-zinc-500 hover:text-zinc-300")}>
              {t==="login"?KA.authTabLogin:KA.authTabRegister}
            </button>
          ))}
        </div>

        <div className="px-6 pb-6">
          {error&&<div className="mb-4 rounded-lg bg-red-900/30 border border-red-500/30 px-3 py-2 text-xs text-red-400">{error}</div>}
          {tab==="login"?(
            <form onSubmit={submit(()=>login({email,password}))} className="flex flex-col gap-4">
              <Field label={KA.authEmailLabel}    type="email"    value={email}    onChange={e=>setEmail(e.target.value)}    placeholder={KA.authEmailPlaceholder}    icon={<Mail size={15}/>} autoComplete="email"/>
              <Field label={KA.authPasswordLabel} type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder={KA.authPasswordPlaceholder} icon={<Lock size={15}/>} autoComplete="current-password"/>
              <div className="flex justify-end"><button type="button" className="text-[11px] text-zinc-600 hover:text-amber-400 transition-colors">{KA.authForgotPassword}</button></div>
              <button type="submit" disabled={loading}
                className={cn("h-10 w-full rounded-xl text-sm font-semibold text-zinc-900","bg-gradient-to-r from-amber-500 to-orange-500","hover:from-amber-400 hover:to-orange-400","shadow-[0_0_16px_rgba(245,158,11,0.35)]","transition-all duration-150 active:scale-[0.98]","disabled:opacity-60 disabled:cursor-not-allowed")}>
                {loading?"…":KA.authLoginCTA}
              </button>
              <p className="text-center text-[11px] text-zinc-600">{KA.authSwitchToRegister}{" "}
                <button type="button" onClick={()=>openModal("register")} className="text-amber-400 hover:underline">{KA.authTabRegister}</button>
              </p>
            </form>
          ):(
            <form onSubmit={submit(()=>register({name,email,motorcycleModel:moto,password}))} className="flex flex-col gap-4">
              <Field label={KA.authNameLabel}     value={name}     onChange={e=>setName(e.target.value)}     placeholder={KA.authNamePlaceholder}     icon={<User size={15}/>} autoComplete="name"/>
              <Field label={KA.authEmailLabel}    type="email"     value={email}    onChange={e=>setEmail(e.target.value)}    placeholder={KA.authEmailPlaceholder}    icon={<Mail size={15}/>} autoComplete="email"/>
              <Field label={KA.authMotoLabel}     value={moto}     onChange={e=>setMoto(e.target.value)}     placeholder={KA.authMotoPlaceholder}     icon={<Bike size={15}/>} autoComplete="off"/>
              <Field label={KA.authPasswordLabel} type="password"  value={password} onChange={e=>setPassword(e.target.value)} placeholder={KA.authPasswordPlaceholder} icon={<Lock size={15}/>} autoComplete="new-password"/>
              <button type="submit" disabled={loading}
                className={cn("h-10 w-full rounded-xl text-sm font-semibold text-zinc-900","bg-gradient-to-r from-amber-500 to-orange-500","hover:from-amber-400 hover:to-orange-400","shadow-[0_0_16px_rgba(245,158,11,0.35)]","transition-all duration-150 active:scale-[0.98]","disabled:opacity-60 disabled:cursor-not-allowed")}>
                {loading?"…":KA.authRegisterCTA}
              </button>
              <p className="text-center text-[11px] text-zinc-600">{KA.authSwitchToLogin}{" "}
                <button type="button" onClick={()=>openModal("login")} className="text-amber-400 hover:underline">{KA.authTabLogin}</button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
'''

# ══════════════════════════════════════════════════════════════════════════════
#  FILTER FEATURE
# ══════════════════════════════════════════════════════════════════════════════

FILES["src/features/filters/hooks/useRouteFilters.ts"] = '''\
"use client";
import { useState, useCallback, useMemo } from "react";
import type { AlertType, DifficultyLevel, FilterState, SpotType } from "@/lib/types";
import { DEFAULT_FILTERS } from "@/lib/constants";

export interface UseRouteFiltersReturn {
  filters:FilterState; toggleAlertType:(t:AlertType)=>void;
  toggleDifficulty:(l:DifficultyLevel)=>void; toggleSpotType:(t:SpotType)=>void;
  toggleShowRoutes:()=>void; toggleShowAlerts:()=>void; toggleShowSpots:()=>void;
  setSearchQuery:(q:string)=>void; resetFilters:()=>void; activeFilterCount:number;
}

const toggle = <T,>(list:T[], item:T):T[] => list.includes(item)?list.filter(x=>x!==item):[...list,item];

export function useRouteFilters(): UseRouteFiltersReturn {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const toggleAlertType  = useCallback((t:AlertType) => setFilters(p=>({...p,alertTypes:toggle(p.alertTypes,t)})),[]);
  const toggleDifficulty = useCallback((l:DifficultyLevel) => setFilters(p=>({...p,difficulties:toggle(p.difficulties,l)})),[]);
  const toggleSpotType   = useCallback((t:SpotType) => setFilters(p=>({...p,spotTypes:toggle(p.spotTypes,t)})),[]);
  const toggleShowRoutes = useCallback(() => setFilters(p=>({...p,showRoutes:!p.showRoutes})),[]);
  const toggleShowAlerts = useCallback(() => setFilters(p=>({...p,showAlerts:!p.showAlerts})),[]);
  const toggleShowSpots  = useCallback(() => setFilters(p=>({...p,showSpots:!p.showSpots})),[]);
  const setSearchQuery   = useCallback((q:string) => setFilters(p=>({...p,searchQuery:q})),[]);
  const resetFilters     = useCallback(() => setFilters(DEFAULT_FILTERS),[]);
  const activeFilterCount = useMemo(()=>{
    let c=0;
    if(!filters.showRoutes)c++; if(!filters.showAlerts)c++; if(!filters.showSpots)c++;
    if(filters.alertTypes.length!==DEFAULT_FILTERS.alertTypes.length)c++;
    if(filters.difficulties.length!==DEFAULT_FILTERS.difficulties.length)c++;
    if(filters.spotTypes.length!==DEFAULT_FILTERS.spotTypes.length)c++;
    if(filters.searchQuery.trim())c++;
    return c;
  },[filters]);
  return { filters,toggleAlertType,toggleDifficulty,toggleSpotType,toggleShowRoutes,toggleShowAlerts,toggleShowSpots,setSearchQuery,resetFilters,activeFilterCount };
}
'''

FILES["src/features/filters/components/FilterToggleChip.tsx"] = '''\
"use client";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterToggleChipProps { label:string; active:boolean; color:string; bgColor:string; onClick:()=>void; icon?:string; }

export function FilterToggleChip({ label, active, color, bgColor, onClick, icon }: FilterToggleChipProps): React.ReactElement {
  return (
    <button type="button" role="checkbox" aria-checked={active} onClick={onClick}
      className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium w-full text-left transition-all duration-150",
        "border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50",
        active?"text-zinc-100 shadow-sm":"text-zinc-500 border-transparent hover:text-zinc-300 hover:bg-white/[0.03]")}
      style={active?{backgroundColor:bgColor,borderColor:`${color}40`,color}:{backgroundColor:"transparent"}}>
      <span className="shrink-0 h-2 w-2 rounded-full" style={{backgroundColor:color}} aria-hidden="true"/>
      {icon&&<span aria-hidden="true">{icon}</span>}
      <span className="flex-1">{label}</span>
      {active&&<Check size={12} strokeWidth={3} className="shrink-0" aria-hidden="true"/>}
    </button>
  );
}
'''

FILES["src/features/filters/components/LayerToggleRow.tsx"] = '''\
"use client";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LayerToggleRowProps { label:string; active:boolean; icon:ReactNode; color:string; onToggle:()=>void; count?:number; }

export function LayerToggleRow({ label, active, icon, color, onToggle, count }: LayerToggleRowProps): React.ReactElement {
  return (
    <div className="flex items-center gap-3 px-1 py-2">
      <span className="shrink-0" style={{color}} aria-hidden="true">{icon}</span>
      <span className="flex-1 text-sm text-zinc-300">{label}</span>
      {count!==undefined&&<span className="text-xs text-zinc-600">{count}</span>}
      <button type="button" role="switch" aria-checked={active} aria-label={`Toggle ${label}`} onClick={onToggle}
        className={cn("relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50",active?"bg-amber-500":"bg-zinc-700")}>
        <span aria-hidden="true" className={cn("pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200",active?"translate-x-4":"translate-x-0")}/>
      </button>
    </div>
  );
}
'''

FILES["src/features/filters/components/SidebarSection.tsx"] = '''\
"use client";
import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SidebarSectionProps { title:string; icon:ReactNode; children:ReactNode; defaultOpen?:boolean; badge?:number; }

export function SidebarSection({ title, icon, children, defaultOpen=true, badge }: SidebarSectionProps): React.ReactElement {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[var(--color-surface-border)]">
      <button type="button" onClick={()=>setOpen(v=>!v)} aria-expanded={open}
        className={cn("flex w-full items-center gap-2.5 px-4 py-3 text-left transition-colors duration-150",
          "hover:bg-white/[0.02] focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-amber-400/40")}>
        <span className="text-zinc-500" aria-hidden="true">{icon}</span>
        <span className="flex-1 text-xs font-semibold uppercase tracking-widest text-zinc-400">{title}</span>
        {badge!==undefined&&badge>0&&<span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-400" aria-label={`${badge} active`}>{badge}</span>}
        <ChevronDown size={14} className={cn("shrink-0 text-zinc-600 transition-transform duration-200",open?"rotate-180":"rotate-0")} aria-hidden="true"/>
      </button>
      {open&&<div className="px-3 pb-3 space-y-0.5 animate-fade-up">{children}</div>}
    </div>
  );
}
'''

FILES["src/features/filters/components/Sidebar.tsx"] = '''\
"use client";
import { Route, TriangleAlert, Coffee, Mountain, Map, X, RotateCcw, Navigation } from "lucide-react";
import type { ReactElement } from "react";
import type { AlertType, DifficultyLevel, FilterState, SpotType } from "@/lib/types";
import { ALERT_TYPE_META, DIFFICULTY_META, SPOT_TYPE_META } from "@/lib/constants";
import { KA } from "@/lib/i18n/ka";
import { SidebarSection }   from "./SidebarSection";
import { FilterToggleChip } from "./FilterToggleChip";
import { LayerToggleRow }   from "./LayerToggleRow";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen:boolean; filters:FilterState; activeFilterCount:number; onClose:()=>void;
  onToggleAlertType:(t:AlertType)=>void; onToggleDifficulty:(l:DifficultyLevel)=>void;
  onToggleSpotType:(t:SpotType)=>void; onToggleRoutes:()=>void;
  onToggleAlerts:()=>void; onToggleSpots:()=>void; onResetFilters:()=>void;
}

export function Sidebar({ isOpen, filters, activeFilterCount, onClose, onToggleAlertType, onToggleDifficulty, onToggleSpotType, onToggleRoutes, onToggleAlerts, onToggleSpots, onResetFilters }: SidebarProps): ReactElement {
  const alertTypes   = Object.keys(ALERT_TYPE_META)  as AlertType[];
  const difficulties = Object.keys(DIFFICULTY_META)  as DifficultyLevel[];
  const spotTypes    = Object.keys(SPOT_TYPE_META)   as SpotType[];
  const routes = [
    {id:"r-001",name:"\u10e1\u10d0\u10db\u10ee\u10d4\u10564\u10e0\u10dd \u10d2\u10d6\u10d0",        region:"\u10db\u10ea\u10ee\u10d4\u10d7\u10d0-\u10db\u10d7\u10d8\u10d0\u10dc\u10d4\u10d7\u10d8", km:148, diff:"\u10e0\u10d7\u10e3\u10da\u10d8"},
    {id:"r-002",name:"\u10d2\u10dd\u10db\u10d1\u10dd\u10e0\u10d8\u10e1 \u10e3\u10e6\u10d4\u10da\u10e2\u10d4\u10ee\u10d8\u10da\u10d8", region:"\u10d9\u10d0\u10ee\u10d4\u10d7\u10d8",           km:102, diff:"\u10e1\u10d0\u10e8\u10e3\u10d0\u10da\u10dd"},
    {id:"r-003",name:"\u10e1\u10d5\u10d0\u10dc\u10d4\u10d7\u10d8\u10e1 \u10d2\u10d6\u10d0",          region:"\u10e1\u10d5\u10d0\u10dc\u10d4\u10d7\u10d8",          km:132, diff:"\u10d4\u10e5\u10e1\u10e2\u10e0\u10d4\u10db."},
    {id:"r-004",name:"\u10d0\u10ed\u10d0\u10e0\u10d8\u10e1 \u10e1\u10d0\u10dc\u10d0\u10de\u10d8\u10e0\u10dd",        region:"\u10d0\u10ed\u10d0\u10e0\u10d0",            km:68,  diff:"\u10db\u10d0\u10e0\u10e2\u10d8\u10d5\u10d8"},
    {id:"r-005",name:"\u10d1\u10dd\u10e0\u10ef\u10dd\u10db\u10d8\u10e1 \u10ee\u10d4\u10dd\u10d1\u10d0",        region:"\u10e1\u10d0\u10db\u10ea\u10ee\u10d4-\u10ef\u10d0\u10d5\u10d0\u10ee\u10d4\u10d7\u10d8",  km:88,  diff:"\u10e1\u10d0\u10e8\u10e3\u10d0\u10da\u10dd"},
  ];
  return (
    <>
      {isOpen&&<div className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden" aria-hidden="true" onClick={onClose}/>}
      <aside role="complementary" aria-label={KA.filters}
        className={cn("fixed left-0 top-14 z-40 h-[calc(100dvh-3.5rem)] w-80 flex flex-col",
          "bg-[var(--color-surface-overlay)] border-r border-[var(--color-surface-border)]",
          "transition-transform duration-300 ease-in-out",
          isOpen?"translate-x-0 animate-slide-in-left":"-translate-x-full")}>

        <div className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--color-surface-border)] px-4">
          <div className="flex items-center gap-2">
            <Map size={15} className="text-amber-400"/>
            <span className="text-sm font-semibold text-zinc-200">{KA.filters}</span>
            {activeFilterCount>0&&<span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400">{activeFilterCount} {KA.activeCount}</span>}
          </div>
          <div className="flex items-center gap-1">
            {activeFilterCount>0&&<button type="button" onClick={onResetFilters} title={KA.resetFilters} className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11px] font-medium text-zinc-500 hover:bg-white/5 hover:text-amber-400 transition-colors"><RotateCcw size={11}/>{KA.resetFilters}</button>}
            <button type="button" aria-label={KA.close} onClick={onClose} className="rounded-lg p-1.5 text-zinc-500 hover:bg-white/5 hover:text-zinc-300 transition-colors md:hidden"><X size={16}/></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          <SidebarSection title={KA.mapLayers} icon={<Map size={14}/>} defaultOpen={true}>
            <LayerToggleRow label={KA.routes}     active={filters.showRoutes} icon={<Navigation size={16}/>}   color="#f59e0b" onToggle={onToggleRoutes}/>
            <LayerToggleRow label={KA.roadAlerts} active={filters.showAlerts} icon={<TriangleAlert size={16}/>} color="#ef4444" onToggle={onToggleAlerts}/>
            <LayerToggleRow label={KA.bikerSpots} active={filters.showSpots}  icon={<Coffee size={16}/>}        color="#fb923c" onToggle={onToggleSpots}/>
          </SidebarSection>

          <SidebarSection title={KA.roadAlertsSection} icon={<TriangleAlert size={14}/>} defaultOpen={true} badge={filters.alertTypes.length}>
            {alertTypes.map(t=><FilterToggleChip key={t} label={ALERT_TYPE_META[t].label} active={filters.alertTypes.includes(t)} color={ALERT_TYPE_META[t].color} bgColor={ALERT_TYPE_META[t].bgColor} onClick={()=>onToggleAlertType(t)}/>)}
          </SidebarSection>

          <SidebarSection title={KA.difficulty} icon={<Mountain size={14}/>} defaultOpen={false} badge={filters.difficulties.length}>
            {difficulties.map(l=><FilterToggleChip key={l} label={DIFFICULTY_META[l].label} active={filters.difficulties.includes(l)} color={DIFFICULTY_META[l].color} bgColor={DIFFICULTY_META[l].bgColor} onClick={()=>onToggleDifficulty(l)}/>)}
          </SidebarSection>

          <SidebarSection title={KA.spotsServices} icon={<Coffee size={14}/>} defaultOpen={false} badge={filters.spotTypes.length}>
            {spotTypes.map(t=><FilterToggleChip key={t} label={SPOT_TYPE_META[t].label} active={filters.spotTypes.includes(t)} color={SPOT_TYPE_META[t].color} bgColor="rgba(255,255,255,0.05)" icon={SPOT_TYPE_META[t].icon} onClick={()=>onToggleSpotType(t)}/>)}
          </SidebarSection>

          <SidebarSection title={KA.featuredRoutes} icon={<Route size={14}/>} defaultOpen={true}>
            {routes.map(r=>(
              <button type="button" key={r.id} className="w-full flex items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/[0.04] group">
                <span className="mt-0.5 shrink-0 h-6 w-6 rounded-md flex items-center justify-center bg-amber-500/10" aria-hidden="true"><Navigation size={13} className="text-amber-400"/></span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-medium text-zinc-200 group-hover:text-zinc-100 truncate">{r.name}</span>
                  <span className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-zinc-600">{r.region}</span>
                    <span className="text-[11px] text-zinc-700" aria-hidden="true">\u00b7</span>
                    <span className="text-[11px] text-zinc-600">{r.km} {KA.kmSuffix}</span>
                  </span>
                </span>
                <span className="shrink-0 text-[10px] font-medium text-amber-500/70 pt-0.5">{r.diff}</span>
              </button>
            ))}
          </SidebarSection>
        </div>

        <div className="shrink-0 border-t border-[var(--color-surface-border)] px-4 py-3">
          <p className="text-[11px] text-zinc-600 leading-relaxed">{KA.sidebarFooter}{" "}<span className="text-zinc-500 font-medium">{KA.allNineRegions}</span>.{" "}{KA.communityVerified}</p>
        </div>
      </aside>
    </>
  );
}
'''

# ══════════════════════════════════════════════════════════════════════════════
#  MAP FEATURE
# ══════════════════════════════════════════════════════════════════════════════

FILES["src/features/map/hooks/useMapState.ts"] = '''\
"use client";
import { useState, useCallback, useRef } from "react";
import type { Map as LM } from "leaflet";
import type { Coordinate, MapViewState } from "@/lib/types";
import { GEORGIA_CENTER, GEORGIA_DEFAULT_ZOOM } from "@/lib/constants";

export function useMapState() {
  const mapRef = useRef<LM|null>(null);
  const [mapState, setMapState] = useState<MapViewState>({ center:GEORGIA_CENTER, zoom:GEORGIA_DEFAULT_ZOOM, bounds:null, isReady:false });
  const onMapReady = useCallback((map:LM)=>{ mapRef.current=map; setMapState(p=>({...p,isReady:true})); },[]);
  const flyTo = useCallback((center:Coordinate, zoom=GEORGIA_DEFAULT_ZOOM)=>{
    if(mapRef.current) mapRef.current.flyTo([center.lat,center.lng],zoom,{animate:true,duration:1.2});
    setMapState(p=>({...p,center,zoom}));
  },[]);
  const resetView = useCallback(()=>flyTo(GEORGIA_CENTER,GEORGIA_DEFAULT_ZOOM),[flyTo]);
  return { mapState, mapRef, onMapReady, flyTo, resetView };
}
'''

FILES["src/features/map/hooks/useMapBounds.ts"] = '''\
"use client";
import { useState, useCallback } from "react";
import type { LeafletEvent } from "leaflet";
import type { BoundingBox } from "@/lib/types";

export function useMapBounds() {
  const [bounds, setBounds] = useState<BoundingBox|null>(null);
  const onBoundsChange = useCallback((e:LeafletEvent)=>{
    type B={getNorth:()=>number;getSouth:()=>number;getEast:()=>number;getWest:()=>number;};
    const b=(e.target as {getBounds:()=>B}).getBounds();
    setBounds({north:b.getNorth(),south:b.getSouth(),east:b.getEast(),west:b.getWest()});
  },[]);
  return { bounds, onBoundsChange };
}
'''

FILES["src/features/map/hooks/useUserAlerts.ts"] = '''\
"use client";
import { useState, useCallback } from "react";
import type { RoadAlert } from "@/lib/types";

export function useUserAlerts() {
  const [userAlerts, setUserAlerts] = useState<RoadAlert[]>([]);
  const addUserAlert = useCallback((alert:RoadAlert)=>setUserAlerts(p=>[alert,...p]),[]);
  return { userAlerts, addUserAlert };
}
'''

FILES["src/features/map/components/MapSkeleton.tsx"] = '''\
import { SkeletonBlock } from "@/components/ui/SkeletonBlock";
import { KA } from "@/lib/i18n/ka";

export function MapSkeleton(): React.ReactElement {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{backgroundColor:"var(--color-surface-base)"}} aria-label={KA.mapInitialising} aria-busy="true">
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        {Array.from({length:8}).map((_,i)=>(
          <div key={`h-${i}`} className="absolute left-0 right-0 border-t border-zinc-800" style={{top:`${(i+1)*12.5}%`}}/>
        ))}
        {Array.from({length:8}).map((_,i)=>(
          <div key={`v-${i}`} className="absolute top-0 bottom-0 border-l border-zinc-800" style={{left:`${(i+1)*12.5}%`}}/>
        ))}
      </div>
      <div className="relative flex flex-col items-center gap-4 rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] px-10 py-8 shadow-2xl">
        <div className="flex gap-3"><SkeletonBlock className="h-3 w-24"/><SkeletonBlock className="h-3 w-16"/></div>
        <SkeletonBlock className="h-3 w-32"/>
        <div className="mt-2 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
          <svg className="h-6 w-6 animate-spin text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
          </svg>
        </div>
        <p className="text-sm font-medium text-zinc-400">{KA.mapInitialising}</p>
        <p className="text-xs text-zinc-600">{KA.mapLoadingNet}</p>
      </div>
    </div>
  );
}
'''

FILES["src/features/map/components/MapControls.tsx"] = '''\
"use client";
import { ZoomIn, ZoomOut, Compass } from "lucide-react";
import { useMap } from "react-leaflet";

export function MapControls({ onResetView }: { onResetView:()=>void }): React.ReactElement {
  const map = useMap();
  const btnCls = "flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-surface-card)] text-zinc-300 shadow-lg border border-[var(--color-surface-border)] hover:text-amber-400 hover:border-amber-500/30 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40";
  return (
    <div className="absolute bottom-6 right-4 z-[400] flex flex-col gap-1.5" style={{pointerEvents:"auto"}}>
      <button type="button" aria-label="Zoom in"  onClick={()=>map.zoomIn()}  className={btnCls}><ZoomIn  size={16}/></button>
      <button type="button" aria-label="Zoom out" onClick={()=>map.zoomOut()} className={btnCls}><ZoomOut size={16}/></button>
      <div className="h-px bg-[var(--color-surface-border)] mx-1" aria-hidden="true"/>
      <button type="button" aria-label="Reset view" onClick={onResetView} title="Reset to Georgia" className={btnCls}><Compass size={16}/></button>
    </div>
  );
}
'''

FILES["src/features/map/components/MapOverlayStats.tsx"] = '''\
"use client";
import { Navigation, TriangleAlert, Coffee } from "lucide-react";
import { KA } from "@/lib/i18n/ka";

export function MapOverlayStats({ routeCount, alertCount, spotCount }: { routeCount:number; alertCount:number; spotCount:number }): React.ReactElement {
  const items=[
    {icon:<Navigation size={12}/>,    count:routeCount, label:KA.statRoutes, color:"#f59e0b"},
    {icon:<TriangleAlert size={12}/>, count:alertCount, label:KA.statAlerts, color:"#ef4444"},
    {icon:<Coffee size={12}/>,        count:spotCount,  label:KA.statSpots,  color:"#fb923c"},
  ];
  return (
    <div className="absolute bottom-6 left-4 z-[400] flex items-center gap-1 rounded-full border border-[var(--color-surface-border)] bg-[var(--color-surface-card)]/90 px-3 py-1.5 backdrop-blur-sm shadow-lg"
      aria-live="polite" aria-label="Visible map entities">
      {items.map(({icon,count,label,color},i)=>(
        <span key={label} className="flex items-center gap-1.5">
          {i>0&&<span className="h-3 w-px bg-[var(--color-surface-border)]" aria-hidden="true"/>}
          <span style={{color}} aria-hidden="true">{icon}</span>
          <span className="text-[11px] font-semibold text-zinc-300">{count}</span>
          <span className="text-[11px] text-zinc-600 hidden sm:inline">{label}</span>
        </span>
      ))}
    </div>
  );
}
'''

FILES["src/features/map/components/AlertMarker.tsx"] = '''\
"use client";
import { Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import type { RoadAlert } from "@/lib/types";
import { ALERT_TYPE_META, ALERT_SEVERITY_META } from "@/lib/constants";
import { KA } from "@/lib/i18n/ka";
import { timeAgo } from "@/lib/utils";

function createAlertIcon(color:string, bgColor:string, severity:RoadAlert["severity"]): L.DivIcon {
  const svg = renderToStaticMarkup(
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="38" viewBox="0 0 32 38">
      <defs><filter id="ds" x="-40%" y="-30%" width="180%" height="180%"><feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="rgba(0,0,0,0.55)"/></filter></defs>
      <path d="M16 2C9.4 2 4 7.4 4 14c0 8.5 12 24 12 24s12-15.5 12-24C28 7.4 22.6 2 16 2z" fill={bgColor.replace("0.12","0.88")} stroke={color} strokeWidth="1.5" filter="url(#ds)"/>
      <circle cx="16" cy="14" r="5.5" fill={color} opacity="0.95"/>
    </svg>
  );
  return L.divIcon({ html:`<div ${severity==="high"?\'class="animate-pulse-glow"\':""} >${svg}</div>`, className:"", iconSize:[32,38], iconAnchor:[16,38], popupAnchor:[0,-40] });
}

export function AlertMarker({ alert }: { alert:RoadAlert }): React.ReactElement {
  const tm=ALERT_TYPE_META[alert.type], sm=ALERT_SEVERITY_META[alert.severity];
  const icon=createAlertIcon(tm.color,tm.bgColor,alert.severity);
  return (
    <>
      {alert.radius>0&&<Circle center={[alert.lat,alert.lng]} radius={alert.radius} pathOptions={{color:tm.color,fillColor:tm.color,fillOpacity:0.06,weight:1,dashArray:"5 5"}}/>}
      <Marker position={[alert.lat,alert.lng]} icon={icon}>
        <Popup>
          <article className="min-w-[210px] max-w-[270px]">
            <header className="flex items-center gap-2 mb-2.5">
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{backgroundColor:tm.bgColor.replace("0.12","0.22"),color:tm.color}} aria-hidden="true">\u25cf</span>
              <span className="text-[11px] font-semibold uppercase tracking-wider" style={{color:tm.color}}>{tm.label}</span>
              <span className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold" style={{backgroundColor:`${sm.color}20`,color:sm.color}}>{sm.label}</span>
            </header>
            <p className="text-xs leading-relaxed text-zinc-300 mb-3">{alert.description}</p>
            <footer className="flex items-center justify-between border-t border-zinc-700/50 pt-2">
              <span className="text-[11px] text-zinc-600">{timeAgo(alert.reportedAt)}</span>
              {alert.verified?<span className="text-[11px] font-medium text-green-400">{KA.verified}</span>:<span className="text-[11px] text-zinc-600">{KA.communityReport}</span>}
            </footer>
          </article>
        </Popup>
      </Marker>
    </>
  );
}
'''

FILES["src/features/map/components/RoutePolyline.tsx"] = '''\
"use client";
import { Polyline, Popup } from "react-leaflet";
import type { Route } from "@/lib/types";
import { DIFFICULTY_META, ASPHALT_QUALITY_META } from "@/lib/constants";
import { KA } from "@/lib/i18n/ka";
import { formatDistance, formatDuration } from "@/lib/utils";

export function RoutePolyline({ route }: { route:Route }): React.ReactElement {
  const dm=DIFFICULTY_META[route.difficulty], qm=ASPHALT_QUALITY_META[route.asphaltQuality];
  if(route.coordinates.length<2) return <></>;
  const positions=route.coordinates.map(c=>[c.lat,c.lng] as [number,number]);
  return (
    <Polyline positions={positions} pathOptions={{color:dm.color,weight:5,opacity:0.85,lineCap:"round",lineJoin:"round"}}>
      <Popup>
        <article className="min-w-[230px] max-w-[290px]">
          <header className="mb-2">
            <h3 className="text-sm font-bold leading-tight text-zinc-100">{route.name}</h3>
            <p className="text-[11px] mt-0.5" style={{color:qm.color}}>{qm.label} \u2014 {KA.surface}</p>
          </header>
          <p className="text-xs leading-relaxed text-zinc-400 mb-3 line-clamp-3">{route.description}</p>
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {[{label:KA.distance,value:formatDistance(route.distanceKm)},{label:KA.duration,value:formatDuration(route.durationMin)},{label:KA.climb,value:`${route.elevationGain} \u10db`}].map(({label,value})=>(
              <div key={label} className="flex flex-col items-center rounded-lg py-2 px-1" style={{backgroundColor:"var(--color-surface-raised)"}}>
                <span className="text-xs font-semibold text-zinc-200">{value}</span>
                <span className="text-[10px] text-zinc-600 mt-0.5">{label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{backgroundColor:dm.bgColor,color:dm.color}}>{dm.label}</span>
            <span className="text-[11px] text-zinc-600">{route.region}</span>
          </div>
        </article>
      </Popup>
    </Polyline>
  );
}
'''

FILES["src/features/map/components/SpotMarker.tsx"] = '''\
"use client";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import type { BikerSpot } from "@/lib/types";
import { SPOT_TYPE_META } from "@/lib/constants";
import { KA } from "@/lib/i18n/ka";

function createSpotIcon(emoji:string, color:string): L.DivIcon {
  const html=renderToStaticMarkup(<div style={{width:"36px",height:"36px",borderRadius:"50%",backgroundColor:"#1e2433",border:`2.5px solid ${color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",lineHeight:"1",boxShadow:`0 0 0 4px ${color}25,0 4px 14px rgba(0,0,0,0.55)`}}>{emoji}</div>);
  return L.divIcon({html,className:"",iconSize:[36,36],iconAnchor:[18,18],popupAnchor:[0,-22]});
}

const stars=(r:number)=>"\u2605".repeat(Math.round(r))+"\u2606".repeat(Math.max(0,5-Math.round(r)));

export function SpotMarker({ spot }: { spot:BikerSpot }): React.ReactElement {
  const meta=SPOT_TYPE_META[spot.type], icon=createSpotIcon(meta.icon,meta.color);
  return (
    <Marker position={[spot.lat,spot.lng]} icon={icon}>
      <Popup>
        <article className="min-w-[200px] max-w-[260px]">
          <header className="flex items-start gap-2.5 mb-2">
            <span className="text-2xl leading-none" aria-hidden="true">{meta.icon}</span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold leading-tight text-zinc-100 truncate">{spot.name}</h3>
              <p className="text-[11px] mt-0.5" style={{color:meta.color}}>{meta.label}</p>
            </div>
            {spot.verified&&<span className="ml-auto shrink-0 text-[10px] font-medium text-green-400 mt-0.5" title={KA.verified}>\u2713</span>}
          </header>
          {spot.rating!==undefined&&<div className="flex items-center gap-2 mb-2"><span className="text-xs tracking-widest" style={{color:meta.color}} aria-label={`${spot.rating} \u2014 5-\u10d3\u10d0\u10dc`}>{stars(spot.rating)}</span><span className="text-[11px] text-zinc-500">{spot.rating.toFixed(1)}</span></div>}
          {spot.address&&<p className="text-[11px] text-zinc-500 mb-1 truncate">{spot.address}</p>}
          {spot.phone&&<p className="text-[11px] text-zinc-500">{spot.phone}</p>}
        </article>
      </Popup>
    </Marker>
  );
}
'''

FILES["src/features/map/components/AddAlertDialog.tsx"] = '''\
"use client";
import { useState, useEffect, useRef, type FormEvent } from "react";
import { X, TriangleAlert, Camera, Construction, Flame, MapPin } from "lucide-react";
import type { AlertType, RoadAlert } from "@/lib/types";
import { ALERT_TYPE_META } from "@/lib/constants";
import { KA } from "@/lib/i18n/ka";
import { cn } from "@/lib/utils";

const TYPE_ICONS: Record<AlertType, React.ReactNode> = {
  gravel:<TriangleAlert size={16}/>, camera:<Camera size={16}/>, work:<Construction size={16}/>, danger:<Flame size={16}/>,
};
const TYPE_LABELS: Record<AlertType, string> = {
  gravel:KA.alertGravel, camera:KA.alertCamera, work:KA.alertWork, danger:KA.alertDanger,
};

function TypeChip({ alertType, selected, onSelect }: { alertType:AlertType; selected:boolean; onSelect:()=>void }): React.ReactElement {
  const meta=ALERT_TYPE_META[alertType];
  return (
    <button type="button" onClick={onSelect} aria-pressed={selected}
      className={cn("flex flex-col items-center gap-1.5 rounded-xl px-3 py-2.5","border text-xs font-medium transition-all duration-150","focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50",
        selected?"border-current shadow-sm":"border-[var(--color-surface-border)] text-zinc-500 hover:text-zinc-300 hover:border-zinc-600")}
      style={selected?{backgroundColor:meta.bgColor,color:meta.color,borderColor:`${meta.color}50`}:{}}>
      <span aria-hidden="true">{TYPE_ICONS[alertType]}</span>
      <span className="text-[10px] leading-tight text-center">{TYPE_LABELS[alertType]}</span>
    </button>
  );
}

export function AddAlertDialog({ lat, lng, onSubmit, onClose }: { lat:number; lng:number; onSubmit:(a:RoadAlert)=>void; onClose:()=>void }): React.ReactElement {
  const [selType, setSelType] = useState<AlertType>("gravel");
  const [desc,    setDesc]    = useState("");
  const backdropRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(()=>{ textareaRef.current?.focus(); },[]);
  useEffect(()=>{ const f=(e:KeyboardEvent)=>{ if(e.key==="Escape")onClose(); }; document.addEventListener("keydown",f); return()=>document.removeEventListener("keydown",f); },[onClose]);

  const handleSubmit=(e:FormEvent)=>{ e.preventDefault(); if(!desc.trim())return;
    onSubmit({ id:`user-${Date.now()}`, type:selType, lat, lng, description:desc.trim(), severity:"medium", radius:300, verified:false, reportedAt:new Date().toISOString(), expiresAt:null });
  };

  return (
    <div ref={backdropRef} className="fixed inset-0 z-[55] flex items-end justify-center sm:items-center p-4"
      style={{backgroundColor:"rgba(0,0,0,0.65)",backdropFilter:"blur(4px)"}}
      onPointerDown={e=>{if(e.target===backdropRef.current)onClose();}}
      role="dialog" aria-modal="true" aria-label={KA.addAlertTitle}>
      <div className={cn("w-full max-w-sm rounded-2xl overflow-hidden","bg-[var(--color-surface-card)] border border-[var(--color-surface-border)]","shadow-[0_24px_64px_rgba(0,0,0,0.7)] animate-fade-up")}>
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[var(--color-surface-border)]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{backgroundColor:"rgba(239,68,68,0.15)",color:"#ef4444"}} aria-hidden="true"><TriangleAlert size={16}/></div>
            <div>
              <h2 className="text-sm font-bold text-zinc-100">{KA.addAlertTitle}</h2>
              <div className="flex items-center gap-1 mt-0.5"><MapPin size={10} className="text-zinc-600" aria-hidden="true"/><span className="text-[10px] font-mono text-zinc-600">{lat.toFixed(4)}, {lng.toFixed(4)}</span></div>
            </div>
          </div>
          <button type="button" aria-label={KA.close} onClick={onClose} className="rounded-lg p-1.5 text-zinc-500 hover:bg-white/5 hover:text-zinc-300 transition-colors"><X size={16}/></button>
        </div>
        <form onSubmit={handleSubmit} className="px-5 py-4 flex flex-col gap-5">
          <div>
            <p className="text-xs font-semibold text-zinc-400 mb-2.5">{KA.addAlertTypeLabel}</p>
            <div className="grid grid-cols-4 gap-2">
              {(["gravel","camera","work","danger"] as AlertType[]).map(t=><TypeChip key={t} alertType={t} selected={selType===t} onSelect={()=>setSelType(t)}/>)}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="alert-desc" className="text-xs font-semibold text-zinc-400">{KA.addAlertDescLabel}</label>
            <textarea id="alert-desc" ref={textareaRef} value={desc} onChange={e=>setDesc(e.target.value)}
              placeholder={KA.addAlertDescPlaceholder} rows={3} required
              className={cn("w-full rounded-xl bg-zinc-800/70 border border-zinc-700","px-3 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 resize-none","focus:outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 transition-all duration-150")}/>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className={cn("flex-1 h-10 rounded-xl text-sm font-medium","bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200","border border-[var(--color-surface-border)] transition-colors duration-150")}>{KA.addAlertCancel}</button>
            <button type="submit" disabled={!desc.trim()} className={cn("flex-[2] h-10 rounded-xl text-sm font-semibold text-zinc-900","bg-gradient-to-r from-amber-500 to-orange-500","hover:from-amber-400 hover:to-orange-400","shadow-[0_0_12px_rgba(245,158,11,0.3)]","transition-all duration-150 active:scale-[0.98]","disabled:opacity-40 disabled:cursor-not-allowed")}>{KA.addAlertSubmit}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
'''

FILES["src/features/map/components/LeafletMap.tsx"] = '''\
"use client";
import { useEffect } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import type { Map as LM, LeafletEvent, LeafletMouseEvent } from "leaflet";
import type { FilterState, RoadAlert } from "@/lib/types";
import { GEORGIA_CENTER, GEORGIA_DEFAULT_ZOOM, GEORGIA_MIN_ZOOM, GEORGIA_MAX_ZOOM, MAP_TILE_URL, MAP_TILE_ATTR, MAP_TILE_SUBDOM } from "@/lib/constants";
import { MOCK_ALERTS, MOCK_ROUTES, MOCK_SPOTS } from "@/store/mockData";
import { AlertMarker } from "./AlertMarker"; import { RoutePolyline } from "./RoutePolyline";
import { SpotMarker }  from "./SpotMarker";  import { MapControls }  from "./MapControls";

function MapEventBridge({ onReady, onBoundsChange, onMapClick }: { onReady:(m:LM)=>void; onBoundsChange:(e:LeafletEvent)=>void; onMapClick:(lat:number,lng:number)=>void }): null {
  const map=useMap() as LM;
  useEffect(()=>{ onReady(map); },[map,onReady]);
  useMapEvents({ moveend:onBoundsChange, zoomend:onBoundsChange, click:(e:LeafletMouseEvent)=>onMapClick(e.latlng.lat,e.latlng.lng) });
  return null;
}

interface LeafletMapProps { filters:FilterState; userAlerts:RoadAlert[]; onMapReady:(m:LM)=>void; onBoundsChange:(e:LeafletEvent)=>void; onResetView:()=>void; onMapClick:(lat:number,lng:number)=>void; }

export function LeafletMap({ filters, userAlerts, onMapReady, onBoundsChange, onResetView, onMapClick }: LeafletMapProps): React.ReactElement {
  const vRoutes = filters.showRoutes ? MOCK_ROUTES.filter(r=>filters.difficulties.includes(r.difficulty)) : [];
  const vAlerts = filters.showAlerts ? MOCK_ALERTS.filter(a=>filters.alertTypes.includes(a.type))        : [];
  const vSpots  = filters.showSpots  ? MOCK_SPOTS.filter(s=>filters.spotTypes.includes(s.type))          : [];
  return (
    <MapContainer center={[GEORGIA_CENTER.lat,GEORGIA_CENTER.lng]} zoom={GEORGIA_DEFAULT_ZOOM} minZoom={GEORGIA_MIN_ZOOM} maxZoom={GEORGIA_MAX_ZOOM} zoomControl={false} scrollWheelZoom style={{height:"100%",width:"100%"}} className="z-0">
      <TileLayer url={MAP_TILE_URL} attribution={MAP_TILE_ATTR} subdomains={MAP_TILE_SUBDOM} maxZoom={GEORGIA_MAX_ZOOM}/>
      <MapEventBridge onReady={onMapReady} onBoundsChange={onBoundsChange} onMapClick={onMapClick}/>
      <MapControls onResetView={onResetView}/>
      {vRoutes.map(r=><RoutePolyline key={r.id} route={r}/>)}
      {[...vAlerts,...userAlerts].map(a=><AlertMarker key={a.id} alert={a}/>)}
      {vSpots.map(s=><SpotMarker key={s.id} spot={s}/>)}
    </MapContainer>
  );
}
'''

FILES["src/features/map/components/MapView.tsx"] = '''\
"use client";
import dynamic from "next/dynamic";
import { Suspense, useCallback, useState } from "react";
import type { Map as LM, LeafletEvent } from "leaflet";
import type { FilterState, RoadAlert } from "@/lib/types";
import { useAuth }        from "@/features/auth/context/AuthContext";
import { useUserAlerts }  from "@/features/map/hooks/useUserAlerts";
import { AddAlertDialog } from "./AddAlertDialog";
import { MapSkeleton }    from "./MapSkeleton";
import { MapOverlayStats }from "./MapOverlayStats";
import { KA }             from "@/lib/i18n/ka";
import { cn }             from "@/lib/utils";
import { MOCK_ALERTS, MOCK_ROUTES, MOCK_SPOTS } from "@/store/mockData";

const LeafletMap = dynamic(()=>import("./LeafletMap").then(m=>({default:m.LeafletMap})),{ssr:false,loading:()=><MapSkeleton/>});

function AuthPromptToast({ onLogin, onDismiss }: { onLogin:()=>void; onDismiss:()=>void }): React.ReactElement {
  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[450] animate-fade-up" role="status" aria-live="polite">
      <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] px-4 py-3 shadow-2xl">
        <p className="text-xs text-zinc-400">{KA.addAlertLoginRequired}</p>
        <button type="button" onClick={onLogin} className="shrink-0 rounded-lg bg-amber-500/20 px-3 py-1.5 text-xs font-semibold text-amber-400 hover:bg-amber-500/30 transition-colors">{KA.login}</button>
        <button type="button" onClick={onDismiss} aria-label={KA.close} className="shrink-0 text-zinc-600 hover:text-zinc-400 text-lg leading-none transition-colors">\u00d7</button>
      </div>
    </div>
  );
}

interface MapViewProps { filters:FilterState; onMapReady:(m:LM)=>void; onBoundsChange:(e:LeafletEvent)=>void; onResetView:()=>void; isMapReady:boolean; }

export function MapView({ filters, onMapReady, onBoundsChange, onResetView, isMapReady }: MapViewProps): React.ReactElement {
  const { isAuthenticated, openModal } = useAuth();
  const { userAlerts, addUserAlert }   = useUserAlerts();
  const [pendingCoords, setPending]    = useState<{lat:number;lng:number}|null>(null);
  const [showPrompt,    setShowPrompt] = useState(false);

  const handleMapClick = useCallback((lat:number,lng:number)=>{
    if(isAuthenticated){ setPending({lat,lng}); setShowPrompt(false); }
    else { setShowPrompt(true); }
  },[isAuthenticated]);

  const handleAlertSubmit = useCallback((alert:RoadAlert)=>{ addUserAlert(alert); setPending(null); },[addUserAlert]);

  const vRouteCount = filters.showRoutes ? MOCK_ROUTES.filter(r=>filters.difficulties.includes(r.difficulty)).length : 0;
  const vAlertCount = filters.showAlerts ? MOCK_ALERTS.filter(a=>filters.alertTypes.includes(a.type)).length+userAlerts.length : userAlerts.length;
  const vSpotCount  = filters.showSpots  ? MOCK_SPOTS.filter(s=>filters.spotTypes.includes(s.type)).length : 0;

  return (
    <main className="relative flex-1 overflow-hidden" aria-label={KA.mapAriaLabel}>
      <Suspense fallback={<MapSkeleton/>}>
        <LeafletMap filters={filters} userAlerts={userAlerts} onMapReady={onMapReady} onBoundsChange={onBoundsChange} onResetView={onResetView} onMapClick={handleMapClick}/>
      </Suspense>
      {isMapReady&&<MapOverlayStats routeCount={vRouteCount} alertCount={vAlertCount} spotCount={vSpotCount}/>}
      {pendingCoords&&<AddAlertDialog lat={pendingCoords.lat} lng={pendingCoords.lng} onSubmit={handleAlertSubmit} onClose={()=>setPending(null)}/>}
      {showPrompt&&<AuthPromptToast onLogin={()=>{setShowPrompt(false);openModal("login");}} onDismiss={()=>setShowPrompt(false)}/>}
    </main>
  );
}
'''

# ══════════════════════════════════════════════════════════════════════════════
#  SHARED UI COMPONENTS
# ══════════════════════════════════════════════════════════════════════════════

FILES["src/components/ui/Badge.tsx"] = '''\
import { cn } from "@/lib/utils";
interface BadgeProps { label:string; color?:string; bgColor?:string; className?:string; }
export function Badge({ label, color, bgColor, className }: BadgeProps): React.ReactElement {
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide",className)} style={{color:color??"var(--color-text-secondary)",backgroundColor:bgColor??"var(--color-surface-raised)",border:`1px solid ${color?`${color}40`:"var(--color-surface-border)"}`}}>{label}</span>;
}
'''

FILES["src/components/ui/SkeletonBlock.tsx"] = '''\
import { cn } from "@/lib/utils";
interface SkeletonBlockProps { className?:string; rounded?:"sm"|"md"|"lg"|"full"; }
const r={sm:"rounded",md:"rounded-md",lg:"rounded-xl",full:"rounded-full"};
export function SkeletonBlock({ className, rounded="md" }: SkeletonBlockProps): React.ReactElement {
  return <div className={cn("animate-shimmer",r[rounded],className)} aria-hidden="true"/>;
}
'''

FILES["src/components/ui/IconButton.tsx"] = '''\
import type { ButtonHTMLAttributes, ReactElement } from "react";
import { cn } from "@/lib/utils";
interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { icon:ReactElement; label:string; active?:boolean; badge?:number; size?:"sm"|"md"|"lg"; }
const sizes={sm:"h-8 w-8 text-sm",md:"h-9 w-9 text-base",lg:"h-11 w-11 text-lg"};
export function IconButton({ icon, label, active=false, badge, size="md", className, ...rest }: IconButtonProps): ReactElement {
  return (
    <button type="button" aria-label={label} title={label}
      className={cn("relative inline-flex items-center justify-center rounded-lg transition-all duration-150","focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60",sizes[size],active?"bg-amber-500/20 text-amber-400 shadow-[inset_0_0_0_1px_rgba(245,158,11,0.3)]":"text-zinc-400 hover:bg-white/5 hover:text-zinc-200",className)} {...rest}>
      {icon}
      {badge!==undefined&&badge>0&&<span aria-label={`${badge} active`} className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-zinc-900">{badge>9?"9+":badge}</span>}
    </button>
  );
}
'''

FILES["src/components/ui/ErrorBoundary.tsx"] = '''\
"use client";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { KA } from "@/lib/i18n/ka";
interface Props  { children:ReactNode; fallback?:ReactNode; context?:string; }
interface State  { hasError:boolean; errorMessage:string; }
export class ErrorBoundary extends Component<Props,State> {
  constructor(props:Props) { super(props); this.state={hasError:false,errorMessage:""}; }
  static getDerivedStateFromError(e:Error):State { return {hasError:true,errorMessage:e.message}; }
  override componentDidCatch(e:Error,i:ErrorInfo):void { console.error(`[ErrorBoundary] ${this.props.context??"unknown"}:`,e,i); }
  private handleReset=():void=>this.setState({hasError:false,errorMessage:""});
  override render():ReactNode {
    if(!this.state.hasError) return this.props.children;
    if(this.props.fallback)  return this.props.fallback;
    return (
      <div role="alert" className="flex h-full w-full flex-col items-center justify-center gap-4 p-8" style={{backgroundColor:"var(--color-surface-base)"}}>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{backgroundColor:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.2)"}}>
          <AlertTriangle size={24} className="text-red-400"/>
        </div>
        <div className="text-center">
          <h2 className="text-base font-semibold text-zinc-200">{KA.errorTitle}</h2>
          <p className="mt-1 text-sm text-zinc-500">{this.props.context==="map"?KA.errorMapFailed:KA.errorGeneric}</p>
          {this.state.errorMessage&&<p className="mt-2 rounded-lg bg-red-900/20 px-3 py-1.5 font-mono text-xs text-red-400">{this.state.errorMessage}</p>}
        </div>
        <button type="button" onClick={this.handleReset} className="flex items-center gap-2 rounded-xl bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 transition-colors">
          <RefreshCw size={14}/>{KA.errorRetry}
        </button>
      </div>
    );
  }
}
'''

# ══════════════════════════════════════════════════════════════════════════════
#  LAYOUT COMPONENTS
# ══════════════════════════════════════════════════════════════════════════════

FILES["src/components/layout/TopBar.tsx"] = '''\
"use client";
import { Search, Bell, Layers, Map, ChevronDown, Wifi, WifiOff, LogIn, UserCircle, LogOut, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { IconButton } from "@/components/ui/IconButton";
import { KA } from "@/lib/i18n/ka";
import { cn } from "@/lib/utils";

interface TopBarProps { searchQuery:string; onSearchChange:(v:string)=>void; activeAlertCount:number; onSidebarToggle?:()=>void; sidebarOpen:boolean; }

export function TopBar({ searchQuery, onSearchChange, activeAlertCount, onSidebarToggle, sidebarOpen }: TopBarProps): React.ReactElement {
  const { user, isAuthenticated, openModal, logout } = useAuth();
  const [sFoc, setSFoc]   = useState(false);
  const [notif,setNotif]  = useState(false);
  const [prof, setProf]   = useState(false);
  const [online,setOnline]= useState(true);
  const notifRef=useRef<HTMLDivElement>(null), profRef=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const on=()=>setOnline(true), off=()=>setOnline(false);
    window.addEventListener("online",on); window.addEventListener("offline",off);
    return()=>{ window.removeEventListener("online",on); window.removeEventListener("offline",off); };
  },[]);

  useEffect(()=>{
    const h=(e:PointerEvent)=>{
      if(notifRef.current&&!notifRef.current.contains(e.target as Node)) setNotif(false);
      if(profRef.current&&!profRef.current.contains(e.target as Node))  setProf(false);
    };
    document.addEventListener("pointerdown",h);
    return()=>document.removeEventListener("pointerdown",h);
  },[]);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 h-14 flex items-center gap-3 px-4 md:px-6","backdrop-blur-xl backdrop-saturate-150 bg-[var(--glass-bg)] border-b border-[var(--glass-border)]","shadow-[0_1px_0_0_rgba(255,255,255,0.04)]")}>

      <button type="button" onClick={onSidebarToggle} className="flex shrink-0 items-center gap-2.5 group" aria-label={KA.toggleSidebar}>
        <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500","shadow-[0_0_16px_rgba(245,158,11,0.4)] group-hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] transition-shadow duration-200")} aria-hidden="true">
          <Map size={16} className="text-zinc-900" strokeWidth={2.5}/>
        </span>
        <span className="hidden sm:flex flex-col leading-none">
          <span className="text-sm font-bold tracking-tight text-zinc-100">GeoMoto<span className="text-amber-400">Routes</span></span>
          <span className="text-[10px] font-medium tracking-widest text-zinc-500 uppercase">{KA.appSubtitle}</span>
        </span>
        <ChevronDown size={14} className={cn("hidden md:block text-zinc-500 transition-transform duration-200",sidebarOpen?"rotate-0":"-rotate-90")}/>
      </button>

      <div className={cn("relative flex flex-1 max-w-sm items-center rounded-xl border transition-all duration-200",sFoc?"border-amber-500/50 shadow-[0_0_0_3px_rgba(245,158,11,0.12)]":"border-[var(--glass-border)] hover:border-zinc-600/60")}>
        <Search size={15} className={cn("absolute left-3 shrink-0 transition-colors duration-150",sFoc?"text-amber-400":"text-zinc-500")}/>
        <input type="search" placeholder={KA.searchPlaceholder} value={searchQuery} onChange={e=>onSearchChange(e.target.value)}
          onFocus={()=>setSFoc(true)} onBlur={()=>setSFoc(false)}
          className="h-9 w-full rounded-xl pl-9 pr-4 bg-white/[0.04] text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none"/>
        {searchQuery&&<button type="button" aria-label={KA.clearSearch} onClick={()=>onSearchChange("")} className="absolute right-3 text-zinc-500 hover:text-zinc-300 transition-colors">\u00d7</button>}
      </div>

      <div className="ml-auto flex items-center gap-1">
        <div className="hidden sm:flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
          style={{backgroundColor:online?"rgba(34,197,94,0.1)":"rgba(239,68,68,0.1)",color:online?"#22c55e":"#ef4444",border:`1px solid ${online?"rgba(34,197,94,0.25)":"rgba(239,68,68,0.25)"}`}} title={online?KA.online:KA.offline}>
          {online?<Wifi size={11} strokeWidth={2.5}/>:<WifiOff size={11} strokeWidth={2.5}/>}
          <span className="hidden lg:inline">{online?KA.online:KA.offline}</span>
        </div>

        <IconButton icon={<Layers size={16}/>} label={KA.mapLayersLabel} size="md" className="ml-1"/>

        <div ref={notifRef} className="relative">
          <IconButton icon={<Bell size={16}/>} label={KA.activeAlerts} badge={activeAlertCount} active={notif} size="md" onClick={()=>setNotif(v=>!v)}/>
          {notif&&(
            <div className={cn("absolute right-0 top-full mt-2 w-72 z-50 animate-fade-up","rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)]","shadow-[0_16px_48px_rgba(0,0,0,0.6)] overflow-hidden")}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-surface-border)]"><span className="text-sm font-semibold text-zinc-200">{KA.activeAlerts}</span><span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-400">{activeAlertCount}</span></div>
              <ul className="max-h-64 overflow-y-auto divide-y divide-[var(--color-surface-border)]">
                {activeAlertCount===0?<li className="px-4 py-6 text-center text-sm text-zinc-500">{KA.noAlerts}</li>:<li className="px-4 py-3"><p className="text-xs font-medium text-amber-400">\u10ee\u10e0\u10d4\u10e8\u10d8 \u2014 \u10ef\u10d5\u10e0\u10d8\u10e1 \u10e3\u10e6\u10d4\u10da\u10e2\u10d4\u10ee\u10d8\u10da\u10d8</p><p className="mt-0.5 text-xs text-zinc-400">\u10e1\u10d8\u10e9\u10e5\u10d0\u10e0\u10d4 \u10e8\u10d4\u10d0\u10db\u10ea\u10d8\u10e0\u10d4\u10d7 35 \u10d9\u10db/\u10e1\u10d7-\u10db\u10d3\u10d4</p></li>}
              </ul>
            </div>
          )}
        </div>

        {isAuthenticated&&user?(
          <div ref={profRef} className="relative ml-1">
            <button type="button" onClick={()=>setProf(v=>!v)} aria-label={KA.myProfile}
              className={cn("flex items-center gap-2 rounded-xl h-9 pl-2 pr-3 border transition-all duration-150",prof?"bg-amber-500/15 border-amber-500/30 text-amber-400":"border-[var(--color-surface-border)] text-zinc-300 hover:bg-white/[0.04] hover:text-zinc-100")}>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-zinc-900" style={{background:"linear-gradient(135deg,#f59e0b,#fb923c)"}} aria-hidden="true">{user.name.charAt(0).toUpperCase()}</span>
              <span className="hidden md:block text-xs font-medium max-w-[80px] truncate">{user.name}</span>
              <ChevronRight size={12} className={cn("text-zinc-600 transition-transform duration-150",prof?"rotate-90":"rotate-0")}/>
            </button>
            {prof&&(
              <div className={cn("absolute right-0 top-full mt-2 w-52 z-50 animate-fade-up","rounded-2xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)]","shadow-[0_16px_48px_rgba(0,0,0,0.6)] overflow-hidden")}>
                <div className="px-4 py-3 border-b border-[var(--color-surface-border)]">
                  <p className="text-sm font-semibold text-zinc-100 truncate">{user.name}</p>
                  <p className="text-[11px] text-zinc-500 truncate mt-0.5">{user.email}</p>
                  {user.motorcycleModel&&<p className="text-[11px] text-amber-500/80 mt-0.5 truncate">\U0001f3cd {user.motorcycleModel}</p>}
                </div>
                <button type="button" onClick={()=>{logout();setProf(false);}} className="flex w-full items-center gap-2.5 px-4 py-3 text-sm text-zinc-400 hover:bg-white/[0.04] hover:text-red-400 transition-colors">
                  <LogOut size={15}/>{KA.logout}
                </button>
              </div>
            )}
          </div>
        ):(
          <>
            <button type="button" onClick={()=>openModal("login")}
              className={cn("ml-1 hidden sm:flex items-center gap-1.5 rounded-xl h-9 px-3","bg-amber-500/15 border border-amber-500/25 text-amber-400","hover:bg-amber-500/25 hover:border-amber-500/40","text-xs font-semibold transition-all duration-150","focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50")}>
              <LogIn size={14} strokeWidth={2.5}/>{KA.login}
            </button>
            <IconButton icon={<UserCircle size={18}/>} label={KA.login} size="md" className="sm:hidden" onClick={()=>openModal("login")}/>
          </>
        )}
      </div>
    </header>
  );
}
'''

FILES["src/components/layout/DashboardLayout.tsx"] = '''\
"use client";
import { useState, useCallback } from "react";
import { SlidersHorizontal } from "lucide-react";
import { AuthProvider }     from "@/features/auth/context/AuthContext";
import { AuthModal }        from "@/features/auth/components/AuthModal";
import { TopBar }           from "./TopBar";
import { Sidebar }          from "@/features/filters/components/Sidebar";
import { MapView }          from "@/features/map/components/MapView";
import { useRouteFilters }  from "@/features/filters/hooks/useRouteFilters";
import { useMapState }      from "@/features/map/hooks/useMapState";
import { useMapBounds }     from "@/features/map/hooks/useMapBounds";
import { IconButton }       from "@/components/ui/IconButton";
import { ErrorBoundary }    from "@/components/ui/ErrorBoundary";
import { KA }               from "@/lib/i18n/ka";
import { cn }               from "@/lib/utils";
import { MOCK_ALERTS }      from "@/store/mockData";

function DashboardInner(): React.ReactElement {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { filters, toggleAlertType, toggleDifficulty, toggleSpotType, toggleShowRoutes, toggleShowAlerts, toggleShowSpots, setSearchQuery, resetFilters, activeFilterCount } = useRouteFilters();
  const { mapState, onMapReady, resetView } = useMapState();
  const { onBoundsChange } = useMapBounds();
  const toggleSidebar = useCallback(()=>setSidebarOpen(v=>!v),[]);
  const closeSidebar  = useCallback(()=>setSidebarOpen(false),[]);
  const activeAlertCount = filters.showAlerts ? MOCK_ALERTS.filter(a=>filters.alertTypes.includes(a.type)).length : 0;

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-[var(--color-surface-base)]">
      <TopBar searchQuery={filters.searchQuery} onSearchChange={setSearchQuery} activeAlertCount={activeAlertCount} onSidebarToggle={toggleSidebar} sidebarOpen={sidebarOpen}/>

      <div className="relative flex flex-1 overflow-hidden pt-14">
        <Sidebar isOpen={sidebarOpen} filters={filters} activeFilterCount={activeFilterCount} onClose={closeSidebar}
          onToggleAlertType={toggleAlertType} onToggleDifficulty={toggleDifficulty} onToggleSpotType={toggleSpotType}
          onToggleRoutes={toggleShowRoutes} onToggleAlerts={toggleShowAlerts} onToggleSpots={toggleShowSpots} onResetFilters={resetFilters}/>

        <div className={cn("flex-1 transition-[margin] duration-300 ease-in-out",sidebarOpen?"md:ml-80":"ml-0")}>
          <ErrorBoundary context="map">
            <MapView filters={filters} onMapReady={onMapReady} onBoundsChange={onBoundsChange} onResetView={resetView} isMapReady={mapState.isReady}/>
          </ErrorBoundary>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[450] md:hidden">
          <button type="button" onClick={toggleSidebar}
            className={cn("flex items-center gap-2 rounded-full px-5 py-2.5","bg-amber-500 text-zinc-900 font-semibold text-sm shadow-xl","hover:bg-amber-400 active:scale-95 transition-all duration-150","shadow-[0_0_24px_rgba(245,158,11,0.45)]","focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60")}>
            <SlidersHorizontal size={16} strokeWidth={2.5}/>{KA.filters}
            {activeFilterCount>0&&<span className="rounded-full bg-zinc-900/40 px-1.5 py-0.5 text-[10px] font-bold">{activeFilterCount}</span>}
          </button>
        </div>

        {!sidebarOpen&&(
          <div className="absolute left-3 top-3 z-[450] hidden md:block animate-fade-up">
            <IconButton icon={<SlidersHorizontal size={16}/>} label={KA.openFilters} badge={activeFilterCount} active={false} onClick={toggleSidebar} className="bg-[var(--color-surface-card)] border border-[var(--color-surface-border)] shadow-lg"/>
          </div>
        )}
      </div>
      <AuthModal/>
    </div>
  );
}

export function DashboardLayout(): React.ReactElement {
  return <AuthProvider><DashboardInner/></AuthProvider>;
}
'''

# ══════════════════════════════════════════════════════════════════════════════
#  WRITER
# ══════════════════════════════════════════════════════════════════════════════

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

    width = 62
    print()
    print("=" * width)
    print("  GeoMotoRoutes \u2014 project scaffold complete (Phases 1\u20133)")
    print("=" * width)
    print(f"\n  Root      : {os.path.abspath(ROOT)}")
    print(f"  Dirs      : {len(created_dirs)} created")
    print(f"  Files     : {len(created_files)} written")
    if skipped_files:
        print(f"  Skipped   : {len(skipped_files)} (already exist)")
        for f in skipped_files:
            print(f"    \u2013 {f}")

    print(textwrap.dedent(f"""
  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  Next steps:

    cd {ROOT}
    npm install
    npm run dev

  Then open  http://localhost:3000
  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
"""))


if __name__ == "__main__":
    write_files()
