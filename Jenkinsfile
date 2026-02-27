pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "advnagarajan/sample-frontend"
        BACKEND_IMAGE  = "advnagarajan/sample-backend"
        EC2_HOST = "13.232.211.135"
    }

    stages {

        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                echo "Building frontend & backend images..."

                sh '''
                docker build -t $BACKEND_IMAGE:${BUILD_NUMBER} ./backend
                docker tag $BACKEND_IMAGE:${BUILD_NUMBER} $BACKEND_IMAGE:latest

                docker build -t $FRONTEND_IMAGE:${BUILD_NUMBER} ./frontend
                docker tag $FRONTEND_IMAGE:${BUILD_NUMBER} $FRONTEND_IMAGE:latest
                '''
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin

                    docker push $BACKEND_IMAGE:${BUILD_NUMBER}
                    docker push $BACKEND_IMAGE:latest

                    docker push $FRONTEND_IMAGE:${BUILD_NUMBER}
                    docker push $FRONTEND_IMAGE:latest
                    '''
                }
            }
        }

        stage('Debug Branch') {
            steps {
                sh 'echo GIT_BRANCH=$GIT_BRANCH'
            }
        }

    }
}
