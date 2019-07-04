import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SignUpForm } from '../../forms/SignUpForm';

@Injectable({ providedIn: 'root' })

export class UserService {

  // private backEndLocalUrl: string = 'http://localhost:8080/user/signup';
  private backEndLocalUrl: string = 'http://localhost:3000/signup';

  constructor(private httpClient: HttpClient) { }

  addFormToBackEnd(form: SignUpForm): Observable<any> {
    return this.httpClient
      .post<SignUpForm>(this.backEndLocalUrl, form)
      .pipe(tap(() => console.log('Added your form to Back-End!')));
  }
}
