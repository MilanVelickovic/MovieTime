import { Component, Input, OnInit } from '@angular/core';
import { RatingService } from 'src/app/services/rating/rating.service';

@Component({
  selector: 'app-star-rate',
  templateUrl: './star-rate.component.html',
  styleUrls: ['./star-rate.component.scss']
})
export class StarRateComponent implements OnInit {

  @Input() movieId: number
  rated: boolean = false
  userRate: number = 0

  constructor(private rating: RatingService) {}

  ngOnInit(): void {
    this.isRated()
  }

  rate(rate: number): void {
    let user = JSON.parse(window.sessionStorage.getItem("user") || '')
    let rating = {
      movieId: this.movieId,
      userEmail: user.email,
      userRate: rate
    }
    this.rating.rate(rating).subscribe(result => {
      console.log(result)
      this.isRated()
    })
  }

  isRated(): void {
    let user = JSON.parse(window.sessionStorage.getItem("user") || '')
    let data = {
      movieId: this.movieId,
      userEmail: user.email
    }
    this.rating.isRated(data).subscribe(result => {
      this.rated = result.rated
      this.userRate = result.rate.userRate
    })
  }

}
