import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from './../services/authentication.service';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';


@Injectable({ providedIn: 'root' })

export class AuthenticationGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: WebStorageService

  ) { }

  canActivate(): boolean { return this.isLoggedIn(); }

  isLoggedIn() {
    if (this.authenticationService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/main']);
      return false;
    }
  }
}
