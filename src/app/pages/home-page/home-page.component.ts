import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie/movie';
import { MovieDbService } from 'src/app/services/movie-db/movie-db.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  genres: string[]
  movies: Movie[]

  constructor(private movieDB: MovieDbService) { 
    this.genres = this.movieDB.getMovieGenres()
    this.movies = this.getMoviesByGenre("Action")
  }

  ngOnInit(): void {
  }

  getMoviesByGenre(genre: string): Movie[] {
    return this.movieDB.getMoviesByGenre(this.movieDB.getMovieGenreId(genre))
  }

}
