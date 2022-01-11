import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie/movie';
import { MovieDbService } from 'src/app/services/movie-db/movie-db.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  @Input() genre: string = "Adventure"
  movies: Movie[]

  constructor(private movieDB: MovieDbService) {
    console.log(this.genre)
    this.movies = this.getMoviesByGenre(this.genre)
  }

  ngOnInit(): void {
  }

  getMoviesByGenre(genre: string): Movie[] {
    console.log(this.movieDB.getMovieGenreId(genre))
    return this.movieDB.getMoviesByGenre(this.movieDB.getMovieGenreId(genre))
  }

}
