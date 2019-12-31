import { Component, Input } from '@angular/core';
import { Recipe } from '../state/recipe.model';
import { RecipeService } from '../state/recipe.service';
import { MessageService } from 'src/app/shared/message.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;

  constructor(
    private service: RecipeService,
    private message: MessageService
  ) {}

  async delete(id: string) {
    await this.service.remove(id);
    this.message.open('Recipe deleted!', 'Close');
  }
}
