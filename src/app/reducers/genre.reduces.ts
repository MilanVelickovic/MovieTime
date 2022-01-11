import * as GenreActions from "../actions/genre.actions"

const initState: string[] = []

export function genreReducer(state: string[] = initState, action: GenreActions.Actions) {
    switch(action.type) {
        case GenreActions.ADD_GENRES:
            return [...state, action.payload]
        default:
            return [...state]
    }
}