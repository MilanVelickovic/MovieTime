import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public page?: string

  constructor() { 
    let url = window.location.href
    this.page = url.split('/').pop()
  }

  ngOnInit(): void {

  }

}
