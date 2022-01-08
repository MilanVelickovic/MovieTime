import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user/user';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public user: User

  constructor(private store: Store<AppState>) {
    this.store.select("user").subscribe(user => this.user = user)
  }

  ngOnInit(): void {
  }

}
