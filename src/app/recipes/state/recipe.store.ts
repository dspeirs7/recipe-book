import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { CollectionState } from 'akita-ng-fire';

import { Recipe } from './recipe.model';

export interface RecipeState extends CollectionState<Recipe> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'recipe' })
export class RecipeStore extends EntityStore<RecipeState> {
  constructor() {
    super();
  }
}
