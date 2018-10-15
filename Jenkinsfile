pipeline {
    
    agent any

    stages {
        stage ('Build') {
            steps {
                withMaven(maven : 'maven_3_5_4') {
                    bat 'mvn clean install -Ptest'
                }
            }
        }
    }

    post {
        always {
	    /* Use slackNotifier.groovy from shared library and provide current build result as parameter */   
            slackNotifier(currentBuild.currentResult)
            cleanWs()
        }
    }
}