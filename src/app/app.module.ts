import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SetupPageComponent } from './pages/setup-page/setup-page.component';
import { StatisticsPageComponent } from './pages/statistics-page/statistics-page.component';

import { MovieViewComponent } from './views/movie-view/movie-view.component';

import { FormInputComponent } from './components/UI/form-input/form-input.component';
import { FormCheckComponent } from './components/UI/form-check/form-check.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieComponent } from './components/movies/movie/movie.component';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { AllGenresComponent } from './components/content/all-genres/all-genres.component';
import { SeparateContentComponent } from './components/content/separate-content/separate-content.component';

import { AuthGuardService1, AuthGuardService2 } from './services/auth-guard/auth-guard.service';

import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';

@NgModule({
  declarations: [
    AppComponent,
    RegisterPageComponent,
    NavbarComponent,
    LoginPageComponent,
    FormInputComponent,
    FormCheckComponent,
    HomePageComponent,
    SetupPageComponent,
    MovieComponent,
    MoviesComponent,
    FilterBarComponent,
    StatisticsPageComponent,
    MovieViewComponent,
    AllGenresComponent,
    SeparateContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false
      }
    })
  ],
  providers: [
    AuthGuardService1, 
    AuthGuardService2],
  bootstrap: [AppComponent]
})
export class AppModule { }
