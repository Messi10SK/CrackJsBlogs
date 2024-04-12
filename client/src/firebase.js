// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tech-blogs-2dbb5.firebaseapp.com",
  projectId: "tech-blogs-2dbb5",
  storageBucket: "tech-blogs-2dbb5.appspot.com",
  messagingSenderId: "611635599625",
  appId: "1:611635599625:web:d313e769fff236676a5bd8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);