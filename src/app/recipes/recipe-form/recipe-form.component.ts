import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  ControlContainer
} from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent {
  constructor(
    private containerCollection: ControlContainer,
    private location: Location
  ) {}

  cancel() {
    this.location.back();
  }

  onAddIngredient() {
    (this.control.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        amount: new FormControl('', Validators.required)
      })
    );
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  onAddStep() {
    const steps = this.control.get('steps') as FormArray;
    steps.push(
      new FormGroup({
        id: new FormControl(steps.length + 1),
        step: new FormControl('', Validators.required)
      })
    );
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  get control() {
    return this.containerCollection.control;
  }

  get ingredients() {
    return this.control.get('ingredients') as FormArray;
  }

  get steps() {
    return this.control.get('steps') as FormArray;
  }
}
