import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { CollectionState } from 'akita-ng-fire';

import { Ingredient } from '../../shared/ingredient.model';

export interface IngredientState extends CollectionState<Ingredient> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'ingredient' })
export class IngredientStore extends EntityStore<IngredientState> {
  constructor() {
    super();
  }
}
