variable "aws_access_key" {
    description = "Clé d'accès d'AWS"
    type = "string"
}

variable "aws_secret_key" {
    description = "Clé secrète d'AWS"
    type = "string"
    sensitive = true
}