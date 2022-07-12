import { getAuth, connectAuthEmulator, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

import app from './app';
import { createUserData, getUserDataByUid } from '@/features/userData/userDataApi';
import { deleteUser } from './functions';

const auth = getAuth(app);
import.meta.env.VITE_FIREBASE_EMULATOR && connectAuthEmulator(auth, 'http://localhost:9099');

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const userData = await getUserDataByUid(user.uid);

    // if user data doesn't exist, create it
    if (!userData) {
      createUserData(user);
    }
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, signInWithGoogle, logout, deleteUser };
