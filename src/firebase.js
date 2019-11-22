const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");


const config = {
  apiKey: "AIzaSyBpJaZrfo_ygz2GdqLIHePugpdRnXZKyf4",
  authDomain: "pension01-df569.firebaseapp.com",
  databaseURL: "https://pension01-df569.firebaseio.com",
  projectId: "pension01-df569",
  storageBucket: "pension01-df569.appspot.com",
  messagingSenderId: "777556764870",
  appId: "1:777556764870:web:8dd23d7ca6400acb"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {firebase, db, auth, storage}