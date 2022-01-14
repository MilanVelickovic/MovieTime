import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {

  search: string
  @Input() genres: string[]
  @Output() passValue = new EventEmitter()
  @Output() passPageValue = new EventEmitter()

  constructor(private store: Store<AppState>) {
    this.search = ''
    this.store.select("genres").subscribe((result: any) => {
      this.genres = result[0]
    })
  }

  ngOnInit(): void {
  }

  sendSearchValue(): void {
    this.passValue.emit(this.search)
  }

  sendPageValue(page: string): void {
    this.passPageValue.emit(page)
  }

}
