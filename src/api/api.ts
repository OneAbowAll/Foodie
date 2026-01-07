import express, { json } from "express";
import cors from "cors";
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { firebaseApp } from "../firebase/Firebase";
import type { Recipe } from "../data/Recipe";
import FindAndRankAll from "../Utilities";
import type RecipeDb from "../data/Recipe";

const app = express();
const PORT = 1234;

const api = express.Router();

app.use(json());
app.use(cors());
app.use("/api", api);

api.get("/recipes", async (req, res) =>
{
    const collectionRef = collection(firebaseApp.db, "Recipes");

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
    const db = firebaseApp.db;
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