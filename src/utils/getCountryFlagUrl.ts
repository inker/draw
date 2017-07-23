declare const require: any

const requireFlag = require.context('flag-icon-css/flags/4x3/', false, /\.svg$/)

export default (code: string) => requireFlag(`./${code}.svg`) as string
