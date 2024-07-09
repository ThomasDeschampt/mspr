resource "aws_db_instance" "rds_instance" {
  identifier            = "mydbinstance"
  allocated_storage     = 20
  storage_type          = "gp2"
  engine                = "mysql"
  engine_version        = "5.7"
  instance_class        = "db.t2.micro"
  username              = "admin"
  password              = "mspr32024"
  publicly_accessible   = true 
}
