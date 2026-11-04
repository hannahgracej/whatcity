import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { cities } from "./data/cities";
import { clampPref, explain, scoreCity, type Preferences } from "./scoring";

dotenv.config();

export const app = express();

const allowedOrigin = process.env.ALLOWED_ORIGIN;
app.use(
  cors({
    origin: allowedOrigin && allowedOrigin !== "*" ? allowedOrigin : true
  })
);
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  const started = Date.now();
  res.on("finish", () => {
    const status = res.statusCode;
    const line = JSON.stringify({
      level: status >= 500 ? "ERROR" : "INFO",
      method: req.method,
      path: req.originalUrl,
      status,
      durationMs: Date.now() - started
    });
    if (status >= 500) console.error(line);
    else console.log(line);
  });
  next();
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/recommend", (req, res) => {
  const prefs: Preferences = {
    sunny: clampPref(Number(req.body?.sunny ?? 0)),
    parks: clampPref(Number(req.body?.parks ?? 0)),
    restaurants: clampPref(Number(req.body?.restaurants ?? 0)),
    transit: clampPref(Number(req.body?.transit ?? 0)),
    affordability: clampPref(Number(req.body?.affordability ?? 0)),
    lgbtq: clampPref(Number(req.body?.lgbtq ?? 0)),
    mildWinters: clampPref(Number(req.body?.mildWinters ?? 0)),
    nightlife: clampPref(Number(req.body?.nightlife ?? 0))
  };

  const ranked = cities
    .map((city) => ({
      city,
      score: scoreCity(city, prefs)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((row) => ({
      name: `${row.city.name}, ${row.city.state}`,
      score: Math.round(row.score),
      reason: explain(row.city, prefs),
      description: row.city.description,
      image: row.city.image
    }));

  res.json({ results: ranked });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof SyntaxError) {
    console.log(JSON.stringify({ level: "INFO", message: "invalid json" }));
    res.status(400).json({ error: "Invalid JSON" });
    return;
  }
  console.error(JSON.stringify({ level: "ERROR", message: err.message }));
  res.status(500).json({ error: "Internal error" });
});
