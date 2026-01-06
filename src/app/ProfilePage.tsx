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
            <h2>Le tue ricette</h2>
            <div id="board">
            {
            recipeList.length == 0 
            ?   <p><b> Non hai ancora scritto una ricetta :( </b></p>
            : recipeList.map((recipe)=><RecipeCard key={recipe.id} recipe={recipe}/>)
            }
        </div>
    </div>
    </>
    );
    }
