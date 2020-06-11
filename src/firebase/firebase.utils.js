import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAG-5ZmF1pQXU8yhog9t3UOmlzxw2Acr4U",
  authDomain: "crown2db-3443d.firebaseapp.com",
  databaseURL: "https://crown2db-3443d.firebaseio.com",
  projectId: "crown2db-3443d",
  storageBucket: "crown2db-3443d.appspot.com",
  messagingSenderId: "1066989733577",
  appId: "1:1066989733577:web:c68b4badbc2aed993cef18",
  measurementId: "G-6C9KJ5QQ6S",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
