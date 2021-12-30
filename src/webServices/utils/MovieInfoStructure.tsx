import {fetchMovies, MovieTypes} from "../api/MovieListService";
import {IMovieInfo} from "../../models/MovieInfoModel";
import {emptyVal} from "../../consts/Consts"

export interface IMoviesInfoWrapper {
    movies: IMovieInfo [],
    totalResults: number,
}

export async function createMovieInfoStructure(
    title: string, page: number = 1, year?: number, type: MovieTypes = MovieTypes.movie
): Promise<IMoviesInfoWrapper | null> {
    let data = await fetchMovies(title, page, year, type);
    if (!data) return null

    if (data.Error) return {movies: [], totalResults: 0}

    let movies: IMovieInfo[] = data.Search.map((m: any) => {
        let movie: IMovieInfo = {
            id: m.imdbID,
            title: m.Title,
            imgLink: m.Poster === emptyVal ? null : m.Poster,
            year: m.Year
        }
        return movie;
    });
    return {movies: movies, totalResults: data.totalResults}
}