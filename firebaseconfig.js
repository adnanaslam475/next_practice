import * as firebase from "firebase/app";

function InitializeFirebase() {
  var config = {
    apiKey: "AIzaSyASKkgxQzr4xdqqKTbRtaa5qatpUepiPvI",
    authDomain: "nextpractice-f72d7.firebaseapp.com",
    databaseURL: " https://nextpractice-f72d7-default-rtdb.firebaseio.com",
    projectId: "nextpractice-f72d7",
    storageBucket: "nextpractice-f72d7.appspot.com",
    messagingSenderId: "167165309279",
    appId: "1:167165309279:web:45ed5d616c8ef0c8dd86ea",
    measurementId: "G-S8LF5WLX6V",
  };
  firebase.initializeApp(config);
}
export default InitializeFirebase;