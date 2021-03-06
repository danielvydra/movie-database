import {useParams} from "react-router-dom";
import {
    Box,
    CircularProgress,
    Typography
} from "@mui/material";
import CustomAppBar from "../../components/CustomAppBar/CustomAppBar";
import {useTranslation} from "react-i18next";
import React, {useEffect, useState} from "react";
import {createMovieDetailsStructure} from "../../utils/MovieDetailsStructure";
import "./styles.scss"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/actions/actionTypes";
import {setMovieDetails} from "../../redux/actions";
import People from "../../components/MovieDetails/People";
import Ratings from "../../components/MovieDetails/Ratings";
import PosterAndPlot from "../../components/MovieDetails/PosterAndPlot";
import Title from "../../components/MovieDetails/Title";
import Subtitle from "../../components/MovieDetails/Subtitle";
import Languages from "../../components/MovieDetails/Languages";
import Genres from "../../components/MovieDetails/Genres";
import OtherInfo from "../../components/MovieDetails/OtherInfo";

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


    const getContent = () => {

        if (loading) return getLoading()

        if (!details) return noContentMessage()

        return getDetails()
    }

    const getDetails = () => {
        return (
            <>
                <Title/>
                <Subtitle/>
                <PosterAndPlot/>
                <Ratings/>
                <People/>

                <Box sx={{display: "flex", flexWrap: "wrap", alignItems: "flex-start", mt: "2rem"}}>
                    <Languages/>
                    <Genres/>
                    <OtherInfo/>
                </Box>

            </>
        )
    }

    const noContentMessage = () => {
        return (
            <Box className={"noContent"}>
                <Typography variant={"h1"}>{t("noContent_info")}</Typography>
                <Typography variant={"h4"}>{t("incorrectMovieID")}</Typography>
            </Box>
        )
    }

    const getLoading = () => {
        return (
            <Box className={"noContent"}>
                <Typography variant={"h5"}>{t("loadingContent")}</Typography>
                <CircularProgress size={100}/>
            </Box>
        )
    }

    return (
        <>
            <CustomAppBar/>

            <div className={"innerDiv"}>
                {getContent()}
            </div>

        </>
    );
}

export default MovieDetails;