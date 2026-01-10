import { useNavigate } from "react-router";
import { useRecipe } from "./RecipeHooks";
import { useEffect, useRef, useState } from "react";
import type { RecipeDb } from "../data/Recipe";
import { Timestamp } from "firebase/firestore";
import { StringList } from "./StringList";
import { AnimateCSS } from "../Utilities";

export function RecipeCreate()
{
    const navigate = useNavigate();
    const [recipe, , createNew] = useRecipe();
    
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [steps, setSteps] = useState<string[]>([]);

    const titleInput = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string[]>([]);
    const errorElement = useRef<HTMLParagraphElement>(null);

    useEffect(()=>{
        if(recipe != undefined)
            navigate(`/${recipe?.id}`)
    }, [navigate, recipe]);

    const createNewRecipe = ()=>
    {
        let check = false
        setError(false);
        setErrorMsg([]);

        if(titleInput.current!.value.trim() === "")
        {
            check = true;
            setErrorMsg((msg) => [...msg, "Your recipe needs a title!"]);
        }

        if(ingredients.length == 0)
        {
            check = true;
            setErrorMsg((msg) => [...msg, "Your recipe needs at least 1 ingredients!"]);
        }


        if(steps.length == 0)
        {
            check = true;
            setErrorMsg((msg) => [...msg, "Your recipe needs at least 1 step!"]);
        }

        if(check){
            setError(true);
            AnimateCSS(errorElement.current!, "headShake");
            return;
        }

        const newRecipe: RecipeDb = {
            title: titleInput.current!.value,
            ingredients: ingredients,
            method: steps,

            likesCount: 0,
            likes: [],
            dateOfCreation: Timestamp.now(),
            authorUID: "",
            authorName: ""
        }

        createNew(newRecipe);
    };

    const addIngredient = (newIngredient: string) =>{
        setIngredients((i) =>[...i, newIngredient]);
    };

    const modifyIngredient = (id: number, newIngredient: string) =>{
        setIngredients((i)=>i.map(
            (ingredient, index)=>(index===id)?newIngredient:ingredient
        ));
    }

    const deleteIngredient = (id:number)=>{
        setIngredients((i)=>i.filter((_, index) => index !== id));
    };

    const addStep = (newStep: string) =>{
        setSteps((i) =>[...i, newStep]);
    };

    const modifyStep = (id: number, newStep: string) =>{
        setSteps((i)=>i.map(
            (step, index)=>(index===id)?newStep:step
        ));
    }

    const deleteStep = (id:number)=>{
        setSteps((i)=>i.filter((_, index) => index !== id));
    };

    return (<>
    <button onClick={()=>navigate("/")}>«</button>
    <div className="container recipe-create">
        <h3>Recipe Title</h3>
        <input type="text" id="title" ref={titleInput}></input><br/>

        <h3>Ingredients</h3>
        <StringList list={ingredients} onAdd={addIngredient} onUpdate={modifyIngredient} onDelete={deleteIngredient}/><br/>

        <h3>Explain your process step by step</h3>
        <StringList list={steps} onAdd={addStep} onUpdate={modifyStep} onDelete={deleteStep} multiline={true}/><br/><br/>

        <button onClick={()=>{createNewRecipe()}}> Create new </button>
    </div>
    
    <div className="container auth-container" hidden={!error}>
        <h2 className="error">Your recipe is incomplete:</h2>
        <p className="error" ref={errorElement}>
            { errorMsg.map(msg=><p>{msg}</p>) }
        </p>
    </div>
    </>);
}