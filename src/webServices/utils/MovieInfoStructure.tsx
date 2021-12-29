import {fetchMovies, MovieTypes} from "../api/MovieListService";
import {IMovieInfo} from "../../models/MovieInfoModel";

export async function createMovieInfoStructure(title: string, year?: number, type: MovieTypes = MovieTypes.movie)
    : Promise<IMovieInfo [] | null> {
    let data = await fetchMovies(title, year, type);
    console.log(data)
    if (!data) return null

    return data.Error ? [] : data.Search.map((m: any) => {
        let movie: IMovieInfo = {
            id: m.imdbID,
            title: m.Title,
            imgLink: m.Poster,
            year: m.Year
        }
        return movie;
    })
}