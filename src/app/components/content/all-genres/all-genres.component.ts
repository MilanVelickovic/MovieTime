import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { MovieDbService } from 'src/app/services/movie-db/movie-db.service';

@Component({
  selector: 'app-all-genres',
  templateUrl: './all-genres.component.html',
  styleUrls: ['./all-genres.component.scss']
})
export class AllGenresComponent implements OnInit {

  genres: string[]
  genreIds: number[]

  constructor(private store: Store<AppState>, private movieDB: MovieDbService) { }

  ngOnInit(): void {
    this.loadGenres()
  }

  loadGenres(): void {
    this.movieDB.getMovieGenreIds().subscribe((result: any) => {
      this.genreIds = result
    })
    this.store.select("genres").subscribe((items: any) => {
      this.genres = [...items][0]
    })
  }

  isFavorite(genre: string): boolean {
    let favGenres = JSON.parse(window.sessionStorage.getItem("user") || '').favGenres
    return favGenres.includes(genre)
  }

}
