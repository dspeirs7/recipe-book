import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { SharedModule } from '../shared/shared.module';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import { ShoppingListGuard } from './shopping-list.guard';

@NgModule({
  declarations: [ShoppingListComponent, IngredientFormComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: ShoppingListComponent,
        canActivate: [ShoppingListGuard],
        canDeactivate: [ShoppingListGuard]
      }
    ])
  ]
})
export class ShoppingListModule {}
