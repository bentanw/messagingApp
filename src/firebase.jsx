import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: import.meta.env.VITE_PUBLIC_FIREBASE_apiKey,
  authDomain: import.meta.env.VITE_PUBLIC_FIREBASE_authDomain,
  projectId: import.meta.env.VITE_PUBLIC_FIREBASE_projectId,
  storageBucket: import.meta.env.VITE_PUBLIC_FIREBASE_storageBucket,
  messagingSenderId: import.meta.env.VITE_PUBLIC_FIREBASE_messagingSenderId,
  appId: import.meta.env.VITE_PUBLIC_FIREBASE_appId,
  measurementId: import.meta.env.VITE_PUBLIC_FIREBASE_measurementId,
});

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
