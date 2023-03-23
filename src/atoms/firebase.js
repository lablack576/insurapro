import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCd8hh3SGgfnOdVLza4fzpOAZwcmRhUBaA",
    authDomain: "insurapro-326ac.firebaseapp.com",
    databaseURL:
        "https://insurapro-326ac-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "insurapro-326ac",
    storageBucket: "insurapro-326ac.appspot.com",
    messagingSenderId: "872372284193",
    appId: "1:872372284193:web:a9ba80c842b1ea0303ec60",
};

firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();

export const notesRef = databaseRef.child("notes");
export default firebase;
