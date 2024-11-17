// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVYQhrQJEXJPN8yEBm80qnXw_jBfOXPOg",
  authDomain: "aakara-bdf40.firebaseapp.com",
  projectId: "aakara-bdf40",
  storageBucket: "aakara-bdf40.firebasestorage.app",
  messagingSenderId: "638878947325",
  appId: "1:638878947325:web:360d4dfe7d542f3e54eb94"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;