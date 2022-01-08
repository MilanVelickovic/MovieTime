import { userReducer } from "./user.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
    user: any
}

export const reducers: ActionReducerMap<AppState, any> = {
    user: userReducer
}