import type { City } from "./data/cities";

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

export function clampPref(x: number): number {
  if (Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(100, x));
}

const WEIGHTS: Array<[keyof Preferences, keyof City["metrics"]]> = [
  ["sunny", "sunny"],
  ["parks", "parks"],
  ["restaurants", "restaurants"],
  ["transit", "transit"],
  ["affordability", "affordability"],
  ["lgbtq", "lgbtq"],
  ["mildWinters", "mildWinters"],
  ["nightlife", "nightlife"]
];

export function scoreCity(city: City, prefs: Preferences) {
  let weighted = 0;
  let sumW = 0;
  for (const [prefKey, metricKey] of WEIGHTS) {
    const weight = clampPref(prefs[prefKey]);
    weighted += weight * city.metrics[metricKey];
    sumW += weight;
  }
  return weighted / (sumW || 1);
}

export function explain(city: City, prefs: Preferences): string {
  const reasons: string[] = [];
  const thresholds = { high: 70, mid: 40 };
  const notes: Array<[keyof Preferences, keyof City["metrics"], string]> = [
    ["sunny", "sunny", "very sunny"],
    ["parks", "parks", "strong park access"],
    ["restaurants", "restaurants", "great restaurants"],
    ["transit", "transit", "excellent public transit"],
    ["affordability", "affordability", "more affordable than most of this list"],
    ["lgbtq", "lgbtq", "stronger LGBTQ+ protections"],
    ["mildWinters", "mildWinters", "mild winters"],
    ["nightlife", "nightlife", "a busy nightlife"]
  ];
  for (const [prefKey, metricKey, label] of notes) {
    if (prefs[prefKey] >= thresholds.mid && city.metrics[metricKey] >= thresholds.high) {
      reasons.push(label);
    }
  }
  if (!reasons.length) reasons.push("a balanced match across your preferences");
  return reasons.join(", ");
}
