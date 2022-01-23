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
    return this.http.post(this.BASE_URL + "ratemovie", rating).pipe(map((response: any) => response))
  }

  isRated(data: any): Observable<any> {
    return this.http.post(this.BASE_URL + "israted", data).pipe(map((response: any) => response))
  }
}
