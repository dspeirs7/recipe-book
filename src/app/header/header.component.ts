import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$: Observable<firebase.User>;

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit() {
    this.user$ = this.service.getUser();
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/login']);
  }
}
