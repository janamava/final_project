import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({ providedIn: 'root' })

export class NotificationService {

  private configuration: MatSnackBarConfig = { verticalPosition: 'bottom', duration: 2000, panelClass: ['white-snackbar'] }

  constructor(private matSnackBar: MatSnackBar) { }

  onSuccess(message: string) { this.matSnackBar.open(message, 'OK', this.configuration); }
}
