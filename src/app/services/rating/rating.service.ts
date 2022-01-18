import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private BASE_URL = "http://localhost:9000/rate/"

  constructor(private http: HttpClient) { }

  rate(rating: any): Observable<any> {
    const url = this.BASE_URL + "ratemovie"
    return this.http.post(url, rating).pipe(map((response: any) => response))
  }

  isRated(data: any): Observable<any> {
    const url = this.BASE_URL + "israted"
    return this.http.post(url, data).pipe(map((response: any) => response))
  }
}
