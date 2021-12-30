import axios from "axios";
import config from "../app/config.json"

export enum PlotTypes {
    full = "full",
    short = "short"
}

export async function fetchMovieDetails(id: string, plot: PlotTypes = PlotTypes.full) {
    let url = `${config.BACKEND_URL}/?apikey=${config.API_KEY}`
    url += `&i=${id}`
    url += `&plot=${plot}`

    return await axios.get(url).then(r => r.data).catch(() => null)
}