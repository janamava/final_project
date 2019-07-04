import { Component, OnInit, Inject, Input } from '@angular/core';
import { SESSION_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})

export class BasketComponent implements OnInit {

  constructor(@Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  ngOnInit() { }
}
