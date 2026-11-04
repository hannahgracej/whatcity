export type City = {
  name: string;
  state: string;
  image: string;
  description: string;
  metrics: {
    sunny: number;
    parks: number;
    restaurants: number;
    transit: number;
    affordability: number;
    lgbtq: number;
    mildWinters: number;
    nightlife: number;
  };
};

// Metrics are approximate 0-100 demo scores for this project, not official
// rankings. LGBTQ+ scores reflect a rough city-and-state impression, not a
// legal determination.
export const cities: City[] = [
  {
    name: "San Diego",
    state: "CA",
    image: "/cities/san-diego.jpg",
    description:
      "A coastal city built around beaches, balconies, and time outside. Neighborhoods stay relatively low-rise, and the weather rarely forces anyone indoors.",
    metrics: { sunny: 85, parks: 70, restaurants: 75, transit: 60, affordability: 40, lgbtq: 82, mildWinters: 92, nightlife: 68 }
  },
  {
    name: "Phoenix",
    state: "AZ",
    image: "/cities/phoenix.jpg",
    description:
      "Desert light and a wide metro where winter feels like spring somewhere else. Summers are severe, and most daily trips are by car.",
    metrics: { sunny: 95, parks: 55, restaurants: 60, transit: 50, affordability: 62, lgbtq: 58, mildWinters: 88, nightlife: 62 }
  },
  {
    name: "Los Angeles",
    state: "CA",
    image: "/cities/los-angeles.jpg",
    description:
      "A spread of neighborhoods from the coast to the canyons, with food and film culture in every direction. Getting across town usually takes a car or real patience.",
    metrics: { sunny: 85, parks: 65, restaurants: 85, transit: 65, affordability: 28, lgbtq: 86, mildWinters: 90, nightlife: 90 }
  },
  {
    name: "San Francisco",
    state: "CA",
    image: "/cities/san-francisco.jpg",
    description:
      "Hills, fog, and a dense core you can cross without a car. Parks and restaurants are part of daily life, and housing is among the most expensive in the country.",
    metrics: { sunny: 65, parks: 80, restaurants: 90, transit: 85, affordability: 12, lgbtq: 96, mildWinters: 72, nightlife: 84 }
  },
  {
    name: "Seattle",
    state: "WA",
    image: "/cities/seattle.jpg",
    description:
      "Water, ferries, and evergreen hills around a compact downtown. Gray months last a long time, and the city still makes room for coffee, trails, and a real food scene.",
    metrics: { sunny: 45, parks: 85, restaurants: 80, transit: 75, affordability: 38, lgbtq: 90, mildWinters: 58, nightlife: 74 }
  },
  {
    name: "Portland",
    state: "OR",
    image: "/cities/portland.jpg",
    description:
      "A smaller city with a serious park system and neighborhoods organized around local restaurants. The mood is informal, and the rainy season is long.",
    metrics: { sunny: 50, parks: 90, restaurants: 75, transit: 70, affordability: 52, lgbtq: 90, mildWinters: 55, nightlife: 70 }
  },
  {
    name: "New York",
    state: "NY",
    image: "/cities/new-york.jpg",
    description:
      "Subways, late dinners, and neighborhoods that feel like separate towns. The energy stays high after dark, and so does the cost of staying.",
    metrics: { sunny: 60, parks: 75, restaurants: 95, transit: 95, affordability: 8, lgbtq: 92, mildWinters: 32, nightlife: 98 }
  },
  {
    name: "Chicago",
    state: "IL",
    image: "/cities/chicago.jpg",
    description:
      "A lakefront city with serious food, a working transit system, and architecture you notice from the river. Winter is long, windy, and part of the deal.",
    metrics: { sunny: 55, parks: 70, restaurants: 85, transit: 85, affordability: 48, lgbtq: 84, mildWinters: 18, nightlife: 86 }
  },
  {
    name: "Boston",
    state: "MA",
    image: "/cities/boston.jpg",
    description:
      "Walkable neighborhoods, a busy transit system, and a harbor that turns cold for months. Universities and a tight restaurant scene sit close together.",
    metrics: { sunny: 55, parks: 75, restaurants: 80, transit: 90, affordability: 22, lgbtq: 90, mildWinters: 24, nightlife: 78 }
  },
  {
    name: "Denver",
    state: "CO",
    image: "/cities/denver.jpg",
    description:
      "High-altitude sun and quick access to the mountains, with a downtown that has filled in around a still car-oriented metro. Snow is normal, not a surprise.",
    metrics: { sunny: 80, parks: 75, restaurants: 70, transit: 65, affordability: 44, lgbtq: 80, mildWinters: 28, nightlife: 72 }
  },
  {
    name: "Austin",
    state: "TX",
    image: "/cities/austin.jpg",
    description:
      "Live music, long warm months, and a food scene that outgrew the city's old size. Prices have climbed, and many trips still need a car.",
    metrics: { sunny: 80, parks: 60, restaurants: 80, transit: 55, affordability: 50, lgbtq: 74, mildWinters: 72, nightlife: 88 }
  },
  {
    name: "Miami",
    state: "FL",
    image: "/cities/miami.jpg",
    description:
      "Tropical weather, beaches that organize the weekend, and a nightlife corridor that runs late. Summers are hot and humid, and storms are part of the calendar.",
    metrics: { sunny: 90, parks: 65, restaurants: 75, transit: 60, affordability: 34, lgbtq: 72, mildWinters: 96, nightlife: 94 }
  },
  {
    name: "Washington",
    state: "DC",
    image: "/cities/washington.jpg",
    description:
      "A monumental core, strong transit, and neighborhoods with their own dining scenes. The city is expensive, with a real winter and a long spring.",
    metrics: { sunny: 60, parks: 80, restaurants: 85, transit: 90, affordability: 24, lgbtq: 94, mildWinters: 40, nightlife: 76 }
  },
  {
    name: "Minneapolis",
    state: "MN",
    image: "/cities/minneapolis.jpg",
    description:
      "Lakes and parks sit inside the city, and summers are the payoff. Winters are long and very cold, which shapes how people live for half the year.",
    metrics: { sunny: 55, parks: 85, restaurants: 75, transit: 70, affordability: 62, lgbtq: 86, mildWinters: 8, nightlife: 66 }
  },
  {
    name: "Las Vegas",
    state: "NV",
    image: "/cities/las-vegas.jpg",
    description:
      "A desert city organized around entertainment, with a strip that stays open late and neighborhoods that are quieter and more suburban. Winters are mild and summers are harsh.",
    metrics: { sunny: 95, parks: 50, restaurants: 70, transit: 40, affordability: 58, lgbtq: 70, mildWinters: 74, nightlife: 99 }
  }
];
