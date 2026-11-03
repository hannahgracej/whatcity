import express from "express";
import cors from "cors";
import { cities } from "./data/cities";
import { scoreCity, explain, type Preferences } from "./scoring";

export const app = express();
app.use(cors());
app.use(express.json());

// One JSON line per request so CloudWatch Logs Insights can query by field
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(
      JSON.stringify({
        level: res.statusCode >= 500 ? "error" : "info",
        method: req.method,
        path: req.path,
        status: res.statusCode,
        durationMs: Date.now() - start
      })
    );
  });
  next();
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/recommend", (req, res) => {
  const prefs: Preferences = {
    sunny: Number(req.body?.sunny ?? 0),
    parks: Number(req.body?.parks ?? 0),
    restaurants: Number(req.body?.restaurants ?? 0),
    transit: Number(req.body?.transit ?? 0)
  };

  const ranked = cities
    .map((c) => ({
      city: c,
      score: scoreCity(c, prefs)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((r) => ({
      name: `${r.city.name}, ${r.city.state}`,
      score: Math.round(r.score),
      reason: explain(r.city, prefs)
    }));

  res.json({ results: ranked });
});
