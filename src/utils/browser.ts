import bowser from 'bowser';

const parser = bowser.getParser(window.navigator.userAgent);

const isFirefox = parser.getBrowserName() === 'Firefox';

export default isFirefox;
