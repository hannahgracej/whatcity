import React, { useState } from "react";
import type { Preferences } from "../types";

type Props = {
  initial?: Preferences;
  onSubmit: (prefs: Preferences) => void;
};

function Slider({ label, value, onChange, colorVar }: { label: string; value: number; onChange: (v: number) => void; colorVar: string }) {
  return (
    <label>
      <div style={{ fontWeight: 600, color: `var(${colorVar})` }}>{label}: {value}</div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ accentColor: `var(${colorVar})` }}
      />
    </label>
  );
}

export default function PreferencesForm({ initial, onSubmit }: Props) {
  const [prefs, setPrefs] = useState<Preferences>(
    initial ?? { sunny: 50, parks: 50, restaurants: 50, transit: 50 }
  );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(prefs);
      }}
      className="card card-pad"
      style={{ maxWidth: 640, margin: "24px auto" }}
    >
      <h2>What matters to you?</h2>
      <p className="small">Set how important each is (0-100).</p>
      <Slider label="Sunny Days" colorVar="--color-sunny" value={prefs.sunny} onChange={(v) => setPrefs((p) => ({ ...p, sunny: v }))} />
      <Slider label="Parks Access" colorVar="--color-parks" value={prefs.parks} onChange={(v) => setPrefs((p) => ({ ...p, parks: v }))} />
      <Slider label="Restaurants" colorVar="--color-restaurants" value={prefs.restaurants} onChange={(v) => setPrefs((p) => ({ ...p, restaurants: v }))} />
      <Slider label="Public Transit" colorVar="--color-transit" value={prefs.transit} onChange={(v) => setPrefs((p) => ({ ...p, transit: v }))} />
      <button type="submit" style={{ marginTop: 16 }}>Find My City</button>
    </form>
  );
}
