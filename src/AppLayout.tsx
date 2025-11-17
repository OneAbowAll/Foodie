import { Outlet } from "react-router";
import { RecipeContext } from "./app/RecipeContext";
import { useDb } from "./Hooks";


export default function AppLayout()
{
    const [db ] = useDb();

    return (
    <RecipeContext.Provider value={db}>
        <Outlet/>
    </RecipeContext.Provider>
    );
}