import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private snackBar: MatSnackBar) {}
  notify(message: string, action: string) {
    let config: MatSnackBarConfig = {
      duration: 4000,
    };
    this.snackBar.open(message, action, config);
  }
}
