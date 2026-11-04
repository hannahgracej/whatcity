export type Preferences = {
  sunny: number;
  parks: number;
  restaurants: number;
  transit: number;
  affordability: number;
  lgbtq: number;
  mildWinters: number;
  nightlife: number;
};

export type Recommendation = {
  name: string;
  score: number;
  reason: string;
  description: string;
  image: string;
};
