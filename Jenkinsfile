node {
   try {
    notifyBuild('STARTED')

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
            bat 'mvn clean install -Ptes'
        }
    }

   } catch (e) {
       currentBuild.result = "FAILED"
       echo '$e'
       throw e
    } finally {
       notifyBuild(currentBuild.result)
    }
  
}

// function for sending slack notifictions
def notifyBuild(String buildStatus = 'STARTED') {
  // build status of null means successful
  buildStatus =  buildStatus ?: 'SUCCESSFUL'

  // Default values
  def colorName = 'RED'
  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} (${env.BUILD_URL})"

  // Override default values based on build status
  if (buildStatus == 'STARTED') {
    color = 'YELLOW'
    colorCode = '#FFFF00'
  } else if (buildStatus == 'SUCCESSFUL') {
    color = 'GREEN'
    colorCode = '#00FF00'
  } else {
    color = 'RED'
    colorCode = '#FF0000'
  }

  // Send notifications
  slackSend (color: colorCode, message: summary)
}
