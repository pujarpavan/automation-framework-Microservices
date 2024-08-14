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
                git credentialsId: 'GitHubCredentials', url: 'https://github.com/pujarpavan/automation-framework-Microservices.git', branch: 'main' // Ensure this matches your branch
            }
        }

        stage('Run Tests in Docker') {
            steps {
                script {
                    // Running TestCafe tests inside a Node.js Docker container
                    sh """
                    docker run --rm \
                        -v \$(pwd):/tests \
                        -w /tests \
                        node:16 \
                        sh -c "npm install && npx testcafe chrome:headless tests/\${MODULE}/*Tests.js"
                    """
                }
            }
        }
    }

    post {
        always {
            // Optionally archive reports or artifacts if generated
            archiveArtifacts artifacts: '**/reports/**', allowEmptyArchive: true
        }
    }
}
