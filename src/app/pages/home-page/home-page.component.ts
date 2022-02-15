import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie/movie';
import { MovieDbService } from 'src/app/services/movie-db/movie-db.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  search: string

  searchResult: Movie[]
  trendingResult: Movie[]
  myListResult: Movie[]
  forYouResult: Movie[]

  pages: Map<string, boolean>

  constructor(private movieDB: MovieDbService) {
    this.search = ''
    this.pages = new Map([
      ["home", true],
      ["myList", false],
      ["trending", false],
      ["forYou", false]
    ])
    this.loadMovieList()
    this.loadTrending()
    this.loadForYou()
  }

  ngOnInit(): void {
  }

  loadMovieList(): void { 
    let user = JSON.parse(window.sessionStorage.getItem("user") || '')
    user.movieList.map((movie: any) => {
      this.movieDB.getMovieById(movie).subscribe((result: any) => {
        this.myListResult = [result]
      })
    })  
  }

  loadTrending(): void {
    this.movieDB.getTrending().subscribe(result => {
      this.trendingResult = result
    })
  }

  loadForYou(): void {
    let userList = JSON.parse(window.sessionStorage.getItem("user") || '').movieList
    console.log(userList)
    console.log(userList.pop())
    this.movieDB.recommend(userList.pop()).subscribe((result: any) => {
      this.forYouResult = [result]
    })
  }

  recieveSearchValue(search: string): void{
    this.search = search
    this.movieDB.getMoviesByTitle(this.search).subscribe(result => {
      this.searchResult = result
    })

    if (search) {
      this.pages.set("home", false)
      this.pages.set("myList", false)
      this.pages.set("trending", false)
      this.pages.set("forYou", false)
    } else {
      this.pages.set("home", true)
    }
  }

  receivePageValue(page: string): void {
    if (page === "home") {
      this.pages.set("home", true)
      this.pages.set("myList", false)
      this.pages.set("trending", false)
      this.pages.set("forYou", false)

    } else if (page === "myList") {
      this.pages.set("home", false)
      this.pages.set("myList", true)
      this.pages.set("trending", false)
      this.pages.set("forYou", false)

    } else if (page === "trending") {
      this.pages.set("home", false)
      this.pages.set("myList", false)
      this.pages.set("trending", true)
      this.pages.set("forYou", false)

    } else {
      this.pages.set("home", false)
      this.pages.set("myList", false)
      this.pages.set("trending", false)
      this.pages.set("forYou", true)
    }
  }
}
