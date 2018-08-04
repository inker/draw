import bowser from 'bowser'

const browser = bowser.getParser(window.navigator.userAgent)

const platformType = browser.parsedResult.platform.type

export const isHandheld = platformType === 'mobile' || platformType === 'tablet'

export default browser
