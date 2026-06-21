/**
 * Georgian (ქართული) UI string constants — single source of truth.
 * All user-facing text lives here; no magic strings in components.
 */
export const KA = {
  // ─── App ──────────────────────────────────────────────────────────────────
  appName:     "GeoMotoRoutes",
  appSubtitle: "საქართველო",

  // ─── Navigation ───────────────────────────────────────────────────────────
  navHome:        "მთავარი",
  navMap:         "ინტერაქტიული რუკა",
  navMarketplace: "მოტო-ბაზარი",
  navProfile:     "ჩემი გვერდი",
  toggleSidebar:  "მენიუ",

  // ─── TopBar ───────────────────────────────────────────────────────────────
  searchPlaceholder: "მარშრუტების, ბიკერების, ბაზრის ძიება…",
  online:            "ონლაინ",
  offline:           "ოფლაინ",
  mapLayersLabel:    "ფენები",
  activeAlerts:      "გაფრთხილებები",
  noAlerts:          "გაფრთხილება არ არის",
  clearSearch:       "გასუფთავება",
  login:             "შესვლა",
  myProfile:         "პროფილი",
  logout:            "გასვლა",

  // ─── Social hub ───────────────────────────────────────────────────────────
  feedTitle:       "ბიკერ-ლენტა",
  groupRidesTitle: "ჯგუფური გასვლები",
  clubsTitle:      "მოტო-კლუბები",
  likeAction:      "ლაიქი",
  commentAction:   "კომენტარი",
  viewRouteAction: "მარშრუტის ნახვა",
  joinRideAction:  "შეერთება",
  joinedLabel:     "შეერთებული",
  paceLabel:       "სიჩქარე",
  paceSlow:        "ნელი",
  paceMedium:      "საშუალო",
  paceFast:        "სწრაფი",
  ridersCount:     "მონაწილე",
  gatheringPoint:  "შეკრების ადგილი",
  gatheringTime:   "შეკრების დრო",
  noPostsYet:      "ჯერ პოსტები არ არის.",
  noRidesYet:      "ახლო მომავალში გასვლები არ არის.",

  // ─── Clubs ────────────────────────────────────────────────────────────────
  joinClub:         "გაწევრება",
  joinedClub:       "წევრი ხარ",
  clubVerified:     "დამოწმებული",
  clubFounded:      "დაარსდა",
  clubMemberCount:  "წევრი",
  noClubsYet:       "კლუბები ჯერ არ არის.",
  viewAllClubs:     "ყველა კლუბი",

  // ─── Map page ─────────────────────────────────────────────────────────────
  mapAriaLabel:     "საქართველოს მოტო-მარშრუტების ინტერაქტიული რუკა",
  mapInitialising:  "რუკა იტვირთება…",
  mapLoadingNet:    "ქსელი იტვირთება",
  openFilters:      "ფილტრები",
  resetFilters:     "გასუფთავება",
  filters:          "ფილტრები",
  activeCount:      "აქტიური",

  // ─── Map filters ──────────────────────────────────────────────────────────
  mapLayers:         "ფენები",
  routes:            "მარშრუტები",
  roadAlerts:        "გაფრთხილებები",
  bikerSpots:        "ადგილები",
  roadAlertsSection: "საგზაო გაფრთხილებები",
  difficulty:        "სირთულე",
  spotsServices:     "სერვისები",
  featuredRoutes:    "რეკომენდებული",
  kmSuffix:          "კმ",
  sidebarFooter:     "მოიცავს",
  allNineRegions:    "საქართველოს ყველა 9 რეგიონს",
  communityVerified: "საზოგადოების მიერ დამოწმებული მონაცემები.",

  // ─── Difficulty levels ────────────────────────────────────────────────────
  difficultyBeginner:     "მარტივი",
  difficultyIntermediate: "საშუალო",
  difficultyAdvanced:     "რთული",
  difficultyExtreme:      "ექსტრემალური",

  // ─── Asphalt quality ──────────────────────────────────────────────────────
  qualityExcellent: "შესანიშნავი",
  qualityGood:      "კარგი",
  qualityFair:      "დამაკმაყოფილებელი",
  qualityPoor:      "ცუდი",
  qualityUnpaved:   "გზა გარეშე",

  // ─── Alert types ──────────────────────────────────────────────────────────
  alertGravel: "ხრეში",
  alertCamera: "ფარული კამერა",
  alertWork:   "საგზაო სამუშაოები",
  alertDanger: "საშიში მოსახვევი",

  alertGravelDesc: "გზის ზოლ(ებ)ზე ხრეში — სიჩქარე 50 კმ/სთ-ზე დაბლა",
  alertCameraDesc: "ფიქსირებული სიჩქარის საკონტროლო კამერა",
  alertWorkDesc:   "მიმდინარე სამშენებლო სამუშაოები — ზოლი შეიძლება დაკეტილი იყოს",
  alertDangerDesc: "სახიფათო მოხვევა — ბრმა კუთხე, ვარდნა, არასტაბილური ზედაპირი",

  // ─── Alert severity ───────────────────────────────────────────────────────
  severityLow:    "დაბალი",
  severityMedium: "საშუალო",
  severityHigh:   "მაღალი",

  // ─── Spot types ───────────────────────────────────────────────────────────
  spotCafe:      "მოტო-კაფე",
  spotFuel:      "საწვავი",
  spotViewpoint: "პანორამა",
  spotRestArea:  "დასვენება",
  spotMechanic:  "მექანიკოსი",
  spotHotel:     "სასტუმრო",

  // ─── Map overlays ─────────────────────────────────────────────────────────
  verified:        "✓ დამოწმებული",
  communityReport: "საზოგადოების რეპორტი",
  distance:        "მანძილი",
  duration:        "ხანგრძლივობა",
  climb:           "აღმართი",
  region:          "რეგიონი",
  surface:         "ზედაპირი",
  statRoutes:      "მარშრუტი",
  statAlerts:      "გაფრთხილება",
  statSpots:       "ადგილი",

  // ─── Add alert dialog ─────────────────────────────────────────────────────
  addAlertTitle:           "საფრთხის დამატება",
  addAlertCoords:          "კოორდინატები",
  addAlertTypeLabel:       "საფრთხის ტიპი",
  addAlertDescLabel:       "აღწერა",
  addAlertDescPlaceholder: "დეტალურად აღწერეთ სიტუაცია — ბიკერების სასარგებლოდ…",
  addAlertSubmit:          "გაზიარება",
  addAlertCancel:          "გაუქმება",
  addAlertLoginRequired:   "გაფრთხილების დასამატებლად გთხოვთ შეხვიდეთ სისტემაში.",

  // ─── Auth modal ───────────────────────────────────────────────────────────
  authTabLogin:            "შესვლა",
  authTabRegister:         "რეგისტრაცია",
  authEmailLabel:          "ელ-ფოსტა",
  authEmailPlaceholder:    "თქვენი@ელ-ფოსტა.ge",
  authPasswordLabel:       "პაროლი",
  authPasswordPlaceholder: "••••••••",
  authNameLabel:           "სახელი",
  authNamePlaceholder:     "თქვენი სახელი",
  authMotoLabel:           "მოტოციკლის მოდელი",
  authMotoPlaceholder:     "მაგ. Yamaha MT-09",
  authLoginCTA:            "შევიდეთ",
  authRegisterCTA:         "ანგარიშის შექმნა",
  authForgotPassword:      "პაროლი დაგავიწყდათ?",
  authSwitchToRegister:    "ანგარიში არ გაქვთ?",
  authSwitchToLogin:       "უკვე გაქვთ ანგარიში?",
  authClose:               "დახურვა",
  authWelcomeBack:         "კეთილი იყოს დაბრუნება",
  authJoinCommunity:       "შეუერთდით ბიკერების საზოგადოებას",

  // ─── Marketplace ─────────────────────────────────────────────────────────
  marketplaceTitle:    "მოტო-ბაზარი",
  marketplaceSubtitle: "ბიკერიდან ბიკერისთვის",
  catAll:              "ყველა",
  catBikes:            "მოტოციკლები",
  catGear:             "ეკიპირება",
  catParts:            "ნაწილები",
  condNew:             "ახალი",
  condLikeNew:         "საღად ნახმარი",
  condGood:            "კარგი მდ.",
  condFair:            "დამაკმ.",
  priceGEL:            "₾",
  priceUSD:            "$",
  negotiable:          "/ შეთანხმ.",
  contactSeller:       "კონტაქტი",
  addToFavorites:      "ფავორიტი",
  listingsCount:       "განცხადება",
  noListings:          "ამ კატეგორიაში განცხადებები არ არის.",
  postListing:         "განცხადების დამატება",
  sellerLabel:         "გამყიდველი",
  locationLabel:       "ადგილ.",
  viewsLabel:          "ნახვა",
  postedLabel:         "გამოქვ.",
  searchListings:      "განცხადებების ძიება…",

  // ─── Profile / Digital Garage ─────────────────────────────────────────────
  garageTitle:     "ჩემი სახელოსნო",
  garageMyBike:    "ჩემი მოტოციკლი",
  garageMods:      "მოდიფიკაციები",
  garageStats:     "სტატისტიკა",
  statTotalKm:     "გავლილი კმ",
  statRoutesDone:  "მარშრუტები",
  statAlertsDone:  "გაფრთხილებები",
  garageFollowers: "მიმდევარი",
  garageRides:     "გასვლა",
  editProfile:     "პროფილის რედაქტირება",
  noGarageData:    "შედით სისტემაში პროფილის სანახავად.",

  // ─── Errors / General ─────────────────────────────────────────────────────
  errorTitle:     "შეცდომა მოხდა",
  errorMapFailed: "რუკა ვერ ჩაიტვირთა.",
  errorGeneric:   "მოულოდნელი შეცდომა.",
  errorRetry:     "თავიდან ცდა",
  close:          "დახურვა",
} as const;

export type KaKey = keyof typeof KA;
