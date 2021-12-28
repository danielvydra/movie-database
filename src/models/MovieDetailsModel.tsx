import {Moment} from "moment";

interface IMovieRating {
    source: string,
    value: string,
}

export interface IMovieDetails {
    id: string,
    title: string,
    year: number,
    imgLink: string,
    runtime: string,
    released: Moment,
    rated: string,
    genres: string[],
    director: string,
    writer: string[],
    actors: string[],
    plot: string,
    languages: string[],
    country: string,
    awards: string,
    ratings: IMovieRating[],
    metascore: number,
    imdbRating: number,
    imdbVotes: number,
    DVD: Moment,
    boxOffice: string,
    production: string,
    website: string
}