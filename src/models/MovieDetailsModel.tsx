import {Moment} from "moment";

export interface IMovieRating {
    source: string | null,
    value: string | null,
}

export interface IMovieDetails {
    id: string,
    title: string,
    year: number | null,
    imgLink: string | null,
    runtime: string | null,
    released: Moment | null,
    rated: string | null,
    genres: string[] | null,
    director: string[] | null,
    writers: string[] | null,
    actors: string[] | null,
    plot: string | null,
    languages: string[] | null,
    country: string | null,
    awards: string | null,
    ratings: IMovieRating[] | null,
    metascore: number | null,
    imdbRating: number | null,
    imdbVotes: number | null,
    DVD: Moment | null,
    boxOffice: string | null,
    production: string | null,
    website: string | null,
}