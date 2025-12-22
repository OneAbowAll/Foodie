import { RecipeCard } from "./RecipeCard";

import { useRecipes } from "./RecipeHooks";
import { useContext } from "react";
import { AuthContext } from "../authentication/AuthContext";
import { useNavigate } from "react-router";

export function ProfilePage()
{
    const navigate = useNavigate();

    const userSession = useContext(AuthContext);
    const [recipeList] = useRecipes(userSession?.uid);

    return (
    <>
        <div className="container">
            <button onClick={()=>navigate('/')}>«</button>
            <h2>Account's Info</h2>
            <ul>
                <li>DisplayName: {userSession?.displayName}</li>
                <li>Email: {userSession?.email}</li>
            </ul>
        </div>
        <div className="container recipe-board">
            <div id="board">
            {
            recipeList.map((recipe)=><RecipeCard key={recipe.id} recipe={recipe}/>)
            }
        </div>
        </div>
    </>
    );
    }
