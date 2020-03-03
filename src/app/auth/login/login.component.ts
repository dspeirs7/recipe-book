import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isEmail = false;
  isSignUp = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  constructor(private service: AuthService) {}

  ngOnInit() {}

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
}
