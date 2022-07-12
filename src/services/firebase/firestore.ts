import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

import app from '@/services/firebase/app';

const db = getFirestore(app);
import.meta.env.VITE_FIREBASE_EMULATOR && connectFirestoreEmulator(db, 'localhost', 8080);

export default db;
