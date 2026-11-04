import React, { useState } from "react";
import type { Preferences } from "../types";

type Props = {
  initial?: Preferences;
  onSubmit: (prefs: Preferences) => void;
};

const DEFAULT_PREFS: Preferences = {
  sunny: 50,
  parks: 50,
  restaurants: 50,
  transit: 50,
  affordability: 50,
  lgbtq: 50,
  mildWinters: 50,
  nightlife: 50
};

const FIELDS: Array<{ key: keyof Preferences; label: string; hint: string; colorVar: string }> = [
  { key: "sunny", label: "Sunny days", hint: "More sun through the year", colorVar: "--color-sunny" },
  { key: "parks", label: "Parks", hint: "Parks and easy time outside", colorVar: "--color-parks" },
  { key: "restaurants", label: "Restaurants", hint: "A strong food scene", colorVar: "--color-restaurants" },
  { key: "transit", label: "Public transit", hint: "Getting around without a car", colorVar: "--color-transit" },
  { key: "affordability", label: "Lower cost of living", hint: "Favor cities that cost less", colorVar: "--color-cost" },
  { key: "lgbtq", label: "LGBTQ+ protections", hint: "Favor stronger local protections", colorVar: "--color-lgbtq" },
  { key: "mildWinters", label: "Mild winters", hint: "Favor warmer winters over hard cold", colorVar: "--color-winter" },
  { key: "nightlife", label: "Nightlife", hint: "Music, late nights, and going out", colorVar: "--color-night" }
];

function Slider({
  label,
  hint,
  value,
  onChange,
  colorVar
}: {
  label: string;
  hint: string;
  value: number;
  onChange: (v: number) => void;
  colorVar: string;
}) {
  return (
    <label className="slider">
      <span className="slider-copy">
        <span className="slider-label" style={{ color: `var(${colorVar})` }}>
          {label}
        </span>
        <span className="slider-hint">{hint}</span>
      </span>
      <span className="slider-value">{value}</span>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ accentColor: `var(${colorVar})` }}
      />
    </label>
  );
}

export default function PreferencesForm({ initial, onSubmit }: Props) {
  const [prefs, setPrefs] = useState<Preferences>(initial ?? DEFAULT_PREFS);
  return (
    <form
      className="panel"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(prefs);
      }}
    >
      <div className="panel-head">
        <h2>What should the city be like?</h2>
        <p>Slide right when that quality matters more. Every slider starts in the middle.</p>
      </div>
      <div className="slider-grid">
        {FIELDS.map((field) => (
          <Slider
            key={field.key}
            label={field.label}
            hint={field.hint}
            colorVar={field.colorVar}
            value={prefs[field.key]}
            onChange={(value) => setPrefs((current) => ({ ...current, [field.key]: value }))}
          />
        ))}
      </div>
      <button type="submit">Find my city</button>
    </form>
  );
}
