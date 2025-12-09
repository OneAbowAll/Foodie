import type { FirebaseApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

class FirestoreDB
{
    db: Firestore
    constructor(app: FirebaseApp)
    {
        this.db = getFirestore(app)
    }
}