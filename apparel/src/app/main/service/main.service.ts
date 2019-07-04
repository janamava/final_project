import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, retry } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { ItemForm } from '../../forms/ItemForm';

@Injectable({ providedIn: 'root' })

export class MainService {
  // private url: string = 'http://localhost:9010:catalogue';
  private url: string = 'http://localhost:3000/items';
  // private url: string = 'http://localhost:9010/catalogue';
  // private url: string = 'http://localhost:8080/catalogue';

  constructor(private httpClient: HttpClient) { }

  getItemsFromBackEnd(): Observable<ItemForm[]> {
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*' });

    return this.httpClient
      .get<ItemForm[]>(this.url, { headers })
      // .pipe(tap(itemsFromBackEnd => console.log(itemsFromBackEnd)))
      // .pipe(retry(20))
      .pipe(tap(() => console.log('Received images from Back-End!')));
  }
}
