node{
    stage("SonarQube analysis") {
      withSonarQubeEnv('sonarqube'){
              def sonarScanner = tool name: 'scanner', type: 'hudson.plugins.sonar.MsBuildSQRunnerInstallation'
              bat "${sonarScanner}/bin/sonar-scanner -Dsonar.projectKey=test -Dsonar.sources=apiproxy"
      }
    }
    stage("Quality Gate"){
        timeout(time: 10, unit: 'SECONDS') {
            def qg = waitForQualityGate()
            if (qg.status != 'OK') {
                error "Pipeline aborted due to quality gate failure: ${qg.status}"
            }
        }
    }
    stage ('Build') {
        withMaven(maven : 'maven_3_5_4'){
            def maven = tool name: 'maven_3_5_4', type: 'maven'
            bat 'mvn clean install -Ptest'
        }
    }
}
