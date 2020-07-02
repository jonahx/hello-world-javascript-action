const core = require('@actions/core')
// const github = require('@actions/github')
const exec = require('@actions/exec')

try {
  // `who-to-greet` input defined in action metadata file
  // const nameToGreet = core.getInput('who-to-greet');
  // console.log(`Hello ${nameToGreet}!`);
  // const time = (new Date()).toTimeString();
  const exitCode = await exec.exec('./is_rebased')
  if (exitCode != 0) {
    core.setFailed(
      "Pull requests must be rebased on master, and cannot contain any merge " +
      "commits."
    )
  }

  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed("The GH action itself failed unexpectedly: " + error.message);
}
