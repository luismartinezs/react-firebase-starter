import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions';

import firebaseApp from '@/services/firebase/app';

const functions = getFunctions(firebaseApp);
import.meta.env.VITE_FIREBASE_EMULATOR && connectFunctionsEmulator(functions, 'localhost', 5001);

// NOTE I'm not using this export, but leaving it here as an example of how to call cloud functions from the frontend
const getResultsByQuery = httpsCallable(functions, 'getResultsByQuery');
const deleteUser = httpsCallable(functions, 'deleteUser');

export { functions, getResultsByQuery, deleteUser };
