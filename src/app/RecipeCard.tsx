import { useNavigate } from "react-router";
import type { Recipe } from "../data/Recipe";

export function RecipeCard({recipe} : {recipe: Recipe})
{
    const navigate = useNavigate();

    return <div className='container recipe-card' onClick={()=>navigate(`/${recipe.id}`)}>
        <p>{recipe.title}</p> <p>by {recipe.authorName}</p>
        <p>{recipe.likesCount} ❤️</p>
        <div className="footer"><hr/>{recipe.dateOfCreation.toDate().toDateString()}</div>
    </div>
}