import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { cities } from "./data/cities";
import { scoreCity, explain, type Preferences } from "./scoring";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 5000;

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

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
