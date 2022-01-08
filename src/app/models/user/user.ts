import { Movie } from "../movie/movie"

export class User {
    // private type: string
    // private username: string
    // private email: string
    // private movieList: Movie[]
    // private avatar: string
    type: string
    username: string
    email: string
    movieList: Movie[]
    avatar: string

    constructor() { }

    public getTypeValue(): string {
        return this.type
    }

    public setTypeValue(type: string): void {
        this.type = type
    }

    public getUsernameValue(): string {
        return this.username
    }

    public setUsernameValue(username: string): void {
        this.username = username
    }

    public getEmailValue(): string {
        return this.email
    }

    public setEmailValue(email: string): void {
        this.email = email
    }

    public getMovieList(): Movie[] {
        return this.movieList
    }

    public setMovieList(movieList: Movie[]): void {
        this.movieList = movieList
    }

    public getAvatarValue(): string {
        return this.avatar
    }

    public setAvatarValue(avatar: string): void {
        this.avatar = avatar
    }

}
