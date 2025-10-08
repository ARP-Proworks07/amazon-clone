pipeline {
  agent any
  environment {
    REGISTRY = "your-docker-registry.example.com"
    FRONTEND_IMAGE = "${env.REGISTRY}/amazon-clone-frontend"
    BACKEND_IMAGE = "${env.REGISTRY}/amazon-clone-backend"
    GIT_COMMIT_SHORT = "${env.GIT_COMMIT ?: 'latest'}"
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build Frontend Image') {
      steps {
        sh 'docker build -t ${FRONTEND_IMAGE}:${GIT_COMMIT_SHORT} .'
      }
    }

    stage('Build Backend Image') {
      steps {
        sh 'docker build -t ${BACKEND_IMAGE}:${GIT_COMMIT_SHORT} ./server'
      }
    }

    stage('Login & Push Images') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'docker-registry-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login ${REGISTRY} -u $DOCKER_USER --password-stdin'
          sh 'docker push ${FRONTEND_IMAGE}:${GIT_COMMIT_SHORT}'
          sh 'docker push ${BACKEND_IMAGE}:${GIT_COMMIT_SHORT}'
        }
      }
    }

    stage('Terraform Apply') {
      steps {
        withCredentials([string(credentialsId: 'aws-access-key', variable: 'AWS_ACCESS_KEY_ID'), string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')]) {
          sh './jenkins/scripts/deploy.sh ${FRONTEND_IMAGE}:${GIT_COMMIT_SHORT} ${BACKEND_IMAGE}:${GIT_COMMIT_SHORT}'
        }
      }
    }
  }
  post {
    always {
      sh 'docker image prune -af || true'
    }
  }
}
