const core = require('@actions/core')
// const github = require('@actions/github')
const exec = require('@actions/exec')

async () => {
  try {
    const exitCode = await exec.exec('./is_rebased')

    if (exitCode != 0) {
      core.setFailed(
        "Pull requests must be rebased on master, and cannot contain any " +
        "merge commits."
      )
    }
  } catch (error) {
    core.setFailed(
      "The GH action itself failed unexpectedly: " + error.message
    )
  }
}()

