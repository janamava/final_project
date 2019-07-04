import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule, MatCheckboxModule, MatMenuModule, MatSnackBarModule, MatDialogModule } from '@angular/material';

import { AuthorizationComponent } from './../authorization/authorization.component';
import { LoginComponent } from './../authorization/login/login.component';
import { SignupComponent } from '../authorization/signup/signup.component';
import { BasketComponent } from './../basket/basket.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { SearchComponent } from './../search/search.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AuthorizationComponent,
    LoginComponent,
    SignupComponent,
    BasketComponent,
    NavigationComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule,
    MatListModule
  ],
  exports: [NavigationComponent]
})

export class HeaderModule { }
