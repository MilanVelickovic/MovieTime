import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Pages
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SetupPageComponent } from './pages/setup-page/setup-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

import { AuthGuardService1, AuthGuardService2 } from './services/auth-guard/auth-guard.service';

const routes: Routes = [
  { path: 'register', component: RegisterPageComponent, canActivate:[AuthGuardService2] }, 
  { path: 'login', component: LoginPageComponent, canActivate:[AuthGuardService2] },
  { path: 'setup', component: SetupPageComponent, canActivate:[AuthGuardService1] },
  { path: 'home', component: HomePageComponent, canActivate:[AuthGuardService1] },
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
