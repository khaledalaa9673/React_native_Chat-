import firebase from "firebase/app";
import "firebase/auth"
import "firebase/database"
import "firebase/storage"
var firebaseConfig = {
  apiKey: "AIzaSyDmOuqdYu01cT7D-wq863eH895RtepliXI",
  authDomain: "chat-app-ef1e2.firebaseapp.com",
  databaseURL: "https://chat-app-ef1e2.firebaseio.com",
  projectId: "chat-app-ef1e2",
  storageBucket: "chat-app-ef1e2.appspot.com",
  messagingSenderId: "615710328413",
  appId: "1:615710328413:web:f096f2213a3f1d8b7cafb4",
  measurementId: "G-C8EBBWTJRF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

export default firebase
