import bowser from 'bowser'

const parser = bowser.getParser(window.navigator.userAgent)
const platformType = parser.getPlatformType()

export const isHandheld = platformType === 'mobile' || platformType === 'tablet'

export const isFirefox = parser.getBrowserName() === 'Firefox'
