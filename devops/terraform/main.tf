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
resource "aws_s3_bucket" "profile_pic_bucket" {
  bucket = "tindeggle-profile-pics"

  tags = {
    Name = "Profile Pics"
  }
}

resource "aws_s3_bucket" "terraform_state_bucket" {
  bucket = "tindeggle-terraform-state-bucket"

  tags = {
    Name        = "Terraform State S3"
    Environment = "Dev"
  }
}

terraform {
  backend "s3" {
    bucket  = "tindeggle-terraform-state-bucket"
    key     = "terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}

# Cloudfront
# locals {
#   s3_origin_id = "myS3Origin"
# }

# resource "aws_cloudfront_origin_access_control" "default" {
#   name                              = "default"
#   description                       = "Default Policy"
#   origin_access_control_origin_type = "s3"
#   signing_behavior                  = "always"
#   signing_protocol                  = "sigv4"
# }

# resource "aws_cloudfront_origin_access_identity" "tindeggle" {
#   comment = "Tindeggle"
# }

# resource "aws_cloudfront_distribution" "s3_distribution" {

#   origin {
#     domain_name              = aws_s3_bucket.profile_pic_bucket.bucket_regional_domain_name
#     origin_access_control_id = aws_cloudfront_origin_access_control.default.id
#     origin_id                = local.s3_origin_id
#     s3_origin_config {
#       origin_access_identity = aws_cloudfront_origin_access_identity.tindeggle.cloudfront_access_identity_path
#     }
#   }

#   enabled = true

#   default_cache_behavior {
#     allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
#     cached_methods         = ["GET", "HEAD"]
#     target_origin_id       = local.s3_origin_id
#     viewer_protocol_policy = "allow-all"
#   }

#   restrictions {
#     geo_restriction {
#       restriction_type = "whitelist"
#       locations        = ["US", "CA", "GB", "DE"]
#     }
#   }

#   viewer_certificate {
#     cloudfront_default_certificate = true
#   }
# }

# data "aws_iam_policy_document" "s3_policy" {
#   statement {
#     actions   = ["s3:GetObject"]
#     resources = ["${aws_s3_bucket.profile_pic_bucket.arn}/*"]

#     principals {
#       type        = "AWS"
#       identifiers = [aws_cloudfront_origin_access_identity.tindeggle.iam_arn]
#     }
#   }
# }

# resource "aws_s3_bucket_policy" "tindeggle_pics_policy" {
#   bucket = aws_s3_bucket.profile_pic_bucket.id
#   policy = data.aws_iam_policy_document.s3_policy.json
# }

# VPC
resource "aws_vpc" "eks_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
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