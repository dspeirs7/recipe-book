import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div fxFill fxLayout="column" fxLayoutAlign="center center">
      <h2>Page not found! Click <a routerLink="/">here</a> to go home.</h2>
    </div>
  `,
  styles: []
})
export class NotFoundComponent {}
