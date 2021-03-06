export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  userId: string;
}

export function createIngredient(params: Partial<Ingredient>) {
  return {
    ...params
  } as Ingredient;
}
