import {IMovieInfo} from "../../models/MovieInfoModel";
import {IMovieDetails} from "../../models/MovieDetailsModel";
import * as actionTypes from "./actionTypes"

export function setMovies(movies: IMovieInfo[] | null) {
    return {
        type: actionTypes.SET_MOVIES,
        payload: movies
    }
}

export function setMovieDetails(details: IMovieDetails | null) {
    return {
        type: actionTypes.SET_MOVIE_DETAILS,
        payload: details
    }
}
