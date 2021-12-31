import {Avatar, Box, LinearProgress, Paper, Typography} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../redux/actions/actionTypes";
import {v4 as uuidv4} from 'uuid';
import {useTranslation} from "react-i18next";

const getRatingValue = (value: string | null): number => {
    if (!value) return -1
    if (value.includes("%")) return parseInt(value.split("%")[0])
    else if (value.includes("/")) {
        let values = value.split("/")
        return 100.0 * parseInt(values[0]) / parseInt(values[1])
    } else return -1
}

export default function Ratings() {
    const details = useSelector((state: RootState) => state.movieDetails)
    const {t} = useTranslation()

    return (
        <Box sx={{mt: "2rem"}}>
            <Typography sx={{fontWeight: "bold"}} variant={"h4"}>{t("ratings")}</Typography>
            {details?.ratings == null ?
                <Typography>No ratings to display</Typography>
                :
                <Box className={"row"} sx={{mt: "1.5rem"}}>
                    {details?.ratings.map((rating) => {
                        return <Paper className={"paper_rating"} key={uuidv4()}>
                            <Box className={"row_title"}>
                                <LinearProgress className={"ratingProgressbar"} variant={"determinate"} key={uuidv4()}
                                                value={getRatingValue(rating.value)}/>
                                <Typography sx={{fontWeight: "bold"}} fontSize={30}
                                            key={uuidv4()}>{`${rating.value}`}</Typography>
                            </Box>
                            <Typography key={uuidv4()}>{`${t("source")}: ${rating.source}`}</Typography>
                        </Paper>
                    })}
                </Box>
            }
        </Box>
    )
}