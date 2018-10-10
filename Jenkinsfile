pipeline {
    agent any
    stages {
       
        
        stage ('Build') {
            steps {
                withMaven(maven : 'maven_3_5_0') {
                    sh 'mvn install -P test -f prx_forecast/forecastweatherapi/pom.xml'
                }
            }
        }
    }
}