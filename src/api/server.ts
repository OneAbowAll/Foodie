import express, { json } from "express";
import cors from "cors";
import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore";
import type { Recipe } from "../data/Recipe";
import FindAndRankAll from "../Utilities";
import { initializeApp } from "firebase/app";

import dotenv  from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: process.env.VITE_AUTH_DOMAIN,
  projectId: process.env.VITE_PROJECT_ID,
  storageBucket: process.env.VITE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_ID
};
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAppDb = getFirestore(firebaseApp);

const app = express();
const PORT = 1234;

const api = express.Router();

app.use(json());
app.use(cors());
app.use("/api", api);

api.get("/recipes", async (req, res) =>
{
    const collectionRef = collection(firebaseAppDb, "Recipes");

    let authorUID = req.query.author;
    authorUID ??= "";

    let sortType = req.query.sort;
    sortType ??= "latest";

    if(sortType !== "latest" && sortType !== "likes")
        res.sendStatus(400);

    let search = req.query.search;
    search ??= "";

    let q;
    if(authorUID === "")
        q = query(collectionRef, (sortType === "latest")?orderBy('dateOfCreation', 'desc'):orderBy('likesCount', 'desc'))
    else
        q = query(collectionRef, where("authorUID", "==", authorUID))
    
    const querySnap = await getDocs(q);
    let result: Recipe[] = [];
    querySnap.forEach((doc)=>
    {
        const data = doc.data();
        result.push({
            id: doc.id,
            ...data
        } as Recipe)
    });
    
    if(search !== "")
        result = FindAndRankAll(result, search as string, (rank)=> rank > 0.9);

    res.status(200).send(result);
});

api.get("/recipes/:id", async (req, res) =>
{
    const db = firebaseAppDb;
    const recipeId = req.params.id;
    const currentUser = req.query.currentUser as string | undefined;


    const docRef = doc(db, "Recipes", recipeId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists())
    {
        const data = docSnap.data();
        const isLiked = currentUser 
        ? (data.likes || []).includes(currentUser) 
        : false;
        
        const responseData = {
            id: docSnap.id,
            ...data,
            didYouLikeIt: isLiked
        };

        res.status(200).json(responseData);
    }
    else
        res.sendStatus(404);
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});