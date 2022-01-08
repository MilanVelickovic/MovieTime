import { User } from "../models/user/user";
import * as UserActions from "../actions/user.actions"
import { Movie } from "../models/movie/movie";

let initialStateTEST: User = new User()
initialStateTEST.setTypeValue("admin")
initialStateTEST.setUsernameValue("Admin")
initialStateTEST.setEmailValue("admin@gmail.com")
initialStateTEST.setMovieList([new Movie(), new Movie(), new Movie()])
initialStateTEST.setAvatarValue("avatar_img_path")

export function userReducer(state: User = initialStateTEST, action: UserActions.Actions) {
    switch(action.type) {
        case UserActions.SET_USER_DATA:
            return {...action.payload}
        case UserActions.CLEAR_USER_DATA:
            let user: User = new User()
            return {...state, user}
        default:
            return {...state}
    }
}