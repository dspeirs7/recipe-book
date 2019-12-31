import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';

import { IngredientStore, IngredientState } from './ingredient.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'ingredients' })
export class IngredientService extends CollectionService<IngredientState> {
  constructor(store: IngredientStore) {
    super(store);
  }
}
