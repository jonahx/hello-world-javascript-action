const core = require('@actions/core')
const exec = require('@actions/exec')

const checkoutCode = async () => {
  try {
    core.exportVariable('INPUT_FETCH-DEPTH', '0')

    const exitCode = await exec.exec('node ./checkout/index.js')

    if (exitCode != 0) {
      core.setFailed(failureMsg)
    }
  } catch (error) {
    core.setFailed(failureMsg)
  }
}


const verifyRebase = async () => {
  const failureMsg = "Pull requests must be rebased on master, and cannot " +
    "contain any merge commits."

  try {
    const exitCode = await exec.exec('./is_rebased')

    if (exitCode != 0) {
      core.setFailed(failureMsg)
    }
  } catch (error) {
    core.setFailed(failureMsg)
  }
}

checkoutCode()
verifyRebase()
