// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-9fe58.firebaseapp.com",
  projectId: "mern-estate-9fe58",
  storageBucket: "mern-estate-9fe58.appspot.com",
  messagingSenderId: "174069385503",
  appId: "1:174069385503:web:5287f2422253438c03882a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);