import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NotificationService } from '../../service/notification.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials$: Subscription;
  loginForm: FormGroup;
  username: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    @Inject(SESSION_STORAGE) private storage: WebStorageService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(''),
      'password': new FormControl('')
    });
  }

  ngOnDestroy(): void {
    if (this.credentials$ !== undefined) {
      this.credentials$.unsubscribe();
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.credentials$ = this.loginService.sendSignInCredentials(this.loginForm.value).subscribe(res => {
        if (res.message === 'success') {
          this.username = res.user.username;
          this.loadProfile(res.user.authority);
          this.saveToSession('username', res.user.username);
          this.saveToSession('userUuId', res.user.userUuId);
          this.saveToSession('authority', res.user.authority);
          this.saveToSession('basket', res.user.basket);
        }
        else {
          this.notificationService.onSuccess('Please check your username or password.');
        }
      });
      this.onClose();
    }
  }


  onClose() {
    this.dialogRef.close(this.loginForm);
  }

  loadProfile(authority) {
    if (authority === "user") {
      this.router.navigate(['/user']);
    }
    else if (authority === "admin") {
      this.router.navigate(['/admin']);
    }
    else {
      this.router.navigate(['/main']);
    }
  }

  saveToSession(key, value): void {
    this.storage.set(key, value);
  }

  getDataFromSession(key): any {
    this.username = this.storage.get(key);
  }
}
