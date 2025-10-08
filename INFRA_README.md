# Deployment and CI/CD

This repo includes example CI and infrastructure files to build, push, and deploy the application.

Files added:
- `Dockerfile` (frontend) — multi-stage build; serves built site with nginx
- `server/Dockerfile` — backend Node.js Dockerfile
- `Jenkinsfile` — declarative pipeline to build, push images, and run Terraform
- `jenkins/scripts/deploy.sh` — helper that runs Terraform apply with image variables
- `terraform/aws/` — Terraform code to provision an EC2 instance and start Docker containers

Quick notes:
- Replace registry placeholders in `Jenkinsfile` with your Docker registry and set Jenkins credentials (`docker-registry-creds`, `aws-access-key`, `aws-secret-key`).
- Ensure `jenkins/scripts/deploy.sh` is executable on your Jenkins agent.
- The Terraform example uses a simple EC2 + user_data approach. For production, use managed services (ECS/EKS, RDS) and IAM roles.
