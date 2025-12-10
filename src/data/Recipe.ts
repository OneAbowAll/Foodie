import type { Timestamp } from "firebase/firestore";

export interface Recipe
{
    id: string;
    title: string;
    ingredients: string[];
    method: string[];

    likes: number;
    dateOfCreation: Timestamp;
}