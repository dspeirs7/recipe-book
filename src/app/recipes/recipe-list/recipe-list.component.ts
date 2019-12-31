import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { RecipeService } from '../state/recipe.service';
import { RecipeQuery } from '../state/recipe.query';
import { Recipe } from '../state/recipe.model';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<Recipe[]>;
  loading$: Observable<boolean>;

  constructor(
    private service: RecipeService,
    private query: RecipeQuery,
    private message: MessageService
  ) {}

  ngOnInit() {
    this.recipes$ = this.query.selectAll();
    this.loading$ = this.query.selectLoading();
  }

  async delete(id: string) {
    await this.service.remove(id);
    this.message.open('Recipe deleted!', 'Close');
  }
}
