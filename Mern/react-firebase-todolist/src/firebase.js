import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyAnP1pcN_Y-Cjba7_s73wexCPCOS9JvVBc",
  authDomain: "react-firebase-todo-10d7b.firebaseapp.com",
  projectId: "react-firebase-todo-10d7b",
  storageBucket: "react-firebase-todo-10d7b.appspot.com",
  messagingSenderId: "1064445677467",
  appId: "1:1064445677467:web:e1eedbd7929bcb527f1b3e",
});

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
