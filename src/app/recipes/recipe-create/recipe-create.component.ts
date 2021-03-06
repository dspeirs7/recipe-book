import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RecipeForm } from '../recipe.form';
import { RecipeService } from '../state/recipe.service';
import { createRecipe } from '../state/recipe.model';
import { MessageService } from 'src/app/shared/message.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-recipe-create',
  template: `
    <div fxLayout="row" fxLayoutAlign="center">
      <app-recipe-form
        [formGroup]="recipeForm"
        (submit)="onSave()"
      ></app-recipe-form>
    </div>
  `
})
export class RecipeCreateComponent {
  recipeForm = new RecipeForm();

  constructor(
    private auth: AuthService,
    private service: RecipeService,
    private message: MessageService,
    private router: Router
  ) {}

  onSave() {
    const recipe = createRecipe({
      ...this.recipeForm.value,
      userId: this.auth.userId
    });
    this.service.add(recipe);

    this.message.open('Recipe Saved!', 'Close');
    this.router.navigate(['/recipes']);
  }
}
