pipeline {
    

    parameters {
        choice(name: 'MODULE', choices: ['login', 'pipeline', 'insight', 'vsm'], description: 'Select module to test')
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Use the correct credentials here
                git credentialsId: '646866b7-d0b0-4e4c-8e14-fca871cb2adf', url: 'https://github.com/pujarpavan/automation-framework-Microservices.git'
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
