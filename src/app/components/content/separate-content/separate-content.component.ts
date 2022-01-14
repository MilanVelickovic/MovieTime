import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie/movie';

@Component({
  selector: 'app-separate-content',
  templateUrl: './separate-content.component.html',
  styleUrls: ['./separate-content.component.scss']
})
export class SeparateContentComponent implements OnInit {

  @Input() name: string
  @Input() movies: Movie[]

  constructor() { }

  ngOnInit(): void {
  }

}
