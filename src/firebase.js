import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCdKhG_OoPE7CN-jC_Ns8Dvw4fPBeq9JAw",
  authDomain: "movads-86100.firebaseapp.com",
  projectId: "movads-86100",
  storageBucket: "movads-86100.appspot.com",
  messagingSenderId: "1032341576175",
  appId: "1:1032341576175:web:20e3aad15469a8beb9be1a",
  measurementId: "G-TFVXBHYVPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
