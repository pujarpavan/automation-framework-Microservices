pipeline {
    agent {
        docker {
            image 'node:16' // Use a Node.js Docker image with version 16
            args '-v /var/jenkins_home/workspace:/workspace' // Mount the workspace directory
        }
    }
    parameters {
        choice(name: 'MODULE', choices: ['login', 'pipeline', 'insight', 'vsm'], description: 'Select module to test')
    }

    stages {
        // Stage to clone the Git repository
        stage('Clone Repository') {
            steps {
                // Clone the specified repository using Git credentials
                git credentialsId: 'GitHubCredentials', url: 'https://github.com/pujarpavan/automation-framework-Microservices.git', branch: 'main' // Ensure this matches your branch
            }
        }
         stage('Check Node.js and npm') {
            steps {
                script {
                    sh 'node -v' // Check Node.js version
                    sh 'npm -v'  // Check npm version
                }
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
