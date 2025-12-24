import type { City } from "./data/cities";

export type Preferences = {
  sunny: number;
  parks: number;
  restaurants: number;
  transit: number;
};

export function clampPref(x: number): number {
  if (Number.isNaN(x)) return 0;
  return Math.max(0, Math.min(100, x));
}

export function scoreCity(city: City, prefs: Preferences) {
  const wSunny = clampPref(prefs.sunny);
  const wParks = clampPref(prefs.parks);
  const wRestaurants = clampPref(prefs.restaurants);
  const wTransit = clampPref(prefs.transit);
  const sumW = wSunny + wParks + wRestaurants + wTransit || 1;
  const s =
    (wSunny * city.metrics.sunny +
      wParks * city.metrics.parks +
      wRestaurants * city.metrics.restaurants +
      wTransit * city.metrics.transit) /
    sumW;
  return s; // 0-100
}

export function explain(city: City, prefs: Preferences): string {
  const reasons: string[] = [];
  const thresholds = { high: 70, mid: 40 };
  if (prefs.sunny >= thresholds.mid && city.metrics.sunny >= thresholds.high)
    reasons.push("very sunny");
  if (prefs.parks >= thresholds.mid && city.metrics.parks >= thresholds.high)
    reasons.push("strong park access");
  if (prefs.restaurants >= thresholds.mid && city.metrics.restaurants >= thresholds.high)
    reasons.push("great restaurants");
  if (prefs.transit >= thresholds.mid && city.metrics.transit >= thresholds.high)
    reasons.push("excellent public transit");
  if (!reasons.length) reasons.push("balanced match across preferences");
  return reasons.join(", ");
}
