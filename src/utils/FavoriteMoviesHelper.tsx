import {favoriteMoviesKey} from "../consts/Consts";
import {IMovieInfo} from "../models/MovieInfoModel";

export const isInFavorites = (id: string): boolean => {
    let favoriteMovies: IMovieInfo[] | null = getFavoriteMovies();
    if (!favoriteMovies) return false
    return favoriteMovies.filter(movie => movie?.id === id).length === 1
}

export const getFavoriteMovies = (): IMovieInfo[] | null => {
    let favoriteMoviesJson = window.localStorage.getItem(favoriteMoviesKey)
    return !favoriteMoviesJson ? null : JSON.parse(favoriteMoviesJson) as IMovieInfo[]
}

export const addFavoriteMovie = (movie: IMovieInfo) => {
    let isFavorite = isInFavorites(movie.id);
    if (isFavorite) return

    let favoriteMovies: IMovieInfo[] | null = getFavoriteMovies();

    if (favoriteMovies) favoriteMovies.push(movie)
    else favoriteMovies = [movie]

    saveFavoriteMovies(favoriteMovies)
}

export const removeFavoriteMovie = (movie: IMovieInfo) => {
    let isFavorite = isInFavorites(movie.id);
    if (!isFavorite) return

    let favoriteMovies: IMovieInfo[] | null = getFavoriteMovies();

    if (!favoriteMovies) return
    else if (favoriteMovies.length > 1) favoriteMovies = favoriteMovies.filter(m => m.id !== movie.id)
    else favoriteMovies = null

    saveFavoriteMovies(favoriteMovies)
}

const saveFavoriteMovies = (favoriteMovies: IMovieInfo[] | null) => {
    localStorage.setItem(favoriteMoviesKey, JSON.stringify(favoriteMovies))
}

