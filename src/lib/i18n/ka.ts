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
  navMarketplace: "მოტო-ბაზარი",
  navHub:         "მოტო-ჰაბი",
  navProfile:     "ჩემი გვერდი",

  // ─── TopBar ───────────────────────────────────────────────────────────────
  searchPlaceholder: "ბიკერების, კლუბების, ბაზრის ძიება…",
  online:            "ონლაინ",
  offline:           "ოფლაინ",
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
  joinRideAction:  "შეერთება",
  joinedLabel:     "შეერთებული",
  paceSlow:        "ნელი",
  paceMedium:      "საშუალო",
  paceFast:        "სწრაფი",
  ridersCount:     "მონაწილე",
  gatheringPoint:  "შეკრების ადგილი",
  gatheringTime:   "შეკრების დრო",
  noPostsYet:      "ჯერ პოსტები არ არის.",
  noRidesYet:      "ახლო მომავალში გასვლები არ არის.",

  // ─── Clubs ────────────────────────────────────────────────────────────────
  joinClub:        "გაწევრება",
  joinedClub:      "წევრი ხარ",
  clubVerified:    "დამოწმებული",
  clubFounded:     "დაარსდა",
  clubMemberCount: "წევრი",
  noClubsYet:      "კლუბები ჯერ არ არის.",

  // ─── Marketplace ─────────────────────────────────────────────────────────
  marketplaceTitle:    "მოტო-ბაზარი",
  marketplaceSubtitle: "ბიკერიდან ბიკერისთვის",
  catAll:              "ყველა",
  catBikes:            "მოტოციკლები",
  catGear:             "ეკიპირება",
  catParts:            "ნაწილები",
  condNew:             "ახალი",
  condLikeNew:         "საღად ნახ.",
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
  searchListings:      "განცხადებების ძიება…",

  // ─── Hub — directory ──────────────────────────────────────────────────────
  hubTitle:             "მოტო-ჰაბი",
  hubSubtitle:          "სერვისები · ოსტატები · ქალაქის ჩატები",
  directoryTitle:       "ხელოსნები და სერვისები",
  directorySubtitle:    "ქართველი ბიკერების სანდო სერვის-პარტნიორები",
  catAllServices:       "ყველა",
  catMechanic:          "მექანიკოსი",
  catTires:             "საბურავები",
  catTowing:            "ბუქსირი",
  catPartsStore:        "ნაწილები",
  catWash:              "გარეცხვა",
  contactProvider:      "კონტაქტი",
  ratingLabel:          "შეფასება",
  reviewsLabel:         "მიმოხილვა",
  workingHoursLabel:    "სამ. საათები",
  servicesLabel:        "სერვისები",
  noServicesFound:      "ამ კატეგორიაში სერვისები არ მოიძებნა.",
  addServiceListing:    "სერვისის დამატება",

  // ─── Hub — city chat ──────────────────────────────────────────────────────
  cityChatsTitle:       "ქალაქის ჩატები",
  cityChatsSubtitle:    "სპონტანური გასვლები · გზის სიახლეები · ბიკერ-ანონსები",
  chatPlaceholder:      "შეტყობინება…",
  chatSendBtn:          "გაგზავნა",
  chatLoginRequired:    "შეტყობინებებისთვის შედით სისტემაში.",
  chatLoginBtn:         "შესვლა",
  liveLabel:            "live",

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

  // ─── Profile / Digital Garage ─────────────────────────────────────────────
  garageTitle:     "ჩემი სახელოსნო",
  garageMyBike:    "ჩემი მოტოციკლი",
  garageMods:      "მოდიფიკაციები",
  garageStats:     "სტატისტიკა",
  statTotalKm:     "გავლილი კმ",
  statRoutesDone:  "მარშრუტები",
  statAlertsDone:  "გაფრთხილებები",
  garageFollowers: "მიმდევარი",
  editProfile:     "პროფილის რედაქტირება",
  noGarageData:    "შედით სისტემაში პროფილის სანახავად.",

  // ─── General ──────────────────────────────────────────────────────────────
  errorTitle:   "შეცდომა მოხდა",
  errorGeneric: "მოულოდნელი შეცდომა.",
  errorRetry:   "თავიდან ცდა",
  close:        "დახურვა",
} as const;

export type KaKey = keyof typeof KA;
