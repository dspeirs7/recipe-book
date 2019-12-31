import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div fxLayout="column" fxLayoutGap="1em">
      <app-header fxFlex="0 0 auto"></app-header>
      <div fxFlex="1 1 auto">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  constructor(
    private service: AuthService,
    registry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    registry.addSvgIcon(
      'add',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/add-24px.svg')
    );

    registry.addSvgIcon(
      'delete',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/delete-24px.svg')
    );

    registry.addSvgIcon(
      'edit',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/edit-24px.svg')
    );
  }

  ngOnInit() {
    this.service.autoLogin();
  }
}
