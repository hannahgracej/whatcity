# US City Recommender (React + Node)

A simple app that takes your preferences for sunny days, park access, restaurants, and public transit, and recommends US cities that best match.

## Stack
- Frontend: React + Vite (TypeScript)
- Backend: Node.js + Express (TypeScript)

## Quick Start

Open two terminals and run:

```pwsh
# Backend
cd backend
npm install
npm run dev

# Frontend (in a new terminal)
cd ../frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and proxies `/api` to the backend on `http://localhost:5000`.

## API
- `POST /api/recommend` — body `{ sunny, parks, restaurants, transit }` with values `0-100`; returns top matches.

## Notes
- Data is approximate and normalized to 0-100 for demo purposes.
- You can tweak city metrics in `backend/src/data/cities.ts` and scoring in `backend/src/scoring.ts`.
