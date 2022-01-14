import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-all-genres',
  templateUrl: './all-genres.component.html',
  styleUrls: ['./all-genres.component.scss']
})
export class AllGenresComponent implements OnInit {

  genres: string[]
  genreIds: number[]

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loadGenres()
  }

  loadGenres(): void {
    // HARD CODDED !!!!!!!!!!!!!!!!!!!
    this.genreIds = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37]
    // this.movieDB.getMovieGenreIds().subscribe(result => {
    //   console.log(result)
    // })
    this.store.select("genres").subscribe((items: any) => {
      this.genres = [...items][0]
    })
  }

  isFavorite(genre: string): boolean {
    let favGenres = JSON.parse(window.sessionStorage.getItem("user") || '').favGenres
    return favGenres.includes(genre)
  }

}
