import {Box, Chip, Typography} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/actions/actionTypes";
import {useTranslation} from "react-i18next";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

export default function Subtitle() {
    const details = useSelector((state: RootState) => state.movieDetails)
    const {t} = useTranslation()

    const getMetascore = () => {
        return <Chip className={"metascoreChip"} size={"medium"}
                     label={`${t("metascore")}: ${details?.metascore ?? "---"}`}
                     color="success" icon={<StarRateRoundedIcon/>}/>
    }

    const getSubtitle = () => {
        let str = ""
        if (details?.year) str += `${details?.year}`
        if (details?.runtime) str += ` | ${details?.runtime}`
        if (details?.country) str += ` | ${details?.country}`
        if (details?.rated) str += ` | ${details?.rated}`
        return <Typography variant={"h5"}>{str}</Typography>
    }

    return (
        <Box className={"row_title"}>
            {getSubtitle()}
            {getMetascore()}
        </Box>
    )
}