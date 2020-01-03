import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<null>();
  isEmail = false;
  isSignUp = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private service: AuthService, private router: Router) {}

  ngOnInit() {
    this.service
      .getUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        if (user) {
          this.router.navigate(['/recipes']);
        }
      });
  }

  onCancel() {
    this.isEmail = false;
    this.isSignUp = false;
  }

  loginWithEmail() {
    this.isEmail = true;
  }

  signUp() {
    this.isSignUp = true;
  }

  submit() {
    const { email, password } = this.loginForm.value;

    if (this.isSignUp) {
      this.service.signup(email, password);
    } else {
      this.service.loginWithEmail(email, password);
    }
  }

  loginWithGoogle() {
    this.service.loginWithGoogle();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
