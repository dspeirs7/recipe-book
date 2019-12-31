import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html'
})
export class IngredientFormComponent implements OnDestroy {
  @Output() resetForm = new EventEmitter();
  unsubscribe$ = new Subject<null>();

  constructor(private controlContainer: ControlContainer) {}

  get control() {
    return this.controlContainer.control;
  }

  clear() {
    this.resetForm.emit();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
