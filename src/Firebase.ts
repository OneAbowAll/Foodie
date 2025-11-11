// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwi9IXr-26PxqyYelZn-6vIBKRwKvMgRs",
  authDomain: "foodie-22af5.firebaseapp.com",
  projectId: "foodie-22af5",
  storageBucket: "foodie-22af5.firebasestorage.app",
  messagingSenderId: "677542873965",
  appId: "1:677542873965:web:b6ee78f27ca4d608f9e864"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };