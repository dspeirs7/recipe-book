import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<firebase.User>(null);
  private uid: string;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    afAuth.user.subscribe(user => {
      if (user) {
        localStorage.setItem('userData', JSON.stringify(user));
        this.userSubject.next(user);
        if (!this.uid) {
          this.uid = user.uid;
          this.router.navigate(['/recipes']);
        }
      } else {
        this.userSubject.next(null);
        this.uid = null;
      }
    });
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('userData'));

    if (user) {
      this.userSubject.next(user);
    }
  }

  getUser() {
    return this.userSubject.asObservable();
  }

  loginWithEmail(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  signup(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  get userId() {
    return this.uid;
  }
}
