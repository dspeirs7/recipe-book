import { Component } from '@angular/core';

@Component({
  selector: 'app-recipes',
  template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class RecipesComponent {}
