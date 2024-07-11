resource "aws_wafv2_web_acl" "waf" {
  name  = "waf-mspr"
  scope = "REGIONAL"

  default_action {
    allow {}
  }

  rule {
    name     = "sql-injection"
    priority = 1

    action {
      block {}
    }

    statement {
      byte_match_statement {
        search_string = "select"
        field_to_match {
          query_string {}
        }
        text_transformation {
          priority = 1
          type     = "NONE"
        }
        positional_constraint = "CONTAINS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "sqlInjection"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "rate-based-rule"
    priority = 2

    action {
      block {}
    }

    statement {
      rate_based_statement {
        limit              = 1000
        aggregate_key_type = "IP"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "rateLimit"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "webACL"
    sampled_requests_enabled   = true
  }
}

resource "aws_wafv2_web_acl_association" "waf" {
  resource_arn = aws_alb.mspr.arn
  web_acl_arn  = aws_wafv2_web_acl.waf.arn
}