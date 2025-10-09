#!/usr/bin/env bash
set -euo pipefail

# Amazon Clone Deployment Script
# This script deploys the application to Kubernetes or Docker Compose

FRONTEND_IMAGE=${1:-}
BACKEND_IMAGE=${2:-}
DEPLOY_TARGET=${3:-"k8s"}  # k8s, docker-compose, or terraform

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Validation
if [ -z "$FRONTEND_IMAGE" ] || [ -z "$BACKEND_IMAGE" ]; then
    log_error "Usage: $0 <frontend-image> <backend-image> [deploy-target]"
    log_info "Example: $0 amazon-clone-frontend:v1.0.0 amazon-clone-backend:v1.0.0 k8s"
    log_info "Deploy targets: k8s (default), docker-compose, terraform"
    exit 2
fi

log_info "Starting deployment of Amazon Clone..."
log_info "Frontend Image: $FRONTEND_IMAGE"
log_info "Backend Image: $BACKEND_IMAGE"
log_info "Deploy Target: $DEPLOY_TARGET"

# Kubernetes deployment
deploy_k8s() {
    log_info "Deploying to Kubernetes..."
    
    # Check if kubectl is available
    if ! command -v kubectl &> /dev/null; then
        log_error "kubectl is not installed or not in PATH"
        exit 1
    fi
    
    # Check if cluster is accessible
    if ! kubectl cluster-info &> /dev/null; then
        log_error "Unable to connect to Kubernetes cluster"
        exit 1
    fi
    
    # Create namespace if it doesn't exist
    kubectl apply -f k8s/namespace.yaml
    
    # Update image tags in deployment files
    log_info "Updating image tags in Kubernetes manifests..."
    sed -i.bak "s|amazon-clone-frontend:FRONTEND_IMAGE_TAG|$FRONTEND_IMAGE|g" k8s/frontend.yaml
    sed -i.bak "s|amazon-clone-backend:BACKEND_IMAGE_TAG|$BACKEND_IMAGE|g" k8s/backend.yaml
    
    # Apply Kubernetes manifests
    log_info "Applying Kubernetes manifests..."
    kubectl apply -f k8s/
    
    # Wait for deployments to be ready
    log_info "Waiting for deployments to be ready..."
    kubectl wait --for=condition=available --timeout=300s deployment/amazon-clone-frontend -n amazon-clone
    kubectl wait --for=condition=available --timeout=300s deployment/amazon-clone-backend -n amazon-clone
    
    # Restore original files
    mv k8s/frontend.yaml.bak k8s/frontend.yaml 2>/dev/null || true
    mv k8s/backend.yaml.bak k8s/backend.yaml 2>/dev/null || true
    
    # Get service URLs
    log_info "Getting service information..."
    kubectl get services -n amazon-clone
    
    log_success "Kubernetes deployment completed successfully!"
}

# Docker Compose deployment
deploy_docker_compose() {
    log_info "Deploying with Docker Compose..."
    
    # Check if docker-compose is available
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        log_error "Docker Compose is not installed or not in PATH"
        exit 1
    fi
    
    # Create environment file with image tags
    cat > .env << EOF
FRONTEND_IMAGE=$FRONTEND_IMAGE
BACKEND_IMAGE=$BACKEND_IMAGE
EOF
    
    # Use production docker-compose file if available
    COMPOSE_FILE="docker-compose.prod.yml"
    if [ ! -f "$COMPOSE_FILE" ]; then
        COMPOSE_FILE="docker-compose.yml"
        log_warning "Production compose file not found, using development file"
    fi
    
    log_info "Using compose file: $COMPOSE_FILE"
    
    # Deploy with Docker Compose
    if docker compose version &> /dev/null; then
        docker compose -f "$COMPOSE_FILE" down
        docker compose -f "$COMPOSE_FILE" pull
        docker compose -f "$COMPOSE_FILE" up -d
    else
        docker-compose -f "$COMPOSE_FILE" down
        docker-compose -f "$COMPOSE_FILE" pull
        docker-compose -f "$COMPOSE_FILE" up -d
    fi
    
    log_success "Docker Compose deployment completed successfully!"
}

# Terraform deployment (legacy)
deploy_terraform() {
    log_info "Deploying with Terraform..."
    
    if [ ! -d "terraform/aws" ]; then
        log_error "Terraform configuration directory not found"
        exit 1
    fi
    
    cd terraform/aws
    
    export TF_VAR_frontend_image="$FRONTEND_IMAGE"
    export TF_VAR_backend_image="$BACKEND_IMAGE"
    
    terraform init -input=false
    terraform plan -out=tfplan
    terraform apply -auto-approve tfplan
    
    cd - > /dev/null
    
    log_success "Terraform deployment completed successfully!"
}

# Health check function
health_check() {
    log_info "Running health checks..."
    
    case $DEPLOY_TARGET in
        "k8s")
            # Check pod status
            kubectl get pods -n amazon-clone
            ;;
        "docker-compose")
            # Check container status
            if docker compose version &> /dev/null; then
                docker compose ps
            else
                docker-compose ps
            fi
            ;;
        "terraform")
            log_info "Health check not implemented for Terraform deployment"
            ;;
    esac
}

# Main deployment logic
case $DEPLOY_TARGET in
    "k8s")
        deploy_k8s
        ;;
    "docker-compose")
        deploy_docker_compose
        ;;
    "terraform")
        deploy_terraform
        ;;
    *)
        log_error "Invalid deploy target: $DEPLOY_TARGET"
        log_info "Valid targets: k8s, docker-compose, terraform"
        exit 1
        ;;
esac

# Run health checks
health_check

log_success "Deployment completed successfully!"
log_info "Application should be available shortly..."

# Display access information
case $DEPLOY_TARGET in
    "k8s")
        log_info "To access the application:"
        log_info "kubectl port-forward -n amazon-clone service/amazon-clone-frontend-service 3000:3000"
        log_info "Then visit: http://localhost:3000"
        ;;
    "docker-compose")
        log_info "To access the application:"
        log_info "Frontend: http://localhost:3000"
        log_info "Backend: http://localhost:3001"
        log_info "MongoDB Express: http://localhost:8081"
        ;;
esac
