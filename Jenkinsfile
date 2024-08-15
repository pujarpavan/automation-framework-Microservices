pipeline {
    agent any
    
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
                // Ensure Node.js and npm are installed
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    // Run the tests using the selected module
                    sh "npx testcafe chrome:headless tests/${MODULE}/*Tests.js"
                }
            }
        }
    }

    post {
        always {
            // Archive the test reports if available
            archiveArtifacts artifacts: '**/reports/**', allowEmptyArchive: true
        }
    }
}
