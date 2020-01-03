import { Injectable } from '@angular/core';
import { CollectionGuard } from 'akita-ng-fire';

import { IngredientState } from './state/ingredient.store';
import { IngredientService } from './state/ingredient.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ShoppingListGuard extends CollectionGuard<IngredientState> {
  constructor(private auth: AuthService, service: IngredientService) {
    super(service);
  }

  sync() {
    return this.service.syncCollection(ref =>
      ref.where('userId', '==', this.auth.userId)
    );
  }
}
