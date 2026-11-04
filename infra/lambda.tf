resource "terraform_data" "build_artifacts" {
  lifecycle {
    precondition {
      condition     = fileexists("${path.module}/../backend/lambda-dist/lambda.js") && fileexists("${path.module}/../frontend/dist/index.html")
      error_message = "Build artifacts are missing. From the repo root run ./scripts/build-aws.sh, then re-run Terraform."
    }
  }
}

data "archive_file" "lambda" {
  type        = "zip"
  source_file = "${path.module}/../backend/lambda-dist/lambda.js"
  output_path = "${path.module}/build/lambda.zip"

  depends_on = [terraform_data.build_artifacts]
}

resource "aws_lambda_function" "api" {
  function_name = local.function_name
  description   = "Whatcity Express API, proxied by API Gateway."
  role          = aws_iam_role.lambda.arn
  filename      = data.archive_file.lambda.output_path
  handler       = "lambda.handler"
  runtime       = "nodejs20.x"
  timeout       = 10
  memory_size   = 256

  source_code_hash = data.archive_file.lambda.output_base64sha256

  environment {
    variables = {
      ALLOWED_ORIGIN = var.allowed_origin
      NODE_ENV       = "production"
    }
  }

  logging_config {
    log_format            = "JSON"
    application_log_level = "INFO"
    system_log_level      = "WARN"
    log_group             = aws_cloudwatch_log_group.lambda.name
  }

  depends_on = [
    aws_iam_role_policy.lambda_logs,
    aws_cloudwatch_log_group.lambda
  ]
}
