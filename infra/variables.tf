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

variable "allowed_origin" {
  description = "Browser origin allowed to call the API directly. Use * for the public demo, or the CloudFront URL after the first apply."
  type        = string
  default     = "*"
}
