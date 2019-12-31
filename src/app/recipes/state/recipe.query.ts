import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RecipeStore, RecipeState } from './recipe.store';

@Injectable({ providedIn: 'root' })
export class RecipeQuery extends QueryEntity<RecipeState> {

  constructor(protected store: RecipeStore) {
    super(store);
  }

}
