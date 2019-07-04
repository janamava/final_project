import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './../../services/user';
import { ItemForm } from '../../forms/ItemForm';
import { ReserveForm } from 'src/app/forms/ReserveForm';

@Injectable({ providedIn: 'root' })

export class BasketService {

  constructor(private httpClient: HttpClient) { }

  // getBasket(user: User): Observable<User> {
  //   const url: string = `http://localhost:8080/userbasket/${user.userUuId}`;
  //   return this.httpClient.get<User>(url);
  // }
  
  reserveItem(reserveForm: ReserveForm): Observable<any> {
    const itemsUrl: string = 'http://localhost:3000/items';
    return this.httpClient.put<any>(itemsUrl, reserveForm);
  }

  // toggleItem(item: ItemForm): Observable<ItemForm> {
  //   const url: string = `http://localhost:8080/catalogue/book/${item.id}`

  //   return this.httpClient.put<ItemForm>(url, item);
  // }

  // This method is for Node Back-End 'Testing purposes'
  // toggleCompleted(item: ItemForm): Observable<any> {
  //   const url: string = `http://localhost:3000/tasks/${item.id}`;

  //   return this.httpClient.put<ItemForm>(url, item);
  // }

}
