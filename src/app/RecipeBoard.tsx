import { useContext, useState } from "react";
import { RecipeCard } from "./RecipeCard";
import { RecipeContext } from "./RecipeContext";
import { Header } from "./Header";

import FindAndRankAll from "../Utilities";

export function RecipeBoard()
{
  const db = useContext(RecipeContext);

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("latest");

  /*
    <p>Add new Recipe</p>
    <input type="text" ref={nameInput} placeholder='Recipe title...'/><br/>
    <input type="text" ref={ingredientsInpu\t} placeholder='Ingredients...'/><br/>
    <input type="text" multiple ref={methodInput} placeholder='Method...'/><br/>
    <button onClick={handleClick}>Add</button>
  */
  return (
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
  );
}