import { RecipeCard } from "./RecipeCard";
import { Header } from "./Header";

import { useRecipes } from "./RecipeHooks";

export function RecipeBoard()
{
  const [recipeList, setSearch, setSortType] = useRecipes();
  
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