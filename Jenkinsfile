pipeline {

    agent any

    environment {
        IMAGE_NAME = "throttleyatry"
        CONTAINER_NAME = "throttleyatry"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Validate Website') {
            steps {
                echo 'Validating website...'

                bat '''
                    if not exist index.html exit /b 1
                    if not exist css exit /b 1
                    if not exist js exit /b 1
                    if not exist assets exit /b 1
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                bat '''
                    docker build -t %IMAGE_NAME%:%BUILD_NUMBER% .
                    docker tag %IMAGE_NAME%:%BUILD_NUMBER% %IMAGE_NAME%:latest
                '''
            }
        }

        stage('Stop Old Container') {
            steps {
                bat '''
                    docker rm -f %CONTAINER_NAME% 2>NUL || exit /b 0
                '''
            }
        }

        stage('Deploy Container') {
            steps {
                bat '''
                    docker run -d ^
                    --name %CONTAINER_NAME% ^
                    -p 8081:80 ^
                    --restart unless-stopped ^
                    %IMAGE_NAME%:%BUILD_NUMBER%
                '''
            }
        }

        stage('Health Check') {
            steps {
                bat '''
                    timeout /t 5 /nobreak >NUL
                    curl -f http://localhost:8081/
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
            bat 'docker ps'
        }
    }
}