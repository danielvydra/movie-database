import {Box, Chip, Typography} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {v4 as uuidv4} from 'uuid';
import {useTranslation} from "react-i18next";
import {RootState} from "../../redux/actions/actionTypes";
import "./styles.scss"

export default function Genres() {
    const details = useSelector((state: RootState) => state.movieDetails)
    const {t} = useTranslation()

    const getGenres = () => {
        return details?.genres === null ?
            <Typography>{t("noGenresToShow")}</Typography>
            :
            details?.genres.map(genre => {
                return <Chip className={"chip_genre"} key={uuidv4()} label={genre}/>
            })
    }

    return (
        <Box sx={{ml: "2rem"}}>
            <Typography sx={{fontWeight: "bold"}} variant={"h4"}>{t("genres")}</Typography>
            <Box sx={{display: "flex", flexWrap: "wrap", mt: "1.5rem"}}>
                {getGenres()}
            </Box>
        </Box>
    )
}