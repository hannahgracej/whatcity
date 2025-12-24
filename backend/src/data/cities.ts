export type City = {
  name: string;
  state: string;
  metrics: {
    sunny: number; // 0-100
    parks: number; // 0-100
    restaurants: number; // 0-100
    transit: number; // 0-100
  };
};

export const cities: City[] = [
  { name: "San Diego", state: "CA", metrics: { sunny: 85, parks: 70, restaurants: 75, transit: 60 } },
  { name: "Phoenix", state: "AZ", metrics: { sunny: 95, parks: 55, restaurants: 60, transit: 50 } },
  { name: "Los Angeles", state: "CA", metrics: { sunny: 85, parks: 65, restaurants: 85, transit: 65 } },
  { name: "San Francisco", state: "CA", metrics: { sunny: 65, parks: 80, restaurants: 90, transit: 85 } },
  { name: "Seattle", state: "WA", metrics: { sunny: 45, parks: 85, restaurants: 80, transit: 75 } },
  { name: "Portland", state: "OR", metrics: { sunny: 50, parks: 90, restaurants: 75, transit: 70 } },
  { name: "New York", state: "NY", metrics: { sunny: 60, parks: 75, restaurants: 95, transit: 95 } },
  { name: "Chicago", state: "IL", metrics: { sunny: 55, parks: 70, restaurants: 85, transit: 85 } },
  { name: "Boston", state: "MA", metrics: { sunny: 55, parks: 75, restaurants: 80, transit: 90 } },
  { name: "Denver", state: "CO", metrics: { sunny: 80, parks: 75, restaurants: 70, transit: 65 } },
  { name: "Austin", state: "TX", metrics: { sunny: 80, parks: 60, restaurants: 80, transit: 55 } },
  { name: "Miami", state: "FL", metrics: { sunny: 90, parks: 65, restaurants: 75, transit: 60 } },
  { name: "Washington", state: "DC", metrics: { sunny: 60, parks: 80, restaurants: 85, transit: 90 } },
  { name: "Minneapolis", state: "MN", metrics: { sunny: 55, parks: 85, restaurants: 75, transit: 70 } },
  { name: "Las Vegas", state: "NV", metrics: { sunny: 95, parks: 50, restaurants: 70, transit: 40 } }
];
