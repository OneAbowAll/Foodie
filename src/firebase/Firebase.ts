// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, type Auth } from "firebase/auth";
import { firebaseConfig } from "./FirebaseConfig";

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