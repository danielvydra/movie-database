import {useParams} from "react-router-dom";
import {
    Avatar,
    Box,
    Card,
    CardMedia,
    Chip,
    CircularProgress,
    IconButton,
    LinearProgress,
    Paper, Tooltip,
    Typography
} from "@mui/material";
import CustomAppBar from "../../components/CustomAppBar/CustomAppBar";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {createMovieDetailsStructure} from "../../utils/MovieDetailsStructure";
import {v4 as uuidv4} from 'uuid';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import "./styles.scss"
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/actions/actionTypes";
import {setMovieDetails} from "../../redux/actions";
import {dateFormat, favoriteMoviesKey} from "../../consts/Consts";
import {IMovieInfo} from "../../models/MovieInfoModel";
import {addFavoriteMovie, isInFavorites, removeFavoriteMovie} from "../../utils/FavoriteMoviesHelper";
import People from "../../components/People";
import Ratings from "../../components/Ratings";
import PosterAndPlot from "../../components/PosterAndPlot";
import Title from "../../components/Title";
import Subtitle from "../../components/Subtitle";

function MovieDetails() {
    const params = useParams();
    const [loading, setLoading] = useState<boolean>(true)
    const details = useSelector((state: RootState) => state.movieDetails)
    const dispatch = useDispatch()
    const {t} = useTranslation()
    document.title = t("movieDetails")

    useEffect(() => {
        if (!params?.movieID) return
        createMovieDetailsStructure(params.movieID).then((r) => {
            dispatch(setMovieDetails(r))
            setLoading(false)
        })
    }, []);


    const getLanguages = () => {
        return details?.languages === null ?
            <Typography>No languages to display</Typography>
            :
            details?.languages.map(language => {
                return <Chip key={uuidv4()} label={language}/>
            })
    }

    const getGenres = () => {
        return details?.genres === null ?
            <Typography>No genres to display</Typography>
            :
            details?.genres.map(genre => {
                return <Chip key={uuidv4()} label={genre}/>
            })
    }


    const getInfo = () => {
        return <>
            <Typography>{details?.production}</Typography>
            <Typography>{details?.imdbVotes}</Typography>
            <Typography>{details?.boxOffice}</Typography>
            <Typography>{details?.awards}</Typography>
            <Typography>{details?.production}</Typography>
            <Typography>{details?.released?.format(dateFormat)}</Typography>
            <Typography>{details?.DVD?.format(dateFormat)}</Typography>
            <Typography>{details?.website}</Typography>
        </>
    }

    const getContent = () => {
        return (
            <>
                <Title/>
                <Subtitle/>
                <PosterAndPlot/>
                <Ratings/>
                <People/>

                {getLanguages()}
                {getGenres()}
                {getInfo()}
            </>
        )
    }

    const noContentMessage = () => {
        return <>
            <Typography variant={"h2"}>{t("noContent_info")}</Typography>
            <Typography variant={"h5"}>{t("incorrectMovieID")}</Typography>
        </>
    }

    return (
        <>
            <CustomAppBar/>

            <div>
                <div className={"innerDiv"}>
                    {loading && (
                        <Box>
                            <Typography>{t("loadingContent")}</Typography>
                            <CircularProgress/>
                        </Box>
                    )}
                    {!details ? noContentMessage() : getContent()}
                </div>
            </div>

        </>
    );
}

export default MovieDetails;