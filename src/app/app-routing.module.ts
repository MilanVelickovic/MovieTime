import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
// Pages
import { RegisterPageComponent } from './pages/register-page/register-page.component';

const routes: Routes = [
  { path: 'register', component: RegisterPageComponent }, 
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
