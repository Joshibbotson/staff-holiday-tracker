export {};
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

//works but need blaze plan to utilise//
exports.createUserInFirestore = functions.auth.user().onCreate(async (user) => {
  return db.collection("users").doc(user.uid).set({
    email: user.email,
    name: user.displayName,
  });
});
