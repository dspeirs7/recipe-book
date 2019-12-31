import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Recipe } from '../state/recipe.model';
import { RecipeQuery } from '../state/recipe.query';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { IngredientService } from 'src/app/shopping-list/state/ingredient.service';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe$: Observable<Recipe>;
  recipes$: Observable<Recipe[]>;
  loading$: Observable<boolean>;
  ingredientColumns: string[] = ['name', 'amount'];
  stepColumns: string[] = ['id', 'step'];

  constructor(
    private service: IngredientService,
    private query: RecipeQuery,
    private message: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.recipe$ = this.query.selectActive();
    this.recipes$ = this.query.selectAll();
    this.loading$ = this.query.selectLoading();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.service.add(ingredients);
    const snackbarRef = this.message.open('Ingredients Saved!', 'View');

    snackbarRef.onAction().subscribe(() => {
      this.router.navigate(['/shopping-list']);
    });
  }

  redirect(nextId: string) {
    const oldId = this.query.getActiveId();
    const nextUrl = this.router.url.replace(oldId, nextId);
    this.router.navigateByUrl(nextUrl);
  }
}
