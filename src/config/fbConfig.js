import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAN48rvkeC5mho0F35JV2QqIKJd0vfbgWI",
  authDomain: "web-manager-3bfd9.firebaseapp.com",
  databaseURL: "https://web-manager-3bfd9.firebaseio.com",
  projectId: "web-manager-3bfd9",
  storageBucket: "web-manager-3bfd9.appspot.com",
  messagingSenderId: "616327892164"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
