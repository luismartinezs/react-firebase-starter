import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

import app from './app';

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LcmGuQgAAAAAENap6HBdB8NvcYvIpBEZ_GAePHj'),
  isTokenAutoRefreshEnabled: true,
});

export default appCheck;
