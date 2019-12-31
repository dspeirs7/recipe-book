import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private snackbar: MatSnackBar, private ngZone: NgZone) {}

  open(message: string, action: string, duration: number = 2000) {
    return this.ngZone.run(() => {
      return this.snackbar.open(message, action, { duration });
    });
  }
}
