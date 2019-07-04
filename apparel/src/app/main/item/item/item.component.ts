import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MainService } from '../../service/main.service';
import { BasketService } from './../../../header/service/basket.service';
import { NotificationService } from '../../../header/service/notification.service'

import { ItemForm } from '../../../forms/ItemForm';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})

export class ItemComponent implements OnInit {

  private images$: Observable<ItemForm[]>;
  data: any = {};
  items: ItemForm[] = [];
  filterValue: string;

  constructor(
    private mainService: MainService,
    private basketService: BasketService,
    private notificationService: NotificationService,
    private router: Router,
    @Inject(SESSION_STORAGE) private storage: WebStorageService
  ) { }

  setReserved(item: ItemForm): object {
    const isReserved = {
      'is-reserved': item.booked
    }
    return isReserved;
  }

  ngOnInit() {
    this.images$ = this.mainService.getItemsFromBackEnd();
  }


  notify(item: ItemForm) {
    if (this.router.url === '/main') {
      this.notificationService.onSuccess('Please sign in first');

    } else if (this.router.url === '/user') {
      this.data.chosenItem = item.uuid;
      this.data.currentUser = this.storage.get('userUuId');

      let array = this.storage.get('basket');
      array.push(item);
      this.storage.set('basket', array);

      this.basketService.reserveItem(this.data).subscribe(res => {
        if (res.message === 'success') {
          item.booked = !item.booked;
          if (item.booked) {
            item.userUuId = this.storage.get('userUuId');
            this.notificationService.onSuccess('Added to basket');
          }
          else {
            item.userUuId = "";

            let arraySession = this.storage.get('basket');
            let out = arraySession.filter(el => el.uuid != item.uuid);
            this.storage.set('basket', out);
            this.notificationService.onSuccess('Removed from basket');
          }
        }
      });
    }
  }

  onSelect(event) {
    this.filterValue = event.target.value;
  }

  filterItem(item: ItemForm) {
    if (this.filterValue === undefined || this.filterValue === "Any") {
      return true;
    }
    for (let property in item) {
      if (item.hasOwnProperty(property)) {
        if (item[property] === this.filterValue) {
          return true;
        }
      }
    }
    return false;
  }
}