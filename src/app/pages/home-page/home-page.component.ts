import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Movie } from 'src/app/models/movie/movie';
import { AppState } from 'src/app/reducers';
import { MovieDbService } from 'src/app/services/movie-db/movie-db.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  genres: string[]

  constructor(private store: Store<AppState>) {
    this.loadGenres()
  }

  ngOnInit(): void { }

  loadGenres(): void {
    this.store.select("genres").subscribe((items: any) => {
      this.genres = [...items][0]
    })
  }
}
