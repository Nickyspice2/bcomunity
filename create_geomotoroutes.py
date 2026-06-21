#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
GeoMotoRoutes \u2014 Full Project Generator (Phases 1\u20136)
=====================================================
Scaffolds the complete GeoMotoRoutes text-based social network for
Georgian bikers. NO map library dependencies.

Architecture: 4 routes
  /             \u2014 Community Hub  (Clubs + BikerFeed + Group Rides)
  /marketplace  \u2014 Moto-Marketplace  (bikes / gear / parts)
  /hub          \u2014 Moto-Hub  (service directory + city chats)
  /profile      \u2014 Digital Garage  (auth-gated)

Requirements: Python 3.8+  (no external packages)

Usage
-----
  # Run from the repo root (same folder as this script)
  python create_geomotoroutes.py                 # \u2192 ./geomotoroutes/
  python create_geomotoroutes.py my-folder       # \u2192 ./my-folder/

After scaffold
--------------
  cd geomotoroutes
  npm install
  npm run dev
  # \u2192 http://localhost:3000
"""

import os
import sys
import textwrap

ROOT       = sys.argv[1] if len(sys.argv) > 1 else "geomotoroutes"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

# ─── File registry ────────────────────────────────────────────────────────────
# String  entries  : read content from SCRIPT_DIR/<path>
# 2-tuple entries  : (dest_path, literal_string_content)

ENTRIES: list[str | tuple[str, str]] = [

    # ── Config files (inlined \u2014 no unicode complications) ─────────────────────

    ("package.json", """\
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
    "lucide-react": "^0.468.0",
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
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
"""),

    ("tsconfig.json", """\
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
"""),

    ("next.config.ts",
     'import type { NextConfig } from "next";\nconst nextConfig: NextConfig = {};\nexport default nextConfig;\n'),

    ("postcss.config.mjs",
     'const config = { plugins: { "@tailwindcss/postcss": {} } };\nexport default config;\n'),

    (".gitignore", """\
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
.env*
.vercel
*.tsbuildinfo
next-env.d.ts
"""),

    ("eslint.config.mjs", """\
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
const eslintConfig = defineConfig([
  ...nextVitals, ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
export default eslintConfig;
"""),

    # ── All src/ files \u2014 read from disk ──────────────────────────────────────

    # App
    "src/app/globals.css",
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "src/app/hub/page.tsx",
    "src/app/marketplace/page.tsx",
    "src/app/profile/page.tsx",

    # Lib
    "src/lib/types/index.ts",
    "src/lib/i18n/ka.ts",
    "src/lib/utils/index.ts",

    # Store
    "src/store/mockData.ts",

    # Auth feature
    "src/features/auth/types.ts",
    "src/features/auth/context/AuthContext.tsx",
    "src/features/auth/components/AuthModal.tsx",

    # Social feature
    "src/features/social/components/PostCard.tsx",
    "src/features/social/components/BikerFeed.tsx",
    "src/features/social/components/GroupRideCard.tsx",
    "src/features/social/components/ClubCard.tsx",

    # Marketplace feature
    "src/features/marketplace/components/ListingCard.tsx",
    "src/features/marketplace/components/MarketplaceContent.tsx",

    # Hub feature (NEW in Phase 6)
    "src/features/hub/components/MechanicCard.tsx",
    "src/features/hub/components/CityChatRoom.tsx",
    "src/features/hub/components/HubContent.tsx",

    # Profile feature
    "src/features/profile/components/DigitalGarage.tsx",

    # Layout components
    "src/components/layout/TopBar.tsx",
    "src/components/layout/Providers.tsx",
    "src/components/layout/DashboardLayout.tsx",

    # UI primitives
    "src/components/ui/Badge.tsx",
    "src/components/ui/SkeletonBlock.tsx",
    "src/components/ui/IconButton.tsx",
    "src/components/ui/ErrorBoundary.tsx",
]

# ─── Writer ───────────────────────────────────────────────────────────────────

def resolve(entry: str | tuple[str, str]) -> tuple[str, str]:
    if isinstance(entry, tuple):
        return entry
    src_abs = os.path.join(SCRIPT_DIR, entry)
    try:
        with open(src_abs, "r", encoding="utf-8") as fh:
            return (entry, fh.read())
    except FileNotFoundError:
        return (entry, f"// Source not found: {entry}\n")


def write_files() -> None:
    created_dirs:  list[str] = []
    created_files: list[str] = []
    skipped_files: list[str] = []
    missing:       list[str] = []

    for entry in ENTRIES:
        rel_path, content = resolve(entry)

        if "Source not found" in content:
            missing.append(rel_path)

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

    width = 68
    print()
    print("=" * width)
    print("  GeoMotoRoutes \u2014 project scaffold complete (Phases 1\u20136)")
    print("=" * width)
    print(f"\n  Root      : {os.path.abspath(ROOT)}")
    print(f"  Dirs      : {len(created_dirs)} created")
    print(f"  Files     : {len(created_files)} written")

    if skipped_files:
        print(f"  Skipped   : {len(skipped_files)} (already exist)")
        for f in skipped_files[:6]:
            print(f"    \u2013 {f}")
        if len(skipped_files) > 6:
            print(f"    \u2026 and {len(skipped_files) - 6} more")

    if missing:
        print(f"\n  \u26a0  {len(missing)} source file(s) not found:")
        for f in missing:
            print(f"    \u2013 {f}")
        print("  Run this script from the repo root directory.")

    print(textwrap.dedent(f"""
  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  Routes (NO map library \u2014 pure text/community):
    /             \u2014 Community Hub  (Clubs + BikerFeed + Group Rides)
    /marketplace  \u2014 Moto-Marketplace  (bikes / gear / parts)
    /hub          \u2014 Moto-Hub  (service directory + city live chats)
    /profile      \u2014 Digital Garage  (auth-gated)

  Next steps:
    cd {ROOT}
    npm install
    npm run dev
    \u2192 http://localhost:3000
  \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
"""))


if __name__ == "__main__":
    write_files()
