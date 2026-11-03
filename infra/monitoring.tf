resource "aws_sns_topic" "alarms" {
  name = "${local.name}-alarms"
}

resource "aws_sns_topic_subscription" "email" {
  count     = var.alarm_email == "" ? 0 : 1
  topic_arn = aws_sns_topic.alarms.arn
  protocol  = "email"
  endpoint  = var.alarm_email
}

# Any unhandled Lambda error in a 5-minute window
resource "aws_cloudwatch_metric_alarm" "lambda_errors" {
  alarm_name          = "${local.name}-api-lambda-errors"
  alarm_description   = "The API Lambda threw an error"
  namespace           = "AWS/Lambda"
  metric_name         = "Errors"
  dimensions          = { FunctionName = aws_lambda_function.api.function_name }
  statistic           = "Sum"
  period              = 300
  evaluation_periods  = 1
  threshold           = 0
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"
  alarm_actions       = [aws_sns_topic.alarms.arn]
  ok_actions          = [aws_sns_topic.alarms.arn]
}

# Server errors as the user sees them, including timeouts and throttles
resource "aws_cloudwatch_metric_alarm" "api_5xx" {
  alarm_name          = "${local.name}-api-5xx"
  alarm_description   = "API Gateway returned 5xx responses"
  namespace           = "AWS/ApiGateway"
  metric_name         = "5xx"
  dimensions          = { ApiId = aws_apigatewayv2_api.api.id, Stage = aws_apigatewayv2_stage.default.name }
  statistic           = "Sum"
  period              = 300
  evaluation_periods  = 1
  threshold           = 0
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"
  alarm_actions       = [aws_sns_topic.alarms.arn]
  ok_actions          = [aws_sns_topic.alarms.arn]
}

# p95 latency creeping up (cold starts or a slow change)
resource "aws_cloudwatch_metric_alarm" "lambda_p95_duration" {
  alarm_name          = "${local.name}-api-p95-duration"
  alarm_description   = "API Lambda p95 duration above 2s"
  namespace           = "AWS/Lambda"
  metric_name         = "Duration"
  dimensions          = { FunctionName = aws_lambda_function.api.function_name }
  extended_statistic  = "p95"
  period              = 300
  evaluation_periods  = 3
  threshold           = 2000
  comparison_operator = "GreaterThanThreshold"
  treat_missing_data  = "notBreaching"
  alarm_actions       = [aws_sns_topic.alarms.arn]
}

# Saved Logs Insights query for the structured request logs from app.ts
resource "aws_cloudwatch_query_definition" "slow_or_failed" {
  name            = "${local.name}/slow-or-failed-requests"
  log_group_names = [aws_cloudwatch_log_group.lambda.name]
  query_string    = <<-EOT
    fields @timestamp, method, path, status, durationMs
    | filter status >= 500 or durationMs > 500
    | sort @timestamp desc
    | limit 50
  EOT
}
