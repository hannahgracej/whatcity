output "site_url" {
  description = "Public URL for the app (frontend and /api)"
  value       = "https://${aws_cloudfront_distribution.site.domain_name}"
}

output "api_endpoint" {
  description = "Direct API Gateway URL (bypasses CloudFront)"
  value       = aws_apigatewayv2_api.api.api_endpoint
}

output "lambda_log_group" {
  value = aws_cloudwatch_log_group.lambda.name
}

output "alarm_topic_arn" {
  value = aws_sns_topic.alarms.arn
}
