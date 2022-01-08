import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Pages
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { SetupPageComponent } from './pages/setup-page/setup-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

import { AuthGuardService } from './services/auth-guard/auth-guard.service';

const routes: Routes = [
  { path: 'register', component: RegisterPageComponent }, 
  { path: 'login', component: LoginPageComponent },
  { path: 'setup', component: SetupPageComponent, canActivate:[AuthGuardService]},
  { path: 'home', component: HomePageComponent, canActivate:[AuthGuardService]},
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
