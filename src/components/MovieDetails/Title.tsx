import {Box, IconButton, Tooltip, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/actions/actionTypes";
import {useTranslation} from "react-i18next";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import {addFavoriteMovie, isInFavorites, removeFavoriteMovie} from "../../utils/FavoriteMoviesHelper";
import {IMovieInfo} from "../../models/MovieInfoModel";

export default function Title() {
    const details = useSelector((state: RootState) => state.movieDetails)
    const [isFavorite, setFavorite] = useState<boolean>(false)
    const {t} = useTranslation()

    useEffect(() => {
        setFavorite(isInFavorites(details.id ?? ""))
    }, [])

    const handleFavoriteMovieClick = () => {
        if (isFavorite) removeFavoriteMovie(createMovieInfoObj())
        else addFavoriteMovie(createMovieInfoObj())

        setFavorite((prev) => !prev)
    }

    const createMovieInfoObj = () => {
        let movieInfo: IMovieInfo = {
            id: details.id,
            title: details.title,
            imgLink: details.imgLink,
            year: details.year
        }
        return movieInfo
    }

    const getStarIcon = () => {
        return (
            <Tooltip arrow title={
                <Typography fontSize={15}>
                    {isFavorite ? t("removeFavoriteMovie_tooltip") : t("addFavoriteMovie_tooltip")}
                </Typography>} placement={"right"}
            >
                <IconButton className={"iconButton"} onClick={() => handleFavoriteMovieClick()}>
                    {isFavorite ? <StarIcon fontSize={"large"}/> : <StarOutlineIcon fontSize={"large"}/>}
                </IconButton>
            </Tooltip>
        )
    }

    return (
        <Box className={"row_title"}>
            <Typography sx={{fontWeight: "bold"}} variant={"h3"}>{`${details?.title}`}</Typography>
            {getStarIcon()}
        </Box>
    )
}