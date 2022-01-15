import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie/movie';
import { MovieDbService } from 'src/app/services/movie-db/movie-db.service';

@Component({
  selector: 'app-movie-view',
  templateUrl: './movie-view.component.html',
  styleUrls: ['./movie-view.component.scss']
})
export class MovieViewComponent implements OnInit {

  movie: Movie

  constructor(private movieDB: MovieDbService) {
    let movieId = window.location.href.split('/').pop() || ''
    this.movieDB.getMovieById(parseInt(movieId)).subscribe((data) => {
      this.movie = data
    })
  }

  ngOnInit(): void { }

  goBack(): boolean {
    window.history.go(-1)
    return false
  }

  inList(): boolean {
    let list = JSON.parse(window.sessionStorage.getItem("user") || '').movieList
    return list.includes(this.movie.getMovieIdValue())
  }

  addToList(movieId: number): void {
    let user = JSON.parse(window.sessionStorage.getItem("user") || '')
    if (this.inList()) {
      let movieIndex = user.movieList.indexOf(movieId)
      user.movieList.splice(movieIndex, 1)
    } else {
      user.movieList.push(movieId)
    }

    window.sessionStorage.setItem("user", JSON.stringify(user))
  }
}
