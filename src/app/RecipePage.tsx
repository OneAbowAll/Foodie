import { useNavigate, useParams } from "react-router";
import { useDb } from "../Hooks";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../firebase/FirebaseContext";
import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import type { Recipe } from "../data/Recipe";

export function RecipePage()
{
    const firebase = useContext(FirebaseContext);
    const navigate = useNavigate();

    const params = useParams();
    const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);

    useEffect(()=>{
        const fetchRecipe = async () =>
        {
            const db = firebase.db;
            const docRef = doc(db, "Recipes", params.id!);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists())
                setRecipe(docSnap.data() as Recipe);
        }

        fetchRecipe();
    });

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