import { useNavigate, useParams } from "react-router";
import { useRecipe } from "./RecipeHooks";

export function RecipePage()
{
    const navigate = useNavigate();

    const params = useParams();
    const [recipe] = useRecipe(params.id!);
    
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
                <ol >
                    {recipe.method.map((value)=>
                    <li className="recipe-method">{value}</li>
                )}</ol> 
                </div>
                
                <div className="footer">
                    <hr/>
                    {recipe.dateOfCreation.toDate().toDateString()} | Made by: {recipe.author}
                </div>
            </div>

            <div className="container recipe-info">
                <div><b>Ingredients: </b><br/>
                <ul id="stringlist-list">
                    {recipe.ingredients.map((value)=>
                    <li>{value}</li>
                )}</ul> 
                </div>
                <div className="footer">
                    <hr/>
                    <div className="recipepage-likes">
                        <p>❤️{recipe.likes}</p>
                        <button>❤️</button>
                    </div>
                </div>
            </div>
        </div>
        :
        <p>No object with id:{params.id} was found.</p>
        }
    </div>
    );
}