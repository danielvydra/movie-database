import {fetchMovieDetails, PlotTypes} from "../webServices/MovieDetailsService";
import {IMovieDetails, IMovieRating} from "../models/MovieDetailsModel";
import moment from "moment";
import {dateFormat, emptyVal} from "../consts/Consts";

export async function createMovieDetailsStructure(id: string, plot: PlotTypes = PlotTypes.full)
    : Promise<IMovieDetails | null> {
    let data = await fetchMovieDetails(id, plot);
    if (!data) return null

    if (data.Error) return null
    else {
        let details: IMovieDetails = {
            id: data.imdbID,
            title: data.Title,
            imgLink: data.Poster === emptyVal ? null : data.Poster,
            year: data.Year === emptyVal ? null : parseInt(data.Year),
            actors: data.Actors === emptyVal ? null : (data.Actors.includes(",") ? data.Actors.split(", ") : [data.Actors]),
            awards: data.Awards === emptyVal ? null : data.Awards,
            boxOffice: data.BoxOffice === emptyVal ? null : data.BoxOffice,
            country: data.Country === emptyVal ? null : data.Country,
            director: data.Director === emptyVal ? null : data.Director,
            DVD: data.DVD === emptyVal ? null : moment(data.DVD, dateFormat),
            genres: data.Genre === emptyVal ? null : (data.Genre.includes(",") ? data.Genre.split(", ") : [data.Genre]),
            imdbRating: data.imdbRating === emptyVal ? null : parseFloat(data.imdbRating),
            languages: data.Language === emptyVal ? null : (data.Language.includes(",") ? data.Language.split(", ") : [data.Language]),
            imdbVotes: data.imdbVotes === emptyVal ? null : parseInt(data.imdbVotes),
            metascore: data.Metascore === emptyVal ? null : parseInt(data.Metascore),
            plot: data.Plot === emptyVal ? null : data.Plot,
            production: data.Production === emptyVal ? null : data.Production,
            rated: data.Rated === emptyVal ? null : data.Rated,
            released: data.Released === emptyVal ? null : moment(data.Released, dateFormat),
            runtime: data.Runtime === emptyVal ? null : data.Runtime,
            website: data.Website === emptyVal ? null : data.Website,
            writers: data.Writer === emptyVal ? null : (data.Writer.includes(",") ? data.Writer.split(", ") : [data.Writer]),
            ratings: data.Ratings === emptyVal ? null : data.Ratings.map((rating: any) => {
                let r: IMovieRating = {
                    source: rating.Source === emptyVal ? null : rating.Source,
                    value: rating.Value === emptyVal ? null : rating.Value,
                }
                return r
            }),
        }
        return details;
    }
}