import {Box, Chip, Divider, Typography} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {RootState} from "../../redux/actions/actionTypes";
import "./styles.scss"
import {dateFormat} from "../../consts/Consts";

export default function OtherInfo() {
    const details = useSelector((state: RootState) => state.movieDetails)
    const {t} = useTranslation()

    const getInfo = () => {
        return <Box sx={{mt: "1.5rem"}}>
            <Typography fontSize={18}>
                {details?.imdbVotes && `${t("imdbVotes")}: ${details?.imdbVotes}`}
            </Typography>

            <Typography fontSize={18}>
                {details?.boxOffice && `${t("boxOffice")}: ${details?.boxOffice}`}
            </Typography>

            <Typography fontSize={18}>
                {details?.awards && `${t("awards")}: ${details?.awards}`}
            </Typography>

            <Typography fontSize={18}>
                {details?.production && `${t("production")}: ${details?.production}`}
            </Typography>

            <Typography fontSize={18}>
                {details?.released && `${t("releaseDate")}: ${details?.released?.format(dateFormat)}`}
            </Typography>

            <Typography fontSize={18}>
                {details?.DVD && `DVD: ${details?.DVD?.format(dateFormat)}`}
            </Typography>

            <Typography fontSize={18}>
                {details?.website && `${t("website")}: ${details?.website}`}
            </Typography>
        </Box>
    }

    return (
        <Box sx={{ml: "2rem"}}>
            <Typography sx={{fontWeight: "bold"}} variant={"h4"}>{t("otherInfo")}</Typography>
            <Box>
                {getInfo()}
            </Box>
        </Box>
    )
}