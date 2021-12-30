import {IMovieDetails} from "../../models/MovieDetailsModel";
import {IMovieInfo} from "../../models/MovieInfoModel";

export interface RootState {
    movieDetails: IMovieDetails
    movies: IMovieInfo[]
}

export const SET_MOVIES = "SET_MOVIES"
export const SET_MOVIE_DETAILS = "SET_MOVIE_DETAILS"
export const RESET_STATE = "RESET_STATE"