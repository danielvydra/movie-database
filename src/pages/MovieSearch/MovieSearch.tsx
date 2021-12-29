import CustomAppBar from "../../components/CustomAppBar/CustomAppBar";
import {Box, Button, CircularProgress, InputAdornment, TextField, Typography} from "@mui/material";
import "./styles.scss"
import SearchIcon from '@mui/icons-material/Search';
import MovieCard from "../../components/MovieCard/MovieCard";
import React, {useState} from "react";
import {IMovieInfo} from "../../models/MovieInfoModel";
import {createMovieInfoStructure} from "../../webServices/utils/MovieInfoStructure";

function MovieSearch() {
    const [movieTitle, setMovieTitle] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<IMovieInfo[] | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        console.log(e.target.name, e.target.value)
        setMovieTitle(e.target.value)
    }

    const handleSubmit = async () => {
        setLoading(true)
        if (!movieTitle) setMovies(null)
        await createMovieInfoStructure(movieTitle.trim()).then(r => {
            if (r === null || r.length) setMovieTitle("")
            setMovies(r)
        })
        setLoading(false)
    }

    const getContent = () => {
        if (!movies) {
            return (
                <>
                    <Typography variant={"h2"}>Nothing to display.</Typography>
                    <Typography variant={"h4"}>Please, search for movie.</Typography>
                </>
            )
        } else if (!movies?.length) {
            return (
                <>
                    <Typography variant={"h2"}>No results found.</Typography>
                    <Typography variant={"h4"}>Please, try again.</Typography>
                </>
            )
        } else {
            return (
                <>
                    {movies.map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                </>
            )
        }
    }

    return (
        <>
            <CustomAppBar/>

            <Box className={"content"}>
                <Box>
                    <Typography variant={"h3"}>Movie search</Typography>
                    <Box>
                        <TextField
                            name={"title"}
                            value={movieTitle}
                            variant={"outlined"}
                            placeholder={"Enter movie title"}
                            onChange={(e) => handleChange(e)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon/>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button disabled={!movieTitle.trim()} variant="contained" onClick={handleSubmit}>Search</Button>
                    </Box>

                    <Box>
                        {loading ? <CircularProgress/> : getContent()}
                    </Box>

                </Box>
            </Box>
        </>
    );
}

export default MovieSearch;