import { Ingredient } from 'src/app/shared/ingredient.model';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  steps: Step[];
  ingredients: Ingredient[];
  userId: string;
}

export function createRecipe(params: Partial<Recipe>) {
  return {
    ...params
  } as Recipe;
}

export interface Step {
  id: number;
  step: string;
}
