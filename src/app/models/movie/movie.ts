export class Movie {
    movieId: number
    title: string
    overview: string
    releaseDate: string
    genres: string[]
    runtime: number
    voteAverage: number
    voteCount: number
    posterPath: string

    constructor(movieId: number, title: string, overview: string, releaseDate: string, genres: string[], runtime: number, voteAverage: number, voteCount: number, posterPath: string) {
        this.movieId = movieId
        this.title = title
        this.overview = overview
        this.releaseDate = releaseDate
        this.genres = genres
        this.runtime = runtime
        this.voteAverage = voteAverage
        this.voteCount = voteCount
        this.posterPath = posterPath
    }
}

