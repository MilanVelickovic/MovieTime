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
  // HARD CODDED !!!!!!!!!!!!!!!!!!!1
  genreIds: number[] = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10402, 9648, 10749, 878, 10770, 53, 10752, 37]
  search: string
  trending: boolean
  searchResult: Movie[]
  trendingResult: Movie[]

  constructor(private store: Store<AppState>, private movieDB: MovieDbService) {
    this.loadGenres()
  }

  ngOnInit(): void {
    this.search = ''
  }

  loadGenres(): void {
    this.store.select("genres").subscribe((items: any) => {
      this.genres = [...items][0]
    })
  }

  recieveSearchValue(search: string): void{
    this.search = search
    this.searchResult = this.movieDB.getMoviesByTitle(this.search)
  }

  receiveHomeEvent(): void {
    this.trending = false
  }

  receiveTrendingEvent(): void {
    this.trending = true
    this.trendingResult = this.movieDB.getTrending()
  }

  isFavorite(genre: string): boolean {
    let user = JSON.parse(window.sessionStorage.getItem("user") || '')
    let favGenres = user.favGenres
    
    return favGenres.includes(genre)
  }

  clear(page: string): void {
    if (page === "search") {
      this.trending = false
    } else {
      this.search = ''
    }
  }
}
