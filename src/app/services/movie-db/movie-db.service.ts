import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Movie } from 'src/app/models/movie/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieDbService {

  private BASE_URL = "https://api.themoviedb.org/3/"
  private API_KEY = "f9c8d425d5c4de2186f68284a769d770"

  constructor(private http: HttpClient) { }

  getMovieGenres(): string[] {
    // Example: https://api.themoviedb.org/3/genre/movie/list?api_key=<<API_KEY>>
    let result: string[] = []
    this.http.get(`${this.BASE_URL}genre/movie/list?api_key=${this.API_KEY}`).subscribe(genres => {
      let extractedGenres = Object.values(genres)[0]
      extractedGenres.forEach((movie: any) => {
        result.push(movie.name)
      })
    })
    return result
  }

  getMovieGenreIds(): any {
    // Example: https://api.themoviedb.org/3/genre/movie/list?api_key=<<API_KEY>>
    this.http.get(`${this.BASE_URL}genre/movie/list?api_key=${this.API_KEY}`).subscribe(genres => {
      let ids: number[] = []
      Object.values(genres)[0].forEach((genre: any) => {
        ids.push(genre.id)
      })
      console.log(ids)
      return ids
    })
  }

  getMoviesByGenre(genreId: number): Movie[] {
    // Example: https://api.themoviedb.org/3/discover/movie?api_key=<<API_KEY>>&with_genres=28
    let result: Movie[] = []
    this.http.get(`${this.BASE_URL}discover/movie?api_key=${this.API_KEY}&with_genres=${genreId}`).subscribe(movies => {
      let extractedMovies = Object.values(movies)[1].slice(0, 14)
      extractedMovies.forEach((movie: any) => {
        result.push(this.createMovieObject(movie))
      })
    })
    return result
  }

  getMoviesByTitle(title: string): Movie[] {
    // https://api.themoviedb.org/3/search/movie?api_key=<<API_KEY>>&query=spider%20man
    let result: Movie[] = []
    this.http.get(`${this.BASE_URL}search/movie?api_key=${this.API_KEY}&query=${title}`).subscribe(movies => {
      Object.values(movies)[1].forEach((movie: any) => {
        if (movie.poster_path) {
          result.push(this.createMovieObject(movie))
        }
      })
    })
    return result
  }

  getTrending(): Movie[] {
    // https://api.themoviedb.org/3/trending/all/day?api_key=<<API_KEY>>
    let result: Movie[] = []
    this.http.get(`${this.BASE_URL}trending/all/day?api_key=${this.API_KEY}`).subscribe(movies => {
      Object.values(movies)[1].forEach((movie: any) => {
        result.push(this.createMovieObject(movie))
      })
    })
    return result
  }

  createMovieObject(movie: any): Movie {
    return new Movie(movie.id, movie.title, movie.overview, movie.release_date, [], movie.runtime, movie.vote_average, movie.vote_count, movie.poster_path)
  }

}
