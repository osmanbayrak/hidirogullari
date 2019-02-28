#!groovy
@Library('sky-jenkins-utils') _

pipeline {
    agent any
    
    environment {
        PACKAGE_TYPE = 'Project'
        STAGING_DOCKER_HOST = 'tcp://10.133.151.151:2375'
    }
 
    stages {

        stage('Prepare virtualenv with tools') {
            steps {
                drmPrepareVenv()
            }
        }

        stage('Install project requirements') {
            steps {
                sh 'npm install'
                echo 'NPM INSTALL Completed'
            }
        }

        stage('SKY Compatibility Check') {
            when {
                expression { should.test(env.BRANCH_NAME, env.PACKAGE_TYPE) == true }
            }
            steps {
                drmCompatibilityCheck()
            }
        }

        stage('Packaging') {
            steps {
                sh 'npm run build'
                echo 'BUILD Completed'
            }
        }
        
        stage('Dockerization') {
            steps {
                sh "docker build -t registry.sekomy.com/${env.PACKAGE_NAME}:${env.PACKAGE_VERSION} . --no-cache"
                sh "docker push registry.sekomy.com/${env.PACKAGE_NAME}:${env.PACKAGE_VERSION}"
                sh "docker tag registry.sekomy.com/${env.PACKAGE_NAME}:${env.PACKAGE_VERSION} registry.sekomy.com/${env.PACKAGE_NAME}:latest"
                sh "docker push registry.sekomy.com/${env.PACKAGE_NAME}:latest"
            }
        }
        
        // Staging Deploy
        stage('Staging Deploy') {
            when {
                expression { should.deploy(env.BRANCH_NAME, env.PACKAGE_TYPE) == true }
            }
            steps {
                sh "echo 'Deploy docker-compose'"
                sh "sed -i 's/registry.sekomy.com\\/${env.PACKAGE_NAME}:0.0.0/registry.sekomy.com\\/${env.PACKAGE_NAME}:${env.PACKAGE_VERSION}/g' docker-compose.yml"
                sh "docker-compose -p lottcp -H ${env.STAGING_DOCKER_HOST} pull"
                sh "docker-compose -p lottcp -H ${env.STAGING_DOCKER_HOST} down"
                sh "docker-compose -p lottcp -H ${env.STAGING_DOCKER_HOST} up -d"
            }
        }
    }

    post {
        success{
            drmPostSuccess()
        }
        failure {
          drmPostFailure()
        }
    }
}