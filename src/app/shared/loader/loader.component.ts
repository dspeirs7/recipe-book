import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <div fxFill fxLayout="column" fxLayoutAlign="center center">
      <mat-spinner color="accent"></mat-spinner>
    </div>
  `
})
export class LoaderComponent {}
