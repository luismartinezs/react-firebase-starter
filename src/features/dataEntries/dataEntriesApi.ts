import {
  collection,
  query,
  orderBy,
  where,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  FirestoreDataConverter,
} from 'firebase/firestore';
import type {
  CollectionReference,
  DocumentData,
  QueryConstraint,
  Query,
  QuerySnapshot,
  WithFieldValue,
  QueryDocumentSnapshot,
  SnapshotOptions,
  DocumentReference,
} from 'firebase/firestore';

import { db } from '@/services/firebase/index';
import { auth } from '@/services/firebase/auth';
import type { IDataEntry } from './dataEntriesTypes';

const DATA_ENTRIES = 'dataEntries';

const dataEntryConverter: FirestoreDataConverter<IDataEntry> = {
  toFirestore(entry: WithFieldValue<IDataEntry>): DocumentData {
    return entry;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): IDataEntry {
    const data = snapshot.data(options);
    const _dataEntry: IDataEntry = {
      ...(data as IDataEntry),
      id: snapshot.id,
    };
    return _dataEntry;
  },
};

interface IGetDataEntriesOptions {
  isAdmin?: boolean;
}

interface IGetDataEntries {
  (options: IGetDataEntriesOptions): Promise<Array<IDataEntry> | null>;
}

const getQuery = ({ isAdmin = false }: IGetDataEntriesOptions): Query<IDataEntry> => {
  type QueryTuple = [CollectionReference<DocumentData>, ...QueryConstraint[]];

  let queryElements: QueryTuple = [collection(db, DATA_ENTRIES).withConverter(dataEntryConverter)];

  if (!isAdmin) {
    queryElements.push(where('userUid', '==', auth.currentUser?.uid));
  }

  queryElements.push(orderBy('timestamp', 'desc'));

  return query(...queryElements).withConverter(dataEntryConverter);
};

const getDataEntriesFromSnapshot = (snapshot: QuerySnapshot<DocumentData>): Array<IDataEntry> | null => {
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map((doc) => doc.data());
};

const getDataEntries: IGetDataEntries = async ({ isAdmin = false }) => {
  if (auth.currentUser === null) {
    throw new Error('getDataEntries: User is not logged in');
  }

  const q = getQuery({ isAdmin });

  const querySnapshot = await getDocs(q);

  return getDataEntriesFromSnapshot(querySnapshot);
};

interface IGetEntryRefById<T> {
  (id?: string): DocumentReference<T> | null;
}

const getDataEntryRefById: IGetEntryRefById<IDataEntry> = (id) => {
  if (!id) {
    return null;
  }
  return doc(db, DATA_ENTRIES, id).withConverter(dataEntryConverter) as DocumentReference<IDataEntry>;
};

const getDataEntry = async (id: string): Promise<IDataEntry | null> => {
  if (auth.currentUser === null) {
    throw new Error('getDataEntry: User is not logged in');
  }

  // Reference: https://firebase.google.com/docs/firestore/query-data/get-data
  const docRef = getDataEntryRefById(id);

  if (!docRef) {
    return null;
  }

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }

  return null;
};

const editDataEntry = (id: string, data: IDataEntry) => {
  if (auth.currentUser === null) {
    throw new Error('editDataEntry: User is not logged in');
  }

  const ref = getDataEntryRefById(id);

  if (!ref) {
    return null;
  }

  return updateDoc(ref, data);
};

const resolveDataEntryUserUid = (entry: IDataEntry) => {
  if (auth.currentUser === null) {
    throw new Error('resolveDataEntryUid: User is not logged in');
  }

  if (typeof entry.userUid === 'undefined' || entry.userUid === null) {
    return { ...entry, userUid: auth.currentUser.uid };
  }

  // as a safety measure, entries are only created by the user that owns them
  // this may need change if, for example, admin need to be able to create entries for any user
  if (entry.userUid !== auth.currentUser.uid) {
    throw new Error('resolveDataEntryUid: Provided userUid does not match current user');
  }

  return entry;
};

const createDataEntry = async () => {
  const dataEntry = {};

  if (auth.currentUser === null) {
    throw new Error('createDataEntry: User is not logged in');
  }

  return addDoc(collection(db, DATA_ENTRIES).withConverter(dataEntryConverter), {
    ...resolveDataEntryUserUid(dataEntry),
    timestamp: serverTimestamp(),
  });
};

const deleteDataEntry = (id: string) => {
  if (auth.currentUser === null) {
    throw new Error('deleteDataEntry: User is not logged in');
  }

  const ref = getDataEntryRefById(id);

  if (!ref) {
    return null;
  }

  return deleteDoc(ref);
};

const entriesAPI = {
  editDataEntry,
  createDataEntry,
  deleteDataEntry,
  getDataEntry,
  getDataEntries,
};

export default entriesAPI;
