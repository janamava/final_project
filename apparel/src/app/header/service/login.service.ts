import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginForm } from '../authorization/login/LoginForm';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // private url = 'http://localhost:8080/user/login';
  private url = 'http://localhost:3000/signin';

  constructor(private http: HttpClient) { }

  sendSignInCredentials(input: LoginForm): Observable<any> {
    return this.http.post<LoginForm>(this.url, input, httpOptions);
  }
}
