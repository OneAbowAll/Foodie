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
            <div className="container recipe-method">
                <h1>{recipe.id} | {recipe.title}</h1>
                <hr/>
                <div>{recipe.method}</div>
                
                <div className="footer">
                    <hr/>
                    {recipe.dateOfCreation.toDate().toDateString()}
                </div>
            </div>

            <div className="container recipe-info">
                <p><b>Ingredients: </b><br/>{recipe.ingredients} </p>
                <div className="footer">
                    <hr/>
                    <p>❤️{recipe.likes} </p>
                </div>
            </div>
        </div>
        :
        <p>No object with id:{params.id} was found.</p>
        }
    </div>
    );
}