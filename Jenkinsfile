pipeline {
    agent any  // Runs on any available Jenkins agent

    environment {
        NODE_VERSION = '16.x'  // Specify the Node.js version
    }

    parameters {
        string(name: 'branchName', defaultValue: 'main', description: 'The Git branch to test')
        string(name: 'commitId', description: 'The specific commit ID to test (optional)')
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo "Checking out branch ${params.branchName}"
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: "*/${params.branchName}"]],
                        userRemoteConfigs: [[url: 'https://github.com/pujarpavan/automation-framework-Microservices.git']]
                    ])
                    
                    if (params.commitId) {
                        sh "git checkout ${params.commitId}"
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo "Installing Node.js ${env.NODE_VERSION}"
                    tool name: 'NodeJS', type: 'NodeJS'
                    
                    echo "Installing project dependencies"
                    sh 'npm install'
                }
            }
        }

        stage('Run TestCafe Tests') {
            steps {
                script {
                    echo "Running TestCafe tests"
                    sh 'npx testcafe chrome tests/ --reporter json:results/test-results.json'
                }
            }
        }

        stage('Archive Test Results') {
            steps {
                script {
                    echo "Archiving test results"
                    archiveArtifacts artifacts: 'results/test-results.json', allowEmptyArchive: true
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
