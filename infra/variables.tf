variable "aws_region" {
  description = "Region for Lambda, API Gateway, S3, and CloudWatch. CloudFront stays global."
  type        = string
  default     = "us-east-2"
}

variable "project_name" {
  description = "Short name used in resource names and tags."
  type        = string
  default     = "whatcity"
}

variable "log_retention_days" {
  description = "How long CloudWatch keeps Lambda and API Gateway logs."
  type        = number
  default     = 14
}

variable "alarm_email" {
  description = "Optional address that subscribes to the alarm topic. Leave empty to keep the alarm in the CloudWatch console only."
  type        = string
  default     = ""
}

variable "api_rate_limit" {
  description = "Steady API Gateway requests per second. Two per second caps a full month of abuse near a few dollars."
  type        = number
  default     = 2
}

variable "api_burst_limit" {
  description = "Short API Gateway burst so a handful of visitors can submit together."
  type        = number
  default     = 20
}

variable "monthly_budget_usd" {
  description = "Account-wide monthly cost alert. Created only when alarm_email is set. The first two AWS Budgets are free."
  type        = number
  default     = 10
}

variable "allowed_origin" {
  description = "Browser origin allowed to call the API directly. Use * for the public demo, or the CloudFront URL after the first apply."
  type        = string
  default     = "*"
}
