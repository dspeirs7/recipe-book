import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { IngredientStore, IngredientState } from './ingredient.store';

@Injectable({ providedIn: 'root' })
export class IngredientQuery extends QueryEntity<IngredientState> {
  constructor(protected store: IngredientStore) {
    super(store);
  }
}
