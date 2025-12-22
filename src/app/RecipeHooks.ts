import { addDoc, collection, deleteDoc, doc, getDoc,  onSnapshot, orderBy, query, where } from "firebase/firestore";
import { firebaseApp } from "../firebase/Firebase";
import type { Recipe, RecipeDb } from "../data/Recipe";
import { useEffect, useState } from "react";
import FindAndRankAll from "../Utilities";

export function useRecipes(authorUID: string = "") : [Recipe[], (queryText: string) => void, (sort: string)=>void]
{
    const [recipes, setRecipeList] = useState<Recipe[]>([]);
    const [search, setSearch] = useState("");
    const [sortType, setSortType] = useState("latest");

    useEffect(()=>{
        const collectionRef = collection(firebaseApp.db, "Recipes");

        let q;
        if(authorUID === "")
            q = query(collectionRef, (sortType === "latest")?orderBy('dateOfCreation', 'desc'):orderBy('likes', 'desc'))
        else
            q = query(collectionRef, where("author", "==", authorUID))

        const unsub = onSnapshot(q, (snapshot)=>
        {
            let result: Recipe[] = [];
            snapshot.forEach((doc)=>{
                const data = doc.data();
                result.push({
                    id: doc.id,
                    ...data
                } as Recipe)
            })
            
            if(search !== "")
                result = FindAndRankAll(result, search, (rank)=> rank > 1.0);

            setRecipeList(result);
        });

        return () => unsub();
    }, [authorUID, search, sortType]);

    const setSearchValue = (queryText: string) =>
    {
        //TODO: Controlli sul query text immagino.
        setSearch(queryText);
    }

    const setSorting = (sort: string) =>
    {
        if(sort !== "latest" && sort !== "likes") return;

        setSortType(sort);
    }

    return [ recipes, setSearchValue, setSorting ];
}

export function useRecipe(id: string = "") : [Recipe | undefined, (recipe: RecipeDb) => Promise<string>, () => void]
{
    const [recipeId, setRecipeId] = useState<string>(id);
    const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);

    useEffect(()=>
    {
        const getRecipe = async () =>
        {
            const db = firebaseApp.db;
            const docRef = doc(db, "Recipes", recipeId);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists())
            {
                const data = docSnap.data();
                const r = {id: docSnap.id ,...data};
                setRecipe(r as Recipe);
            }
        }

        if(recipeId != "")
            getRecipe();

    }, [recipeId]);

    const createRecipe = async (newRecipe: RecipeDb)=>
    {
        console.log(newRecipe)
        if(recipe !== undefined) return;

        const collectionRef = collection(firebaseApp.db, "Recipes");
        const docRef = await addDoc(collectionRef, newRecipe);

        setRecipeId(docRef.id);
        return docRef.id;
    };

    const deleteRecipe = async() =>{
        if(recipe === undefined) return;

        const docRef = doc(firebaseApp.db, "Recipes", recipe.id);
        await deleteDoc(docRef);
    };

    return [ recipe, createRecipe, deleteRecipe ];
}