import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserDbService {

  private BASE_URL = "http://localhost:9000/user/"

  constructor(private http: HttpClient) { }

  registerUser(user: any): any {
    const url = this.BASE_URL + "register"
    this.http.post(url, user).subscribe(res => {
      return Object.values(res)[0]
    })
  }

  updateUser(user: any) {
    const url = this.BASE_URL + "update"
    this.http.put(url, user).subscribe(res => {
      console.log(res)
    })
  }

  loginUser(user: any) {
    const url = this.BASE_URL + "login"
    this.http.post(url, user).subscribe(res => {
      window.sessionStorage.setItem("user", JSON.stringify(Object.values(res)[1]))
    })
  }
}
