import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  @Input() movies: Movie[]

  constructor() { }

  ngOnInit(): void {
  }

}
