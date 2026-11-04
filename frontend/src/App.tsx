import React, { useEffect, useState } from "react";
import PreferencesForm from "./components/PreferencesForm";
import { recommend } from "./api";
import type { Preferences, Recommendation } from "./types";

type PhotoCredit = { file: string; title: string; author: string; license: string; source: string };

export default function App() {
  const [results, setResults] = useState<Recommendation[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [credits, setCredits] = useState<PhotoCredit[]>([]);

  useEffect(() => {
    fetch("/cities/credits.json")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: PhotoCredit[]) => setCredits(data))
      .catch(() => setCredits([]));
  }, []);

  async function handleSubmit(prefs: Preferences) {
    setLoading(true);
    setError(null);
    try {
      setResults(await recommend(prefs));
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Something went wrong";
      setError(message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <p className="eyebrow">Fifteen US cities</p>
        <h1>Find a place that fits the way you want to live.</h1>
        <p className="lede">
          Weight sun, cost, winters, nightlife, and the rest. The top three matches include a photo and a short sketch of the city.
        </p>
      </header>
      <PreferencesForm onSubmit={handleSubmit} />
      {loading && <p className="status">Looking through the cities…</p>}
      {error && <p className="status error">{error}</p>}
      {results && (
        <section className="results" aria-live="polite">
          <div className="results-head">
            <h2>Your top three</h2>
            <p>Highest match first. Scores are approximate demo data, not official rankings.</p>
          </div>
          <ol className="city-list">
            {results.map((city, index) => (
              <li key={city.name} className="city-card">
                <div className="city-photo">
                  <img src={city.image} alt={`${city.name} skyline`} />
                  <span className="rank">{index + 1}</span>
                </div>
                <div className="city-body">
                  <div className="city-top">
                    <h3>{city.name}</h3>
                    <span className="score">
                      <strong>{city.score}</strong>
                      <span>match</span>
                    </span>
                  </div>
                  <p className="description">{city.description}</p>
                  <p className="why">
                    <span>Why it matched</span>
                    {city.reason}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}
      <footer className="credits">
        <p>City photos are from Wikimedia Commons under Creative Commons or public-domain licenses.</p>
        {credits.length > 0 && (
          <ul>
            {credits.map((credit) => (
              <li key={credit.file}>
                <a href={credit.source}>{credit.title}</a>
                {" · "}
                {credit.author}
                {" · "}
                {credit.license}
              </li>
            ))}
          </ul>
        )}
      </footer>
    </div>
  );
}
