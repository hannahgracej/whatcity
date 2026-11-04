# Account-wide, because a public demo can only surprise you if some other
# service in the same account starts billing too. The first two budgets on an
# account are free. Skipped until alarm_email is set, since a budget with
# nobody to notify does not help.
resource "aws_budgets_budget" "monthly" {
  count = var.alarm_email == "" ? 0 : 1

  name         = "${var.project_name}-monthly-cost"
  budget_type  = "COST"
  limit_amount = tostring(var.monthly_budget_usd)
  limit_unit   = "USD"
  time_unit    = "MONTHLY"

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 50
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = [var.alarm_email]
  }

  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "FORECASTED"
    subscriber_email_addresses = [var.alarm_email]
  }
}
