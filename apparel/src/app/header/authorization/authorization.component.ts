import { Component, OnInit } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})

export class AuthorizationComponent implements OnInit {
  private dialogConfig = new MatDialogConfig();

  constructor(private dialog: MatDialog) { }

  ngOnInit() { }

  onClick(): void {
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.disableClose = true;
    this.dialog.open(LoginComponent, this.dialogConfig);
  }

  onSignUpClick(): void {
    this.dialog.open(SignupComponent, this.dialogConfig);

    this.dialogConfig.autoFocus = true;
    this.dialogConfig.disableClose = true;

  }

}
