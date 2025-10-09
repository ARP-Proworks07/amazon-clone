# Jenkins Configuration for Amazon Clone Project

## Prerequisites Setup

### 1. Install Required Jenkins Plugins
- Pipeline (Pipeline Suite)
- Docker Pipeline
- SonarQube Scanner
- Kubernetes CLI
- Git
- GitHub Integration

### 2. Configure Global Tools in Jenkins
Go to: Manage Jenkins > Global Tool Configuration

#### SonarQube Scanner
- Name: `SonarQubeScanner`
- Install automatically: ✅
- Version: Latest

#### Docker
- Name: `docker`
- Install automatically: ✅

### 3. System Configuration
Go to: Manage Jenkins > Configure System

#### SonarQube Servers
- Name: `SonarQube`
- Server URL: `http://localhost:9000` (or your SonarQube URL)
- Server authentication token: Add token from SonarQube

#### Environment Variables (Optional)
- `DOCKER_REGISTRY`: docker.io (default)
- `KUBECONFIG`: Path to your kubectl config

### 4. Credentials Setup
Go to: Manage Jenkins > Manage Credentials

#### Required Credentials:
1. **GitHub Repository Access**
   - Type: Username with password or SSH key
   - ID: `github-credentials`

2. **SonarQube Token**
   - Type: Secret text
   - ID: `sonarqube-token`
   - Secret: Your SonarQube authentication token

3. **Docker Registry (if using private registry)**
   - Type: Username with password
   - ID: `docker-registry-creds`

4. **Kubernetes Config (if using external cluster)**
   - Type: Secret file
   - ID: `k8s-config`
   - File: Your kubeconfig file

### 5. Pipeline Setup

#### Method 1: Pipeline from SCM
1. New Item > Pipeline
2. Pipeline Definition: "Pipeline script from SCM"
3. SCM: Git
4. Repository URL: `https://github.com/ARP-Proworks07/amazon-clone.git`
5. Credentials: Select your GitHub credentials
6. Branch: `*/main`
7. Script Path: `Jenkinsfile`

#### Method 2: Direct Pipeline Script
Copy the Jenkinsfile content directly into Jenkins pipeline script section.

### 6. Build Triggers (Optional)
- GitHub hook trigger for GITScm polling: ✅
- Poll SCM: H/5 * * * * (every 5 minutes)

### 7. SonarQube Quality Gate Setup
1. In SonarQube admin: Create project `amazon-clone`
2. Set up quality gate rules
3. Generate authentication token for Jenkins

## Troubleshooting

### Common Issues:

1. **SonarQube Connection Failed**
   - Check SonarQube is running: `docker ps | grep sonar`
   - Verify URL in Jenkins configuration
   - Check authentication token

2. **Docker Build Failed**
   - Ensure Docker daemon is running
   - Check Dockerfile syntax
   - Verify system dependencies

3. **Kubernetes Deployment Failed**
   - Check kubectl connectivity: `kubectl cluster-info`
   - Verify namespace exists: `kubectl get namespaces`
   - Check resource quotas and limits

4. **Health Check Failed**
   - Ensure backend has `/api/health` endpoint
   - Check if services are running on expected ports
   - Verify network connectivity

### Useful Commands:

```bash
# Check Jenkins logs
sudo journalctl -u jenkins -f

# Check SonarQube
curl http://localhost:9000/api/system/status

# Check Kubernetes
kubectl get all -n amazon-clone

# Check Docker containers
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
```

## Pipeline Flow Summary:

1. **Checkout** → Pull code from GitHub
2. **SonarQube Analysis** → Code quality check with quality gate
3. **Docker Build** → Build frontend and backend images
4. **Integration Test** → Test with Docker Compose
5. **K8s Deploy** → Deploy to Kubernetes (with Docker Compose fallback)
6. **Verification** → Confirm deployment success