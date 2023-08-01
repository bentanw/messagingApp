import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: "messaging-app-b0892",
  storageBucket: "messaging-app-b0892.appspot.com",
  messagingSenderId: "782002815039",
  appId: "1:782002815039:web:4907817311d8515770788a",
  measurementId: "G-1LT6CMJF82",
});

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
