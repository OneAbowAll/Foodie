import { addDoc, collection, doc, getDoc, getDocs, query, type QueryNonFilterConstraint } from "firebase/firestore";
import { firebaseApp } from "../firebase/Firebase";
import type { Recipe } from "../data/Recipe";


//Recipe utilities functions
const addRecipe = async (recipe: Recipe) =>{
    const collectionRef = collection(firebaseApp.db, "Recipes");
    const docRef = await addDoc(collectionRef, recipe);

    return docRef.id;
};

const getRecipe = async (recipeId : string) =>{
    const docRef = doc(firebaseApp.db, "Recipes", recipeId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists())
        return docSnap.data() as Recipe;
    else
        return undefined;
};

const getAllRecipes = async (queryConstraints: QueryNonFilterConstraint[]) =>{
    const collectionRef = collection(firebaseApp.db, "Recipes");
    const q = query(collectionRef, ...queryConstraints)
    const snapshot = await getDocs(q);

    const result: Recipe[] = [];
    snapshot.forEach((doc)=>{
        const data = doc.data();
        result.push({
            id: doc.id,
            ...data
        } as Recipe)
    });

    return result;
};

const deleteRecipe ()