import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Ingredient } from '../shared/ingredient.model';

export class IngredientForm extends FormGroup {
  constructor() {
    super({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required)
    });
  }

  value: Partial<Ingredient>;
}
