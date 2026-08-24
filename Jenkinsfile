pipeline {

    agent any

    environment {
        IMAGE_NAME = "throttleyatry"
        CONTAINER_NAME = "throttleyatry"
        APP_PORT = "8081"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('Validate') {
            steps {
                echo 'Validating website...'

                sh '''
                    test -f index.html
                    test -d css
                    test -d js
                    test -d assets

                    echo "Website validation successful"
                '''
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building Docker image...'

                sh '''
                    docker build \
                    -t ${IMAGE_NAME}:${BUILD_NUMBER} \
                    -t ${IMAGE_NAME}:latest .
                '''
            }
        }

        stage('Stop Old Container') {
            steps {
                echo 'Stopping old container...'

                sh '''
                    docker rm -f ${CONTAINER_NAME} || true
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'

                sh '''
                    docker run -d \
                    --name ${CONTAINER_NAME} \
                    -p ${APP_PORT}:80 \
                    --restart unless-stopped \
                    ${IMAGE_NAME}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Health Check') {
            steps {
                echo 'Checking application health...'

                sh '''
                    sleep 5
                    curl -f http://localhost:${APP_PORT}/
                    echo "Application is healthy"
                '''
            }
        }
    }

    post {

        success {
            echo '======================================'
            echo 'DEPLOYMENT SUCCESSFUL'
            echo '======================================'
        }

        failure {
            echo '======================================'
            echo 'DEPLOYMENT FAILED'
            echo '======================================'
        }

        always {
            sh 'docker ps'
        }
    }
}
