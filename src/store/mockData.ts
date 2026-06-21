import type {
  BikerClub,
  BikerPost,
  BikerSpot,
  BikerUser,
  GarageMotorcycle,
  GroupRide,
  MarketplaceListing,
  RoadAlert,
  Route,
} from "@/lib/types";

// ─── Biker users ──────────────────────────────────────────────────────────────

export const MOCK_USERS: BikerUser[] = [
  {
    id: "u-001", name: "გიორგი ბერიძე",   username: "giorgi_moto",
    motorcycleModel: "Yamaha MT-09",   avatarColor: "#f59e0b",
    isVerified: true,  followersCount: 1284, rideCount: 147,
  },
  {
    id: "u-002", name: "ნინო ყვარაცხელია", username: "nino_rider",
    motorcycleModel: "Honda CB500X",   avatarColor: "#3b82f6",
    isVerified: false, followersCount: 537,  rideCount: 62,
  },
  {
    id: "u-003", name: "ლუკა მგელაძე",    username: "luka_adv",
    motorcycleModel: "BMW R1250GS",    avatarColor: "#22c55e",
    isVerified: true,  followersCount: 3102, rideCount: 389,
  },
  {
    id: "u-004", name: "თამარა გოგიტიძე", username: "tamara_zr",
    motorcycleModel: "Kawasaki Z900",  avatarColor: "#a78bfa",
    isVerified: false, followersCount: 821,  rideCount: 94,
  },
  {
    id: "u-005", name: "დავით ჯავახიშვილი", username: "davit_ktm",
    motorcycleModel: "KTM Duke 390",   avatarColor: "#fb923c",
    isVerified: false, followersCount: 298,  rideCount: 41,
  },
];

// ─── Biker posts ──────────────────────────────────────────────────────────────

export const MOCK_POSTS: BikerPost[] = [
  {
    id: "p-001", author: MOCK_USERS[0],
    content:
      "გუშინ გავიარე სამხედრო გზა ჯვრის უღელტეხილამდე — ასფალტი ახლიაა, გრიფი " +
      "შესანიშნავია! გუდაურის შემდეგ ყოველ მოხვევაზე ამოსული გული 🏔️ MT-09-ს სახლია ეს გზა ⚡",
    routeRef: "r-001",
    likeCount: 312, commentCount: 47,
    createdAt: new Date(Date.now() - 3 * 3_600_000).toISOString(),
    isLiked: false, tags: ["სამხედრო_გზა", "გუდაური", "MT09"],
  },
  {
    id: "p-002", author: MOCK_USERS[1],
    content:
      "⚠️ გომბორის გზაზე ფრთხილად! კმ 43-ზე მარცხნივ ახლი ხრეშია ჩამოვარდნილი — " +
      "კავკასიური წვიმის შემდეგ ნაკადი ჩამოვიდა. ყველამ სიჩქარე 40-მდე შეამციროს.",
    routeRef: "r-002",
    likeCount: 289, commentCount: 31,
    createdAt: new Date(Date.now() - 7 * 3_600_000).toISOString(),
    isLiked: true, tags: ["გომბორი", "გაფრთხილება"],
  },
  {
    id: "p-003", author: MOCK_USERS[2],
    content:
      "სვანეთი — ამ წელს მე-3 ვიზიტი! ენგურის ხეობა ყოველ ჯერზე სხვა ხიბლი აქვს 🗻 " +
      "GS-ზე ლენტეხის მხრიდან ჩამოსვლა კლდოვანი მონაკვეთებით — ყველაზე სახალისო 4 საათი.",
    routeRef: "r-003",
    likeCount: 847, commentCount: 112,
    createdAt: new Date(Date.now() - 18 * 3_600_000).toISOString(),
    isLiked: false, tags: ["სვანეთი", "ენგური", "BMW_GS"],
  },
  {
    id: "p-004", author: MOCK_USERS[3],
    content:
      "ბათუმის სანაპიროს კრიმანჭული — 68 კმ სუფთა ბედნიერება ☀️ Z900-ით ზღვის " +
      "სიახლოვეს სიჩქარის შეგრძნება სხვაა. ქობულეთი → ურეკი → ფოთი ყველა ბიკერს ვუდასტურებ 🌊",
    routeRef: "r-004",
    likeCount: 463, commentCount: 58,
    createdAt: new Date(Date.now() - 26 * 3_600_000).toISOString(),
    isLiked: true, tags: ["ბათუმი", "სანაპირო", "Z900"],
  },
  {
    id: "p-005", author: MOCK_USERS[4],
    content:
      "Iron Horse-ში ახალ ბიკერებს გავეცანი — Duke 390-ის ახალი მფლობელები 🔥 " +
      "400+ ბიკერი ერთ ადგილას! KTM-ების ჩვენება... ადრენალინი ჯერ კიდევ სისხლში მდგომარეობს.",
    likeCount: 198, commentCount: 24,
    createdAt: new Date(Date.now() - 2 * 86_400_000).toISOString(),
    isLiked: false, tags: ["IronHorse", "KTM", "Duke390"],
  },
];

// ─── Group rides ──────────────────────────────────────────────────────────────

export const MOCK_GROUP_RIDES: GroupRide[] = [
  {
    id: "gr-001",
    name: "გომბორის ჯგუფური გასვლა",
    destination: "სიღნაღი / კახეთი",
    gatheringPoint: "Iron Horse, კოსტავას ქ. 14",
    gatheringTime: new Date(Date.now() + 2 * 86_400_000).toISOString(),
    pace: "medium",
    description: "გომბორის უღელტეხილით კახეთის ღვინის გზაზე. სიღნაღში სადილი.",
    organizer: MOCK_USERS[0],
    joinedRiders: [MOCK_USERS[1], MOCK_USERS[2], MOCK_USERS[3]],
    maxRiders: 12, routeRef: "r-002",
  },
  {
    id: "gr-002",
    name: "სამხედრო გზა — ყაზბეგი",
    destination: "სტეფანწმინდა / ყაზბეგი",
    gatheringPoint: "დიდუბის ავტოსადგური, 07:00",
    gatheringTime: new Date(Date.now() + 5 * 86_400_000).toISOString(),
    pace: "fast",
    description: "ჯვრის უღელტეხილით სტეფანწმინდამდე. გამოცდილი ბიკერებისთვის.",
    organizer: MOCK_USERS[2],
    joinedRiders: [MOCK_USERS[0], MOCK_USERS[4]],
    maxRiders: 8, routeRef: "r-001",
  },
  {
    id: "gr-003",
    name: "ბათუმ-ქობულეთის სანაპირო ტური",
    destination: "ფოთი / შავი ზღვა",
    gatheringPoint: "ბათუმის ბიკერ-ჰაბი, ნინოშვილის ქ.",
    gatheringTime: new Date(Date.now() + 9 * 86_400_000).toISOString(),
    pace: "slow",
    description: "მოდუნებული სანაპირო ტური. ლანჩი ქობულეთში.",
    organizer: MOCK_USERS[3],
    joinedRiders: [MOCK_USERS[1]],
    maxRiders: 20, routeRef: "r-004",
  },
];

// ─── Biker clubs ──────────────────────────────────────────────────────────────

export const MOCK_CLUBS: BikerClub[] = [
  {
    id: "c-001",
    name: "Tbilisi Riders",
    location: "თბილისი",
    memberCount: 247,
    isVerified: true,
    description: "თბილისის ყველაზე ძველი და მსხვილი მოტო-კლუბი. ყოველ პარასკევს გასვლები.",
    tags: ["Street", "ADV", "Naked"],
    logoColor: "#f59e0b",
    foundedYear: 2011,
  },
  {
    id: "c-002",
    name: "Batumi Crew",
    location: "ბათუმი",
    memberCount: 134,
    isVerified: true,
    description: "შავი ზღვის სანაპიროს ბიკერები. ზაფხული — ჩვენი სეზონი!",
    tags: ["Coastal", "Cruiser", "Sport"],
    logoColor: "#3b82f6",
    foundedYear: 2015,
  },
  {
    id: "c-003",
    name: "ყაზბეგის მხედრები",
    location: "მცხეთა-მთიანეთი",
    memberCount: 89,
    isVerified: false,
    description: "კავკასიონის მწვერვალებზე ორბორბლიანი ექსპედიციები. ADV-მხოლოდ.",
    tags: ["ADV", "Off-Road", "Expedition"],
    logoColor: "#22c55e",
    foundedYear: 2018,
  },
  {
    id: "c-004",
    name: "სვანეთი ADV",
    location: "ზუგდიდი",
    memberCount: 56,
    isVerified: false,
    description: "სვანეთის ხეობებისა და ალპური გზების მკვლევარები.",
    tags: ["ADV", "Gravel", "Alpine"],
    logoColor: "#a78bfa",
    foundedYear: 2020,
  },
  {
    id: "c-005",
    name: "ქუთაისის ბიკ-კლუბი",
    location: "ქუთაისი",
    memberCount: 73,
    isVerified: true,
    description: "იმერეთის ბიკერ-საზოგადოება. კვირა-კვირა გასვლები.",
    tags: ["Street", "Touring", "Sport"],
    logoColor: "#fb923c",
    foundedYear: 2013,
  },
];

// ─── Marketplace listings ─────────────────────────────────────────────────────

export const MOCK_LISTINGS: MarketplaceListing[] = [
  // Bikes
  {
    id: "l-001",
    title: "Yamaha MT-07 2021",
    description:
      "Yamaha MT-07 2021 წ., 18,000 კმ. შესანიშნავ მდგომარეობაში, სერვის-წიგნი, " +
      "Akrapovič სლიპ-ონი, Puig ქარსაფარი. ორი მფლობელი. ყველა ტექნიკური სამუშაო შესრულებული.",
    price: 12_500, currency: "GEL",
    category: "bikes", condition: "good",
    seller: MOCK_USERS[0], location: "თბილისი",
    createdAt: new Date(Date.now() - 3 * 86_400_000).toISOString(),
    isNegotiable: true, views: 342,
  },
  {
    id: "l-002",
    title: "Honda CB500X 2020",
    description:
      "Honda CB500X 2020 წ., 24,500 კმ. ADV ტოვერ-ბეგები, სვ-მოტეკ გარდერობი, " +
      "ახალი Michelin Anakee III საბურავები. მხოლოდ გამყიდვლის გამგზავრების გამო.",
    price: 9_800, currency: "GEL",
    category: "bikes", condition: "good",
    seller: MOCK_USERS[1], location: "ბათუმი",
    createdAt: new Date(Date.now() - 7 * 86_400_000).toISOString(),
    isNegotiable: false, views: 218,
  },
  {
    id: "l-003",
    title: "BMW R1250GS Adventure 2019",
    description:
      "BMW R1250GS Adventure 2019, Dynamic Pro პაკეტი, Telelever/Paralever სუსპენზია, " +
      "გათბობადი სახელურები, ნავიგაცია. 41,000 კმ, ყველა სერვისი BMW-ში.",
    price: 34_000, currency: "GEL",
    category: "bikes", condition: "good",
    seller: MOCK_USERS[2], location: "თბილისი",
    createdAt: new Date(Date.now() - 1 * 86_400_000).toISOString(),
    isNegotiable: true, views: 587,
  },
  // Gear
  {
    id: "l-004",
    title: "AGV K3 SV ჩაფხუტი L",
    description:
      "AGV K3 SV, ზომა L. ახალი, გახსნილი მხოლოდ ზომის შესამოწმებლად. " +
      "Pinlock ანტი-ნისლის ფარი ჩართული.",
    price: 450, currency: "GEL",
    category: "gear", condition: "new",
    seller: MOCK_USERS[4], location: "თბილისი",
    createdAt: new Date(Date.now() - 12 * 86_400_000).toISOString(),
    isNegotiable: false, views: 94,
  },
  {
    id: "l-005",
    title: "Alpinestars Andes V3 ქურთუკი M",
    description:
      "Alpinestars Andes V3 ADV ქურთუკი, ზომა M. ერთი სეზონი. D3O ჯავშანი, " +
      "ამოსაღები თბილი საფენი. ვარდისფერ-შავი ფერი.",
    price: 320, currency: "GEL",
    category: "gear", condition: "like_new",
    seller: MOCK_USERS[3], location: "ქუთაისი",
    createdAt: new Date(Date.now() - 5 * 86_400_000).toISOString(),
    isNegotiable: true, views: 71,
  },
  {
    id: "l-006",
    title: "Dainese Full Metal 6 ხელთათმანები",
    description:
      "Dainese Full Metal 6, ზომა M. კარბონი, ტიტანი. 2 სეზონი, ძალიან კარგ მდგომარეობაში.",
    price: 180, currency: "GEL",
    category: "gear", condition: "good",
    seller: MOCK_USERS[0], location: "თბილისი",
    createdAt: new Date(Date.now() - 20 * 86_400_000).toISOString(),
    isNegotiable: true, views: 47,
  },
  // Parts
  {
    id: "l-007",
    title: "Akrapovič სლიპ-ონი MT-09 2021-2023",
    description:
      "Akrapovič Slip-On Line (Titanium), MT-09 2021-2023 წწ. ახალი, ოპაკი პაკეტში. " +
      "მონტაჟი და EC-სერტიფიკატი ჩართული. ვანდა ახმადი გამოვყიდი.",
    price: 1_200, currency: "GEL",
    category: "parts", condition: "new",
    seller: MOCK_USERS[0], location: "თბილისი",
    createdAt: new Date(Date.now() - 4 * 86_400_000).toISOString(),
    isNegotiable: false, views: 203,
  },
  {
    id: "l-008",
    title: "Puig ქარსაფარი CB500X",
    description:
      "Puig New Generation ქარსაფარი Honda CB500X 2019+. მსუბუქი ნახმარი, ბნელი ფერი.",
    price: 250, currency: "GEL",
    category: "parts", condition: "good",
    seller: MOCK_USERS[1], location: "ბათუმი",
    createdAt: new Date(Date.now() - 14 * 86_400_000).toISOString(),
    isNegotiable: true, views: 38,
  },
  {
    id: "l-009",
    title: "Givi Monokey E470 ნომბო 47L",
    description:
      "Givi E470 Simply III 47L ნომბო ყუთი + SR3114 BMW R1200GS სხიდი 2013-2018. " +
      "ორი ჭედვი, პლასტიკი შესანიშნავ მდგომარეობაში.",
    price: 380, currency: "GEL",
    category: "parts", condition: "like_new",
    seller: MOCK_USERS[2], location: "თბილისი",
    createdAt: new Date(Date.now() - 8 * 86_400_000).toISOString(),
    isNegotiable: false, views: 112,
  },
];

// ─── Digital Garage ───────────────────────────────────────────────────────────

export const MOCK_GARAGE: GarageMotorcycle = {
  id: "g-001", brand: "Yamaha", model: "MT-09", year: 2022,
  modifications: [
    "Akrapovič სლიპ-ონი", "Rizoma სარკეები", "Puig ქარსაფარი",
    "Heidenau K60 Scout", "SW-Motech სატვირთო ჩარჩო", "Garmin Zumo GPS",
  ],
  stats: { totalKm: 14_820, routesCompleted: 47, alertsSubmitted: 12 },
};

// ─── Routes ───────────────────────────────────────────────────────────────────

export const MOCK_ROUTES: Route[] = [
  {
    id: "r-001", name: "საქართველოს სამხედრო გზა",
    description:
      "კავკასიის ყველაზე იკონური საავტომობილო გზა. S3 ეროვნული გზა ადის თბილისიდან " +
      "2 379 მ-იან ჯვრის უღელტეხილამდე, ანანურის, გუდაურის და სტეფანწმინდის გავლით.",
    difficulty: "advanced", asphaltQuality: "excellent",
    coordinates: [
      {lat:41.693,lng:44.801},{lat:41.844,lng:44.720},{lat:42.178,lng:44.671},
      {lat:42.473,lng:44.487},{lat:42.536,lng:44.471},{lat:42.659,lng:44.658},
    ],
    distanceKm:148,durationMin:210,elevationGain:2379,region:"მცხეთა-მთიანეთი",
    tags:["მთა","პანორამა","სერპანტინი","იუნესკო"],likeCount:1247,rideCount:5830,
  },
  {
    id: "r-002", name: "გომბორის უღელტეხილი — კახეთის ღვინის გზა",
    description:
      "კახეთის ღვინის სამეფოში შესასვლელი გვერდითი გზა. 1 620 მ გომბორის ქედი " +
      "ჭეც-ტყის ასვლა კახეთის ვენახიანი ვაკის ჩამოსვლაში გადადის.",
    difficulty: "intermediate", asphaltQuality: "good",
    coordinates: [
      {lat:41.740,lng:44.975},{lat:41.801,lng:45.280},
      {lat:41.924,lng:45.481},{lat:41.612,lng:45.571},
    ],
    distanceKm:102,durationMin:145,elevationGain:1621,region:"კახეთი",
    tags:["მთა","ღვინო","პანორამა"],likeCount:893,rideCount:3210,
  },
  {
    id: "r-003", name: "სვანეთის გზა — ენგურის ხეობა",
    description:
      "საქართველოს ყველაზე დრამატული მარშრუტი. მესტიისაკენ გზა ვიწრო ხეობით " +
      "სვანეთის შუა საუკუნეების კოშკებამდე.",
    difficulty: "extreme", asphaltQuality: "poor",
    coordinates: [
      {lat:42.508,lng:41.871},{lat:42.706,lng:42.396},
      {lat:42.878,lng:42.594},{lat:43.031,lng:42.732},
    ],
    distanceKm:132,durationMin:300,elevationGain:1890,region:"სამეგრელო-ზემო სვანეთი",
    tags:["ექსტრემალური","ხრეში","ხეობა","იუნესკო"],likeCount:2104,rideCount:1520,
  },
  {
    id: "r-004", name: "აჭარის შავი ზღვის სანაპირო",
    description:
      "ახლადასფალტებული სანაპირო გზა ბათუმიდან ჩრდილოეთით — შავი ქვიშა, სუბტროპიკი.",
    difficulty: "beginner", asphaltQuality: "excellent",
    coordinates: [
      {lat:41.641,lng:41.636},{lat:41.819,lng:41.777},
      {lat:41.974,lng:41.797},{lat:42.148,lng:41.673},
    ],
    distanceKm:68,durationMin:85,elevationGain:95,region:"აჭარა / გურია",
    tags:["სანაპირო","ზღვა","მარტივი"],likeCount:671,rideCount:2890,
  },
];

// ─── Road alerts ──────────────────────────────────────────────────────────────

export const MOCK_ALERTS: RoadAlert[] = [
  {
    id:"a-001",type:"gravel",lat:42.503,lng:44.469,
    description:"მეწყრული ნარჩენები ჯვრის უღელტეხილიდან 300 მ-ზე. მაქს. 35 კმ/სთ.",
    severity:"high",radius:400,verified:true,
    reportedAt:new Date(Date.now()-4*3_600_000).toISOString(),
    expiresAt:new Date(Date.now()+72*3_600_000).toISOString(),
  },
  {
    id:"a-002",type:"camera",lat:41.786,lng:45.103,
    description:"ფიქსირებული კამერა E60-ზე, საგარეჯოს გვერდის ავლაზე. 90 კმ/სთ, 24/7.",
    severity:"low",radius:150,verified:true,
    reportedAt:new Date(Date.now()-30*86_400_000).toISOString(),expiresAt:null,
  },
  {
    id:"a-003",type:"work",lat:42.706,lng:42.395,
    description:"ხიდის სამუშაოები ენგურის კაშხლის გზაზე. ერთი ზოლი, 20–40 წუთი.",
    severity:"medium",radius:1_200,verified:true,
    reportedAt:new Date(Date.now()-5*86_400_000).toISOString(),
    expiresAt:new Date(Date.now()+45*86_400_000).toISOString(),
  },
  {
    id:"a-004",type:"danger",lat:42.536,lng:44.471,
    description:"ჯვრის უღელტეხილი — ბრმა სერპანტინები 2 379 მ-ზე. მოაჯირი არ არის.",
    severity:"high",radius:800,verified:true,
    reportedAt:new Date(Date.now()-60*86_400_000).toISOString(),expiresAt:null,
  },
  {
    id:"a-005",type:"gravel",lat:41.755,lng:43.530,
    description:"ხრეში ბორჯომი-ბაკურიანის გზაზე, კმ 14–18.",
    severity:"medium",radius:2_500,verified:false,
    reportedAt:new Date(Date.now()-90*60_000).toISOString(),
    expiresAt:new Date(Date.now()+48*3_600_000).toISOString(),
  },
];

// ─── Biker spots ──────────────────────────────────────────────────────────────

export const MOCK_SPOTS: BikerSpot[] = [
  {id:"s-001",name:"Iron Horse თბილისი",type:"cafe",lat:41.693,lng:44.803,address:"კოსტავას ქ. 14",phone:"+995 32 292 0014",rating:4.9,verified:true},
  {id:"s-002",name:"ანანურის პანორამა",type:"viewpoint",lat:42.178,lng:44.671,address:"სამხედრო გზა, კმ 72",rating:4.7,verified:true},
  {id:"s-003",name:"სტეფანწმინდის ბიკერ-პოინტი",type:"cafe",lat:42.657,lng:44.654,address:"ყაზბეგის ცენტრი",phone:"+995 599 00 1234",rating:4.8,verified:true},
  {id:"s-004",name:"ზუგდიდის ბოლო გაჩერება",type:"fuel",lat:42.509,lng:41.876,address:"სვანეთის გზა, ზუგდიდი",rating:4.2,verified:true},
  {id:"s-005",name:"სიღნაღის პანორამული აივანი",type:"viewpoint",lat:41.612,lng:45.571,address:"ძველი სიღნაღი",rating:4.9,verified:true},
  {id:"s-006",name:"ბათუმის ბიკერ-ჰაბი",type:"cafe",lat:41.641,lng:41.636,address:"ნინოშვილის ქ. 8",phone:"+995 422 271 500",rating:4.6,verified:true},
];
