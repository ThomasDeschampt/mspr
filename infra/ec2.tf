resource "aws_security_group" "ec2" {
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_launch_configuration" "backend" {
  name            = "mspr-backend-launch-config"
  image_id        = "ami-0c55b159cbfafe1f0" 
  instance_type   = "t2.micro"
  security_groups = [aws_security_group.ec2.id]

  lifecycle {
    create_before_destroy = true
  }

  user_data = <<-EOF
              #!/bin/bash
              yum update -y
              amazon-linux-extras install docker -y
              service docker start
              usermod -a -G docker ec2-user
              git clone https://github.com/ThomasDeschampt/mspr.git
              EOF
}

resource "aws_autoscaling_group" "asg" {
  desired_capacity     = 1
  max_size             = 3
  min_size             = 1
  vpc_zone_identifier  = [aws_subnet.public.id]
  launch_configuration = aws_launch_configuration.backend.id
}

resource "aws_alb" "mspr" {
  name               = "mspr-alb"
  load_balancer_type = "application"
  security_groups    = [aws_security_group.ec2.id]
  subnets            = [aws_subnet.public.id]

  enable_deletion_protection = false
}

resource "aws_alb_target_group" "tg" {
  name     = "example-tg"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id

  health_check {
    healthy_threshold   = 5
    unhealthy_threshold = 2
    timeout             = 3
    path                = "/"
    interval            = 30
    matcher             = "200"
  }
}

resource "aws_alb_listener" "listener" {
  load_balancer_arn = aws_alb.mspr.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.tg.arn
  }
}