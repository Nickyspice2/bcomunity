/**
 * Georgian (ქართული) UI string constants.
 * Single source of truth for all user-facing text in the application.
 * Organised by feature area; each key mirrors its semantic meaning in English.
 */
export const KA = {
  // ─── App identity ───────────────────────────────────────────────────────────
  appName:      "GeoMotoRoutes",
  appSubtitle:  "საქართველო",

  // ─── Navigation / TopBar ────────────────────────────────────────────────────
  searchPlaceholder:  "მარშრუტების, რეგიონების, ადგილების ძიება…",
  online:             "ონლაინ",
  offline:            "ოფლაინ — ქეშირებული",
  mapLayersLabel:     "რუკის ფენები",
  activeAlerts:       "აქტიური გაფრთხილებები",
  noAlerts:           "გაფრთხილება არ არის",
  toggleSidebar:      "გვერდითი პანელი",
  clearSearch:        "გასუფთავება",
  login:              "შესვლა",
  myProfile:          "პროფილი",
  logout:             "გასვლა",

  // ─── Sidebar ─────────────────────────────────────────────────────────────────
  filters:           "ფილტრები",
  activeCount:       "აქტიური",
  resetFilters:      "გასუფთავება",
  mapLayers:         "რუკის ფენები",
  routes:            "მარშრუტები",
  roadAlerts:        "გაფრთხილებები",
  bikerSpots:        "ბიკერის ადგილები",
  roadAlertsSection: "საგზაო გაფრთხილებები",
  difficulty:        "სირთულე",
  spotsServices:     "ადგილები და სერვისი",
  featuredRoutes:    "რეკომენდებული მარშრუტები",
  kmSuffix:          "კმ",
  sidebarFooter:     "მოიცავს",
  allNineRegions:    "საქართველოს ყველა 9 რეგიონს",
  communityVerified: "საზოგადოების მიერ დამოწმებული მონაცემები.",

  // ─── Difficulty levels ───────────────────────────────────────────────────────
  difficultyBeginner:     "მარტივი",
  difficultyIntermediate: "საშუალო",
  difficultyAdvanced:     "რთული",
  difficultyExtreme:      "ექსტრემალური",

  // ─── Asphalt quality ─────────────────────────────────────────────────────────
  qualityExcellent: "შესანიშნავი",
  qualityGood:      "კარგი",
  qualityFair:      "დამაკმაყოფილებელი",
  qualityPoor:      "ცუდი",
  qualityUnpaved:   "გზა გარეშე",

  // ─── Alert types ─────────────────────────────────────────────────────────────
  alertGravel:  "ხრეში",
  alertCamera:  "სიჩქარის კამერა",
  alertWork:    "საგზაო სამუშაოები",
  alertDanger:  "საშიში მონაკვეთი",

  alertGravelDesc:  "გზის ზოლ(ებ)ზე ხრეში — სიჩქარე 50 კმ/სთ-ზე დაბლა",
  alertCameraDesc:  "ფიქსირებული სიჩქარის საკონტროლო კამერა",
  alertWorkDesc:    "მიმდინარე სამშენებლო სამუშაოები — ზოლი შეიძლება დაკეტილი იყოს",
  alertDangerDesc:  "სახიფათო მონაკვეთი — ბრმა მოხვევები, არასტაბილური ზედაპირი",

  // ─── Alert severity ──────────────────────────────────────────────────────────
  severityLow:    "დაბალი",
  severityMedium: "საშუალო",
  severityHigh:   "მაღალი",

  // ─── Spot types ──────────────────────────────────────────────────────────────
  spotCafe:     "მოტო-კაფე",
  spotFuel:     "საწვავი",
  spotViewpoint:"პანორამა",
  spotRestArea: "დასვენების ზონა",
  spotMechanic: "მექანიკოსი",
  spotHotel:    "სასტუმრო",

  // ─── Map aria label ──────────────────────────────────────────────────────────
  mapAriaLabel: "საქართველოს მოტოციკლის მარშრუტების ინტერაქტიული რუკა",

  // ─── Open filters ─────────────────────────────────────────────────────────────
  openFilters: "ფილტრების გახსნა",

  // ─── Map markers / popups ────────────────────────────────────────────────────
  distance:         "მანძილი",
  duration:         "ხანგრძლივობა",
  climb:            "აღმართი",
  region:           "რეგიონი",
  surface:          "ზედაპირი",
  verified:         "✓ დამოწმებული",
  communityReport:  "საზოგადოების რეპორტი",
  justNow:          "ახლახანს",
  reviews:          "შეფასება",
  hours:            "სამუშაო საათები",

  // ─── Map skeleton / loading ──────────────────────────────────────────────────
  mapInitialising:  "რუკა იტვირთება…",
  mapLoadingNet:    "ქსელი იტვირთება",

  // ─── Map overlay stats ───────────────────────────────────────────────────────
  statRoutes: "მარშრუტი",
  statAlerts: "გაფრთხილება",
  statSpots:  "ადგილი",

  // ─── Add alert dialog ────────────────────────────────────────────────────────
  addAlertTitle:         "საგზაო რეპორტის დამატება",
  addAlertCoords:        "კოორდინატები",
  addAlertTypeLabel:     "გაფრთხილების ტიპი",
  addAlertDescLabel:     "აღწერა",
  addAlertDescPlaceholder: "ნახეთ, სად და რა სახის პრობლემაა — ბიკერების გადასარჩენად…",
  addAlertSubmit:        "გაზიარება",
  addAlertCancel:        "გაუქმება",
  addAlertLoginRequired: "გაფრთხილების დასამატებლად გთხოვთ შეხვიდეთ სისტემაში.",

  // ─── Auth modal ──────────────────────────────────────────────────────────────
  authTabLogin:         "შესვლა",
  authTabRegister:      "რეგისტრაცია",
  authEmailLabel:       "ელ-ფოსტა",
  authEmailPlaceholder: "თქვენი@ელ-ფოსტა.ge",
  authPasswordLabel:    "პაროლი",
  authPasswordPlaceholder: "••••••••",
  authNameLabel:        "სახელი",
  authNamePlaceholder:  "თქვენი სახელი",
  authMotoLabel:        "მოტოციკლის მოდელი",
  authMotoPlaceholder:  "მაგ. Honda CB500X",
  authLoginCTA:         "შესვლა",
  authRegisterCTA:      "ანგარიშის შექმნა",
  authForgotPassword:   "პაროლი დაგავიწყდათ?",
  authSwitchToRegister: "ანგარიში არ გაქვთ?",
  authSwitchToLogin:    "უკვე გაქვთ ანგარიში?",
  authClose:            "დახურვა",
  authWelcomeBack:      "კეთილი იყოს თქვენი დაბრუნება",
  authJoinCommunity:    "შეუერთდით ბიკერების საზოგადოებას",

  // ─── Error boundary ──────────────────────────────────────────────────────────
  errorTitle:     "შეცდომა მოხდა",
  errorMapFailed: "რუკა ვერ ჩაიტვირთა.",
  errorGeneric:   "მოულოდნელი შეცდომა.",
  errorRetry:     "თავიდან ცდა",

  // ─── General ─────────────────────────────────────────────────────────────────
  close: "დახურვა",
} as const;

export type KaKey = keyof typeof KA;
