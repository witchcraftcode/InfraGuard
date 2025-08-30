// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQt8iO7RY_blwQRrffP8UAaa9i3AiBvLA",
  authDomain: "infraguard-ai.firebaseapp.com",
  projectId: "infraguard-ai",
  storageBucket: "infraguard-ai.firebasestorage.app",
  messagingSenderId: "668905225784",
  appId: "1:668905225784:web:6271a86f6526136c86f0cd",
  measurementId: "G-8R6TY75X00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);