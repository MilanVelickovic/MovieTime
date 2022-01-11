import { genreReducer } from "./genre.reduces";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
    genres: any
}

export const reducers: ActionReducerMap<AppState, any> = {
    genres: genreReducer
}