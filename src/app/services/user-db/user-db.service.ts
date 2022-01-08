import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserDbService {

  private BASE_URL = "http://localhost:9000/user/"

  constructor(private http: HttpClient) { }

  registerUser(user: Object): void {
    const url = this.BASE_URL + "register"
    console.log("(" + url + ")POST request sent!")
    console.log(user)
    this.http.post(url, user).subscribe(res => console.log(res))
  }
}
