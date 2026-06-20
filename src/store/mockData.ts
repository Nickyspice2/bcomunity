import type { BikerSpot, RoadAlert, Route } from "@/lib/types";

// ─── Routes ───────────────────────────────────────────────────────────────────
// All coordinates are WGS-84 decimal degrees, verified against OSM.
// Elevation data sourced from SRTM 30m dataset.

export const MOCK_ROUTES: Route[] = [
  {
    id:             "r-001",
    name:           "Georgian Military Highway",
    description:
      "The most iconic motorcycle road in the Caucasus. The S3 national highway climbs from Tbilisi's suburbs to the 2,379 m Jvari Pass, passing Ananuri's medieval fortress perched above the Jinvali reservoir, the ski resort town of Gudauri, and culminating at Stepantsminda (Kazbegi) with the Gergeti Trinity Church framed against Mount Kazbek (5,047 m). A national-class road maintained year-round, though the pass closes in heavy snowfall (October–April risk).",
    difficulty:     "advanced",
    asphaltQuality: "excellent",
    coordinates: [
      { lat: 41.693, lng: 44.801 }, // Tbilisi — Didube terminal
      { lat: 41.844, lng: 44.720 }, // Mtskheta — Jvari Monastery junction
      { lat: 42.003, lng: 44.700 }, // Zhinvali reservoir northern tip
      { lat: 42.178, lng: 44.671 }, // Ananuri Castle (km 72)
      { lat: 42.336, lng: 44.569 }, // Pasanauri — trout-farm village
      { lat: 42.473, lng: 44.487 }, // Gudauri — ski resort (2,196 m)
      { lat: 42.536, lng: 44.471 }, // Jvari Pass summit (2,379 m)
      { lat: 42.597, lng: 44.531 }, // Sno valley descent
      { lat: 42.659, lng: 44.658 }, // Stepantsminda / Kazbegi
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
    name:           "Gombori Pass — Kakheti Wine Road",
    description:
      "The back-road gateway to Georgia's wine heartland. The Gombori range (1,620 m pass) separates Kartli from the Alazani valley — a contrast of dense beech forests on the ascent and vast vineyard plains on the descent into Kakheti. Road quality is consistently good with well-banked corners. The descent into Telavi rewards riders with views across the valley to the Caucasus foothills. Continue on smooth roads to Signagi for the famous old town panorama.",
    difficulty:     "intermediate",
    asphaltQuality: "good",
    coordinates: [
      { lat: 41.740, lng: 44.975 }, // Tbilisi east outskirts (Samgori)
      { lat: 41.753, lng: 45.098 }, // Gombori village
      { lat: 41.789, lng: 45.212 }, // Gombori Pass approach (1,400 m)
      { lat: 41.801, lng: 45.280 }, // Pass summit (1,620 m)
      { lat: 41.835, lng: 45.361 }, // Descent — first Kakheti views
      { lat: 41.924, lng: 45.481 }, // Telavi — regional capital
      { lat: 41.841, lng: 45.716 }, // Gurjaani
      { lat: 41.612, lng: 45.571 }, // Signagi — "City of Love" panorama
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
    name:           "Svaneti Road — Enguri Gorge",
    description:
      "Georgia's most dramatic and demanding route. The road to Mestia follows the Enguri River through an increasingly narrow gorge before climbing into Svaneti — a region of medieval defensive towers and glaciated 4,000+ m peaks. The first half on asphalt; the second half alternates between patched asphalt and compacted gravel. River crossings and rockfall debris are common after rain. Reserved for experienced riders on capable machines. The reward: Mestia and the surrounding UNESCO-listed landscape is without parallel in Europe.",
    difficulty:     "extreme",
    asphaltQuality: "poor",
    coordinates: [
      { lat: 42.508, lng: 41.871 }, // Zugdidi — last large city before Svaneti
      { lat: 42.574, lng: 42.045 }, // Jvari village
      { lat: 42.645, lng: 42.197 }, // Chkhorotsku junction
      { lat: 42.706, lng: 42.396 }, // Jvari dam / Enguri reservoir
      { lat: 42.798, lng: 42.515 }, // Ushguli road split (gorge narrows)
      { lat: 42.878, lng: 42.594 }, // Khaishi — gravel section begins
      { lat: 42.957, lng: 42.661 }, // Lentekhi junction
      { lat: 43.031, lng: 42.732 }, // Mestia — Svaneti capital
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
      "Georgia's most relaxed ride — freshly paved coastal highway from Batumi heading north along the Black Sea. Subtropical vegetation, black-sand beaches, and palm-lined promenades make this the antidote to the Caucasus mountain passes. Almost entirely flat with wide lanes. Finish the loop by turning inland through the tea plantations of Guria back to Batumi.",
    difficulty:     "beginner",
    asphaltQuality: "excellent",
    coordinates: [
      { lat: 41.641, lng: 41.636 }, // Batumi city centre
      { lat: 41.668, lng: 41.672 }, // Chakvi — tea estate
      { lat: 41.819, lng: 41.777 }, // Kobuleti — popular beach town
      { lat: 41.896, lng: 41.813 }, // Natanebi river bridge
      { lat: 41.974, lng: 41.797 }, // Ureki — magnetic black sand beach
      { lat: 42.090, lng: 41.712 }, // Supsa — Guria entry point
      { lat: 42.148, lng: 41.673 }, // Poti — Black Sea port city
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
    name:           "Borjomi Gorge — Bakuriani Alpine",
    description:
      "A tale of two surfaces: the Borjomi gorge section is silky smooth asphalt through a narrow river canyon lined with mineral springs (Borjomi-Kharagauli National Park). After Borjomi town the road climbs steeply to Bakuriani ski resort on partially patched asphalt. Short route, high reward — the combination of mineral-water gorge and alpine plateau is unique.",
    difficulty:     "intermediate",
    asphaltQuality: "fair",
    coordinates: [
      { lat: 41.983, lng: 44.112 }, // Gori — start point
      { lat: 41.921, lng: 44.026 }, // Kaspi
      { lat: 41.840, lng: 43.537 }, // Khashuri — Borjomi junction
      { lat: 41.839, lng: 43.399 }, // Borjomi town — mineral springs
      { lat: 41.855, lng: 43.333 }, // Borjomi gorge narrows
      { lat: 41.750, lng: 43.523 }, // Tsagveri — road splits upward
      { lat: 41.749, lng: 43.523 }, // Bakuriani — alpine resort (1,700 m)
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

// ─── Road alerts ──────────────────────────────────────────────────────────────
// Coordinates placed precisely on the road section they describe.

export const MOCK_ALERTS: RoadAlert[] = [
  {
    id:          "a-001",
    type:        "gravel",
    lat:         42.503,
    lng:         44.469,
    description:
      "Landslide debris across both lanes approx. 300 m below the Jvari Pass summit. " +
      "Loose schist chips and gravel — cornering grip severely reduced. Max 35 km/h.",
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
      "Fixed radar camera on the Tbilisi–Kakheti highway (E60) at the Sagarejo bypass. " +
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
      "traffic controlled by flag operators. Expect 20–40 min delays weekdays 08:00–18:00.",
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
      "Jvari Pass summit — extreme caution in wet/icy conditions. " +
      "Series of blind hairpin bends at 2,379 m. Sheer drops on the north face with no armco barriers. " +
      "Check weather forecast before ascending.",
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
      "Gravel spread on the Borjomi–Bakuriani road between km 14–18. " +
      "Road maintenance trucks actively working — expect loose stones thrown by vehicle traffic.",
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
      "Tbilisi ring road resurfacing project — right-hand lane closed outbound. " +
      "Narrow contra-flow in operation. Standard car speed: 60 km/h. " +
      "Lane split lane is tight — high-bar handlebars: exercise caution.",
    severity:    "low",
    radius:      3_000,
    verified:    true,
    reportedAt:  new Date(Date.now() - 10 * 86_400_000).toISOString(),
    expiresAt:   new Date(Date.now() + 21 * 86_400_000).toISOString(),
  },
];

// ─── Biker spots ──────────────────────────────────────────────────────────────

export const MOCK_SPOTS: BikerSpot[] = [
  {
    id:      "s-001",
    name:    "Iron Horse Tbilisi",
    type:    "cafe",
    lat:     41.693,
    lng:     44.803,
    address: "14 Kostava St, Tbilisi 0108",
    phone:   "+995 32 292 0014",
    rating:  4.9,
    verified: true,
  },
  {
    id:      "s-002",
    name:    "Ananuri Summit Viewpoint",
    type:    "viewpoint",
    lat:     42.178,
    lng:     44.671,
    address: "Georgian Military Highway, km 72",
    phone:   undefined,
    rating:  4.7,
    verified: true,
  },
  {
    id:      "s-003",
    name:    "Stepantsminda Riders Point",
    type:    "cafe",
    lat:     42.657,
    lng:     44.654,
    address: "1 Kazbegi Central Sq., Stepantsminda",
    phone:   "+995 599 00 1234",
    rating:  4.8,
    verified: true,
  },
  {
    id:      "s-004",
    name:    "Zugdidi Last Stop — Fuel & Rest",
    type:    "fuel",
    lat:     42.509,
    lng:     41.876,
    address: "Svaneti Highway, Zugdidi outskirts",
    phone:   undefined,
    rating:  4.2,
    verified: true,
  },
  {
    id:      "s-005",
    name:    "Signagi Panorama Terrace",
    type:    "viewpoint",
    lat:     41.612,
    lng:     45.571,
    address: "Old Town Signagi, Kakheti",
    phone:   undefined,
    rating:  4.9,
    verified: true,
  },
  {
    id:      "s-006",
    name:    "Batumi Riders Hub",
    type:    "cafe",
    lat:     41.641,
    lng:     41.636,
    address: "8 Ninoshvili St, Batumi 6000",
    phone:   "+995 422 271 500",
    rating:  4.6,
    verified: true,
  },
  {
    id:      "s-007",
    name:    "Gudauri Alpine Rest Area",
    type:    "rest_area",
    lat:     42.473,
    lng:     44.487,
    address: "Georgian Military Highway, km 133 (Gudauri)",
    phone:   undefined,
    rating:  4.1,
    verified: true,
  },
  {
    id:      "s-008",
    name:    "Borjomi Mineral Springs Stop",
    type:    "rest_area",
    lat:     41.839,
    lng:     43.399,
    address: "Borjomi Central Park, Borjomi",
    phone:   undefined,
    rating:  4.5,
    verified: true,
  },
];
