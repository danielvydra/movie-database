import CustomAppBar from "../components/CustomAppBar/CustomAppBar";
import {Box, CircularProgress, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/actions/actionTypes";
import {getFavoriteMovies} from "../utils/FavoriteMoviesHelper";
import {setMovies} from "../redux/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../components/MovieCard/MovieCard";
import {IMovieInfo} from "../models/MovieInfoModel";

function FavoriteMovies() {
    const {t} = useTranslation()
    const [loading, setLoading] = useState<boolean>(true);
    const [loadedMovies, setLoadedMovies] = useState<IMovieInfo[] | null>(null);
    const [page, setPage] = useState<number>(0);
    const movies = useSelector((state: RootState) => state.movies)
    const dispatch = useDispatch()
    document.title = t("favoriteMovies")

    useEffect(() => {
        dispatch(setMovies(null))
        dispatch(setMovies(getFavoriteMovies()))
    }, [])

    useEffect(() => {
        if (movies) {
            if (movies.length > 0) {
                fetchData()
                setLoading(false)
            }
        } else {
            setLoading(false)
        }
    }, [movies])

    const fetchData = () => {
        setLoadedMovies(prev => {
            if (movies) {
                let favorites = getFavoriteMovies();
                if (!favorites) return null
                let a = favorites.splice(page * 10, 10)
                if (!prev) return a
                else return prev.concat(a)
            }
            return null
        })
        setPage(prev => prev + 1)
    }

    const getNothingToDisplayContent = () => {
        return (
            <Box className={"noContent"}>
                <Typography variant={"h1"}>{t("noFavoriteMovies")}</Typography>
                <Typography variant={"h4"}>{t("noFavoriteMovies_hint")}</Typography>
            </Box>
        )
    }

    const getListContent = () => {
        return (
            <>
                <InfiniteScroll
                    dataLength={!loadedMovies?.length ? 0 : loadedMovies?.length}
                    next={fetchData}
                    hasMore={!loadedMovies?.length ? false : loadedMovies?.length < movies?.length}
                    loader={<CircularProgress/>}
                    className={"grid"}
                    endMessage={
                        <div className={"noFurtherResults"}>
                            <Typography variant={"h4"}>{t("noFurtherResults")}</Typography>
                        </div>
                    }
                >
                    {loadedMovies?.map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                </InfiniteScroll>
            </>
        )
    }

    const getContent = () => {
        if (!movies) {
            return getNothingToDisplayContent()
        } else {
            return getListContent()
        }
    }

    return (
        <div>
            <CustomAppBar/>

            <Box className={"content"}>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Typography sx={{fontWeight: "bold"}} variant={"h3"}>{t("favoriteMovies")}</Typography>
                </Box>

                {loading ? <CircularProgress/> : getContent()}
            </Box>
        </div>
    )

}

export default FavoriteMovies;