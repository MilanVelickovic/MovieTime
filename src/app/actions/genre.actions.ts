import { Action } from "@ngrx/store";

export const ADD_GENRES = "ADD_GENRES"

export class AddGenres implements Action {
    readonly type = ADD_GENRES

    constructor(public payload: string[]) { }
}

export type Actions = AddGenres 