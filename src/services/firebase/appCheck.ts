import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

import app from './app';

const appCheck = import.meta.env.PROD
  ? initializeAppCheck(app, {
      // replace the public key below with your own public key
      provider: new ReCaptchaV3Provider('6LcmGuQgAAAAAENap6HBdB8NvcYvIpBEZ_GAePHj'),
      isTokenAutoRefreshEnabled: true,
    })
  : null;

export default appCheck;
