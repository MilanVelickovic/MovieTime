import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { Movie } from 'src/app/models/movie/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieDbService {

  private BASE_URL = "https://api.themoviedb.org/3/"
  private API_KEY = "<<API_KEY>>"

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

  /*
  getMovieGenres(): Observable<string[]> {
    //Example: https://api.themoviedb.org/3/genre/movie/list?api_key=<<API_KEY>>
    return this.http.get(`${this.BASE_URL}genre/movie/list?api_key=${this.API_KEY}`).pipe(map((genres: any) => Object.keys(genres).map((genre: any) => genre.movie)))
  }
  

  getMovieGenreIds(): Observable<string[]> {
    // Example: https://api.themoviedb.org/3/genre/movie/list?api_key=<<API_KEY>>
    return this.http.get(`${this.BASE_URL}genre/movie/list?api_key=${this.API_KEY}`).pipe(map((genres: any) => genres[0].map((genre: any) => genre.id)))
  }
  */

  getMoviesByGenre(genreId: number): Observable<Movie[]> {
    // Example: https://api.themoviedb.org/3/discover/movie?api_key=<<API_KEY>>&with_genres=28
    return this.http.get(`${this.BASE_URL}discover/movie?api_key=${this.API_KEY}&with_genres=${genreId}`).pipe(map((movies: any) => movies.results.slice(0, 14).map((movie: any) => this.createMovieObject(movie))))
  }

  getMoviesByTitle(title: string): Observable<Movie[]> {
    // https://api.themoviedb.org/3/search/movie?api_key=<<API_KEY>>&query=spider%20man
    // if (movie.poster_path) {
    //  result.push(this.createMovieObject(movie))
    // }
    return this.http.get(`${this.BASE_URL}search/movie?api_key=${this.API_KEY}&query=${title}`).pipe(map((movies: any) => movies.results.map((movie: any) => this.createMovieObject(movie))))
  }

  getMovieById(id: number): Observable<Movie> {
    // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
    return this.http.get(`${this.BASE_URL}movie/${id}?api_key=${this.API_KEY}`).pipe(map((movie: any) => this.createMovieObject(movie)))
  }

  getTrending(): Observable<Movie[]> {
    // https://api.themoviedb.org/3/trending/all/day?api_key=<<API_KEY>>
    return this.http.get(`${this.BASE_URL}trending/all/day?api_key=${this.API_KEY}`).pipe(map((movies: any) => movies.results.map((movie: any) => this.createMovieObject(movie))))
  }

  createMovieObject(movie: any): Movie {
    let genres: string[] = []
    if (movie.genres) {
      movie.genres.map((genre: any) => {
        genres.push(genre.name)
      })
    }
    return new Movie(movie.id, movie.title, movie.overview, movie.release_date, genres, movie.runtime, movie.vote_average, movie.vote_count, movie.poster_path, movie.backdrop_path)
  }

}