import { createContext } from "react"
import type { Recipe } from "./data/Recipe";

type RecipeContextType = Recipe[];
export const RecipeContext = createContext<RecipeContextType>([]);