terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
    }
  }
  backend "s3" {
    bucket = "api-gateway-lambda-dynamodb" # change to name of your bucket
    region = "us-west-1"                   # change to your region
    key    = "terraform.tfstate"
  }
}