import { Injectable } from '@angular/core';
import { CollectionGuard } from 'akita-ng-fire';

import { IngredientState } from './state/ingredient.store';
import { IngredientService } from './state/ingredient.service';

@Injectable({ providedIn: 'root' })
export class ShoppingListGuard extends CollectionGuard<IngredientState> {
  constructor(service: IngredientService) {
    super(service);
  }
}
