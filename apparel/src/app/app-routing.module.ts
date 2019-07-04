import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './header/authorization/login/login.component';
import { SignupComponent } from './header/authorization/signup/signup.component';
import { UserComponent } from './user/user.component';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin/admin.component';
import { SignoutComponent } from './header/authorization/signout/signout.component';

import { AuthenticationGuard } from './authentication/authentication.guard';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'sign-out', component: SignoutComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthenticationGuard] },
  { path: 'main', component: MainComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
