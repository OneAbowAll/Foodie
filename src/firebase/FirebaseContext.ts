import { createContext } from "react";
import Firebase from "./Firebase";

export const FirebaseContext = createContext<Firebase>(new Firebase());