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
  search: string
  trending: boolean
  searchResult: Movie[]
  trendingResult: Movie[]

  constructor(private store: Store<AppState>, private movieDB: MovieDbService) {
    this.loadGenres()
  }

  ngOnInit(): void { }

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
    let user = JSON.parse(window.localStorage.getItem("user") || '')
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
