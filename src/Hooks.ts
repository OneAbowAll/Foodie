import { useEffect, useState } from "react";
import type { Recipe } from "./data/Recipe";

//Tmp local storage until firestore
function getItem<T>(key: string, initialValue: T): T {
    const item = localStorage.getItem(key);

    if (item) {
        return JSON.parse(item);
    }

    if (initialValue instanceof Function) {
        return initialValue();
    }

    return initialValue;
}

export function useLocalStorage<T>(
    key: string,
    v: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [item, setItem] = useState(getItem(key, v));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(item));
    }, [item]);

    return [item, setItem];
}

export function useRecipe(recipeId : string)
{

}

export function useDb() : [Recipe[], (newRecipe: Recipe) => void, (modifiedRecipe: Recipe)=>void, (recipeId: number) => Recipe | undefined]
{
    const [nextId, setNewId] = useLocalStorage<number>("id", 2);
    const [db, setDb] = useLocalStorage<Recipe[]>("db", [
        {
            id: 0,
            title: "Cale Cake",
            ingredients: "Cale",
            method: "Put cale in oven.",
            likes: 100,
            dateOfCreation: new Date(Date.UTC(2020, 10, 8, 2, 2, 2, 2)).getTime().toString()
        },
        
        {
            id: 1,
            title: "Cale",
            ingredients: "Cale",
            method: "It's ready.",
            likes: 56,
            dateOfCreation: new Date().getTime().toString()
        }
    ]);

    const addNewRecipe = (newRecipe: Recipe) =>
    {
        newRecipe = {...newRecipe, id: nextId};
        setNewId((n) => n+1);
        setDb((oldDb) => [...oldDb, newRecipe]);
    };

    const updateRecipe = (modifiedRecipe: Recipe) =>
       setDb((oldDb)=> oldDb.map((o)=>(o.id===modifiedRecipe.id)? modifiedRecipe : o));

    const findRecipe = (recipeId: number) =>
        db.find((obj: Recipe) => obj.id === recipeId);
    
    return [db, addNewRecipe, updateRecipe, findRecipe];
}