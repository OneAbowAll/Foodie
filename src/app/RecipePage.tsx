import { useNavigate, useParams } from "react-router";
import { useRecipe } from "./RecipeHooks";
import { firebaseApp } from "../firebase/Firebase";

export function RecipePage()
{
    const navigate = useNavigate();

    const params = useParams();
    const [recipe, loading, , deleteRecipe, toggleLike] = useRecipe(params.id!);
    
    return (
    <div>
        <button onClick={()=>navigate('/')}>«</button>
        {
        (recipe !== undefined)?
        <div className="recipe-page">
            
            <div className="container recipe-main">
                <h1>{recipe.title}</h1>
                <hr/>
                <div>
                    <ol>
                        {recipe.method.map((value, index)=>
                        <li className="recipe-method" key={index}>{value}</li>
                    )}
                    </ol> 
                </div>
                    
                <div className="container">
                        {recipe.dateOfCreation.toDate().toDateString()} | Made by: {recipe.authorName}
                        
                        {
                            recipe.authorUID === firebaseApp.auth.currentUser?.uid 
                            ? <button onClick={()=>{ deleteRecipe(); navigate('/'); } } title="Delete recipe.">💣</button>
                            : ""
                        }
                </div>
            </div>

            <div className="container recipe-info">
                <div>
                    <b>Ingredients: </b><br/>
                    <ul id="stringlist-list">
                        { recipe.ingredients.map((value, index)=> <li key={index}>{value}</li>) }
                    </ul> 
                </div>

                <div className="container recipepage-likes">
                    <p>❤️{recipe.likesCount}</p>
                    <button onClick={()=>toggleLike()} title={recipe.didYouLikeIt?"Remove like.": "Like the recipe!"}>{recipe.didYouLikeIt?"💔":"❤️"}</button>
                </div>
            </div>

        </div>
        :
        <p>
            {loading? <b>Loading...</b> : <b className="error">No object with id:{params.id} was found.</b>}
        </p>
        }
    </div>
    );
}