import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserDbService {

  private BASE_URL = "http://localhost:9000/user/"

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    const url = this.BASE_URL + "register"
    return this.http.post(url, user).pipe(map((response: any) => response))
  }

  updateUserMovieList(user: any): Observable<any> {
    const url = this.BASE_URL + "update/movielist" 
    return this.http.put(url, user).pipe(map((response: any) => response))
  }

  updateUser(user: any): Observable<any> {
    const url = this.BASE_URL + "update"
    return this.http.put(url, user).pipe(map((response: any) => response))
  }

  loginUser(user: any) : Observable<any> {
    const url = this.BASE_URL + "login"
    return this.http.post(url, user).pipe(map((response: any) => response))    
  }
}
