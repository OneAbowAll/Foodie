// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, type Auth } from "firebase/auth";
import { firebaseConfig } from "./FirebaseConfig";
import { getFirestore, type Firestore } from "firebase/firestore";

// Initialize Firebase
export default class Firebase
{
  db: Firestore;
  app: FirebaseApp;
  auth: Auth;

  constructor()
  {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
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

export const firebaseApp = new Firebase();