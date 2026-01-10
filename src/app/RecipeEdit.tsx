import { useNavigate, useParams } from "react-router";
import { useRecipe } from "./RecipeHooks";
import { useEffect, useRef, useState } from "react";
import type { Recipe } from "../data/Recipe";
import { StringList } from "./StringList";
import { firebaseApp } from "../firebase/Firebase";

export function RecipeEdit()
{
    const navigate = useNavigate();

    const params = useParams();
    const [recipe, loading, , editRecipe] = useRecipe(params.id!);
    const [isAuthor, setIsAuthor] = useState<boolean>();

    const [ingredients, setIngredients] = useState<string[]>([]);
    const [steps, setSteps] = useState<string[]>([]);

    const titleInput = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        if(recipe != undefined)
        {
            const check = firebaseApp.auth.currentUser?.uid === recipe.authorUID;
            setIsAuthor(check);

            if(check)
            {
                setIngredients(recipe.ingredients);
                setSteps(recipe.method);
            }
        }
    }, [recipe]);

    const handleEditRecipe = ()=>
    {
        const newRecipe: Recipe = {
            ...recipe!,
            title: titleInput.current!.value,
            ingredients: ingredients,
            method: steps,
        }

        editRecipe(newRecipe);
        navigate(`/${recipe?.id}`);
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
    {
        loading
        ? <b>Loading...</b>
        : !isAuthor
            ? <b className="error">Operation not allowed: You are not the author of this recipe!</b>
            :
            <div className="container recipe-create">
                <h3>Recipe Title</h3>
                <input type="text" id="title" ref={titleInput} defaultValue={recipe!.title}></input><br/>

                <h3>Ingredients</h3>
                <StringList list={ingredients} onAdd={addIngredient} onUpdate={modifyIngredient} onDelete={deleteIngredient}/><br/>

                <h3>Explain your process step by step</h3>
                <StringList list={steps} onAdd={addStep} onUpdate={modifyStep} onDelete={deleteStep} multiline={true}/><br/><br/>

                <button onClick={()=>{handleEditRecipe()}}> Conferm edits </button>
            </div>
    }
    </>);
}