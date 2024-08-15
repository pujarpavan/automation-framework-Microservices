pipeline {
    agent {
        docker {
            image 'node:16'  // Use the Node.js Docker image
            args '-v /var/jenkins_home/workspace/Automation-Jenkins:/tests -w /tests'
        }
    }
    parameters {
        choice(name: 'MODULE', choices: ['login', 'pipeline', 'insight', 'vsm'], description: 'Select module to test')
    }
    stages {
        stage('Clone Repository') {
            steps {
                // Clone the repository into the Jenkins workspace
                git credentialsId: 'GitHubCredentials', url: 'https://github.com/pujarpavan/automation-framework-Microservices.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'  // Install npm dependencies
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    // Run the selected module's TestCafe tests
                    sh "npx testcafe chrome:headless tests/${MODULE}/*Tests.js"
                }
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: '**/reports/**', allowEmptyArchive: true
        }
    }
}
