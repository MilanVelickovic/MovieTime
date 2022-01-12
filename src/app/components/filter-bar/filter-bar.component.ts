import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

  search: string
  @Input() genres: string[]
  @Output() passValue = new EventEmitter()
  @Output() passHomeEvent = new EventEmitter()
  @Output() passTrendingEvent = new EventEmitter()

  constructor() {
    this.search = ''
  }

  ngOnInit(): void {
  }

  sendSearchValue(): void {
    this.passValue.emit(this.search)
  }

  sendHomeEvent(): void {
    this.passHomeEvent.emit()
  }

  sendTrendingEvent(): void {
    this.passTrendingEvent.emit()
  }

}
