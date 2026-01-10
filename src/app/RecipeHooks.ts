import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, Timestamp, where } from "firebase/firestore";
import { firebaseApp } from "../firebase/Firebase";
import type { Recipe, RecipeDb } from "../data/Recipe";
import { useEffect, useState } from "react";
import FindAndRankAll from "../Utilities";

export function useRecipes(authorUID: string = "") : [Recipe[], boolean, (queryText: string) => void, (sort: string)=>void]
{
    const [recipes, setRecipeList] = useState<Recipe[]>([]);
    const [search, setSearch] = useState("");
    const [sortType, setSortType] = useState("latest");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        setLoading(true);

        const collectionRef = collection(firebaseApp.db, "Recipes");

        let q;
        if(authorUID === "")
            q = query(collectionRef, (sortType === "latest")?orderBy('dateOfCreation', 'desc'):orderBy('likesCount', 'desc'))
        else
            q = query(collectionRef, where("authorUID", "==", authorUID))

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
                result = FindAndRankAll(result, search, (rank)=> rank > 0.8);

            setRecipeList(result);
            setLoading(false);
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

    return [ recipes, loading, setSearchValue, setSorting ];
}

export function useRecipe(id: string = "") : [Recipe | undefined, boolean, (recipe: RecipeDb) => void, (recipe: Recipe) => void, () => void, () => void]
{
    const [recipeId, setRecipeId] = useState<string>(id);
    const [loading, setLoading] = useState<boolean>(true);
    const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);

    useEffect(()=>
    {
        const getRecipe = async () =>
        { 
            setLoading(true);
            try{
                const response = await fetch(`http://localhost:1234/api/recipes/${recipeId}?currentUser=${firebaseApp.auth.currentUser?.uid}`);
                if(!response.ok)
                    return;

                const data = await response.json();
                const r = {
                    ...data,
                    dateOfCreation: new Timestamp(data.dateOfCreation.seconds, data.dateOfCreation.nanoseconds)      
                } as Recipe;
                
                setRecipe(r);
            }
            finally
            {
                setLoading(false);
            }
            /*
            const db = firebaseApp.db;
            const docRef = doc(db, "Recipes", recipeId);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists())
            {
                const data = docSnap.data();
                const r = {id: docSnap.id ,...data} as Recipe;
                
                if(r.likes.find((el) => el === firebaseApp.auth.currentUser!.uid))
                    r.didYouLikeIt = true;
                else
                    r.didYouLikeIt = false;

                setRecipe(r);
            }
            */
        }

        if(recipeId != "")
            getRecipe();

    }, [recipeId]);

    const createRecipe = async (newRecipe: RecipeDb)=>
    {
        if(recipe !== undefined) return;

        newRecipe.likes = [];
        newRecipe.likesCount = 0;
        newRecipe.authorUID = firebaseApp.auth.currentUser!.uid;
        newRecipe.authorName = firebaseApp.auth.currentUser!.displayName!;

        const collectionRef = collection(firebaseApp.db, "Recipes");
        const docRef = await addDoc(collectionRef, newRecipe);

        setRecipeId(docRef.id);
    };

    const editRecipe = async (newRecipe: Recipe)=>
    {
        if(recipe === undefined) return;
        
        const recipeDb = newRecipe as RecipeDb;
        const docRef = doc(firebaseApp.db, "Recipes", recipe.id);

        await setDoc(docRef, recipeDb)
        setRecipe(newRecipe);
    };

    const deleteRecipe = async() =>
    {
        if(recipe === undefined) return;

        const docRef = doc(firebaseApp.db, "Recipes", recipe.id);
        await deleteDoc(docRef);
    };


    const toggleLike = async() =>
    {
        if(recipe === undefined) return;
        
        const recipeDb = recipe as RecipeDb;
        
        if(recipe.didYouLikeIt) //Unlike it
        {
            const docRef = doc(firebaseApp.db, "Recipes", recipe.id);
            
            const likeList = recipe.likes.filter((el)=> el !== firebaseApp.auth.currentUser!.uid );
            await setDoc(docRef, {...recipeDb, likes: likeList, likesCount: likeList.length })
            setRecipe({...recipe, likes: likeList, likesCount: likeList.length, didYouLikeIt: false})
        }
        else //Like it
        {
            const docRef = doc(firebaseApp.db, "Recipes", recipe.id);
            const likeList = [...recipe.likes, firebaseApp.auth.currentUser!.uid];
            await setDoc(docRef, {...recipeDb, likes: likeList, likesCount: likeList.length })
            setRecipe({...recipe, likes: likeList, likesCount: likeList.length, didYouLikeIt: true})
        }
    };

    return [ recipe, loading, createRecipe, editRecipe, deleteRecipe, toggleLike ];
}