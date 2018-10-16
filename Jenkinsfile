node {
  def project = "4gamestein"
  def env_name = "qa"
  def docker_registry = "${DOCKER_REGISTRY}"
  def s3_bucket = "s3://${project}_${env_name}"
  def branch = "${BRANCH_NAME}"
  def feature_name = (branch =~ /^feature-/) ? branch.substring(8) : "master"
  def s3_location = "${s3_bucket}/${project}/${feature_name}/"
  def container_name = "${project}_${env_name}_${new Random().nextInt(1000)}"

  Jenkins.instance.getItem(project).getBranch(branch).getBuilds().each { build ->
    def exec = build.getExecutor()

    if (build.number < currentBuild.number && exec != null) {
      exec.interrupt(Result.ABORTED, new CauseOfInterruption.UserInterruption("Aborted by #${currentBuild.number}"))
      println("Aborted previous running build #${build.number}")
    }
  }

  checkout scm

  stage("Build") {
    sh returnStatus: true, script: "docker rm ${container_name}"
    sh returnStatus: true, script: "rm -Rf dist"

    def cwd = pwd()
    sh script: "cp ~/.ssh/id_rsa \"$cwd\"/id_rsa"
    sh script: "docker build -t ${container_name}:latest --no-cache ."

    sh script: "docker create --name ${container_name} ${container_name}:latest"
    sh script: "docker cp ${container_name}:/build/dist ./dist"
    sh returnStatus: true, script: "docker rm ${container_name}"
  }

  stage("Deploy QA") {
    withCredentials([string(credentialsId: 's3_access_key', variable: 'S3_ACCESS_KEY'), string(credentialsId: 's3_secret_key', variable: 'S3_SECRET_KEY')]) {
      sh script: "s3cmd --access_key=${S3_ACCESS_KEY} --secret_key=${S3_SECRET_KEY} --acl-public --no-mime-magic --guess-mime-type --recursive --delete-removed  sync  dist/ ${s3_location}"
    }
  }
}