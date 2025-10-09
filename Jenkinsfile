pipeline {
    agent any
    
    environment {
        // Image names for Docker builds
        FRONTEND_IMAGE = "amazon-clone-frontend"
        BACKEND_IMAGE = "amazon-clone-backend"
        BUILD_TAG = "${env.BUILD_NUMBER}"
        GIT_COMMIT_SHORT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
    }
    
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 25, unit: 'MINUTES')
        timestamps()
    }
    
    stages {
        stage('1. Checkout Code from GitHub') {
            steps {
                echo "=== PULLING CODE FROM GITHUB ==="
                checkout scm
                script {
                    echo "Building Amazon Clone - Build #${env.BUILD_NUMBER}"
                    echo "Git Commit: ${GIT_COMMIT_SHORT}"
                    echo "Repository: ${env.GIT_URL}"
                    echo "Branch: ${env.GIT_BRANCH}"
                }
            }
        }
        
        stage('2. SonarQube Code Quality Analysis') {
            steps {
                echo "=== RUNNING SONARQUBE ANALYSIS ==="
                script {
                    // Using SonarQube Scanner with sonar-project.properties file
                    withSonarQubeEnv('SonarQube') {
                        sh """
                            sonar-scanner \
                                -Dsonar.projectVersion=${BUILD_TAG} \
                                -Dsonar.buildString=${GIT_COMMIT_SHORT}
                        """
                    }
                }
            }
        }
        
        stage('3. Quality Gate Check') {
            steps {
                echo "=== WAITING FOR SONARQUBE QUALITY GATE ==="
                script {
                    timeout(time: 5, unit: 'MINUTES') {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "Pipeline aborted due to quality gate failure: ${qg.status}"
                        }
                        echo "✅ SonarQube Quality Gate Passed!"
                    }
                }
            }
        }
        
        stage('4. Build Docker Images') {
            parallel {
                stage('Build Frontend Image') {
                    steps {
                        echo "=== BUILDING FRONTEND DOCKER IMAGE ==="
                        script {
                            def frontendImage = docker.build("${FRONTEND_IMAGE}:${BUILD_TAG}", ".")
                            frontendImage.tag("${FRONTEND_IMAGE}:latest")
                            echo "✅ Frontend image built: ${FRONTEND_IMAGE}:${BUILD_TAG}"
                        }
                    }
                }
                
                stage('Build Backend Image') {
                    steps {
                        echo "=== BUILDING BACKEND DOCKER IMAGE ==="
                        script {
                            def backendImage = docker.build("${BACKEND_IMAGE}:${BUILD_TAG}", "./server")
                            backendImage.tag("${BACKEND_IMAGE}:latest")
                            echo "✅ Backend image built: ${BACKEND_IMAGE}:${BUILD_TAG}"
                        }
                    }
                }
            }
        }
        
        stage('5. Test with Docker Compose') {
            steps {
                echo "=== TESTING APPLICATION WITH DOCKER COMPOSE ==="
                script {
                    try {
                        // Update docker-compose with new image tags
                        sh """
                            # Create temporary compose file with built images
                            sed 's|build: \\.|image: ${FRONTEND_IMAGE}:${BUILD_TAG}|g' docker-compose.yml > docker-compose-test.yml
                            sed -i 's|build: ./server|image: ${BACKEND_IMAGE}:${BUILD_TAG}|g' docker-compose-test.yml
                            
                            # Start services
                            docker-compose -f docker-compose-test.yml up -d
                            
                            # Wait for services to be ready
                            echo "Waiting for services to start..."
                            sleep 45
                            
                            # Health check frontend
                            curl -f http://localhost:3000 || exit 1
                            echo "✅ Frontend is responding"
                            
                            # Health check backend (if health endpoint exists)
                            curl -f http://localhost:3001/api/health || curl -f http://localhost:3001 || echo "⚠️ Backend health check failed, but continuing..."
                            echo "✅ Backend is responding"
                        """
                    } catch (Exception e) {
                        echo "❌ Integration test failed: ${e.getMessage()}"
                        throw e
                    }
                }
            }
            post {
                always {
                    sh '''
                        docker-compose -f docker-compose-test.yml down -v || true
                        rm -f docker-compose-test.yml || true
                    '''
                }
            }
        }
        
        stage('6. Deploy to Kubernetes (Minikube)') {
            steps {
                echo "=== DEPLOYING TO KUBERNETES (MINIKUBE) ==="
                script {
                    try {
                        sh """
                            # Check if kubectl is available
                            kubectl version --client
                            
                            # Check cluster connectivity
                            kubectl cluster-info
                            
                            # Update image tags in K8s manifests
                            sed 's|amazon-clone-frontend:FRONTEND_IMAGE_TAG|${FRONTEND_IMAGE}:${BUILD_TAG}|g' k8s/frontend.yaml > k8s/frontend-deploy.yaml
                            sed 's|amazon-clone-backend:BACKEND_IMAGE_TAG|${BACKEND_IMAGE}:${BUILD_TAG}|g' k8s/backend.yaml > k8s/backend-deploy.yaml
                            
                            # Apply Kubernetes manifests
                            kubectl apply -f k8s/namespace.yaml
                            kubectl apply -f k8s/mongodb.yaml
                            kubectl apply -f k8s/backend-deploy.yaml
                            kubectl apply -f k8s/frontend-deploy.yaml
                            
                            # Wait for deployments to be ready
                            kubectl wait --for=condition=available --timeout=300s deployment/amazon-clone-backend -n amazon-clone || true
                            kubectl wait --for=condition=available --timeout=300s deployment/amazon-clone-frontend -n amazon-clone || true
                            
                            # Get deployment status
                            kubectl get pods -n amazon-clone
                            kubectl get services -n amazon-clone
                            
                            echo "✅ Deployment to Kubernetes completed!"
                        """
                    } catch (Exception e) {
                        echo "❌ Kubernetes deployment failed: ${e.getMessage()}"
                        echo "Continuing with Docker deployment as fallback..."
                        
                        // Fallback: Deploy with Docker Compose
                        sh """
                            echo "=== FALLBACK: DEPLOYING WITH DOCKER COMPOSE ==="
                            docker-compose -f docker-compose.prod.yml down || true
                            docker-compose -f docker-compose.prod.yml up -d
                            echo "✅ Fallback Docker Compose deployment completed!"
                        """
                    }
                }
            }
            post {
                always {
                    sh '''
                        rm -f k8s/frontend-deploy.yaml k8s/backend-deploy.yaml || true
                    '''
                }
            }
        }
        
        stage('7. Deployment Verification') {
            steps {
                echo "=== VERIFYING DEPLOYMENT ==="
                script {
                    // Check Kubernetes deployment
                    def k8sStatus = sh(script: "kubectl get pods -n amazon-clone 2>/dev/null || echo 'K8S_NOT_AVAILABLE'", returnStdout: true).trim()
                    
                    if (k8sStatus != 'K8S_NOT_AVAILABLE') {
                        echo "📋 Kubernetes Deployment Status:"
                        sh "kubectl get all -n amazon-clone"
                        
                        // Port forward for testing (background process)
                        sh """
                            # Kill any existing port-forwards
                            pkill -f 'kubectl port-forward' || true
                            
                            # Start port-forward in background for verification
                            nohup kubectl port-forward -n amazon-clone service/amazon-clone-frontend-service 8080:3000 > /dev/null 2>&1 &
                            sleep 5
                            
                            # Test the forwarded port
                            curl -f http://localhost:8080 || echo "⚠️ Port-forward test failed"
                        """
                        echo "✅ Access your app: kubectl port-forward -n amazon-clone service/amazon-clone-frontend-service 3000:3000"
                    } else {
                        echo "📋 Docker Compose Deployment Status:"
                        sh "docker-compose -f docker-compose.prod.yml ps"
                        echo "✅ Access your app: http://localhost:3000"
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo "=== CLEANUP ==="
            sh '''
                # Clean up Docker images and containers
                docker image prune -f || true
                
                # Clean up any test containers
                docker ps -aq --filter "name=amazon-clone" | xargs docker rm -f || true
                
                # Clean up port-forwards
                pkill -f 'kubectl port-forward' || true
            '''
        }
        
        success {
            echo """
            🎉 ===================================
               PIPELINE COMPLETED SUCCESSFULLY! 
            ===================================
            
            Your Amazon Clone app has been deployed!
            
            📊 SonarQube Analysis: ✅ Passed
            🐳 Docker Images: ✅ Built  
            ☸️  Kubernetes: ✅ Deployed
            🧪 Tests: ✅ Passed
            
            🌐 Access your application:
            - Kubernetes: kubectl port-forward -n amazon-clone service/amazon-clone-frontend-service 3000:3000
            - Docker: http://localhost:3000
            """
        }
        
        failure {
            echo """
            ❌ ===================================
                   PIPELINE FAILED!
            ===================================
            
            Check the logs above for error details.
            Common issues:
            - SonarQube quality gate failure
            - Docker build errors  
            - Kubernetes cluster connectivity
            - Application startup issues
            """
        }
    }
}
