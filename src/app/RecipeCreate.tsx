import { useNavigate } from "react-router";
import { useRecipe } from "./RecipeHooks";
import { useEffect, useRef, useState } from "react";
import type { RecipeDb } from "../data/Recipe";
import { Timestamp } from "firebase/firestore";
import { StringList } from "./StringList";

export function RecipeCreate()
{
    const navigate = useNavigate();
    const [recipe, createNew] = useRecipe();
    
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [steps, setSteps] = useState<string[]>([]);

    const titleInput = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        if(recipe != undefined)
            navigate(`/${recipe?.id}`)

        console.log(recipe);

    }, [navigate, recipe]);

    const createNewRecipe = ()=>
    {
        const newRecipe: RecipeDb = {
            title: titleInput.current!.value,
            ingredients: ingredients,
            method: steps,

            likes: 0,
            dateOfCreation: Timestamp.now()
        }

        console.log("creando...");
        createNew(newRecipe);
    };

    const addIngredient = (newIngredient: string) =>{
        setIngredients((i) =>[...i, newIngredient]);
    };

    const deleteIngredient = (id:number)=>{
        setIngredients((i)=>i.filter((_, index) => index !== id));
    };

    const addStep = (newStep: string) =>{
        setSteps((i) =>[...i, newStep]);
    };

    const deletStep = (id:number)=>{
        setSteps((i)=>i.filter((_, index) => index !== id));
    };

    return (
    <div className="container recipe-create">
        <button onClick={()=>navigate("/")}>«</button>
        <h3>Recipe Title</h3>
        <input type="text" id="title" ref={titleInput}></input><br/>

        <h3>Ingredients</h3>
        <StringList list={ingredients} onAdd={addIngredient} onDelete={deleteIngredient}/><br/>

        <h3>Explain your process step by step</h3>
        <StringList list={steps} onAdd={addStep} onDelete={deletStep} multiline={true}/><br/><br/>

        <button onClick={()=>{createNewRecipe()}}> Create new </button>
    </div>
    );
}