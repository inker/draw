const { execSync } = require('child_process')

const GIT_COMMAND = 'git rev-parse --verify HEAD'

module.exports = () =>
  execSync(GIT_COMMAND).toString().trim()
