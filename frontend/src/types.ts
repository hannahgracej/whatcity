export type Preferences = {
  sunny: number;
  parks: number;
  restaurants: number;
  transit: number;
};

export type Recommendation = {
  name: string;
  score: number; // 0-100
  reason: string;
};
