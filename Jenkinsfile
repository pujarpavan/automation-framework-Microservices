pipeline {
    agent {
        docker {
            image 'node:16'
            args '-u root:root' // Optional: run as root user if needed
        }
    }

    parameters {
        choice(name: 'MODULE', choices: ['login', 'pipeline', 'insight', 'vsm'], description: 'Select module to test')
    }

    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: 'GitHubCredentials', url: 'https://github.com/pujarpavan/automation-framework-Microservices.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install' // Install dependencies inside the Docker container
            }
        }
        stage('Run Tests') {
            steps {
                sh "npx testcafe chrome:headless tests/${MODULE}/*Tests.js" // Run the selected tests
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: '**/reports/**', allowEmptyArchive: true
        }
    }
}
