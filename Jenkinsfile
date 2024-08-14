pipeline {
     agent any
    // Parameters to allow selection of the module to test
   parameters {
        choice(name: 'MODULE', choices: ['login', 'pipeline', 'insight', 'vsm'], description: 'Select module to test')
    }

    stages {
        // Stage to clone the Git repository
        stage('Clone Repository') {
            steps {
                // Clone the specified repository using Git credentials
                git credentialsId: 'git', url: 'https://github.com/pujarpavan/automation-framework-Microservices.git'
            }
        }

        // Stage to install dependencies
        stage('Install Dependencies') {
            steps {
                // Install project dependencies
                sh 'npm install'
            }
        }

        // Stage to run tests
        stage('Run Tests') {
            steps {
                script {
                    // Running tests using TestCafe
                    sh "npx testcafe chrome:headless tests/${MODULE}/*Tests.js"
                }
            }
        }
    }

    // Post actions to archive artifacts
    post {
        always {
            // Archive test reports and other relevant files
            archiveArtifacts artifacts: '**/reports/**', allowEmptyArchive: true
        }
    }
}
