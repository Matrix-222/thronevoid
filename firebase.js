// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-bfHRJW3E8KW3-o-PkNW6xi5ytrTKMJE",
  authDomain: "thronevoid.firebaseapp.com",
  projectId: "thronevoid",
  storageBucket: "thronevoid.firebasestorage.app",
  messagingSenderId: "958587822012",
  appId: "1:958587822012:web:f3c9150deac0f4ca6415b9",
  measurementId: "G-ZYN4TF6Z0E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
