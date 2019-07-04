import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemForm } from '../forms/ItemForm';


const httpOptions = {
  headers: new HttpHeaders({
    //    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // private url = 'http://localhost:8080/catalogue/upload';
  private url = 'http://localhost:3000/items';

  constructor(private httpClient: HttpClient) { }

  sendItemToServer(item: ItemForm): Observable<any> {
    return this.httpClient.post(this.url, item, httpOptions);
  }
}
