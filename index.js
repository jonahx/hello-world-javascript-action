const core = require('@actions/core')
const exec = require('@actions/exec')
const cp = require('child_process')
const path = require('path')

const checkoutCode = async () => {
  try {
    core.exportVariable('INPUT_FETCH-DEPTH', '0')

    const options = { env: process.env, stdio: 'inherit'}

    const scriptPath = path.join(
      __dirname, '../checkout/index.js'
    )
    cp.execSync(`node ${scriptPath}`, options);

    // if (exitCode != 0) {
    //   core.setFailed(`Our checkout failed: ${exitCode}`)
    // }
  } catch (error) {
    core.setFailed(error)
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
