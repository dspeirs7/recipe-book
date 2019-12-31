import { NgModule } from '@angular/core';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { SharedModule } from '../shared/shared.module';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeFormComponent,
    RecipeCreateComponent
  ],
  imports: [SharedModule, RecipesRoutingModule]
})
export class RecipesModule {}
