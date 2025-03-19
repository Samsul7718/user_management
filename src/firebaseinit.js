// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBCfGS76Ddf4fkNnezKT2hQRTyajEukp90",
//   authDomain: "user-data-ce182.firebaseapp.com",
//   databaseURL:
//     "https://user-data-ce182-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "user-data-ce182",
//   storageBucket: "user-data-ce182.firebasestorage.app",
//   messagingSenderId: "9172797169",
//   appId: "1:9172797169:web:ea674d76b060da948a8b50",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

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
  //   databaseURL:
  // "https://console.firebase.google.com/u/0/project/user-data-7718/firestore/databases/-default-/data",
  storageBucket: "user-data-7718.firebasestorage.app",
  messagingSenderId: "111998705877",
  appId: "1:111998705877:web:facf46bf6be03c85f7425c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
