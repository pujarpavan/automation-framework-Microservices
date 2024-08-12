pipeline {
    // Parameters to allow selection of the module to test
    parameters {
        choice(name: 'MODULE', choices: ['login', 'pipeline', 'insight', 'vsm'], description: 'Select module to test')
    }

    stages {
        // Stage to clone the Git repository
        stage('Clone Repository') {
            steps {
                // Clone the specified repository using Git credentials
                git credentialsId: 'Git', url: 'https://github.com/pujarpavan/automation-framework-Microservices.git'
            }
        }
        
        // Stage to build Docker images
        stage('Build Docker Image') {
            steps {
                // Build Docker images defined in the docker-compose file
                sh 'docker-compose build'
            }
        }

        // Stage to run tests
        stage('Run Tests') {
            steps {
                script {
                    // Set the environment variable for the selected module and run the tests
                    withEnv(["MODULE=${MODULE}"]) {
                        sh 'docker-compose up --abort-on-container-exit'
                    }
                }
            }
        }
    }

    // Post actions to archive artifacts and clean up
    post {
        always {
            // Archive test reports and other relevant files
            archiveArtifacts artifacts: '**/reports/**', allowEmptyArchive: true
            
            // Clean up Docker containers after tests have run
            sh 'docker-compose down'
        }
    }
}
