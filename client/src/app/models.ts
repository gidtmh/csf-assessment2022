export interface Recipe {
  id: string;
  title: string;
  image: string;
  instruction: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  ingredient: string
}
