output "site_url" {
  description = "CloudFront URL for the static site. /api/* is proxied to API Gateway."
  value       = "https://${aws_cloudfront_distribution.site.domain_name}"
}

output "api_endpoint" {
  description = "API Gateway base URL. Append /api/health or /api/recommend."
  value       = aws_apigatewayv2_api.http.api_endpoint
}

output "lambda_function_name" {
  description = "Lambda function that runs the Express app."
  value       = aws_lambda_function.api.function_name
}

output "lambda_log_group" {
  description = "CloudWatch log group for the API function."
  value       = aws_cloudwatch_log_group.lambda.name
}

output "api_access_log_group" {
  description = "CloudWatch log group for API Gateway access logs."
  value       = aws_cloudwatch_log_group.api_access.name
}

output "alarm_name" {
  description = "CloudWatch alarm on ERROR lines in the Lambda log group."
  value       = aws_cloudwatch_metric_alarm.api_errors.alarm_name
}

output "frontend_bucket" {
  description = "Private S3 bucket that stores the built frontend."
  value       = aws_s3_bucket.frontend.bucket
}
