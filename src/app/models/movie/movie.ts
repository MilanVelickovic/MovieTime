export class Movie {
    private movieId: number
    private title: string
    private overview: string
    private releaseDate: string
    private genres: string[]
    private runtime: number
    private voteAverage: number
    private voteCount: number
    private posterPath: string
    private backdropPath: string

    constructor(movieId: number, title: string, overview: string, releaseDate: string, genres: string[], runtime: number, voteAverage: number, voteCount: number, posterPath: string, backdropPath:string) {
        this.movieId = movieId
        this.title = title
        this.overview = overview
        this.releaseDate = releaseDate
        this.genres = genres
        this.runtime = runtime
        this.voteAverage = voteAverage
        this.voteCount = voteCount
        this.posterPath = posterPath
        this.backdropPath = backdropPath
    }

    public getMovieIdValue(): number {
        return this.movieId
    }

    public getTitleValue(): string {
        return this.title
    }

    public getOverviewValue(): string {
        return this.overview
    }

    public getReleaseDateValue(): string {
        return this.releaseDate
    }

    public getGenresValue(): string[] {
        return this.genres
    }

    public getRuntimeValue(): number {
        return this.runtime
    }

    public getVoteAverageValue(): number {
        return this.voteAverage
    }

    public getVoteCountValue(): number {
        return this.voteCount
    }

    public getPosterPathValue(): string {
        return this.posterPath
    }

    public getBackdropPathValue(): string {
        return this.backdropPath
    }
}

