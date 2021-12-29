import {fetchMovieDetails, PlotTypes} from "../api/MovieDetailsService";
import {IMovieDetails, IMovieRating} from "../../models/MovieDetailsModel";
import moment from "moment";

export async function createMovieDetailsStructure(id: string, plot: PlotTypes = PlotTypes.full)
    : Promise<IMovieDetails | null> {
    let data = await fetchMovieDetails(id, plot);
    console.log(data)
    if (!data) return null

    let empty = "N/A"
    let dateFormat = "DD MMM YYYY"

    if (data.Error) return null
    else {
        let details: IMovieDetails = {
            id: data.imdbID,
            title: data.Title,
            imgLink: data.Poster === empty ? null : data.Poster,
            year: data.Year === empty ? null : parseInt(data.Year),
            actors: data.Actors === empty ? null : (data.Actors.includes(",") ? data.Actors.split(", ") : [data.Actors]),
            awards: data.Awards === empty ? null : data.Awards,
            boxOffice: data.BoxOffice === empty ? null : data.BoxOffice,
            country: data.Country === empty ? null : data.Country,
            director: data.Director === empty ? null : data.Director,
            DVD: data.DVD === empty ? null : moment(data.DVD, dateFormat),
            genres: data.Genre === empty ? null : (data.Genre.includes(",") ? data.Genre.split(", ") : [data.Genre]),
            imdbRating: data.imdbRating === empty ? null : parseFloat(data.imdbRating),
            languages: data.Language === empty ? null : (data.Language.includes(",") ? data.Language.split(", ") : [data.Language]),
            imdbVotes: data.imdbVotes === empty ? null : parseInt(data.imdbVotes),
            metascore: data.Metascore === empty ? null : parseInt(data.Metascore),
            plot: data.Plot === empty ? null : data.Plot,
            production: data.Production === empty ? null : data.Production,
            rated: data.Rated === empty ? null : data.Rated,
            released: data.Released === empty ? null : moment(data.Released, dateFormat),
            runtime: data.Runtime === empty ? null : data.Runtime,
            website: data.Website === empty ? null : data.Website,
            writers: data.Writer === empty ? null : (data.Writer.includes(",") ? data.Writer.split(", ") : [data.Writer]),
            ratings: data.Ratings === empty ? null : data.Ratings.map((rating: any) => {
                let r: IMovieRating = {
                    source: rating.Source === empty ? null : rating.Source,
                    value: rating.Value === empty ? null : rating.Value,
                }
                return r
            }),
        }
        return details;
    }
}