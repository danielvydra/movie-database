import CustomAppBar from "../../components/CustomAppBar/CustomAppBar";
import {Box, Button, CircularProgress, InputAdornment, TextField, Tooltip, Typography} from "@mui/material";
import "./styles.scss"
import SearchIcon from '@mui/icons-material/Search';
import MovieCard from "../../components/MovieCard/MovieCard";
import React, {useState} from "react";
import {IMovieInfo} from "../../models/MovieInfoModel";
import {createMovieInfoStructure} from "../../webServices/utils/MovieInfoStructure";
import {useTranslation} from "react-i18next";
import EditIcon from '@mui/icons-material/Edit';
import InfiniteScroll from "react-infinite-scroll-component";

function MovieSearch() {
    const [movieTitle, setMovieTitle] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<IMovieInfo[] | null>(null);
    const [page, setPage] = useState<number>(1);
    const [totalResults, setTotalResults] = useState<number>(-1);
    const {t} = useTranslation()

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setMovieTitle(e.target.value)
    }

    const handleSubmit = async () => {
        setLoading(true)
        setPage(1)
        await fetchData(true)
        setLoading(false)
    }

    const fetchData = async (newSearch: boolean = false) => {
        await createMovieInfoStructure(movieTitle.trim(), newSearch ? 1 : page).then(r => {
            if (r?.movies) {
                if (!movies || newSearch) setMovies(r?.movies)
                else setMovies(movies?.concat(r?.movies))

                setTotalResults(r?.totalResults)
                setPage(prev => prev + 1)
            }
        })
    }

    const getNoResultsContent = () => {
        return (
            <Box className={"noContent"}>
                <Typography variant={"h1"}>{t("noResultsFound")}</Typography>
                <Typography variant={"h4"}>{t("pleaseTryAgain")}</Typography>
            </Box>
        )
    }

    const getNothingToDisplayContent = () => {
        return (
            <Box className={"noContent"}>
                <Typography variant={"h1"}>{t("nothingToDisplay")}</Typography>
                <Typography variant={"h4"}>{t("pleaseSearchMovie")}</Typography>
            </Box>
        )
    }

    const getListContent = () => {
        if (!movies?.length) return null

        return (
            <>
                <InfiniteScroll
                    dataLength={movies?.length}
                    next={fetchData}
                    hasMore={movies?.length < totalResults}
                    loader={<CircularProgress/>}
                    className={"grid"}
                    endMessage={
                        <div className={"noFurtherResults"}>
                            <Typography variant={"h4"}>{t("noFurtherResults")}</Typography>
                        </div>
                    }
                >
                    {movies?.map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                </InfiniteScroll>
            </>
        )
    }

    const getContent = () => {
        if (!movies) {
            return getNothingToDisplayContent()
        } else if (!movies?.length) {
            return getNoResultsContent()
        } else {
            return getListContent()
        }
    }

    return (
        <>
            <CustomAppBar/>

            <Box className={"content"}>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Typography variant={"h3"}>{t("searchMovies")}</Typography>
                    <TextField
                        id={"searchField"}
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
                            onClick={handleSubmit} endIcon={<SearchIcon/>}>{t("search")}</Button>
                </Box>

                {loading ? <CircularProgress/> : getContent()}
            </Box>
        </>
    );
}

export default MovieSearch;