properties([
    parameters([
        string(name: 'testDir',
            defaultValue: 'tests/**/*',
            description: 'Test directory. For example: tests/helloWorldDeployment.js'),
    ])
])

node('codebuild-ucd') {
    ansiColor('xterm') {
        try {
            timeout(time: 90, unit: 'MINUTES') {
                withAWS(credentials: 'aws-velocity-ecr') {
                    def remote = [
                        allowAnyHosts: true,
                        pty: true
                    ]
                    def launchInstallDir = '/opt/automation-framework-Microservices'
                    def instanceIp = '10.134.119.164'

                    remote.name = instanceIp
                    remote.host = instanceIp
                    remote.user = 'launch'
                    remote.password = 'launch'

                    stage('Pull SCM') {
                        checkout scm
                    }

                    stage('Checkout') {
                        echo 'Pulling from branch: ' + env.BRANCH_NAME
                        dir('/opt/automation-framework-Microservices') {
                            git(
                                branch: env.BRANCH_NAME,
                                credentialsId: 'HCL_Github',
                                url: 'git@github.com:pujarpavan/automation-framework-Microservices.git'
                            )

                            sshCommand(
                                remote: remote,
                                sudo: true,
                                failOnError: false,
                                command: "pwd; cd ${launchInstallDir}; sudo git checkout ${env.BRANCH_NAME}"
                            )

                            sshCommand(
                                remote: remote,
                                sudo: true,
                                failOnError: false,
                                command: "pwd; cd ${launchInstallDir}; sudo git pull"
                            )
                        }
                    }

                    stage('Execute Tests') {
                        sshCommand(
                            remote: remote,
                            sudo: true,
                            failOnError: false,
                            command: "docker run -u root -v /opt/automation-framework-Microservices:/automation-framework-Microservices -v /opt/automation-framework-Microservices/screenshots:/automation-framework-Microservices/screenshots -v /opt/automation-framework-Microservices/test-results:/automation-framework-Microservices/test-results -v /var/run/docker.sock:/var/run/docker.sock -it testcafe/testcafe \"chromium --no-sandbox --ignore-certificate-errors --start-fullscreen\" --skip-js-errors --experimental-multiple-windows --quarantine-mode --screenshots-on-fails --screenshots automation-framework-Microservices/screenshots/ --reporter spec,xunit:automation-framework-Microservices/test-results/chrome-headless.xml automation-framework-Microservices/${params.testDir}"
                        )
                        sleep 5
                    }

                    stage('Publish Results') {
                        echo 'Upload TestCafe results to Jenkins'
                        sshGet remote: remote, from: '/opt/automation-framework-Microservices/test-results/chrome-headless.xml', into: 'chrome-headless.xml', override: true
                        junit testResults: 'chrome-headless.xml'
                    }
                }
            }
        } catch (err) {
            // Print the error and fail the build
            println "An error occurred: ${err}"
            error('Exception thrown above')
        }
    }
}
