import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

import app from './app';

const appCheck = import.meta.env.PROD
  ? initializeAppCheck(app, {
      // replace the public key below with your own public key
      provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_V3_PUBLIC_KEY),
      isTokenAutoRefreshEnabled: true,
    })
  : null;

export default appCheck;
