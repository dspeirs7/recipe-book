import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RecipeQuery } from '../state/recipe.query';
import { Recipe } from '../state/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styles: [
    'h2 { white-space: normal !important; font-weight: bold !important; cursor: pointer; }'
  ]
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;
  loading$: Observable<boolean>;

  constructor(private query: RecipeQuery) {}

  ngOnInit() {
    this.recipes$ = this.query.selectAll();
    this.loading$ = this.query.selectLoading();
  }
}
