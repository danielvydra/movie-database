import * as actionTypes from "../actions/actionTypes"

export const moviesReducer = (state = null, action: any) => {
    switch (action.type) {
        case actionTypes.SET_MOVIES:
            return action.payload
        default:
            return state
    }
}

export const movieDetailsReducer = (state = null, action: any) => {
    switch (action.type) {
        case actionTypes.SET_MOVIE_DETAILS:
            return action.payload
        default:
            return state
    }
}