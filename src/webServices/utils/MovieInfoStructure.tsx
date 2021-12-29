import {fetchMovies} from "../MovieListService";
import {IMovieInfo} from "../../models/MovieInfoModel";

export async function createMovieInfoStructure(title: string, year?: number, type: string = "movie")
    : Promise<IMovieInfo [] | null> {
    let data = await fetchMovies(title, year, type);
    console.log(data)

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