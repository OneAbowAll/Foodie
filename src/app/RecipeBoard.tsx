import { useContext, useEffect, useState } from "react";
import { RecipeCard } from "./RecipeCard";
import { Header } from "./Header";

import type { Recipe } from "../data/Recipe";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { FirebaseContext } from "../firebase/FirebaseContext";

export function RecipeBoard()
{
  const firebase = useContext(FirebaseContext);
  const db = firebase.db;

  const [recipeList, setRecipList] = useState<Recipe[]>([] as Recipe[]);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("latest");

  useEffect(()=>{
    const collectionRef = collection(db, "Recipes");
    const q = query(collectionRef, orderBy('dateOfCreation', 'desc'))

    onSnapshot(q, (snapshot)=>{
      const result: Recipe[] = [];
      snapshot.forEach((doc)=>{
        const data = doc.data();
        result.push({
          id: doc.id,
          ...data
        } as Recipe)
      })

      setRecipList(result);
    });

  }, [db, sortType]);

  /*
    <p>Add new Recipe</p>
    <input type="text" ref={nameInput} placeholder='Recipe title...'/><br/>
    <input type="text" ref={ingredientsInpu\t} placeholder='Ingredients...'/><br/>
    <input type="text" multiple ref={methodInput} placeholder='Method...'/><br/>
    <button onClick={handleClick}>Add</button>
  */
  return (
    <><Header onSearch={setSearch} onSortChange={setSortType} />
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

/*
<>
      <Header onSearch={setSearch} onSortChange={setSortType} />
      <div className="container recipe-board">
          {
          (sortType === "latest")?
            <div id="board">
            {
              (search === "")?
                db.sort((r1, r2)=>-r1.dateOfCreation.localeCompare(r2.dateOfCreation))
                  .map(o=><RecipeCard key={o.id} recipe={o} />)
              :
                FindAndRankAll(db, search, (i)=> i>=1).sort((r1, r2)=>-r1.dateOfCreation.localeCompare(r2.dateOfCreation))
                  .map(o=><RecipeCard key={o.id} recipe={o} />)
            }
          </div>
          :
            <div id="board">
            {
              (search === "")?
                db.sort((r1, r2)=>r2.likes - r1.likes)
                  .map(o=><RecipeCard key={o.id} recipe={o} />)
              :
                FindAndRankAll(db, search, (i)=> i>=1).sort((r1, r2)=>r2.likes - r1.likes)
                  .map(o=><RecipeCard key={o.id} recipe={o} />)
                  
            }
          </div>
          }
      </div>
    </>
*/