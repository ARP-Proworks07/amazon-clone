#!/usr/bin/env bash
set -euo pipefail

FRONTEND_IMAGE=${1:-}
BACKEND_IMAGE=${2:-}

if [ -z "$FRONTEND_IMAGE" ] || [ -z "$BACKEND_IMAGE" ]; then
  echo "Usage: $0 <frontend-image> <backend-image>"
  exit 2
fi

cd terraform/aws

export TF_VAR_frontend_image="$FRONTEND_IMAGE"
export TF_VAR_backend_image="$BACKEND_IMAGE"

terraform init -input=false
terraform apply -auto-approve
