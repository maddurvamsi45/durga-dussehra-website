pipeline {
  agent any
  options { timestamps(); disableConcurrentBuilds(); buildDiscarder(logRotator(numToKeepStr: '20')) }
  environment {
    IMAGE_NAME = 'your-dockerhub-user/durga-dussehra-website'
    IMAGE_TAG = "${BUILD_NUMBER}"
  }
  stages {
    stage('Checkout') { steps { checkout scm; sh 'git status --short' } }
    stage('Install and test') { steps { sh 'npm install'; sh 'npm test' } }
    stage('Build frontend') { steps { sh 'npm run build'; archiveArtifacts artifacts: 'dist/**', fingerprint: true } }
    stage('Build image') { steps { sh 'docker build --pull -t ${IMAGE_NAME}:${IMAGE_TAG} -t ${IMAGE_NAME}:latest .' } }
    stage('Publish image') {
      when { branch 'main' }
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD')]) {
          sh '''set +x
          echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USER" --password-stdin
          docker push "${IMAGE_NAME}:${IMAGE_TAG}"
          docker push "${IMAGE_NAME}:latest"
          docker logout'''
        }
      }
    }
    stage('Deploy to Kubernetes') {
      when { branch 'main' }
      steps {
        withCredentials([file(credentialsId: 'kubeconfig-production', variable: 'KUBECONFIG_FILE')]) {
          sh '''export KUBECONFIG="$KUBECONFIG_FILE"
          kubectl apply -f k8s/namespace.yaml
          kubectl apply -f k8s/deployment.yaml
          kubectl apply -f k8s/service.yaml
          kubectl set image deployment/durga-website website="${IMAGE_NAME}:${IMAGE_TAG}" -n durga-website
          kubectl rollout status deployment/durga-website -n durga-website --timeout=180s'''
        }
      }
    }
  }
  post {
    always { sh 'docker image prune -f || true'; cleanWs() }
    success { echo 'Website pipeline completed successfully.' }
    failure { echo 'Pipeline failed. Review the stage logs before retrying.' }
  }
}