import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserDbService {

  private BASE_URL = "http://localhost:9000/user/"

  constructor(private http: HttpClient) { }

  registerUser(user: Object): any {
    const url = this.BASE_URL + "register"
    this.http.post(url, user).subscribe(res => {
      return Object.values(res)[0]
    })
  }

  updateUser(email: string, username: string, avatar: string, age: string, sex: string, favGenres: string[]) {
    const url = this.BASE_URL + "update"
    let data = {
      email: email,
      username: username,
      avatar: avatar,
      age: age,
      sex: sex,
      favGenres: favGenres
    }
    this.http.put(url, data).subscribe(res => {
      console.log(res)
    })
  }
}
