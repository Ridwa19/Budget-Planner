// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB74D8Gjp35Kh7IhBmbGAXF2-WIqArIi1A",
  authDomain: "budget-planner-f05ef.firebaseapp.com",
  databaseURL: "https://budget-planner-f05ef-default-rtdb.firebaseio.com",
  projectId: "budget-planner-f05ef",
  storageBucket: "budget-planner-f05ef.appspot.com",
  messagingSenderId: "541393454421",
  appId: "1:541393454421:web:b1688c5927ade084e7dbdc",
  measurementId: "G-99SVE1GLQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }