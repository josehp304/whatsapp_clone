// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuagoiGVdwL8jYWW42hs6oHfT4-CpTp1k",
  authDomain: "whatsappclone-c5c91.firebaseapp.com",
  projectId: "whatsappclone-c5c91",
  storageBucket: "whatsappclone-c5c91.appspot.com",
  messagingSenderId: "524930281317",
  appId: "1:524930281317:web:ce5747f5d0915f563dfb8c",
  measurementId: "G-P4J648YSB1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
