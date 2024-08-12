pipeline {
    agent any

    parameters {
        choice(name: 'MODULE', choices: ['login', 'pipeline', 'insight', 'vsm'], description: 'Select module to test')
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/pujarpavan/Automation.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker-compose build'
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    // Setting environment variable for Docker Compose
                    withEnv(["MODULE=${MODULE}"]) {
                        sh 'docker-compose up --abort-on-container-exit'
                    }
                }
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: '**/reports/**', allowEmptyArchive: true
            sh 'docker-compose down' // Clean up Docker containers
        }
    }
}
