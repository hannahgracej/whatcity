import React, { useState } from "react";
import PreferencesForm from "./components/PreferencesForm";
import { recommend } from "./api";
import type { Recommendation } from "./types";

export default function App() {
  const [results, setResults] = useState<Recommendation[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(prefs: { sunny: number; parks: number; restaurants: number; transit: number }) {
    setLoading(true);
    setError(null);
    try {
      const recs = await recommend(prefs);
      setResults(recs);
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
      setResults(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ fontFamily: "system-ui, sans-serif" }}>
      <h1>US City Recommender</h1>
      <PreferencesForm onSubmit={handleSubmit} />
      {loading && <p className="small">Loading recommendations…</p>}
      {error && <p style={{ color: "#ef4444" }}>{error}</p>}
      {results && (
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2>Top Matches</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {results.map((r) => (
              <li key={r.name} className="result-item">
                <div className="result-name">{r.name}</div>
                <div className="small">Score {r.score}/100</div>
                <div className="result-reason">Why: {r.reason}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
