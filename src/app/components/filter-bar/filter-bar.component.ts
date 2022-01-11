import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

  @Input() genres: string[]

  constructor() { }

  ngOnInit(): void {
  }

}
