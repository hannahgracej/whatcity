# US City Recommender (React + Node)

A small app that takes preferences for sunny days, park access, restaurants, and public transit, and recommends US cities that match.

## Stack

- Frontend: React + Vite, hosted on private S3 behind CloudFront
- Backend: Express on Lambda, fronted by API Gateway
- Infrastructure: Terraform (IAM, Lambda, API Gateway, CloudWatch, S3, CloudFront)

```
Browser
  → CloudFront
      → S3          static site
      → /api/*      API Gateway HTTP API → Lambda (Express)
Lambda logs → CloudWatch Logs → metric filter → alarm → SNS
```

The dataset is static, so the function runs outside a VPC. There is no database and no NAT gateway.

## Local development

```bash
npm run install:all
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies `/api` to the backend on `http://localhost:5000`.

- `GET /api/health`
- `POST /api/recommend` with `{ sunny, parks, restaurants, transit }` from `0` to `100`. Returns the top five matches.

City metrics live in `backend/src/data/cities.ts`. Scoring lives in `backend/src/scoring.ts`.

## Deploy to AWS

Requirements: Terraform 1.5+, Node 20+, and AWS credentials with permission to create the resources in `infra/`. Regional resources are created in `us-east-2`, this project's selected Region. CloudFront stays global.

```bash
./scripts/build-aws.sh
cd infra
terraform init
terraform apply
```

`terraform apply` prints `site_url` and `api_endpoint`. CloudFront takes a few minutes after apply before the site answers.

```bash
curl "$(terraform output -raw api_endpoint)/api/health"
curl -s -X POST "$(terraform output -raw api_endpoint)/api/recommend" \
  -H 'content-type: application/json' \
  -d '{"sunny":80,"parks":40,"restaurants":70,"transit":20}'
```

Open `site_url` and submit the form. The page calls `/api/recommend` on the same CloudFront host, and CloudFront forwards that path to API Gateway. The API Gateway URL also works on its own.

To tear the stack down:

```bash
terraform destroy
```

Optional settings are in `infra/terraform.tfvars.example`. Copy it to `terraform.tfvars` (gitignored) and set `alarm_email` if the alarm should email you. Confirm that subscription in your inbox. With no email, the alarm still appears in the CloudWatch console.

### What the Terraform creates

- **IAM.** A Lambda execution role whose only permission is writing to this function's log group.
- **Lambda.** One Node.js 20 function. `backend/src/lambda.ts` adapts the same Express app used locally. The bundle is built with esbuild.
- **API Gateway.** An HTTP API with a `$default` stage, proxy routes, access logs, and a low throttle for a demo.
- **CloudWatch.** 14-day retention on Lambda logs and API access logs. A metric filter counts log lines containing `ERROR`. An alarm fires when that count is at least 1 in five minutes, and publishes to an SNS topic.
- **S3 and CloudFront.** The Vite build is uploaded to a private bucket. CloudFront reads it with origin access control. Hashed assets are cached; `/api/*` is not.

Logs Insights query for the function log group:

```
fields @timestamp, @message
| filter @message like /ERROR/
| sort @timestamp desc
| limit 20
```

Rebuild `./scripts/build-aws.sh` before the next apply when the app changes. Terraform hashes the Lambda zip and the frontend files, so a new apply publishes both.
