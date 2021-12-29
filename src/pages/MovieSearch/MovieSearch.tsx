import CustomAppBar from "../../components/CustomAppBar/CustomAppBar";
import {Box, Button, CircularProgress, InputAdornment, TextField, Typography} from "@mui/material";
import "./styles.scss"
import SearchIcon from '@mui/icons-material/Search';
import MovieCard from "../../components/MovieCard/MovieCard";
import React, {useState} from "react";
import {IMovieInfo} from "../../models/MovieInfoModel";
import {createMovieInfoStructure} from "../../webServices/utils/MovieInfoStructure";
import {useTranslation} from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';

function MovieSearch() {
    const [movieTitle, setMovieTitle] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<IMovieInfo[] | null>(null);
    const {t} = useTranslation()

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
                <Box className={"noContent"}>
                    <Typography variant={"h1"}>{t("nothingToDisplay")}</Typography>
                    <Typography variant={"h4"}>{t("pleaseSearchMovie")}</Typography>
                </Box>
            )
        } else if (!movies?.length) {
            return (
                <>
                    <Typography variant={"h2"}>{t("noResultsFound")}</Typography>
                    <Typography variant={"h4"}>{t("pleaseTryAgain")}</Typography>
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
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Typography variant={"h3"}>{t("searchMovies")}</Typography>
                    <TextField
                        name={"title"}
                        value={movieTitle}
                        className={"searchField"}
                        variant={"outlined"}
                        placeholder={t("enterMovieTitle")}
                        onChange={(e) => handleChange(e)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EditIcon/>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button className={"submitBtn"} disabled={!movieTitle.trim()} variant="contained"
                            onClick={handleSubmit} endIcon={<SearchIcon />}>{t("search")}</Button>
                </Box>

                <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
                    {loading ? <CircularProgress/> : getContent()}
                </Box>
            </Box>
        </>
    );
}

export default MovieSearch;