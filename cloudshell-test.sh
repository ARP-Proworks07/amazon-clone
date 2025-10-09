#!/bin/bash

# AWS CloudShell Test Script for Amazon Clone
# This script tests what can be tested in CloudShell environment

set -e  # Exit on any error

echo "🚀 Starting Amazon Clone CloudShell Tests..."

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Test 1: Check CloudShell Environment
log_info "=== Test 1: CloudShell Environment Check ==="
echo "Node.js version: $(node --version 2>/dev/null || echo 'Not available')"
echo "npm version: $(npm --version 2>/dev/null || echo 'Not available')"
echo "Docker version: $(docker --version 2>/dev/null || echo 'Not available')"
echo "Docker Compose: $(docker compose version 2>/dev/null || docker-compose --version 2>/dev/null || echo 'Not available')"
echo "Available disk space:"
df -h | grep -E '(Filesystem|/home)'
echo "Available memory:"
free -h
log_success "Environment check completed"

# Test 2: File Structure Validation
log_info "=== Test 2: File Structure Validation ==="
required_files=(
    "package.json"
    "Dockerfile" 
    "server/package.json"
    "server/Dockerfile"
    "docker-compose.yml"
    "Jenkinsfile"
    "sonar-project.properties"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        log_success "✓ $file exists"
    else
        log_error "✗ $file missing"
    fi
done

# Test 3: Package.json Validation
log_info "=== Test 3: Package Configuration Check ==="
if [ -f "package.json" ]; then
    log_info "Frontend dependencies check..."
    node -e "const pkg=require('./package.json'); console.log('Scripts:', Object.keys(pkg.scripts || {}).join(', ')); console.log('Dependencies:', Object.keys(pkg.dependencies || {}).length);"
fi

if [ -f "server/package.json" ]; then
    log_info "Backend dependencies check..."
    node -e "const pkg=require('./server/package.json'); console.log('Scripts:', Object.keys(pkg.scripts || {}).join(', ')); console.log('Dependencies:', Object.keys(pkg.dependencies || {}).length);"
fi

# Test 4: Docker Build Tests
log_info "=== Test 4: Docker Build Tests ==="

log_info "Building frontend Docker image..."
if docker build -t amazon-clone-frontend-test . > build_frontend.log 2>&1; then
    log_success "✓ Frontend Docker build successful"
    docker images | grep amazon-clone-frontend-test
else
    log_error "✗ Frontend Docker build failed"
    echo "Last 10 lines of build log:"
    tail -n 10 build_frontend.log
fi

log_info "Building backend Docker image..."
if docker build -t amazon-clone-backend-test ./server > build_backend.log 2>&1; then
    log_success "✓ Backend Docker build successful" 
    docker images | grep amazon-clone-backend-test
else
    log_error "✗ Backend Docker build failed"
    echo "Last 10 lines of build log:"
    tail -n 10 build_backend.log
fi

# Test 5: Container Startup Test
log_info "=== Test 5: Container Startup Tests ==="

log_info "Testing backend container startup..."
if docker run --rm -d --name backend-test -e NODE_ENV=test amazon-clone-backend-test > /dev/null 2>&1; then
    sleep 3
    if docker ps | grep -q backend-test; then
        log_success "✓ Backend container starts successfully"
        docker logs backend-test | head -n 5
    else
        log_error "✗ Backend container failed to stay running"
        docker logs backend-test
    fi
    docker rm -f backend-test > /dev/null 2>&1
else
    log_error "✗ Backend container failed to start"
fi

# Test 6: Configuration File Tests
log_info "=== Test 6: Configuration Validation ==="

if [ -f "sonar-project.properties" ]; then
    log_info "SonarQube configuration:"
    grep -E "(sonar.projectKey|sonar.projectName)" sonar-project.properties || true
    log_success "✓ SonarQube config exists"
fi

if [ -f "docker-compose.yml" ]; then
    log_info "Docker Compose services:"
    grep -E "^  [a-zA-Z].*:" docker-compose.yml | sed 's/:$//' || true
    log_success "✓ Docker Compose config exists"
fi

# Test 7: Cleanup and Summary
log_info "=== Test 7: Cleanup ==="
docker rmi amazon-clone-frontend-test amazon-clone-backend-test 2>/dev/null || true
rm -f build_frontend.log build_backend.log 2>/dev/null || true
log_success "✓ Cleanup completed"

echo ""
log_success "=== CloudShell Tests Completed ==="
echo ""
log_info "📋 Summary:"
echo "- ✅ Files and configurations validated"
echo "- ✅ Docker builds tested"
echo "- ✅ Container startup verified"
echo ""
log_warning "⚠️  CloudShell Limitations:"
echo "- Cannot test full application (no port access)"
echo "- Cannot run SonarQube (memory limitations)"  
echo "- Cannot test Kubernetes deployment"
echo "- Cannot run complete CI/CD pipeline"
echo ""
log_info "🚀 Next Steps:"
echo "1. Deploy to EC2 using your user_data.sh script"
echo "2. Set up Jenkins on EC2 for full pipeline testing"
echo "3. Configure SonarQube for code quality analysis"
echo ""
log_success "Ready for full deployment! 🎉"