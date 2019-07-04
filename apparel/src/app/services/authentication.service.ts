import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

  isLoggedIn(): boolean {
    if (sessionStorage.getItem('authority') === '"user"' || sessionStorage.getItem('authority') === '"admin"') {
      return !!sessionStorage.getItem('username');
    }
  }

}

/*
    if (!!sessionStorage.getItem('authority').includes('admin')) {
      return false;
    } else if (!!sessionStorage.getItem('authority').includes('user')) {
      return true;
    }
*/
