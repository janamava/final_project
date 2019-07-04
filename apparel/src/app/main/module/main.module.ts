import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './../main.component';
import { CatalogueComponent } from './../catalogue/catalogue/catalogue.component';
import { ItemComponent } from '../item/item/item.component';

@NgModule({
  declarations: [
    MainComponent,
    CatalogueComponent,
    ItemComponent
  ],
  imports: [CommonModule],
  exports: [MainComponent]
})

export class MainModule { }
