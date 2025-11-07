import { RecipeBoard } from './RecipeBoard'
import { Header } from './Header'
import './App.css'
import { RecipeContext } from './RecipeContext'
import { useDb } from './Hooks';

function App() {
  const [db ] = useDb();

  return (
    <>
    <RecipeContext.Provider value={db}>
      <RecipeBoard/>
    </RecipeContext.Provider>
    </>
  )
}

export default App
