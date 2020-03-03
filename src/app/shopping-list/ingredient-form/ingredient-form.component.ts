import { Component, Output, EventEmitter } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html'
})
export class IngredientFormComponent {
  @Output() resetForm = new EventEmitter();

  constructor(private controlContainer: ControlContainer) {}

  get control() {
    return this.controlContainer.control;
  }

  clear() {
    this.resetForm.emit();
  }
}
