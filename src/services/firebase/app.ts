import { initializeApp } from 'firebase/app';

import config from '@/services/firebase/config';

const app = initializeApp(config);
export default app;
