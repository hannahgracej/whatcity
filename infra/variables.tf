variable "project" {
  description = "Name prefix for every resource"
  type        = string
  default     = "whatcity"
}

variable "region" {
  description = "AWS region for the API, Lambda, and S3 bucket"
  type        = string
  default     = "us-east-1"
}

variable "log_retention_days" {
  description = "How long to keep Lambda and API Gateway logs"
  type        = number
  default     = 14
}

variable "alarm_email" {
  description = "Email to notify when an alarm fires (leave empty to skip the subscription)"
  type        = string
  default     = ""
}

variable "api_throttle_rate" {
  description = "Steady-state requests/second allowed by API Gateway (cost guardrail)"
  type        = number
  default     = 10
}

variable "api_throttle_burst" {
  description = "Burst requests allowed by API Gateway"
  type        = number
  default     = 20
}
