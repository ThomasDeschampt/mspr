output "ec2_instance_public_ip" {
  value = aws_instance.mspr_instance.public_ip
}

output "rds_instance_endpoint" {
  value = aws_db_instance.rds_instance.endpoint
}