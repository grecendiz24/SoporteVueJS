const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");


const config = {
  apiKey: "xxxxx",
  authDomain: "xxxx",
  databaseURL: "xxx",
  projectId: "xxxx",
  storageBucket: "xxxxx",
  messagingSenderId: "xxxx",
  appId: "xxxxx"
};
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {firebase, db, auth, storage}