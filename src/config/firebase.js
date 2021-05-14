/*import * as firebas from 'firebase*/
import firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyC9VlWdlRvcDDPGR9V4C41nEq6XTWgkKYU",
    authDomain: "fir-expo-d1d3d.firebaseapp.com",
    projectId: "fir-expo-d1d3d",
    storageBucket: "fir-expo-d1d3d.appspot.com",
    messagingSenderId: "316559403413",
    appId: "1:316559403413:web:5aefb420b52c9cc066ee9c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

 const db = firebase.firestore();
 export default {firebase, db}