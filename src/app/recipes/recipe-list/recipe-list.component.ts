import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RecipeQuery } from '../state/recipe.query';
import { Recipe } from '../state/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;

  constructor(private query: RecipeQuery) {}

  ngOnInit() {
    this.recipes$ = this.query.selectAll();
  }
}
