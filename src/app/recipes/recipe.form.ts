import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Recipe } from './state/recipe.model';

export class RecipeForm extends FormGroup {
  constructor() {
    super({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      imagePath: new FormControl(''),
      ingredients: new FormArray([]),
      steps: new FormArray([])
    });
  }

  value: Partial<Recipe>;
}
