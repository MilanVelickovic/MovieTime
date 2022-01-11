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
    // Example: https://api.themoviedb.org/3/genre/movie/list?api_key=f9c8d425d5c4de2186f68284a769d770
    let result: string[] = []
    this.http.get(`${this.BASE_URL}genre/movie/list?api_key=${this.API_KEY}`).subscribe(genres => {
      let extractedGenres = Object.values(genres)[0]
      extractedGenres.forEach((movie: any) => {
        result.push(movie.name)
      })
    })
    return result
  }

  getMovieGenreId(genreName: string): any {
    // Example: https://api.themoviedb.org/3/genre/movie/list?api_key=f9c8d425d5c4de2186f68284a769d770
    this.http.get(`${this.BASE_URL}genre/movie/list?api_key=${this.API_KEY}`).subscribe(genres => {
      Object.values(genres)[0].forEach((genre: any) => {
        if (genre.name == genreName) {
          console.log(genre.id)
          return genre.id
        }
      })
    })
  }

  getMoviesByGenre(genreId: number): Movie[] {
    // Example: https://api.themoviedb.org/3/discover/movie?api_key=f9c8d425d5c4de2186f68284a769d770&with_genres=28
    let result: Movie[] = []
    this.http.get(`${this.BASE_URL}discover/movie?api_key=${this.API_KEY}&with_genres=${genreId}`).subscribe(movies => {
      let extractedMovies = Object.values(movies)[1].slice(0, 14)
      extractedMovies.forEach((movie: any) => {
        result.push(this.createMovieObject(movie))
      })
    })
    return result
  }

  createMovieObject(movie: any): Movie {
    return new Movie(movie.id, movie.title, movie.overview, movie.release_date, [], movie.runtime, movie.vote_average, movie.vote_count, movie.poster_path)
  }

}
