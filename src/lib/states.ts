// US states dataset powering the programmatic /online-therapy/[state] pages.
// Cities and region are used to vary the on-page content and meta per state so
// each page is genuinely specific, not a thin duplicate. `abbr` is what provider
// `excludedStates` entries are matched against.

export interface StateInfo {
  name: string;
  abbr: string;
  slug: string;
  cities: string[]; // 3 major metros, for content variation
  region: string;
}

export const STATES: StateInfo[] = [
  { name: "Alabama", abbr: "AL", slug: "alabama", cities: ["Birmingham", "Montgomery", "Huntsville"], region: "the South" },
  { name: "Alaska", abbr: "AK", slug: "alaska", cities: ["Anchorage", "Fairbanks", "Juneau"], region: "the Pacific Northwest" },
  { name: "Arizona", abbr: "AZ", slug: "arizona", cities: ["Phoenix", "Tucson", "Mesa"], region: "the Southwest" },
  { name: "Arkansas", abbr: "AR", slug: "arkansas", cities: ["Little Rock", "Fayetteville", "Fort Smith"], region: "the South" },
  { name: "California", abbr: "CA", slug: "california", cities: ["Los Angeles", "San Diego", "San Francisco"], region: "the West Coast" },
  { name: "Colorado", abbr: "CO", slug: "colorado", cities: ["Denver", "Colorado Springs", "Aurora"], region: "the Mountain West" },
  { name: "Connecticut", abbr: "CT", slug: "connecticut", cities: ["Bridgeport", "New Haven", "Hartford"], region: "New England" },
  { name: "Delaware", abbr: "DE", slug: "delaware", cities: ["Wilmington", "Dover", "Newark"], region: "the Mid-Atlantic" },
  { name: "Florida", abbr: "FL", slug: "florida", cities: ["Miami", "Orlando", "Tampa"], region: "the Southeast" },
  { name: "Georgia", abbr: "GA", slug: "georgia", cities: ["Atlanta", "Augusta", "Savannah"], region: "the South" },
  { name: "Hawaii", abbr: "HI", slug: "hawaii", cities: ["Honolulu", "Hilo", "Kailua"], region: "the Pacific" },
  { name: "Idaho", abbr: "ID", slug: "idaho", cities: ["Boise", "Meridian", "Nampa"], region: "the Mountain West" },
  { name: "Illinois", abbr: "IL", slug: "illinois", cities: ["Chicago", "Aurora", "Naperville"], region: "the Midwest" },
  { name: "Indiana", abbr: "IN", slug: "indiana", cities: ["Indianapolis", "Fort Wayne", "Evansville"], region: "the Midwest" },
  { name: "Iowa", abbr: "IA", slug: "iowa", cities: ["Des Moines", "Cedar Rapids", "Davenport"], region: "the Midwest" },
  { name: "Kansas", abbr: "KS", slug: "kansas", cities: ["Wichita", "Overland Park", "Kansas City"], region: "the Midwest" },
  { name: "Kentucky", abbr: "KY", slug: "kentucky", cities: ["Louisville", "Lexington", "Bowling Green"], region: "the South" },
  { name: "Louisiana", abbr: "LA", slug: "louisiana", cities: ["New Orleans", "Baton Rouge", "Shreveport"], region: "the South" },
  { name: "Maine", abbr: "ME", slug: "maine", cities: ["Portland", "Lewiston", "Bangor"], region: "New England" },
  { name: "Maryland", abbr: "MD", slug: "maryland", cities: ["Baltimore", "Columbia", "Germantown"], region: "the Mid-Atlantic" },
  { name: "Massachusetts", abbr: "MA", slug: "massachusetts", cities: ["Boston", "Worcester", "Springfield"], region: "New England" },
  { name: "Michigan", abbr: "MI", slug: "michigan", cities: ["Detroit", "Grand Rapids", "Ann Arbor"], region: "the Midwest" },
  { name: "Minnesota", abbr: "MN", slug: "minnesota", cities: ["Minneapolis", "St. Paul", "Rochester"], region: "the Midwest" },
  { name: "Mississippi", abbr: "MS", slug: "mississippi", cities: ["Jackson", "Gulfport", "Southaven"], region: "the South" },
  { name: "Missouri", abbr: "MO", slug: "missouri", cities: ["Kansas City", "St. Louis", "Springfield"], region: "the Midwest" },
  { name: "Montana", abbr: "MT", slug: "montana", cities: ["Billings", "Missoula", "Bozeman"], region: "the Mountain West" },
  { name: "Nebraska", abbr: "NE", slug: "nebraska", cities: ["Omaha", "Lincoln", "Bellevue"], region: "the Midwest" },
  { name: "Nevada", abbr: "NV", slug: "nevada", cities: ["Las Vegas", "Henderson", "Reno"], region: "the Southwest" },
  { name: "New Hampshire", abbr: "NH", slug: "new-hampshire", cities: ["Manchester", "Nashua", "Concord"], region: "New England" },
  { name: "New Jersey", abbr: "NJ", slug: "new-jersey", cities: ["Newark", "Jersey City", "Paterson"], region: "the Mid-Atlantic" },
  { name: "New Mexico", abbr: "NM", slug: "new-mexico", cities: ["Albuquerque", "Las Cruces", "Santa Fe"], region: "the Southwest" },
  { name: "New York", abbr: "NY", slug: "new-york", cities: ["New York City", "Buffalo", "Rochester"], region: "the Northeast" },
  { name: "North Carolina", abbr: "NC", slug: "north-carolina", cities: ["Charlotte", "Raleigh", "Greensboro"], region: "the Southeast" },
  { name: "North Dakota", abbr: "ND", slug: "north-dakota", cities: ["Fargo", "Bismarck", "Grand Forks"], region: "the Midwest" },
  { name: "Ohio", abbr: "OH", slug: "ohio", cities: ["Columbus", "Cleveland", "Cincinnati"], region: "the Midwest" },
  { name: "Oklahoma", abbr: "OK", slug: "oklahoma", cities: ["Oklahoma City", "Tulsa", "Norman"], region: "the South" },
  { name: "Oregon", abbr: "OR", slug: "oregon", cities: ["Portland", "Salem", "Eugene"], region: "the Pacific Northwest" },
  { name: "Pennsylvania", abbr: "PA", slug: "pennsylvania", cities: ["Philadelphia", "Pittsburgh", "Allentown"], region: "the Mid-Atlantic" },
  { name: "Rhode Island", abbr: "RI", slug: "rhode-island", cities: ["Providence", "Warwick", "Cranston"], region: "New England" },
  { name: "South Carolina", abbr: "SC", slug: "south-carolina", cities: ["Charleston", "Columbia", "Greenville"], region: "the Southeast" },
  { name: "South Dakota", abbr: "SD", slug: "south-dakota", cities: ["Sioux Falls", "Rapid City", "Aberdeen"], region: "the Midwest" },
  { name: "Tennessee", abbr: "TN", slug: "tennessee", cities: ["Nashville", "Memphis", "Knoxville"], region: "the South" },
  { name: "Texas", abbr: "TX", slug: "texas", cities: ["Houston", "San Antonio", "Dallas"], region: "the South" },
  { name: "Utah", abbr: "UT", slug: "utah", cities: ["Salt Lake City", "West Valley City", "Provo"], region: "the Mountain West" },
  { name: "Vermont", abbr: "VT", slug: "vermont", cities: ["Burlington", "Essex", "Rutland"], region: "New England" },
  { name: "Virginia", abbr: "VA", slug: "virginia", cities: ["Virginia Beach", "Richmond", "Norfolk"], region: "the Mid-Atlantic" },
  { name: "Washington", abbr: "WA", slug: "washington", cities: ["Seattle", "Spokane", "Tacoma"], region: "the Pacific Northwest" },
  { name: "West Virginia", abbr: "WV", slug: "west-virginia", cities: ["Charleston", "Huntington", "Morgantown"], region: "the South" },
  { name: "Wisconsin", abbr: "WI", slug: "wisconsin", cities: ["Milwaukee", "Madison", "Green Bay"], region: "the Midwest" },
  { name: "Wyoming", abbr: "WY", slug: "wyoming", cities: ["Cheyenne", "Casper", "Laramie"], region: "the Mountain West" },
  { name: "Washington, D.C.", abbr: "DC", slug: "washington-dc", cities: ["Washington"], region: "the Mid-Atlantic" },
];

export const STATE_BY_SLUG = new Map(STATES.map((s) => [s.slug, s]));
