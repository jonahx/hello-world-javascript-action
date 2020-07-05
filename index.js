
const core = require('@actions/core')
// const github = require('@actions/github')
const exec = require('@actions/exec');  // You need the semicolon!


const failureMsg = "Pull requests must be rebased on master, and cannot " +
  "contain any merge commits."

(async () => {
  try {
    const exitCode = await exec.exec('./is_rebased')

    if (exitCode != 0) {
      core.setFailed(failureMsg)
    }
  } catch (error) {
    core.setFailed(failureMsg)
  }
})()

