import type { Timestamp } from "firebase/firestore";
//Sto un po' testando l'idea di separare un oggetto in due interfaccie, una con il formato che trovo dentro il db, un altro con la roba che uso dentro il sito.
//Che poi in pratica sono quasi uguali ma magari torna utile sta cosa o mi evita dei conflitti
export interface Recipe
{
    id: string;
    title: string;
    ingredients: string[];
    method: string[];

    likesCount: number;
    likes: string[];
    dateOfCreation: Timestamp;
    
    didYouLikeIt: boolean;

    authorName: string;
    authorUID: string;
}

export interface RecipeDb
{
    title: string;
    ingredients: string[];
    method: string[];

    likesCount: number;
    likes: string[];
    dateOfCreation: Timestamp;

    authorName: string;
    authorUID: string;
}