export interface Recipe
{
    id: number;
    title: string;
    ingredients: string;
    method: string;

    likes: number;
    dateOfCreation: string;
}