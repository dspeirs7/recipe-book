import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { startWith, filter, takeUntil } from 'rxjs/operators';

import { RecipeQuery } from '../state/recipe.query';
import { Recipe } from '../state/recipe.model';
import { RecipeForm } from '../recipe.form';
import { RecipeService } from '../state/recipe.service';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-recipe-edit',
  template: `
    <ng-container *ngIf="recipe$ | async as recipe">
      <app-recipe-form
        [formGroup]="recipeForm"
        (submit)="onSave()"
      ></app-recipe-form>
    </ng-container>
  `
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<null>();
  recipe$: Observable<Recipe>;
  recipeForm = new RecipeForm();

  constructor(
    private service: RecipeService,
    private query: RecipeQuery,
    private message: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.recipe$ = this.recipeForm.valueChanges.pipe(
      startWith(this.recipeForm.value)
    );

    this.query
      .selectActive()
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(value => !!value)
      )
      .subscribe(recipe => {
        this.initForm(recipe);
      });
  }

  initForm(recipe: Recipe) {
    this.recipeForm.patchValue(recipe);

    if (recipe.ingredients) {
      const recipeIngredients = this.recipeForm.get('ingredients') as FormArray;

      recipeIngredients.clear();

      for (const ingredient of recipe.ingredients) {
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, Validators.required)
          })
        );
      }
    }

    if (recipe.steps) {
      const recipeSteps = this.recipeForm.get('steps') as FormArray;

      recipeSteps.clear();

      for (const step of recipe.steps.slice().sort((a, b) => a.id - b.id)) {
        recipeSteps.push(
          new FormGroup({
            id: new FormControl(step.id, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ]),
            step: new FormControl(step.step, Validators.required)
          })
        );
      }
    }
  }

  onSave() {
    const id = this.query.getActiveId();
    const update = this.recipeForm.value;
    this.service.update({ id, ...update });

    this.message.open('Recipe Saved!', 'Close');
    this.router.navigate(['/recipes']);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
