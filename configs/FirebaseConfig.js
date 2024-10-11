// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqztY5BtrmAnKMTLhl2jBE6Db4WkJpuRc",
  authDomain: "giggles-f6e30.firebaseapp.com",
  projectId: "giggles-f6e30",
  storageBucket: "giggles-f6e30.appspot.com",
  messagingSenderId: "502901756146",
  appId: "1:502901756146:web:118398ba405c37247c406b",
  measurementId: "G-Q7D67HK99L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
export { db }; // Export the Firestore database instance