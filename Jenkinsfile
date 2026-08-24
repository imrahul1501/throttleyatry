pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timestamps()
        skipDefaultCheckout(false)
    }

    triggers {
        githubPush()
    }

    environment {
        DEPLOY_HOST = '192.168.106.139'
        DEPLOY_USER = 'throtalyatry'
        DEPLOY_DIR = '/home/throtalyatry/app'
        SSH_CREDENTIALS = 'throtalyatry-server-ssh'
    }

    stages {
        stage('Validate') {
            steps {
                sh 'test -f Dockerfile'
                sh 'test -f docker-compose.yml'
                sh 'test -f nginx.conf'
                sh 'docker compose config -q'
            }
        }

        stage('Build image') {
            steps {
                sh 'docker build --pull -t throtalyatry:ci-${BUILD_NUMBER} .'
            }
        }

        stage('Deploy to Ubuntu VM') {
            when {
                branch 'main'
            }
            steps {
                sshagent(credentials: [env.SSH_CREDENTIALS]) {
                    sh '''
                        set -eu
                        ssh -o BatchMode=yes -o StrictHostKeyChecking=accept-new "$DEPLOY_USER@$DEPLOY_HOST" \
                          "cd '$DEPLOY_DIR' && ./deploy.sh deploy"
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker image rm throtalyatry:ci-${BUILD_NUMBER} || true'
        }
        success {
            echo 'Deployment completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Check the stage log and server deployment log.'
        }
    }
}
