terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.32.1"
    }
  }
}

provider "aws" {
  region = "us-east-1" # Change to your desired region
}

# S3
resource "aws_s3_bucket" "terraform_state_bucket" {
  bucket = "tindeggle-terraform-state-bucket"

  tags = {
    Name = "Terraform State S3"
    Environment = "Dev"
  }
}

terraform {
  backend "s3" {
    bucket = "tindeggle-terraform-state-bucket"
    key = "terraform.tfstate"
    region = "us-east-1"
    encrypt = true
  }
}

# VPC
resource "aws_vpc" "eks_vpc" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true
  enable_dns_hostnames = true

  tags = {
    Name = "eks-vpc"
  }
}

# # Subnet
# resource "aws_subnet" "eks_subnet" {
#   count = 2

#   vpc_id                  = aws_vpc.eks_vpc.id
#   cidr_block              = "10.0.${count.index + 1}.0/24"
#   availability_zone       = element(data.aws_availability_zones.available.names, count.index)
#   map_public_ip_on_launch = true

#   tags = {
#     Name = "eks-subnet-${count.index + 1}"
#   }
# }

# # IAM Roles
# resource "aws_iam_role" "eks_node_group" {
#   name = "eks-node-group"

#   assume_role_policy = jsonencode({
#     Version = "2012-10-17",
#     Statement = [
#       {
#         Action = "sts:AssumeRole",
#         Effect = "Allow",
#         Principal = {
#           Service = "ec2.amazonaws.com"
#         }
#       }
#     ]
#   })
# }

# # Security Group
# resource "aws_security_group" "eks_security_group" {
#   vpc_id = aws_vpc.eks_vpc.id

#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   ingress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     security_groups = [aws_security_group.eks_security_group.id]
#   }
# }

# # Attach IAM Role to EC2 instance profile
# resource "aws_iam_instance_profile" "eks_node_group_instance_profile" {
#   name = "eks-node-group-instance-profile"

#   roles = [aws_iam_role.eks_node_group.name]
# }

# # Additional configurations may be needed based on your use case.

#   backend "s3" {
#     bucket = "api-gateway-lambda-dynamodb" # change to name of your bucket
#     region = "us-west-1"                   # change to your region
#     key    = "terraform.tfstate"
#   }
# }