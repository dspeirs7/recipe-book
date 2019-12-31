import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';

import { RecipeStore, RecipeState } from './recipe.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'recipes' })
export class RecipeService extends CollectionService<RecipeState> {
  constructor(store: RecipeStore) {
    super(store);
  }
}
