import { Action } from "@ngrx/store";
import { User } from "../models/user/user";

export const SET_USER_DATA = "SET_USER_DATA"
export const CLEAR_USER_DATA = "CLEAR_USER_DATA"

export class SetUserData implements Action {
    readonly type = SET_USER_DATA

    constructor(public payload: User) { }
}

export class ClearUserData implements Action {
    readonly type = CLEAR_USER_DATA

    constructor() { }
}

export type Actions = SetUserData | ClearUserData