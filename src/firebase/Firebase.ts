// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, type Auth, type User } from "firebase/auth";
import { useLocalStorage } from "../Hooks";

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
export default class Firebase
{
  app: FirebaseApp;
  auth: Auth;

  constructor()
  {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
  }

  TryLogin(email: string, password: string) : boolean
  {
    signInWithEmailAndPassword(
        this.auth,
        email,
        password
    )
    .then((user)=> //Save logged in user
    {
      return (user !== null);
    });

    return false;
  }
}