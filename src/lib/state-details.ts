// Per-state details that make each /online-therapy/[state] page genuinely
// specific: bordering states (for the cross-link mesh between state pages)
// and the name the state uses for its Medicaid program. Program names are
// listed only where we are confident; everything else falls back to
// "<State> Medicaid". Names and managed-care plans change - the page always
// tells readers to confirm with the state program.

const NEIGHBORS: Record<string, string[]> = {
  alabama: ["florida", "georgia", "mississippi", "tennessee"],
  alaska: ["washington", "oregon", "hawaii"],
  arizona: ["california", "colorado", "nevada", "new-mexico", "utah"],
  arkansas: ["louisiana", "mississippi", "missouri", "oklahoma", "tennessee", "texas"],
  california: ["arizona", "nevada", "oregon"],
  colorado: ["arizona", "kansas", "nebraska", "new-mexico", "oklahoma", "utah", "wyoming"],
  connecticut: ["massachusetts", "new-york", "rhode-island"],
  delaware: ["maryland", "new-jersey", "pennsylvania"],
  florida: ["alabama", "georgia"],
  georgia: ["alabama", "florida", "north-carolina", "south-carolina", "tennessee"],
  hawaii: ["california", "washington", "alaska"],
  idaho: ["montana", "nevada", "oregon", "utah", "washington", "wyoming"],
  illinois: ["indiana", "iowa", "kentucky", "missouri", "wisconsin"],
  indiana: ["illinois", "kentucky", "michigan", "ohio"],
  iowa: ["illinois", "minnesota", "missouri", "nebraska", "south-dakota", "wisconsin"],
  kansas: ["colorado", "missouri", "nebraska", "oklahoma"],
  kentucky: ["illinois", "indiana", "missouri", "ohio", "tennessee", "virginia", "west-virginia"],
  louisiana: ["arkansas", "mississippi", "texas"],
  maine: ["new-hampshire", "massachusetts", "vermont"],
  maryland: ["delaware", "pennsylvania", "virginia", "west-virginia", "washington-dc"],
  massachusetts: ["connecticut", "new-hampshire", "new-york", "rhode-island", "vermont"],
  michigan: ["indiana", "ohio", "wisconsin"],
  minnesota: ["iowa", "north-dakota", "south-dakota", "wisconsin"],
  mississippi: ["alabama", "arkansas", "louisiana", "tennessee"],
  missouri: ["arkansas", "illinois", "iowa", "kansas", "kentucky", "nebraska", "oklahoma", "tennessee"],
  montana: ["idaho", "north-dakota", "south-dakota", "wyoming"],
  nebraska: ["colorado", "iowa", "kansas", "missouri", "south-dakota", "wyoming"],
  nevada: ["arizona", "california", "idaho", "oregon", "utah"],
  "new-hampshire": ["maine", "massachusetts", "vermont"],
  "new-jersey": ["delaware", "new-york", "pennsylvania"],
  "new-mexico": ["arizona", "colorado", "oklahoma", "texas", "utah"],
  "new-york": ["connecticut", "massachusetts", "new-jersey", "pennsylvania", "vermont"],
  "north-carolina": ["georgia", "south-carolina", "tennessee", "virginia"],
  "north-dakota": ["minnesota", "montana", "south-dakota"],
  ohio: ["indiana", "kentucky", "michigan", "pennsylvania", "west-virginia"],
  oklahoma: ["arkansas", "colorado", "kansas", "missouri", "new-mexico", "texas"],
  oregon: ["california", "idaho", "nevada", "washington"],
  pennsylvania: ["delaware", "maryland", "new-jersey", "new-york", "ohio", "west-virginia"],
  "rhode-island": ["connecticut", "massachusetts"],
  "south-carolina": ["georgia", "north-carolina"],
  "south-dakota": ["iowa", "minnesota", "montana", "nebraska", "north-dakota", "wyoming"],
  tennessee: ["alabama", "arkansas", "georgia", "kentucky", "mississippi", "missouri", "north-carolina", "virginia"],
  texas: ["arkansas", "louisiana", "new-mexico", "oklahoma"],
  utah: ["arizona", "colorado", "idaho", "nevada", "new-mexico", "wyoming"],
  vermont: ["massachusetts", "new-hampshire", "new-york"],
  virginia: ["kentucky", "maryland", "north-carolina", "tennessee", "west-virginia", "washington-dc"],
  washington: ["idaho", "oregon"],
  "washington-dc": ["maryland", "virginia"],
  "west-virginia": ["kentucky", "maryland", "ohio", "pennsylvania", "virginia"],
  wisconsin: ["illinois", "iowa", "michigan", "minnesota"],
  wyoming: ["colorado", "idaho", "montana", "nebraska", "south-dakota", "utah"],
};

// Program names we are confident about. Omitted states fall back to
// "<State> Medicaid" in medicaidProgramName().
const MEDICAID_PROGRAM: Record<string, string> = {
  alaska: "Alaska Medicaid (DenaliCare)",
  arizona: "AHCCCS (Arizona Health Care Cost Containment System)",
  arkansas: "Arkansas Medicaid (including ARHOME)",
  california: "Medi-Cal",
  colorado: "Health First Colorado",
  connecticut: "HUSKY Health",
  delaware: "Delaware Medicaid (Diamond State Health Plan)",
  hawaii: "Med-QUEST",
  illinois: "Illinois Medicaid (HealthChoice Illinois)",
  indiana: "Indiana Medicaid (including the Healthy Indiana Plan)",
  iowa: "Iowa Medicaid (IA Health Link)",
  kansas: "KanCare",
  louisiana: "Healthy Louisiana",
  maine: "MaineCare",
  maryland: "Maryland Medical Assistance (HealthChoice)",
  massachusetts: "MassHealth",
  michigan: "Michigan Medicaid (including the Healthy Michigan Plan)",
  minnesota: "Minnesota Medical Assistance (MA)",
  mississippi: "Mississippi Medicaid (MississippiCAN)",
  missouri: "MO HealthNet",
  nebraska: "Heritage Health",
  "new-jersey": "NJ FamilyCare",
  "new-mexico": "Turquoise Care",
  oklahoma: "SoonerCare",
  oregon: "the Oregon Health Plan (OHP)",
  pennsylvania: "Pennsylvania Medical Assistance (MA)",
  "south-carolina": "Healthy Connections",
  tennessee: "TennCare",
  texas: "Texas Medicaid (STAR managed care)",
  vermont: "Vermont Medicaid (Green Mountain Care)",
  virginia: "Cardinal Care",
  washington: "Apple Health",
  wisconsin: "BadgerCare Plus",
};

export function stateNeighbors(slug: string): string[] {
  return NEIGHBORS[slug] ?? [];
}

export function medicaidProgramName(slug: string, stateName: string): string {
  return MEDICAID_PROGRAM[slug] ?? `${stateName} Medicaid`;
}

/** Whether the state uses a branded program name (vs the generic fallback). */
export function hasBrandedMedicaid(slug: string): boolean {
  return slug in MEDICAID_PROGRAM;
}
