import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { ActiveRecipeGuard, RecipeListGuard } from './recipes.guard';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: RecipeListComponent,
        canActivate: [RecipeListGuard],
        canDeactivate: [RecipeListGuard]
      },
      { path: 'new', component: RecipeCreateComponent },
      {
        path: 'edit/:id',
        component: RecipeEditComponent,
        canActivate: [ActiveRecipeGuard],
        canDeactivate: [ActiveRecipeGuard]
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        canActivate: [ActiveRecipeGuard, RecipeListGuard],
        canDeactivate: [ActiveRecipeGuard, RecipeListGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
