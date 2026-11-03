#!/usr/bin/env bash
# Build the Lambda bundle and the static frontend that Terraform publishes.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Installing backend dependencies and bundling the Lambda handler"
cd "$ROOT/backend"
npm ci
npm run build:lambda

echo "Installing frontend dependencies and building the static site"
cd "$ROOT/frontend"
npm ci
npm run build

test -f "$ROOT/backend/lambda-dist/lambda.js"
test -f "$ROOT/frontend/dist/index.html"
if grep -q 'require("@codegenie/serverless-express")' "$ROOT/backend/lambda-dist/lambda.js"; then
  echo "Lambda bundle still imports serverless-express instead of inlining it" >&2
  exit 1
fi
echo "Artifacts ready: backend/lambda-dist/lambda.js and frontend/dist/"
