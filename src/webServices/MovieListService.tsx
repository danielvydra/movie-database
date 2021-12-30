import axios from "axios";
import config from "../app/config.json"

export enum MovieTypes {
    movie = "movie",
    series = "series",
    episode = "episode"
}

export async function fetchMovies(title: string, page: number = 1, year?: number, type: MovieTypes = MovieTypes.movie) {
    let url = `${config.BACKEND_URL}/?apikey=${config.API_KEY}`
    if (year) url += `&y=${year}`
    url += `&type=${type}`
    url += `&s=${title}`
    url += `&page=${page}`

    return await axios.get(url).then(r => r.data).catch(() => null)
}