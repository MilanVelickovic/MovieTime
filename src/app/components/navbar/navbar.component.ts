import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDbService } from 'src/app/services/user-db/user-db.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public page?: string
  public username: string
  public type: string
  public avatar: string

  constructor(private router: Router, private userDB: UserDbService) { 
    this.page = window.location.href.split('/').pop()
    
    if (window.sessionStorage.getItem("user")) {
      let userData = JSON.parse(window.sessionStorage.getItem("user") || "")
      this.username = userData.username
      this.type = userData.type
      this.avatar = userData.avatar
    }
  }

  ngOnInit(): void {

  }

  logout(): void {
    let user = JSON.parse(window.sessionStorage.getItem("user") || '')
    this.userDB.updateUserMovieList(user).subscribe(result => {
      console.log(result)
      window.sessionStorage.clear()
      this.router.navigate(["/login"])
    })
  }

}
