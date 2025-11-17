import { useNavigate, useParams } from "react-router";
import { useDb } from "../Hooks";

export function RecipePage()
{
    const [, , , findRecipe] = useDb();
    const navigate = useNavigate();

    const params = useParams();
    const recipe = findRecipe(Number.parseInt(params.id!));
    const date = new Date();

    if(recipe)
        date.setTime(Number.parseInt(recipe.dateOfCreation));

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
                    {date.toDateString()}
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