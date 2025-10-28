import { useDb } from "./Hooks";
import { useNavigate, useParams } from "react-router";

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
        <div>
            <p>{recipe.id} | {recipe.title}</p>
            <p><b>Ingredients: </b> {recipe.ingredients} </p>
            <p>❤️{recipe.likes} </p>
            <hr/>
            <div>{recipe.method}</div>
            <hr/>
            <div>{date.toDateString()}</div>
        </div>
        :
        <p>No object with id:{params.id} was found.</p>
        }
    </div>
  );
}