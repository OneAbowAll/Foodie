import { useRef, useState } from "react";
import { useDb } from "./Hooks";
import type { Recipe } from "./data/Recipe";
import { RecipeCard } from "./RecipeCard";
import FindAndRankAll from "./Utilities";

export function RecipeBoard()
{
  const [db, addNewRecipe] = useDb();

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("latest");

  const nameInput = useRef<HTMLInputElement>(null);
  const ingredientsInput = useRef<HTMLInputElement>(null);
  const methodInput = useRef<HTMLInputElement>(null);

  const searchInput = useRef<HTMLInputElement>(null);
  const sortSelect = useRef<HTMLSelectElement>(null);
  

  const handleClick = ()=>
  {
    const newRecipe: Recipe ={
        id: 0,
        title: nameInput.current!.value,
        ingredients: ingredientsInput.current!.value,
        method: methodInput.current!.value,
        likes: 0,
        dateOfCreation: Date.now().toString()
    };
    addNewRecipe(newRecipe);
  };

  const updateSearch = () =>
  {
    setSearch(searchInput.current!.value.trim());
  };
  
  const updateSortType = ()=>
  {
    setSortType(sortSelect.current!.value);
  };

  /*
    <p>Add new Recipe</p>
    <input type="text" ref={nameInput} placeholder='Recipe title...'/><br/>
    <input type="text" ref={ingredientsInput} placeholder='Ingredients...'/><br/>
    <input type="text" multiple ref={methodInput} placeholder='Method...'/><br/>
    <button onClick={handleClick}>Add</button>
  */
  return (
    <div className="container recipe-board">
        <h1>Foodie</h1>
        <div>
          <input type="text" ref={searchInput} onChange={updateSearch} placeholder="Search recipe..."></input>

          <select name="sort" ref={sortSelect} onChange={updateSortType}>
            <option value="latest">Latest</option>
            <option value="likes">Likes</option>
          </select>
        </div>

        <hr/>
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
  );
}