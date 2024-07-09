resource "aws_instance" "mspr_instance" {
  ami           = "ami-0320905eab6995d03"
  instance_type = "t2.micro"
  
  associate_public_ip_address = true

  security_groups = [aws_security_group.allow_all.id]

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              yum install -y docker
              systemctl start docker
              systemctl enable docker
              git clone https://github.com/ThomasDeschampt/mspr.git /opt/mspr
              EOF
              
}