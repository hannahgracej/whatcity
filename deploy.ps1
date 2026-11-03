# Build the Lambda bundle and the frontend, then apply Terraform.
# Usage: ./deploy.ps1            (plan + prompt before apply)
#        ./deploy.ps1 -Destroy   (tear everything down)
param([switch]$Destroy)
$ErrorActionPreference = "Stop"

if ($Destroy) {
  terraform -chdir=infra destroy
  exit $LASTEXITCODE
}

npm --prefix backend install
npm --prefix backend run build:lambda
npm --prefix frontend ci
npm --prefix frontend run build

terraform -chdir=infra init -upgrade
terraform -chdir=infra apply
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$url = terraform -chdir=infra output -raw site_url
Write-Host "`nDeployed: $url  (first CloudFront deploy can take a few minutes to go live)"
