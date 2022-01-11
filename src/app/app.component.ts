import { Component } from '@angular/core';
import { MovieDbService } from './services/movie-db/movie-db.service';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';
import * as GenreActions from './actions/genre.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MovieTime';

  constructor(private movieDB: MovieDbService, private store: Store<AppState>) {
    let genres = this.movieDB.getMovieGenres()
    this.store.dispatch(new GenreActions.AddGenres(genres))
    
    // this.store.select("genres").subscribe((items: any) => {
    //   console.log(items)
    //   this.genres = [...items]
    // })
  }
}
