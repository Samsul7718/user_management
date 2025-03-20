// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrq_Oynm_iCqtr2npIyN8JFRhSx9K6kZY",
  authDomain: "user-data-7718.firebaseapp.com",
  projectId: "user-data-7718",
  storageBucket: "user-data-7718.firebasestorage.app",
  messagingSenderId: "111998705877",
  appId: "1:111998705877:web:facf46bf6be03c85f7425c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
