import axios from "axios";
import config from "../config.json"

export async function fetchMovies(title: string, year?: number, type: string = "movie") {
    let url = `${config.BACKEND_URL}/?apikey=${config.API_KEY}`
    if (year) url += `&y=${year}`
    url += `&type=${type}`
    url += `&t=${title}`

    return await axios.get(url).then(r => r.data).catch(() => null)
}