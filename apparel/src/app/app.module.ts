import { UserService } from './header/service/user.service';
import { MainModule } from './main/module/main.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { HeaderModule } from './header/module/header.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from '../app/user/user.component';
import { MatDialogRef } from '@angular/material';
import { LoginService } from './header/service/login.service';
import { AdminComponent } from './admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule } from 'angular-webstorage-service';

import { AuthenticationGuard } from './authentication/authentication.guard';
import { SignoutComponent } from './header/authorization/signout/signout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    AdminComponent,
    SignoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderModule,
    MainModule,
    ReactiveFormsModule,
    StorageServiceModule
  ],
  providers: [
    LoginService, UserService, { provide: MatDialogRef }, AuthenticationGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
