import {combineReducers} from "redux";
import {
    movieDetailsReducer,
    moviesReducer
} from "./reducers";
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist";
import * as actionTypes from "../actions/actionTypes"

const appReducer = combineReducers({
    movies: moviesReducer,
    movieDetails: movieDetailsReducer
})

const rootReducer = (state: any, action: any) => {
    if (action.type === actionTypes.RESET_STATE) {
        window.localStorage.clear();
        state = undefined
    }

    return appReducer(state, action)
}

// export default persistReducer(persistConfig, rootReducer);
export default rootReducer
