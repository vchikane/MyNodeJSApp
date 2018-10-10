pipeline {
    agent any
    stages {
       
        
        stage ('Build') {
            steps {
                withMaven(maven : 'maven_3_5_4') {
                    bat 'mvn clean install -Dapigee.profile=test'
                }
            }
        }
    }
}