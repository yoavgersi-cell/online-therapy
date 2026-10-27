// Hand-written, state-specific notes for the /online-therapy/[state] pages.
// The point is that no two state pages read the same: each carries facts that
// are true of that state and not of its neighbours - the license titles its
// boards issue, its time zone (which decides when out-of-metro therapists are
// available), whether it expanded Medicaid, cross-border metros, military
// presence, and the access realities of its geography. Every statement is
// general public knowledge a reader can verify on the state board's or
// Medicaid program's site; nothing here is a number we could not source.

export interface StateNote {
  /** License titles issued by this state's boards, as shown on therapist profiles. */
  licenses: string[];
  /** Time zone(s) the state keeps. */
  timeZone: string;
  /** Whether the state has adopted ACA Medicaid expansion for low-income adults. */
  medicaidExpanded: boolean;
  /** 100-160 words, written for this state only. */
  note: string;
}

export const STATE_NOTES: Record<string, StateNote> = {
  alabama: {
    licenses: ["LPC", "LICSW", "LMFT", "licensed psychologist"],
    timeZone: "Central",
    medicaidExpanded: false,
    note: "Alabama's therapist pool is concentrated in Birmingham, Huntsville, Montgomery and Mobile, and much of the state - the Black Belt counties especially - has few or no local practices. Online matching from the whole statewide pool changes that more here than in most states. Alabama has not adopted Medicaid expansion, so adults without children or a disability often fall outside Medicaid eligibility; for them, employer EAPs, Talkspace's $69-per-week messaging tier and betterhelp's financial-aid questionnaire are the realistic routes, and the insurance checks matter doubly because a covered plan is the only path to copay-level pricing. Military families near Redstone Arsenal and Maxwell Air Force Base can run the Talkspace check with TRICARE details.",
  },
  alaska: {
    licenses: ["LPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Alaska (one hour behind Pacific)",
    medicaidExpanded: true,
    note: "Alaska is the state where online therapy solves the most: many communities are off the road system entirely, the nearest therapist can be a flight away, and winter darkness is a real factor in mood for a lot of residents. Two practical points. Alaska runs one hour behind Pacific time, so when you set availability, a therapist in Anchorage and one in Fairbanks keep the same clock but the platform's scheduling tools may default to a mainland zone - check the session time twice. And where broadband is limited, phone sessions are a legitimate, covered format on the platforms we compare. Alaska Medicaid, branded DenaliCare, covers behavioral health; military families at Joint Base Elmendorf-Richardson and Eielson can use TRICARE details in the Talkspace check.",
  },
  arizona: {
    licenses: ["LPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Mountain, without daylight saving time (except the Navajo Nation)",
    medicaidExpanded: true,
    note: "Arizona does not observe daylight saving time, which has a small but real effect on online therapy: for half the year the state runs on the same clock as California and for the other half on the same clock as Colorado, so a weekly slot with a therapist who schedules in another zone shifts by an hour every spring and autumn. Arizona also has one of the largest seasonal populations in the country; if you winter in Arizona and summer elsewhere, your therapist must be licensed in the state you are physically in, so tell the platform before you travel. Arizona's Medicaid program is AHCCCS, which covers behavioral health. Spanish-speaking therapists are a common request at intake in Phoenix and Tucson; availability varies by platform, so ask early.",
  },
  arkansas: {
    licenses: ["LPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Central",
    medicaidExpanded: true,
    note: "Outside Little Rock and the Northwest Arkansas corridor around Fayetteville and Bentonville, Arkansas is rural, and the therapist shortage in the Delta and the Ozarks is the main reason residents look online. Arkansas expanded Medicaid through its ARHOME program, which uses private marketplace plans to cover eligible adults - so if you are on ARHOME, run the platform eligibility checks with your plan card, not a generic Medicaid card, because the platform may be in-network with the underlying insurer. Where home broadband is thin, phone sessions keep therapy going without a drive to town.",
  },
  california: {
    licenses: ["LPCC", "LMFT", "LCSW", "licensed psychologist"],
    timeZone: "Pacific",
    medicaidExpanded: true,
    note: "California has the largest licensed therapist pool of any state, which cuts both ways online: more choice of specialty, language and background than anywhere else, and more competition for the therapists people most want. Two things are specific to California. Its clinical counselor license is the LPCC rather than the LPC used in most states, and the LMFT is unusually common here, so expect to see both on profiles. And its Medicaid program, Medi-Cal, covers mental-health care through county-based managed-care plans, so which online platform is in-network can differ from Los Angeles County to Sacramento County; run the check with your county plan details. Therapists who work in Spanish, Mandarin, Cantonese, Tagalog, Vietnamese and Korean are easier to find in California than almost anywhere, but still ask at intake.",
  },
  colorado: {
    licenses: ["LPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Mountain",
    medicaidExpanded: true,
    note: "Most of Colorado's therapists are on the Front Range - Denver, Boulder, Colorado Springs, Fort Collins - and the mountain and Western Slope counties have far fewer, so online matching from the statewide pool matters most for residents west of the Divide and on the Eastern Plains. Colorado's Medicaid program is Health First Colorado, which covers behavioral health through regional organizations; run the platform checks with those details. Colorado Springs has a large military population around Fort Carson, Peterson and the Air Force Academy, so the Talkspace TRICARE check applies to many households. Mountain time means East Coast-based platform support runs two hours ahead of you, which is worth knowing when you schedule a first session or wait on a messaging response.",
  },
  connecticut: {
    licenses: ["LPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern",
    medicaidExpanded: true,
    note: "Connecticut is small and dense, and a large share of residents in Fairfield County commute into New York. The licensing rule bites here: your therapist must be licensed in the state you are physically in during the session, so a Stamford resident who takes a lunchtime session from a Manhattan office needs a New York-licensed therapist for that session, not a Connecticut one. The simplest fix is to take sessions from home. Connecticut's Medicaid program is HUSKY Health, which covers behavioral health; run the platform checks with HUSKY details. The therapist market in Hartford, New Haven and Fairfield County is deep, so being specific about specialty and preferences at intake pays off.",
  },
  delaware: {
    licenses: ["LPCMH", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern",
    medicaidExpanded: true,
    note: "Delaware's clinical counselor title is the LPCMH, a credential you will see nowhere else, and its small licensed pool is one reason residents turn to online platforms that draw from every Delaware-licensed clinician rather than the practices in Wilmington and Dover. Many Delawareans work in Pennsylvania, New Jersey or Maryland; sessions taken from a workplace across the line need a therapist licensed in that state, so take them from home. Delaware's Medicaid program, the Diamond State Health Plan, covers behavioral health through managed-care plans; run the platform checks with your plan card.",
  },
  florida: {
    licenses: ["LMHC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern (Central in the western Panhandle)",
    medicaidExpanded: false,
    note: "Three things make Florida different online. First, its retiree population means Medicare matters more here than in any other large state: Medicare Part B covers telehealth therapy from home, and Talkspace lists Medicare among the plans it works with, so run that check with Medicare or Medicare Advantage details. Second, seasonal residents: if you spend part of the year elsewhere, your therapist must be licensed where you are, so plan for a re-match or a compact-privileged clinician before you leave. Third, Florida has not adopted Medicaid expansion, which leaves many working adults without Medicaid; EAPs, financial aid and the $69 messaging tier are the fallbacks. Florida's counselor title is the LMHC. Spanish-speaking therapists are a common request in South Florida and Orlando, and hurricane season is one more argument for a format that does not depend on an office being open.",
  },
  georgia: {
    licenses: ["LPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern",
    medicaidExpanded: false,
    note: "Georgia's therapist pool is heavily concentrated in metro Atlanta; south and rural Georgia have some of the thinnest coverage in the Southeast, which is where statewide online matching helps most. Georgia has not adopted full Medicaid expansion, so many adults without children fall outside Medicaid eligibility and need the self-pay or employer routes - run the EAP question past HR first. Military families around Fort Benning, Fort Gordon, Fort Stewart and Robins Air Force Base can use TRICARE details in the Talkspace check. Atlanta's deep market makes specific requests - a therapist of a particular background, faith or specialty - more likely to be met than in most Southern states.",
  },
  hawaii: {
    licenses: ["LMHC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Hawaii-Aleutian, without daylight saving time",
    medicaidExpanded: true,
    note: "Hawaii's time zone shapes online therapy here more than anywhere else: the islands run two to three hours behind the West Coast and five to six behind the East Coast, with no daylight saving shift, so platform support hours and any therapist who schedules in a mainland zone can feel out of reach in the afternoon. Set your availability in Hawaii time and confirm the session clock. Inter-island access is the other factor: residents of Maui, Kauai, Molokai and the Big Island have far fewer local therapists than Honolulu, and online matching from the statewide pool is often the only way to find a specialist. Hawaii's Medicaid program is Med-QUEST, which covers behavioral health. The large military population on Oahu can use TRICARE details in the Talkspace check.",
  },
  idaho: {
    licenses: ["LCPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Mountain (Pacific in the northern panhandle)",
    medicaidExpanded: true,
    note: "Idaho is one of the few states split across two time zones - Mountain in Boise and the south, Pacific in the northern panhandle around Coeur d'Alene - so check which clock your session is set to if your therapist is at the other end of the state. Outside the Treasure Valley, Idaho is rural and therapist-scarce, and online matching from the statewide pool is the main route to a specialist. Idaho's counselor title is the LCPC. Voters expanded Medicaid in 2018 and coverage took effect in 2020, so low-income adults are eligible; run the platform checks with Idaho Medicaid details and keep the regional community mental-health centers in mind as the fallback that always accepts it.",
  },
  illinois: {
    licenses: ["LCPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Central",
    medicaidExpanded: true,
    note: "Illinois is really two therapy markets: Chicagoland, with one of the deepest therapist pools in the country, and downstate, where many counties have almost no local clinicians. Online matching draws from both, which is why a resident of Carbondale or Quincy can see a Chicago-licensed specialist without the drive. Illinois's counselor title is the LCPC. Its Medicaid program runs through HealthChoice Illinois managed-care plans, so run the platform checks with your plan's card rather than a generic Medicaid card. Residents of the Metro East who work in St. Louis should take sessions from the Illinois side, because the therapist must be licensed where you are during the session.",
  },
  indiana: {
    licenses: ["LMHC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern (Central in the northwest and southwest corners)",
    medicaidExpanded: true,
    note: "Indiana keeps Eastern time in most of the state but Central time in the counties near Chicago and Evansville, so a Gary or Evansville resident matched with an Indianapolis therapist should confirm which clock the session uses. Indiana's counselor title is the LMHC. Its Medicaid coverage for adults runs through the Healthy Indiana Plan (HIP) and Hoosier Healthwise for families; run the platform checks with those details. Outside Indianapolis, Fort Wayne and the college towns, rural Indiana has long waits for local therapists, which is the usual reason residents look online.",
  },
  iowa: {
    licenses: ["LMHC", "LISW", "LMFT", "licensed psychologist"],
    timeZone: "Central",
    medicaidExpanded: true,
    note: "Iowa's therapists cluster in Des Moines, the Cedar Rapids-Iowa City corridor and the Quad Cities, and much of the rest of the state is farm country with few practices. Online matching from the statewide pool is the practical answer for rural counties. Iowa's social-work title is the LISW rather than the LCSW used elsewhere. Its Medicaid program, IA Health Link, covers behavioral health through managed-care plans - run the platform checks with your plan card. Quad Cities residents who live on the Illinois side need an Illinois-licensed therapist; the river is also a licensing line.",
  },
  kansas: {
    licenses: ["LCPC", "LSCSW", "LCMFT", "licensed psychologist"],
    timeZone: "Central (Mountain in a few western counties)",
    medicaidExpanded: false,
    note: "The Kansas City metro straddles the Kansas-Missouri line, and the licensing rule makes that matter: a resident of Overland Park who takes sessions from an office in Kansas City, Missouri needs a Missouri-licensed therapist for those sessions. Take them from home and you are matched from the Kansas pool. Kansas's titles are distinctive - LCPC for counselors, LSCSW for clinical social workers, LCMFT for family therapists. Kansas has not adopted Medicaid expansion, so KanCare covers a narrower group of adults; for working adults without coverage, EAPs, the $69 messaging tier and financial aid are the realistic routes. Western Kansas is sparsely served, and a few counties keep Mountain time.",
  },
  kentucky: {
    licenses: ["LPCC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern (Central in the west)",
    medicaidExpanded: true,
    note: "Kentucky is split between Eastern time in Louisville, Lexington and the east and Central time in the west around Paducah and Bowling Green, so confirm the session clock when matched across the line. Eastern Kentucky's Appalachian counties are among the most therapist-scarce in the country, and online matching from the statewide pool is often the only route to a specialist there; where broadband is unreliable, phone sessions are a covered option. Kentucky's counselor title is the LPCC. The state expanded Medicaid, and Kentucky Medicaid covers behavioral health through managed-care plans; run the platform checks with your plan card.",
  },
  louisiana: {
    licenses: ["LPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Central",
    medicaidExpanded: true,
    note: "New Orleans, Baton Rouge and Lafayette hold most of Louisiana's therapists; the rural parishes north and west have few. Louisiana expanded Medicaid, and its program - Healthy Louisiana - covers behavioral health through managed-care plans, so run the platform checks with your plan card. Hurricane season is a practical argument for online therapy here: a therapeutic relationship that lives on a platform survives an evacuation in a way an office appointment does not, and if you are displaced to another state for weeks, tell your platform, because the therapist must be licensed where you are. Fort Polk and Barksdale Air Force Base families can use TRICARE details in the Talkspace check.",
  },
  maine: {
    licenses: ["LCPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern",
    medicaidExpanded: true,
    note: "Maine is the most rural state in the Northeast and has one of the oldest populations in the country, which shapes online therapy in two ways. Distances: outside Portland, Lewiston and Bangor, the nearest therapist can be an hour or more away, and winter makes that drive worse, so online matching from the statewide pool is the practical answer for most of the state. Age: Medicare matters here more than in most states, and Medicare Part B covers telehealth therapy from home, with phone sessions a legitimate option; Talkspace lists Medicare among the plans it works with. Maine's counselor title is the LCPC, and its Medicaid program is MaineCare, which covers behavioral health.",
  },
  maryland: {
    licenses: ["LCPC", "LCSW-C", "LCMFT", "licensed psychologist"],
    timeZone: "Eastern",
    medicaidExpanded: true,
    note: "A large share of Maryland residents work in Washington, DC or Northern Virginia, and the licensing rule means a session taken from a DC office needs a DC-licensed therapist. Take sessions from home in Montgomery or Prince George's County and you are matched from the Maryland pool. Maryland's titles are distinctive: LCPC for counselors and LCSW-C for clinical social workers. Its Medicaid program, Maryland Medical Assistance, runs through HealthChoice managed-care plans, so run the platform checks with your plan card. Federal employees and contractors should check their agency EAP before paying for anything; the sessions are free and confidential.",
  },
  massachusetts: {
    licenses: ["LMHC", "LICSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern",
    medicaidExpanded: true,
    note: "Massachusetts has a deep therapist market and, in greater Boston especially, high demand for it - waits for a local practice can be long even with good insurance, which is a common reason residents look online. Its titles are the LMHC for counselors and the LICSW for clinical social workers. MassHealth, the state's Medicaid program, covers behavioral health broadly and is one of the more generous state programs; run the platform checks with MassHealth details, and if no platform is in-network, the state's community behavioral health centers are the fallback. Residents of the Merrimack Valley who work in New Hampshire should take sessions from the Massachusetts side.",
  },
  michigan: {
    licenses: ["LPC", "LMSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern (Central in the western Upper Peninsula)",
    medicaidExpanded: true,
    note: "Michigan's Upper Peninsula is one of the most therapist-scarce regions east of the Mississippi, and its westernmost counties keep Central time, so a Marquette or Ironwood resident matched with a Detroit-area therapist should confirm the session clock. Michigan's clinical social-work title is the LMSW. The state expanded Medicaid through the Healthy Michigan Plan, which covers behavioral health; run the platform checks with Healthy Michigan or Michigan Medicaid details. Metro Detroit, Grand Rapids and Ann Arbor have deep therapist markets where specific requests at intake are likely to be met.",
  },
  minnesota: {
    licenses: ["LPCC", "LICSW", "LMFT", "licensed psychologist"],
    timeZone: "Central",
    medicaidExpanded: true,
    note: "The Twin Cities hold most of Minnesota's therapists; the northern and western counties have few, and winter makes the drive to the nearest one harder, so online matching from the statewide pool is the practical route for much of the state. Minnesota's titles are the LPCC for counselors and the LICSW for clinical social workers. Its Medicaid program is called Medical Assistance (MA), and the state also runs MinnesotaCare for people just above Medicaid income limits; run the platform checks with whichever card you hold. Minnesota has a large Hmong, Somali and Latino population, and therapists who work in those languages are more findable online than through a single local practice - ask at intake.",
  },
  mississippi: {
    licenses: ["LPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Central",
    medicaidExpanded: false,
    note: "Mississippi has one of the lowest ratios of therapists to residents in the country, with most practices in Jackson, the Gulf Coast and the college towns, and online matching from the statewide pool is often the only way a Delta resident reaches a specialist at all. Where broadband is unreliable, phone sessions are a covered format. Mississippi has not adopted Medicaid expansion, so many working adults fall outside Medicaid; for them the routes are an employer EAP, Talkspace's $69 messaging tier, betterhelp's financial-aid questionnaire, and the community mental-health centers that serve every region of the state on a sliding scale. Keesler Air Force Base and Camp Shelby families can use TRICARE details in the Talkspace check.",
  },
  missouri: {
    licenses: ["LPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Central",
    medicaidExpanded: true,
    note: "Both of Missouri's big metros sit on state lines - Kansas City against Kansas, St. Louis against Illinois - and the licensing rule means a session taken from an office across the line needs a therapist licensed in that state. Take sessions from home and you are matched from the Missouri pool. Between the metros, the Ozarks and the Bootheel are thinly served, which is where statewide online matching helps most. Missouri voters expanded Medicaid in 2020, and coverage through MO HealthNet now includes low-income adults; run the platform checks with MO HealthNet details. Fort Leonard Wood and Whiteman Air Force Base families can use TRICARE in the Talkspace check.",
  },
  montana: {
    licenses: ["LCPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Mountain",
    medicaidExpanded: true,
    note: "Montana is frontier country for mental-health access: outside Billings, Missoula, Bozeman and Great Falls, the nearest therapist can be two hours away on roads that close in winter, and some counties have none. Online matching from the statewide pool is not a convenience here; it is often the only route to care, and phone sessions carry it where broadband does not reach. Montana's counselor title is the LCPC. The state expanded Medicaid, and Montana Medicaid covers behavioral health; run the platform checks with those details, and keep the regional community mental-health centers in mind as the fallback that always accepts it. Malmstrom Air Force Base families can use TRICARE in the Talkspace check.",
  },
  nebraska: {
    licenses: ["LIMHP", "LICSW", "LMFT", "licensed psychologist"],
    timeZone: "Central (Mountain in the western Panhandle)",
    medicaidExpanded: true,
    note: "Nebraska's independent mental-health license is the LIMHP, a title unique to the state, and most clinicians who hold it practice in Omaha and Lincoln; the Sandhills and the Panhandle have very few, and the Panhandle keeps Mountain time, so confirm the session clock when matched across the state. Omaha residents who live or work in Council Bluffs should take sessions from the Nebraska side, since Iowa licensing applies across the river. Nebraska voters expanded Medicaid in 2018, and the program - Heritage Health - covers behavioral health through managed-care plans; run the platform checks with your plan card. Offutt Air Force Base families can use TRICARE in the Talkspace check.",
  },
  nevada: {
    licenses: ["CPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Pacific",
    medicaidExpanded: true,
    note: "Nevada's economy runs around the clock, and that is the specific reason online therapy fits here: hospitality and casino workers in Las Vegas and Reno keep schedules no office practice accommodates, and platforms that offer evening, weekend and messaging-based care are built for exactly that. Ask at intake for a therapist with late or weekend availability; the statewide pool makes it findable. Nevada's counselor title is the CPC, Clinical Professional Counselor, rather than the LPC used in most states. Outside the two metros, rural Nevada is among the most sparsely served areas in the West, and phone sessions carry care where broadband is thin. Nevada Medicaid covers behavioral health through managed-care plans in the urban counties; run the platform checks with your plan card. Nellis Air Force Base families can use TRICARE in the Talkspace check.",
  },
  "new-hampshire": {
    licenses: ["LCMHC", "LICSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern",
    medicaidExpanded: true,
    note: "A large share of southern New Hampshire commutes into Massachusetts, and the licensing rule means a session taken from a Boston-area office needs a Massachusetts-licensed therapist; take sessions from home in Nashua or Manchester and you are matched from the New Hampshire pool. The North Country has few local therapists and long winters, which is where statewide online matching matters most. New Hampshire's titles are the LCMHC for counselors and the LICSW for clinical social workers. The state expanded Medicaid through its Granite Advantage program, which covers behavioral health; run the platform checks with New Hampshire Medicaid details.",
  },
  "new-jersey": {
    licenses: ["LPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern",
    medicaidExpanded: true,
    note: "New Jersey is the commuter state, and the licensing rule is the thing to know: your therapist must be licensed in the state you are physically in during the session, so a session taken from a Manhattan or Philadelphia office needs a New York- or Pennsylvania-licensed therapist. Take sessions from home and you are matched from the New Jersey pool, which is deep in the northern counties and thinner in the south and the Pine Barrens. New Jersey's Medicaid program is NJ FamilyCare, which covers behavioral health through managed-care plans; run the platform checks with your plan card. The state's size means statewide matching is less about distance than about choice - specific requests for language, background or specialty are usually met.",
  },
  "new-mexico": {
    licenses: ["LPCC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Mountain",
    medicaidExpanded: true,
    note: "Outside Albuquerque, Santa Fe and Las Cruces, New Mexico is one of the most sparsely served states for mental health, and online matching from the statewide pool is often the only route to a specialist; phone sessions carry care where broadband does not reach. New Mexico's counselor title is the LPCC. Its Medicaid program was renamed Turquoise Care in 2024, and it covers behavioral health through managed-care plans - run the platform checks with your Turquoise Care plan card. Spanish-speaking therapists are a frequent request here, and the statewide pool makes them more findable than any one town's practices. Kirtland, Holloman and Cannon Air Force Base families can use TRICARE in the Talkspace check.",
  },
  "new-york": {
    licenses: ["LMHC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern",
    medicaidExpanded: true,
    note: "New York City has one of the deepest therapist markets in the world and upstate has some of the thinnest coverage in the Northeast, and online matching draws from both, which is why a resident of the North Country or the Southern Tier can see a Manhattan-licensed specialist without the drive. New York's counselor title is the LMHC. New York State Medicaid covers behavioral health broadly through managed-care plans; run the platform checks with your plan card. The city's language diversity shows up online too - therapists who work in Spanish, Chinese, Russian, Haitian Creole and many other languages are findable through statewide matching. Commuters from New Jersey and Connecticut who take sessions from a New York office need a New York-licensed therapist for those sessions.",
  },
  "north-carolina": {
    licenses: ["LCMHC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern",
    medicaidExpanded: true,
    note: "North Carolina expanded Medicaid in December 2023, which brought coverage to a large number of working adults who had none - if you were turned down for NC Medicaid before then, you may qualify now, and the platform checks are worth re-running. Its counselor title is the LCMHC. The Triangle and Charlotte have deep therapist markets; the east and the mountain west are thinly served, which is where statewide online matching helps most. North Carolina has one of the largest military populations in the country around Fort Bragg, Camp Lejeune and Seymour Johnson, so TRICARE details in the Talkspace check apply to many households, and Veterans can use VA telehealth alongside.",
  },
  "north-dakota": {
    licenses: ["LPCC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Central (Mountain in the southwest)",
    medicaidExpanded: true,
    note: "North Dakota's therapists are in Fargo, Bismarck, Grand Forks and Minot; the rest of the state is some of the most sparsely populated land in the country, and the oil-patch counties in the west add shift schedules that no office practice fits. Online matching from the statewide pool, with evening and messaging options, is the practical answer, and phone sessions carry care where broadband is thin. The southwestern corner keeps Mountain time, so confirm the session clock. North Dakota's counselor title is the LPCC. The state expanded Medicaid, and ND Medicaid covers behavioral health; run the platform checks with those details. Minot and Grand Forks Air Force Base families can use TRICARE in the Talkspace check.",
  },
  ohio: {
    licenses: ["LPCC", "LISW", "IMFT", "licensed psychologist"],
    timeZone: "Eastern",
    medicaidExpanded: true,
    note: "Ohio's three big metros - Columbus, Cleveland and Cincinnati - each have deep therapist markets, while Appalachian southeast Ohio is among the most thinly served regions in the Midwest, and online matching from the statewide pool bridges that gap. Ohio's titles are distinctive: LPCC for counselors, LISW for independent social workers and IMFT for family therapists. The state expanded Medicaid, and Ohio Medicaid covers behavioral health through managed-care plans; run the platform checks with your plan card. Cincinnati residents who live in Northern Kentucky need a Kentucky-licensed therapist - the river is a licensing line. Wright-Patterson Air Force Base families can use TRICARE in the Talkspace check.",
  },
  oklahoma: {
    licenses: ["LPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Central",
    medicaidExpanded: true,
    note: "Oklahoma voters expanded Medicaid in 2020 and coverage through SoonerCare took effect in 2021, so low-income adults who were ineligible a few years ago may qualify now; run the platform checks with SoonerCare details. Outside Oklahoma City and Tulsa, the state is rural and therapist-scarce, and online matching from the statewide pool is the practical route to a specialist. Oklahoma has one of the largest Native American populations in the country, and tribal health systems provide behavioral-health services alongside anything a platform offers; the two can be used together. Tinker, Vance and Altus Air Force Base and Fort Sill families can use TRICARE in the Talkspace check.",
  },
  oregon: {
    licenses: ["LPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Pacific (Mountain in a sliver of the east)",
    medicaidExpanded: true,
    note: "Portland and the Willamette Valley hold most of Oregon's therapists; east of the Cascades, the high desert counties have very few, and online matching from the statewide pool is the practical answer there. Oregon's Medicaid program is the Oregon Health Plan (OHP), delivered through regional coordinated care organizations, so run the platform checks with your CCO's details rather than a generic Medicaid card. Portland-area residents who live in Vancouver, Washington need a Washington-licensed therapist - the Columbia is a licensing line - and the same applies in reverse for Washington commuters taking sessions from a Portland office.",
  },
  pennsylvania: {
    licenses: ["LPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern",
    medicaidExpanded: true,
    note: "Philadelphia and Pittsburgh have deep therapist markets; the rural middle of the state - the long stretch between them - is thinly served, and online matching from the statewide pool is how a resident of a rural county reaches a specialist without a long drive. Pennsylvania's Medicaid program is called Medical Assistance (MA) and covers behavioral health through regional managed-care plans; run the platform checks with your plan card. Philadelphia-area residents who work in New Jersey or Delaware, and Pittsburgh-area residents near the Ohio and West Virginia lines, should take sessions from the Pennsylvania side, because the therapist must be licensed where you are during the session.",
  },
  "rhode-island": {
    licenses: ["LMHC", "LICSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern",
    medicaidExpanded: true,
    note: "Rhode Island is small enough that distance is rarely the problem; choice is. The licensed pool is modest, and online matching from every Rhode Island-licensed clinician - rather than the practices in Providence and Warwick - is how residents find a specialist in a particular concern, language or background. Many Rhode Islanders work in Massachusetts, and a session taken from a Boston-area office needs a Massachusetts-licensed therapist; take sessions from home. Rhode Island's titles are the LMHC and the LICSW. Rhode Island Medicaid covers behavioral health through managed-care plans; run the platform checks with your plan card. Naval Station Newport families can use TRICARE in the Talkspace check.",
  },
  "south-carolina": {
    licenses: ["LPC", "LISW-CP", "LMFT", "licensed psychologist"],
    timeZone: "Eastern",
    medicaidExpanded: false,
    note: "South Carolina has not adopted Medicaid expansion, so many working adults fall outside its Healthy Connections program; for them, an employer EAP, Talkspace's $69 messaging tier, betterhelp's financial-aid questionnaire and the state's community mental-health centers are the realistic routes, and the insurance checks matter because a covered plan is the only path to copay-level pricing. Its clinical social-work title is the LISW-CP, unique to the state. Greenville, Columbia and Charleston have reasonable therapist markets; the Pee Dee and the rural midlands do not, which is where statewide online matching helps most. Fort Jackson, Parris Island, Shaw and Joint Base Charleston families can use TRICARE in the Talkspace check.",
  },
  "south-dakota": {
    licenses: ["LPC-MH", "CSW-PIP", "LMFT", "licensed psychologist"],
    timeZone: "Central (Mountain in the west)",
    medicaidExpanded: true,
    note: "South Dakota is split between Central time in Sioux Falls and the east and Mountain time in Rapid City and the Black Hills, so confirm the session clock when matched across the state. Between the two, the reservations and the prairie counties are among the most therapist-scarce areas in the country, and online matching with phone sessions is often the only route to care. South Dakota's titles are unusual: LPC-MH for mental-health counselors and CSW-PIP for clinical social workers in private practice. Voters expanded Medicaid in 2022 and coverage began in 2023, so adults who were ineligible before may qualify now; run the platform checks with SD Medicaid details. Ellsworth Air Force Base families can use TRICARE in the Talkspace check.",
  },
  tennessee: {
    licenses: ["LPC-MHSP", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Central (Eastern in East Tennessee)",
    medicaidExpanded: false,
    note: "Tennessee keeps Central time in Nashville, Memphis and the west and Eastern time in Knoxville, Chattanooga and the east, so a cross-state match should confirm which clock the session uses. Tennessee has not adopted Medicaid expansion, so TennCare covers a narrower group of adults; for working adults without coverage, the routes are an employer EAP, the $69 messaging tier, financial aid and the community mental-health centers. Tennessee's counselor title is the LPC-MHSP - the suffix designates a mental-health service provider who can diagnose - and it is the credential to look for on profiles. Nashville and Memphis have deep markets; the Cumberland Plateau and the rural west do not. Fort Campbell families can use TRICARE in the Talkspace check.",
  },
  texas: {
    licenses: ["LPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Central (Mountain in El Paso and the far west)",
    medicaidExpanded: false,
    note: "Texas is big enough to have two time zones - El Paso keeps Mountain time - and big enough that the drive to the nearest therapist in the Panhandle, West Texas or the Valley can be hours, which is why statewide online matching matters here more than in most states. Texas has not adopted Medicaid expansion, and its Medicaid program covers few adults without children or a disability; for working Texans without coverage, an employer EAP, Talkspace's $69 messaging tier and betterhelp's financial-aid questionnaire are the realistic routes, and the insurance checks matter because a covered plan is the only path to copay pricing. Spanish-speaking therapists are a common request across the state and are more findable through the statewide pool than any one city's practices. Texas has one of the largest military populations in the country - Fort Hood, Fort Bliss, Joint Base San Antonio and more - so TRICARE details in the Talkspace check apply to many households.",
  },
  utah: {
    licenses: ["CMHC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Mountain",
    medicaidExpanded: true,
    note: "Most of Utah's therapists are on the Wasatch Front between Ogden and Provo; southern and eastern Utah have few, and online matching from the statewide pool is the route to a specialist for residents of St. George, Moab or the Uinta Basin. Utah's counselor title is the CMHC, Clinical Mental Health Counselor, rather than the LPC used in most states. Voters expanded Medicaid in 2018, and Utah Medicaid covers behavioral health through managed-care plans; run the platform checks with your plan card. Utah has one of the youngest populations in the country and a large share of families, so couples and family therapy - Talkspace's couples plan is $109 per week self-pay, and family therapy may be covered when it treats a diagnosed condition - comes up more often here than elsewhere. Hill Air Force Base families can use TRICARE in the Talkspace check.",
  },
  vermont: {
    licenses: ["LCMHC", "LICSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern",
    medicaidExpanded: true,
    note: "Vermont is rural almost everywhere outside Burlington, winters are long, and the licensed pool is small, so online matching from every Vermont-licensed clinician is how residents of the Northeast Kingdom or the southern counties find a specialist without a long drive on winter roads. Vermont's titles are the LCMHC for counselors and the LICSW for clinical social workers. Its Medicaid program operates under the Green Mountain Care umbrella and covers behavioral health broadly - it is one of the more generous state programs - so run the platform checks with Vermont Medicaid details and keep the state's designated community mental-health agencies in mind as the fallback that always accepts it.",
  },
  virginia: {
    licenses: ["LPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern",
    medicaidExpanded: true,
    note: "Virginia is two very different therapy markets: Northern Virginia, where many residents commute into Washington, DC and a session taken from a DC office needs a DC-licensed therapist, and the rest of the state, where Southwest Virginia's Appalachian counties are among the most thinly served in the East. Online matching from the statewide pool serves both. Virginia expanded Medicaid in 2019, and its program - now branded Cardinal Care - covers behavioral health through managed-care plans; run the platform checks with your plan card. Hampton Roads has one of the largest concentrations of military households in the country, so TRICARE details in the Talkspace check apply widely, and Veterans can use VA telehealth alongside. Federal employees should ask about their agency EAP before paying for anything.",
  },
  washington: {
    licenses: ["LMHC", "LICSW", "LMFT", "licensed psychologist"],
    timeZone: "Pacific",
    medicaidExpanded: true,
    note: "The Seattle-Tacoma corridor has a deep therapist market; eastern Washington - Spokane aside - and the Olympic Peninsula are thinly served, and online matching from the statewide pool is how residents there reach a specialist. Washington's titles are the LMHC for counselors and the LICSW for clinical social workers. Its Medicaid program is Apple Health, which covers behavioral health through managed-care plans; run the platform checks with your plan card. Vancouver, Washington residents who work in Portland need an Oregon-licensed therapist for sessions taken there - the Columbia is a licensing line - so take them from home. Joint Base Lewis-McChord, Naval Base Kitsap and Fairchild families can use TRICARE in the Talkspace check.",
  },
  "washington-dc": {
    licenses: ["LPC", "LICSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern",
    medicaidExpanded: true,
    note: "The District is a licensing island: a therapist treating you must be licensed in DC if you are in DC during the session, and in Maryland or Virginia if you are at home across the line. For the many people who live in one jurisdiction and work in another, that means choosing where sessions happen - usually home - and telling the platform, which matches you from the pool licensed there. DC's titles are the LPC and the LICSW. DC Medicaid covers behavioral health broadly and is one of the more generous programs in the country; run the platform checks with DC Medicaid details. Federal employees and contractors should ask about their agency EAP first - the sessions are free and confidential - and the deep local market means specific requests for a therapist's background or specialty are likely to be met.",
  },
  "west-virginia": {
    licenses: ["LPC", "LICSW", "LMFT", "licensed psychologist"],
    timeZone: "Eastern",
    medicaidExpanded: true,
    note: "West Virginia is almost entirely Appalachian and almost entirely rural outside Charleston, Huntington and Morgantown, with some of the longest waits for local mental-health care in the East; online matching from the statewide pool, with phone sessions where broadband does not reach, is often the only route to a specialist. The state expanded Medicaid, and WV Medicaid covers behavioral health through managed-care plans; run the platform checks with your plan card. West Virginia's clinical social-work title is the LICSW. Residents of the Eastern Panhandle who commute into Maryland, Virginia or the DC area should take sessions from the West Virginia side, because the therapist must be licensed where you are.",
  },
  wisconsin: {
    licenses: ["LPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Central",
    medicaidExpanded: false,
    note: "Milwaukee and Madison hold most of Wisconsin's therapists; the Northwoods and the western counties have few, and winter makes the drive worse, so online matching from the statewide pool is the practical route for much of the state. Wisconsin's Medicaid program for adults, BadgerCare Plus, covers adults up to the federal poverty line without having adopted the ACA expansion, so eligibility is narrower than in neighboring Minnesota, Illinois and Michigan; run the platform checks with BadgerCare details, and for working adults just above the line, an employer EAP, the $69 messaging tier and financial aid are the fallbacks. Residents of the Twin Cities suburbs on the Wisconsin side need a Wisconsin-licensed therapist - the St. Croix is a licensing line.",
  },
  wyoming: {
    licenses: ["LPC", "LCSW", "LMFT", "licensed psychologist"],
    timeZone: "Mountain",
    medicaidExpanded: false,
    note: "Wyoming is the least populous state, and outside Cheyenne, Casper and Laramie the nearest therapist can be hours away on roads that close in winter; online matching from the statewide pool is not a convenience here but the main route to care, and phone sessions carry it where broadband does not reach. The licensed pool is small, so a specialist in a particular concern is far more findable statewide than in any one town. Wyoming has not adopted Medicaid expansion, so many working adults fall outside Wyoming Medicaid; for them, an employer EAP, Talkspace's $69 messaging tier, betterhelp's financial-aid questionnaire and the regional community mental-health centers are the realistic routes. F.E. Warren Air Force Base families can use TRICARE in the Talkspace check.",
  },
};

export function stateNote(slug: string): StateNote | undefined {
  return STATE_NOTES[slug];
}
