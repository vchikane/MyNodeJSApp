pipeline {
    agent any
    stages {
       
        
        stage ('Build') {
            steps {
                withMaven(maven : 'maven_3_5_4') {
                    bat 'mvn install -P test -f pom.xml'
                }
            }
        }
    }
}