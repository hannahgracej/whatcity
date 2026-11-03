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

## AWS Deployment (Terraform)

```
                 ┌──────────────── CloudFront (one HTTPS domain) ───────────────┐
 browser ──────► │  /*      → S3 bucket (private, Origin Access Control)        │
                 │  /api/*  → API Gateway (HTTP API, throttled) → Lambda        │
                 └──────────────────────────────────────────────────────────────┘
                                            │
                       CloudWatch: Lambda + API access logs, alarms → SNS email
```

- **Lambda** runs the same Express app as local dev via `serverless-http` ([backend/src/lambda.ts](backend/src/lambda.ts)), bundled with esbuild into one file (Node 22, arm64).
- **API Gateway** HTTP API with a single `ANY /api/{proxy+}` route — Express does the routing. Stage-level throttling caps cost.
- **S3 + CloudFront** serve the Vite build. The bucket is fully private; only this distribution can read it. Because `/api/*` is routed through the same CloudFront domain, the frontend calls a relative URL and there's no CORS to configure.
- **IAM**: the Lambda role can only write to its own log group — nothing else.
- **CloudWatch**: 14-day log retention, structured JSON request logs, JSON API Gateway access logs, a saved Logs Insights query, and alarms on Lambda errors, API 5xx and p95 latency, sent to an SNS topic (optional email).

All infrastructure lives in [infra/](infra/).

### Deploy

Prereqs: Node 22, Terraform ≥ 1.6, AWS CLI configured (`aws configure` or SSO).

```pwsh
copy infra\terraform.tfvars.example infra\terraform.tfvars   # set alarm_email
./deploy.ps1            # builds, shows the plan, asks before applying
```

The `site_url` output is the live app. If you set `alarm_email`, confirm the SNS subscription email AWS sends.

### Tear down

```pwsh
./deploy.ps1 -Destroy
```

At portfolio traffic this costs close to nothing; CloudWatch alarms are the only thing you pay for at rest (~$0.10/alarm/month).

## Notes
- Data is approximate and normalized to 0-100 for demo purposes.
- You can tweak city metrics in `backend/src/data/cities.ts` and scoring in `backend/src/scoring.ts`.
