import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public page?: string
  public username: string
  public avatar: string

  constructor(private router: Router) { 
    this.page = window.location.href.split('/').pop()
    
    if (window.sessionStorage.getItem("user")) {
      let userData = JSON.parse(window.sessionStorage.getItem("user") || "")
      this.username = userData.username
      this.avatar = userData.avatar
    }
  }

  ngOnInit(): void {

  }

  logout(): void {
    window.sessionStorage.clear()
    this.router.navigate(["/login"])
  }

}
