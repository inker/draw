import { execSync } from 'child_process'

const GIT_COMMAND = 'git rev-parse --verify HEAD'

export default () => execSync(GIT_COMMAND).toString().trim()
