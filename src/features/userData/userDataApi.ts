import { collection, query, where, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import type { Query, DocumentData, DocumentReference } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import pRetry from 'p-retry';

import { auth } from '@/services/firebase/auth';
import db from '@/services/firebase/firestore';
import type { IUserData } from './userDataTypes';

const USERS = 'users';

interface IGetUserDataRefByUid<T> {
  (uid?: string): DocumentReference<T> | null;
}

export const getUserDataRefByUid: IGetUserDataRefByUid<IUserData> = (uid) => {
  if (!uid) {
    return null;
  }
  return doc(db, USERS, uid) as DocumentReference<IUserData>;
};

export const getUserData = async (uid: string): Promise<IUserData | null> => {
  if (auth.currentUser === null) {
    return null;
  }

  const docRef = getUserDataRefByUid(uid);

  if (!docRef) {
    return null;
  }

  // need to retry this call because when a new user is created we need to wait for it to be added to firestore
  const docSnap = await pRetry(async () => getDoc(docRef), { retries: 3 });

  if (docSnap.exists()) {
    return docSnap.data() as IUserData;
  }

  return null;
};

export const getUserDataByUid = async (uid: string): Promise<IUserData | null> => {
  const userData = await getUserDataByKey('uid', uid);

  // uids are unique
  if (Array.isArray(userData)) {
    return userData[0];
  }

  return userData;
};

export const getQueryByKey = <K extends keyof IUserData>(key: K, value: IUserData[K]): Query<DocumentData> => {
  return query(collection(db, USERS), where(key, '==', value));
};

const getUserDataByKey = async <K extends keyof IUserData>(
  key: K,
  value: IUserData[K]
): Promise<IUserData | IUserData[] | null> => {
  if (auth.currentUser === null) {
    return null;
  }

  const q = getQueryByKey(key, value);
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  if (querySnapshot.size === 1) {
    return querySnapshot.docs[0].data() as IUserData;
  }

  return querySnapshot.docs.map((doc) => doc.data() as IUserData);
};

export const createUserData = (
  user: User,
  { authProvider = 'google', isAdmin = false } = {}
): ReturnType<typeof setDoc> => {
  const userPayload = {
    uid: user.uid,
    name: user.displayName,
    authProvider: authProvider || 'google',
    email: user.email,
    isAdmin,
  };

  return setDoc(doc(db, USERS, user.uid), userPayload);
};

const userDataAPI = {
  getUserData,
  createUserData,
  getUserDataByUid,
};

export default userDataAPI;
