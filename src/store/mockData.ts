import type {
  BikerClub,
  BikerPost,
  BikerUser,
  CityRoom,
  GarageMotorcycle,
  GroupRide,
  MarketplaceListing,
  ServiceProvider,
} from "@/lib/types";

// ─── Biker users ──────────────────────────────────────────────────────────────

export const MOCK_USERS: BikerUser[] = [
  {
    id: "u-001", name: "გიორგი ბერიძე",    username: "giorgi_moto",
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
  {
    id: "u-006", name: "ნიკა ხელიძე",      username: "nika_gs",
    motorcycleModel: "BMW F800GS",     avatarColor: "#06b6d4",
    isVerified: false, followersCount: 412,  rideCount: 78,
  },
];

// ─── Biker posts ──────────────────────────────────────────────────────────────
// No map coordinates — all route info is rich Georgian prose.

export const MOCK_POSTS: BikerPost[] = [
  {
    id: "p-001", author: MOCK_USERS[0],
    content:
      "სამხედრო გზის განახლება 🏔️ გუდაური–ყაზბეგის მონაკვეთი შესანიშნავ " +
      "მდგომარეობაშია — ახალი ასფალტი, კარგი გრიფი, ხედი ულამაზესია. " +
      "ჯვრის გადასასვლელი პარასკევს ყინვა-თხილამური ნეისტი: გვიან ჩასვლა ღამე. " +
      "MT-09-ს სახლია ეს გზა ⚡ — ყველა MT-მფლობელს ვუდასტურებ!",
    likeCount: 312, commentCount: 47,
    createdAt: new Date(Date.now() - 3 * 3_600_000).toISOString(),
    isLiked: false, tags: ["სამხედრო_გზა", "გუდაური", "MT09", "ყაზბეგი"],
  },
  {
    id: "p-002", author: MOCK_USERS[1],
    content:
      "⚠️ გომბორის გზა — კმ 43-ის სათავე მარცხენა ეხლა ხრეში: კავკასიური " +
      "წვიმის შემდეგ ნაკადი ჩამოვიდა. CB500X-ზე ადვილად გამოვიდი, მაგრამ " +
      "ქვის ნაგლეჯები 30 სმ სიმაღლეში — ჩქარობისა და ქვის გარეშე. " +
      "სიჩქარე შეამცირეთ 40 კმ/სთ-მდე ამ მონაკვეთზე!",
    likeCount: 289, commentCount: 31,
    createdAt: new Date(Date.now() - 7 * 3_600_000).toISOString(),
    isLiked: true, tags: ["გომბორი", "გზის_სიახლე", "ხრეში"],
  },
  {
    id: "p-003", author: MOCK_USERS[2],
    content:
      "სვანეთი — ამ წელს მე-3 ვიზიტი და ყველაზე კარგი! ენგურის ხეობა " +
      "ლენტეხ-მესტია მონაკვეთი R1250GS-ზე: გრაველი ქვედა ნახევარი, " +
      "ასფალტი ზევით. ზუგდიდიდან 4-5 სთ სხვადასხვა პირობებში — " +
      "სათავგადასავლო ბიკერებისთვის ნამდვილი პარადიზი 🗻",
    likeCount: 847, commentCount: 112,
    createdAt: new Date(Date.now() - 18 * 3_600_000).toISOString(),
    isLiked: false, tags: ["სვანეთი", "ენგური", "BMW_GS", "ADV"],
  },
  {
    id: "p-004", author: MOCK_USERS[3],
    content:
      "ბათუმის სანაპიროს კრიმანჭული — Z900-ით ქობულეთი–ურეკი–ფოთი. " +
      "68 კმ სუფთა ბედნიერება ☀️ ახლადასფალტებული, ფართო ზოლები, " +
      "შავი ზღვის სუნი, პალმები... კავკასიონის მთებისგან შესვენება ჭირდება " +
      "ყოველ ბიკერს — ეს მარშრუტი ვუდასტურებ ყველა სიჩქარის ბიკერს 🌊",
    likeCount: 463, commentCount: 58,
    createdAt: new Date(Date.now() - 26 * 3_600_000).toISOString(),
    isLiked: true, tags: ["ბათუმი", "სანაპირო", "Z900"],
  },
  {
    id: "p-005", author: MOCK_USERS[4],
    content:
      "Iron Horse-ში ახლები გავიცანი — Duke 390-ის ახალი მფლობელები 🔥 " +
      "400+ ბიკერი ერთ ადგილას, KTM-ების ჩვენება, ექსჰოზის გამოფენა... " +
      "ადრენალინი ჯერ კიდევ სისხლშია! თბილისის ბიკ-სცენა " +
      "სწრაფად იზრდება — ყოველ სეზონზე ახალი სახეები 💪",
    likeCount: 198, commentCount: 24,
    createdAt: new Date(Date.now() - 2 * 86_400_000).toISOString(),
    isLiked: false, tags: ["IronHorse", "KTM", "Duke390", "თბილისი"],
  },
];

// ─── Group rides ──────────────────────────────────────────────────────────────

export const MOCK_GROUP_RIDES: GroupRide[] = [
  {
    id: "gr-001",
    name: "გომბორის ჯგუფური გასვლა",
    destination: "სიღნაღი — კახეთი",
    gatheringPoint: "Iron Horse კაფე, კოსტავას ქ. 14, თბილისი",
    gatheringTime: new Date(Date.now() + 2 * 86_400_000).toISOString(),
    pace: "medium",
    description:
      "გომბორის უღელტეხილით კახეთის ღვინის გზაზე. სიღნაღში სადილი " +
      "Twins Old Cellar-ში. დაბრუნება საღამოს 20:00-ზე.",
    organizer: MOCK_USERS[0],
    joinedRiders: [MOCK_USERS[1], MOCK_USERS[2], MOCK_USERS[3]],
    maxRiders: 12,
  },
  {
    id: "gr-002",
    name: "სამხედრო გზა — ყაზბეგი",
    destination: "სტეფანწმინდა — ყაზბეგი",
    gatheringPoint: "დიდუბის ავტოსადგური, თბილისი — 07:00",
    gatheringTime: new Date(Date.now() + 5 * 86_400_000).toISOString(),
    pace: "fast",
    description:
      "ჯვარის უღელტეხილით სტეფანწმინდამდე. ლანჩი სტეფანწმინდაში, " +
      "Gergeti Trinity Church-ის ძირს. გამოცდილი ბიკერებისთვის!",
    organizer: MOCK_USERS[2],
    joinedRiders: [MOCK_USERS[0], MOCK_USERS[4]],
    maxRiders: 8,
  },
  {
    id: "gr-003",
    name: "ბათუმ-ქობულეთის სანაპირო ტური",
    destination: "ფოთი — შავი ზღვა",
    gatheringPoint: "ბათუმის ბიკერ-ჰაბი, ნინოშვილის ქ. 8",
    gatheringTime: new Date(Date.now() + 9 * 86_400_000).toISOString(),
    pace: "slow",
    description:
      "მოდუნებული სანაპირო ტური ყველა გამოცდილების ბიკერებისთვის. " +
      "ლანჩი ქობულეთის ზღვის პირას. 20 ადგილი!",
    organizer: MOCK_USERS[3],
    joinedRiders: [MOCK_USERS[1]],
    maxRiders: 20,
  },
];

// ─── Biker clubs ──────────────────────────────────────────────────────────────

export const MOCK_CLUBS: BikerClub[] = [
  {
    id: "c-001", name: "Tbilisi Riders", location: "თბილისი",
    memberCount: 247, isVerified: true,
    description: "თბილისის ყველაზე ძველი და მსხვილი მოტო-კლუბი. ყოველ პარასკევს გასვლები.",
    tags: ["Street", "ADV", "Naked"], logoColor: "#f59e0b", foundedYear: 2011,
  },
  {
    id: "c-002", name: "Batumi Crew", location: "ბათუმი",
    memberCount: 134, isVerified: true,
    description: "შავი ზღვის სანაპიროს ბიკერები. ზაფხული — ჩვენი სეზონი!",
    tags: ["Coastal", "Cruiser"], logoColor: "#3b82f6", foundedYear: 2015,
  },
  {
    id: "c-003", name: "ყაზბეგის მხედრები", location: "მცხეთა-მთიანეთი",
    memberCount: 89, isVerified: false,
    description: "კავკასიონზე ორბორბლიანი ექსპედიციები. ADV-მხოლოდ.",
    tags: ["ADV", "Off-Road"], logoColor: "#22c55e", foundedYear: 2018,
  },
  {
    id: "c-004", name: "სვანეთი ADV", location: "ზუგდიდი",
    memberCount: 56, isVerified: false,
    description: "სვანეთის ხეობებისა და ალპური გზების მკვლევარები.",
    tags: ["ADV", "Gravel"], logoColor: "#a78bfa", foundedYear: 2020,
  },
  {
    id: "c-005", name: "ქუთაისის ბიკ-კლუბი", location: "ქუთაისი",
    memberCount: 73, isVerified: true,
    description: "იმერეთის ბიკერ-საზოგადოება. კვირა-კვირა გასვლები.",
    tags: ["Street", "Touring"], logoColor: "#fb923c", foundedYear: 2013,
  },
];

// ─── Marketplace listings ─────────────────────────────────────────────────────

export const MOCK_LISTINGS: MarketplaceListing[] = [
  {
    id: "l-001", title: "Yamaha MT-07 2021",
    description:
      "18,000 კმ, შესანიშნავ მდგომარეობაში, სერვის-წიგნი, Akrapovič სლიპ-ონი, " +
      "Puig ქარსაფარი. ყველა ტექ. სამუშაო კეთილსინდისიერად შესრულებული.",
    price: 12_500, currency: "GEL", category: "bikes", condition: "good",
    seller: MOCK_USERS[0], location: "თბილისი",
    createdAt: new Date(Date.now() - 3 * 86_400_000).toISOString(),
    isNegotiable: true, views: 342,
  },
  {
    id: "l-002", title: "Honda CB500X 2020",
    description:
      "24,500 კმ. ADV ბეგები, SW-Motech გარდერობი, ახალი Michelin Anakee III. " +
      "მხოლოდ გამყიდვლის სამუშაო-ადგილის ცვლილების გამო.",
    price: 9_800, currency: "GEL", category: "bikes", condition: "good",
    seller: MOCK_USERS[1], location: "ბათუმი",
    createdAt: new Date(Date.now() - 7 * 86_400_000).toISOString(),
    isNegotiable: false, views: 218,
  },
  {
    id: "l-003", title: "BMW R1250GS Adventure 2019",
    description:
      "Dynamic Pro პაკეტი, გათბობადი სახელურები, ნავიგაცია, 41,000 კმ. " +
      "ყველა სერვისი BMW სერვის-ცენტრში.",
    price: 34_000, currency: "GEL", category: "bikes", condition: "good",
    seller: MOCK_USERS[2], location: "თბილისი",
    createdAt: new Date(Date.now() - 1 * 86_400_000).toISOString(),
    isNegotiable: true, views: 587,
  },
  {
    id: "l-004", title: "AGV K3 SV ჩაფხუტი L",
    description: "ახალი, გახსნილი მხოლოდ ზომის შესამოწმებლად. Pinlock ჩართული.",
    price: 450, currency: "GEL", category: "gear", condition: "new",
    seller: MOCK_USERS[4], location: "თბილისი",
    createdAt: new Date(Date.now() - 12 * 86_400_000).toISOString(),
    isNegotiable: false, views: 94,
  },
  {
    id: "l-005", title: "Alpinestars Andes V3 ქურთუკი M",
    description: "ერთი სეზონი. D3O ჯავშანი, ამოსაღები საფენი. ვარდ-შავი.",
    price: 320, currency: "GEL", category: "gear", condition: "like_new",
    seller: MOCK_USERS[3], location: "ქუთაისი",
    createdAt: new Date(Date.now() - 5 * 86_400_000).toISOString(),
    isNegotiable: true, views: 71,
  },
  {
    id: "l-006", title: "Dainese Full Metal 6 ხელთათმ. M",
    description: "კარბონი, ტიტანი. 2 სეზონი, ძალიან კარგ მდ.",
    price: 180, currency: "GEL", category: "gear", condition: "good",
    seller: MOCK_USERS[0], location: "თბილისი",
    createdAt: new Date(Date.now() - 20 * 86_400_000).toISOString(),
    isNegotiable: true, views: 47,
  },
  {
    id: "l-007", title: "Akrapovič სლიპ-ონი MT-09 2021-23",
    description: "Titanium. ახალი, ოპაკი პაკეტში. EC-სერტ. ჩართული.",
    price: 1_200, currency: "GEL", category: "parts", condition: "new",
    seller: MOCK_USERS[0], location: "თბილისი",
    createdAt: new Date(Date.now() - 4 * 86_400_000).toISOString(),
    isNegotiable: false, views: 203,
  },
  {
    id: "l-008", title: "Puig ქარსაფარი CB500X 2019+",
    description: "New Generation. მსუბუქი ნახმარი, ბნელი.",
    price: 250, currency: "GEL", category: "parts", condition: "good",
    seller: MOCK_USERS[1], location: "ბათუმი",
    createdAt: new Date(Date.now() - 14 * 86_400_000).toISOString(),
    isNegotiable: true, views: 38,
  },
  {
    id: "l-009", title: "Givi E470 47L ნომბო + სხიდი",
    description: "BMW R1200GS 2013-18 სხიდი. ორი ჭედვი, კარგ მდ.",
    price: 380, currency: "GEL", category: "parts", condition: "like_new",
    seller: MOCK_USERS[2], location: "თბილისი",
    createdAt: new Date(Date.now() - 8 * 86_400_000).toISOString(),
    isNegotiable: false, views: 112,
  },
];

// ─── Service providers ────────────────────────────────────────────────────────
// No coordinates — text-based location with city and address.

export const MOCK_SERVICES: ServiceProvider[] = [
  {
    id: "sv-001",
    name: "ვიქტორ მოტო-სერვისი",
    category: "mechanic",
    specializations: ["Yamaha", "Honda", "Kawasaki"],
    location: "ვაჟა-ფშაველა 45, სოფ. მე-5 მ/რ, თბილისი",
    city: "თბილისი",
    phone: "+995 599 11 22 33",
    rating: 4.9,
    reviewCount: 87,
    isVerified: true,
    services: ["ძრავის რემონტი", "კარბიურატორი/ინჟ.", "ელექტრიკა", "ზეთის გამოცვლა", "ემ.ოზ."],
    workingHours: "ორ–შაბ: 09:00–19:00",
  },
  {
    id: "sv-002",
    name: "ADV Tech კავკასია",
    category: "mechanic",
    specializations: ["BMW", "KTM", "Honda Africa Twin"],
    location: "საარჩევნო ქ. 8, გლდანი, თბილისი",
    city: "თბილისი",
    phone: "+995 577 44 55 66",
    rating: 4.8,
    reviewCount: 63,
    isVerified: true,
    services: ["ADV სუსპენზია", "ელ. გამართვა", "კომპიუტ. სქემა", "გრავ. მომზ."],
    workingHours: "ორ–პარ: 10:00–18:00",
  },
  {
    id: "sv-003",
    name: "ბათუმის მოტო-ოსტატი",
    category: "mechanic",
    specializations: ["ყველა ბრენდი"],
    location: "ასათიანის ქ. 12, ბათუმი",
    city: "ბათუმი",
    phone: "+995 555 77 88 99",
    rating: 4.7,
    reviewCount: 44,
    isVerified: false,
    services: ["სტ. TO", "ძრ. ბლოკი", "ფრ/ბ-ები", "ხდნა/ელ."],
    workingHours: "ყოვ: 09:00–20:00",
  },
  {
    id: "sv-004",
    name: "პრო-საბურავი",
    category: "tires",
    specializations: ["Michelin", "Metzeler", "Pirelli", "Dunlop", "Heidenau"],
    location: "ვაკ-საბურთ. გ/გ ნ.2, თბილისი",
    city: "თბილისი",
    phone: "+995 322 22 11 00",
    rating: 4.9,
    reviewCount: 112,
    isVerified: true,
    services: ["საბ. მონტ.", "გაბ/შეკ.", "ბალ.", "შინაგ. ზოლი"],
    workingHours: "ორ–შაბ: 08:00–19:00",
  },
  {
    id: "sv-005",
    name: "ბუქსირი 24/7 — GeoBike Help",
    category: "towing",
    specializations: ["ყოველი გზა", "მთა/ვაკე"],
    location: "მოქმედება: თბილისი, მცხეთა, გუდაური",
    city: "თბილისი",
    phone: "+995 500 24 24 24",
    rating: 4.6,
    reviewCount: 58,
    isVerified: true,
    services: ["ბუქს. 24/7", "მთა-ბ.", "ნ/ო ჩაშ.", "მარ. საშ."],
    workingHours: "24/7",
  },
  {
    id: "sv-006",
    name: "ქუთაისის მოტო-სახელოსნო",
    category: "mechanic",
    specializations: ["Yamaha", "Honda", "Suzuki", "Chinese brands"],
    location: "გ. ჩახვახძის 3, ქუთაისი",
    city: "ქუთაისი",
    phone: "+995 431 23 45 67",
    rating: 4.5,
    reviewCount: 36,
    isVerified: false,
    services: ["ძრ. სარ.", "ჰიდრ.", "ელ.", "TO", "კოლ. სარ."],
    workingHours: "ორ–შაბ: 09:00–18:00",
  },
  {
    id: "sv-007",
    name: "Moto Wash Premium",
    category: "wash",
    specializations: ["ყველა ტიპი", "ADV", "Sport"],
    location: "ბოჭორმის ქ. 10, ვაკე, თბილისი",
    city: "თბილისი",
    phone: "+995 596 33 44 55",
    rating: 4.7,
    reviewCount: 29,
    isVerified: false,
    services: ["ბ/ე გარეცხვა", "ძ. გარეცხ.", "ქიმ. დამ.", "ნაყ/ცვ."],
    workingHours: "ყოვ: 10:00–19:00",
  },
  {
    id: "sv-008",
    name: "ევრო-ნაწილები",
    category: "parts_store",
    specializations: ["OEM ნაწილები", "Akrapovič", "Givi", "SW-Motech"],
    location: "ვარკეთ. VI მ/რ, ავტობ. ბაზ., თბილისი",
    city: "თბილისი",
    phone: "+995 322 44 55 11",
    rating: 4.6,
    reviewCount: 74,
    isVerified: true,
    services: ["OEM ნაწ.", "ეგზ.", "ბეგ. სისტ.", "სუსპ/ნ.", "ელ-ეს."],
    workingHours: "ორ–შაბ: 10:00–19:00",
  },
];

// ─── City chat rooms ──────────────────────────────────────────────────────────
// Simulated "live" city announcements — text-only, no map data.

export const MOCK_CITY_CHATS: CityRoom[] = [
  {
    id: "chat-tbilisi",
    city: "თბილისი",
    messages: [
      {
        id: "t-01", author: MOCK_USERS[0],
        content: "სამხედრო გზაზე გუდაური-ყაზბეგის მონაკვეთი შესანიშნავ მდ-შია! ⚡",
        createdAt: new Date(Date.now() - 2 * 3_600_000).toISOString(),
      },
      {
        id: "t-02", author: MOCK_USERS[4],
        content: "Iron Horse-ში 20:00-ზე, ვინ მოდის? Duke-ები, MT-ები — ყველა სტილი!",
        createdAt: new Date(Date.now() - 1 * 3_600_000).toISOString(),
      },
      {
        id: "t-03", author: MOCK_USERS[2],
        content: "ყურადღება: გარდაბნის ტრასაზე სიჩქარის კამერა ჩასვეს კმ 11-ზე 📷",
        createdAt: new Date(Date.now() - 45 * 60_000).toISOString(),
      },
      {
        id: "t-04", author: MOCK_USERS[5],
        content: "ვიქტორ-მოტოში BMW F800GS-ს ვგზავნი. ვინ ADV-ს მოყვება?",
        createdAt: new Date(Date.now() - 20 * 60_000).toISOString(),
      },
    ],
  },
  {
    id: "chat-batumi",
    city: "ბათუმი",
    messages: [
      {
        id: "b-01", author: MOCK_USERS[3],
        content: "ხვალ 09:00-ზე ქობულეთის მარშრუტი — 6 ადგილი დარჩა! 🌊",
        createdAt: new Date(Date.now() - 5 * 3_600_000).toISOString(),
      },
      {
        id: "b-02", author: MOCK_USERS[1],
        content: "სარფი-ბათუმი ხიდი გარემონტდა — ახლა გასასვლელი ბევრად მარტივია!",
        createdAt: new Date(Date.now() - 3 * 3_600_000).toISOString(),
      },
      {
        id: "b-03", author: MOCK_USERS[5],
        content: "ვინ იცის ბათუმში სად ვიყიდოთ AGV K6 ჩაფხუტი? ყველა მაღაზია შემოვიარე…",
        createdAt: new Date(Date.now() - 50 * 60_000).toISOString(),
      },
    ],
  },
  {
    id: "chat-kutaisi",
    city: "ქუთაისი",
    messages: [
      {
        id: "k-01", author: MOCK_USERS[2],
        content: "გელათი-ბაღდათის გზა: ხვ. ხრეში ზოლ 1-ზე, კმ 8 — ფრთხილად 🟡",
        createdAt: new Date(Date.now() - 4 * 3_600_000).toISOString(),
      },
      {
        id: "k-02", author: MOCK_USERS[4],
        content: "ქ. ბიკ-კლუბი კვირეს გელათს ეწვევა — 09:00 ავტოვაგზლის ახლოს.",
        createdAt: new Date(Date.now() - 2 * 3_600_000).toISOString(),
      },
      {
        id: "k-03", author: MOCK_USERS[0],
        content: "ქუთ. მოტო-სახელოსნოში Suzuki GSX-S750 ვამოწმებ — ოსტატი პირველია!",
        createdAt: new Date(Date.now() - 30 * 60_000).toISOString(),
      },
    ],
  },
];

// ─── Digital Garage ───────────────────────────────────────────────────────────

export const MOCK_GARAGE: GarageMotorcycle = {
  id: "g-001", brand: "Yamaha", model: "MT-09", year: 2022,
  modifications: [
    "Akrapovič სლიპ-ონი", "Rizoma სარკეები", "Puig ქარსაფარი",
    "Heidenau K60 Scout", "SW-Motech სატ. ჩარჩო", "Garmin Zumo GPS",
  ],
  stats: { totalKm: 14_820, routesCompleted: 47, alertsSubmitted: 12 },
};
