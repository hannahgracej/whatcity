import type { Preferences, Recommendation } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "";

export async function recommend(prefs: Preferences): Promise<Recommendation[]> {
  const res = await fetch(`${API_URL}/api/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prefs)
  });
  if (!res.ok) throw new Error("Failed to fetch recommendations");
  const data = (await res.json()) as { results: Recommendation[] };
  return data.results;
}
