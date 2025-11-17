import { useNavigate } from "react-router";
import type { Recipe } from "../data/Recipe";

export function RecipeCard({recipe} : {recipe: Recipe})
{
    const navigate = useNavigate();

    const date = new Date();
    date.setTime(Number.parseInt(recipe.dateOfCreation));

    return <div className='container recipe-card' onClick={()=>navigate(`/${recipe.id}`)}>
        <p>{recipe.id} | {recipe.title}</p>
        <p><b>Ingredients: </b> {recipe.ingredients} </p>
        <p>❤️{recipe.likes} </p>
        <hr/>
        <div>{recipe.method}</div>
        
        <div className="footer"><hr/>{date.toDateString()}</div>
    </div>
}