import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie/movie';
import { MovieDbService } from 'src/app/services/movie-db/movie-db.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  @Input() genreId: number
  movies: Movie[]
  loading: boolean = true

  constructor(private movieDB: MovieDbService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.movies = this.movieDB.getMoviesByGenre(this.genreId)
      this.loading = false
    }, 3000)
  }

}
