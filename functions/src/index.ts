import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import "firebase-functions";
admin.initializeApp();

const USERS = "users";
const ENTRIES = "dataEntries";

export const deleteUser = functions.https.onCall((data, context) => {
  // App Check token verification
  if (context.app == undefined) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called from an App Check verified app."
    );
  }

  if (!context.auth) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called " + "while authenticated."
    );
  }

  const uid = context.auth.uid;

  if (!(typeof uid === "string") || uid.length === 0) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "The function must be called with " +
        'one arguments "uid" containing a user id.'
    );
  }

  return handleDeleteUser(uid).catch((err) => {
    throw new functions.https.HttpsError("unavailable", err.message);
  });
});

const handleDeleteUser = async (uid: string) => {
  const user = await admin.auth().getUser(uid);

  if (!user) {
    throw new Error(`User with id ${uid} does not exist.`);
  }

  await admin.auth().deleteUser(uid);

  return {
    message: `User with id ${uid} deleted.`,
  };
};

// if a user is deleted, delete from firestore user data associated with that user
export const deleteUserData = functions.auth.user().onDelete(async (user) => {
  const uid = user.uid;
  admin.firestore().collection(USERS).doc(uid).delete();
});

// If a user is deleted, delete from firestore all data entries associated with that user.
export const deleteUserDataEntries = functions.auth
  .user()
  .onDelete(async (user) => {
    const uid = user.uid;
    admin
      .firestore()
      .collection(ENTRIES)
      .where("userUid", "==", uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete();
        });
      });
  });
