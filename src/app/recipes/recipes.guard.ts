import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CollectionGuard, CollectionGuardConfig } from 'akita-ng-fire';
import { map } from 'rxjs/operators';

import { RecipeState } from './state/recipe.store';
import { RecipeService } from './state/recipe.service';
import { RecipeQuery } from './state/recipe.query';

@Injectable({ providedIn: 'root' })
@CollectionGuardConfig({ awaitSync: true })
export class RecipeListGuard extends CollectionGuard<RecipeState> {
  constructor(service: RecipeService, private query: RecipeQuery) {
    super(service);
  }

  sync() {
    return this.service.syncCollection().pipe(
      map(() => this.query.getCount()),
      map(count => (count === 0 ? 'recipes/new' : true))
    );
  }
}

@Injectable({ providedIn: 'root' })
@CollectionGuardConfig({ awaitSync: true })
export class ActiveRecipeGuard extends CollectionGuard<RecipeState> {
  constructor(service: RecipeService) {
    super(service);
  }

  sync(next: ActivatedRouteSnapshot) {
    return this.service.syncActive({ id: next.params.id });
  }
}
