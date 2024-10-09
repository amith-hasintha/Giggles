// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDjHbtZNNuTIilya684ncVEvI04I16DgjU",
  authDomain: "daycare-b8e35.firebaseapp.com",
  projectId: "daycare-b8e35",
  storageBucket: "daycare-b8e35.appspot.com",
  messagingSenderId: "77829676340",
  appId: "1:77829676340:web:cd5aece85a79dfc026d961",
  measurementId: "G-M36FBW4NYK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
//const analytics = getAnalytics(app);