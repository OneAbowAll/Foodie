import { createContext } from "react";
import Firebase, { firebaseApp } from "./Firebase";

export const FirebaseContext = createContext<Firebase>(firebaseApp);